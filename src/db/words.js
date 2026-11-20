/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getWordsByScope = getWordsByScope;
  exports.seedWords = seedWords;
  exports.insertWords = insertWords;
  exports.countWords = countWords;
  exports.getWordById = getWordById;
  exports.getWordsByIds = getWordsByIds;
  exports.getBookCounts = getBookCounts;
  var _database = require("./database");
  // 词库仓库：单词的 SQLite 读写

  function rowToWord(r) {
    return {
      id: r.id,
      word: r.word,
      meaning: r.meaning ?? '',
      phonetic: r.phonetic ?? undefined,
      grade: r.grade,
      textbook: r.textbook,
      unit: r.unit ?? undefined,
      example: r.example ?? undefined,
      exampleMeaning: r.example_meaning ?? undefined
    };
  }
  var COLUMNS = 'id, word, meaning, phonetic, grade, textbook, unit, example, example_meaning';

  // 内存缓存：scope 按「教材:年级」；单词按 id 粒度，供复习/错词/详情跨年级复用
  var scopeCache = new Map();
  var wordCache = new Map();
  function clearCaches() {
    scopeCache.clear();
    wordCache.clear();
  }

  /** 按教材 + 年级查询（带内存缓存，按需加载） */
  async function getWordsByScope(textbook, grade) {
    var key = `${textbook}:${grade}`;
    var cached = scopeCache.get(key);
    if (cached) return cached;
    var db = await (0, _database.getDb)();
    var rows = await db.getAllAsync(`SELECT ${COLUMNS} FROM words WHERE textbook = ? AND grade = ? ORDER BY unit, rowid`, [textbook, grade]);
    var words = rows.map(rowToWord);
    scopeCache.set(key, words);
    for (var w of words) wordCache.set(w.id, w);
    return words;
  }

  /** 首次种子：清空后批量写入 */
  async function seedWords(words) {
    var db = await (0, _database.getDb)();
    await db.withTransactionAsync(async () => {
      await db.runAsync('DELETE FROM words');
      await insertBatch(db, words);
    });
    clearCaches();
  }

  /** 增量导入：按 id 忽略已存在 */
  async function insertWords(words) {
    var db = await (0, _database.getDb)();
    await db.withTransactionAsync(async () => {
      await insertBatch(db, words);
    });
    clearCaches();
  }
  async function insertBatch(db, words) {
    var BATCH = 200; // 每批 200 词 × 9 列 = 1800 个绑定值，远低于 SQLite 参数上限
    for (var i = 0; i < words.length; i += BATCH) {
      var chunk = words.slice(i, i + BATCH);
      var placeholders = chunk.map(() => `(${Array(9).fill('?').join(', ')})`).join(', ');
      var params = [];
      for (var w of chunk) {
        params.push(w.id, w.word, w.meaning, w.phonetic ?? null, w.grade, w.textbook, w.unit ?? null, w.example ?? null, w.exampleMeaning ?? null);
      }
      await db.runAsync(`INSERT OR IGNORE INTO words (${COLUMNS}) VALUES ${placeholders}`, params);
    }
  }

  /** 单词总数 */
  async function countWords() {
    var db = await (0, _database.getDb)();
    var row = await db.getFirstAsync('SELECT COUNT(*) AS c FROM words');
    return row?.c ?? 0;
  }

  /** 按 id 查询单个单词（带缓存） */
  async function getWordById(id) {
    if (wordCache.has(id)) return wordCache.get(id);
    var db = await (0, _database.getDb)();
    var row = await db.getFirstAsync(`SELECT ${COLUMNS} FROM words WHERE id = ?`, [id]);
    if (!row) return null;
    var w = rowToWord(row);
    wordCache.set(id, w);
    return w;
  }

  /** 按 id 批量查询（用于复习/错词等跨年级场景，带缓存，保持入参顺序） */
  async function getWordsByIds(ids) {
    if (ids.length === 0) return [];
    var missing = [];
    var result = ids.map(id => {
      var cached = wordCache.get(id);
      if (cached) return cached;
      missing.push(id);
      return null;
    });
    if (missing.length > 0) {
      var db = await (0, _database.getDb)();
      var fetched = [];
      for (var i = 0; i < missing.length; i += 500) {
        var chunk = missing.slice(i, i + 500);
        var ph = chunk.map(() => '?').join(', ');
        var rows = await db.getAllAsync(`SELECT ${COLUMNS} FROM words WHERE id IN (${ph})`, chunk);
        for (var r of rows) {
          var w = rowToWord(r);
          wordCache.set(w.id, w);
          fetched.push(w);
        }
      }
      var byId = new Map(fetched.map(w => [w.id, w]));
      for (var _i = 0; _i < result.length; _i++) {
        if (result[_i] === null) result[_i] = byId.get(ids[_i]) ?? null;
      }
    }
    return result.filter(w => !!w);
  }

  /** 各教材词数统计 */
  async function getBookCounts() {
    var db = await (0, _database.getDb)();
    var rows = await db.getAllAsync('SELECT textbook, COUNT(*) AS c FROM words GROUP BY textbook');
    var out = {};
    for (var r of rows) out[r.textbook] = r.c;
    return out;
  }
