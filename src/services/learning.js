/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.selectNewWords = selectNewWords;
  exports.fetchReviewWords = fetchReviewWords;
  exports.fetchWrongWords = fetchWrongWords;
  exports.buildQuestion = buildQuestion;
  exports.isSpellingCorrect = isSpellingCorrect;
  exports.pickQuestionTypes = pickQuestionTypes;
  var _constants = require("../constants");
  var _dbWords = require("../db/words");
  // 学习计划与出题逻辑（按需加载版本：新词走内存 scope，复习/错词走 SQLite）

  /** 待学的新词（当前 scope 内尚无进度记录） */
  function selectNewWords(scopeWords, progress, count) {
    return scopeWords.filter(w => !progress[w.id]).slice(0, count);
  }

  /** 到期待复习的单词（跨年级，从 SQLite 按 dueDate 顺序取） */
  async function fetchReviewWords(progress, count) {
    var d = (0, _constants.today)();
    var dueIds = Object.entries(progress).filter(([, p]) => p.status !== 'mastered' && p.dueDate <= d).sort(([, a], [, b]) => a.dueDate.localeCompare(b.dueDate)).slice(0, count).map(([id]) => id);
    if (dueIds.length === 0) return [];
    var ws = await (0, _dbWords.getWordsByIds)(dueIds);
    var byId = new Map(ws.map(w => [w.id, w]));
    return dueIds.map(id => byId.get(id)).filter(w => !!w);
  }

  /** 错词本单词（跨年级，从 SQLite 取） */
  async function fetchWrongWords(progress) {
    var ids = Object.entries(progress).filter(([, p]) => p.inWrongBook).map(([id]) => id);
    return (0, _dbWords.getWordsByIds)(ids);
  }
  function shuffle(arr) {
    var a = [...arr];
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** 从词池中取干扰项（不同单词） */
  function distractors(pool, exclude, n, field) {
    var set = new Set();
    var picked = [];
    var candidates = shuffle(pool.filter(w => w.id !== exclude.id));
    for (var c of candidates) {
      var v = field === 'word' ? c.word : c.meaning;
      if (!set.has(v) && v !== (field === 'word' ? exclude.word : exclude.meaning)) {
        set.add(v);
        picked.push(v);
        if (picked.length >= n) break;
      }
    }
    return picked;
  }

  /** 生成一道选择题 */
  function buildQuestion(word, pool, type) {
    var optionCount = 4;
    if (type === 'en2zh') {
      var others = distractors(pool, word, 3, 'meaning');
      var options = shuffle([word.meaning, ...others]);
      return {
        type,
        word,
        options,
        answerIndex: options.indexOf(word.meaning)
      };
    }
    if (type === 'zh2en') {
      var _others = distractors(pool, word, 3, 'word');
      var _options = shuffle([word.word, ..._others]);
      return {
        type,
        word,
        options: _options,
        answerIndex: _options.indexOf(word.word)
      };
    }
    if (type === 'listening') {
      var _others2 = distractors(pool, word, 3, 'meaning');
      var _options2 = shuffle([word.meaning, ..._others2]);
      return {
        type,
        word,
        options: _options2,
        answerIndex: _options2.indexOf(word.meaning)
      };
    }
    // spelling：看中文/听发音拼写
    return {
      type,
      word,
      options: [],
      answerIndex: 0
    };
  }

  /** 拼写判定：忽略大小写与首尾空格 */
  function isSpellingCorrect(input, word) {
    return input.trim().toLowerCase() === word.trim().toLowerCase();
  }

  /** 随机取多个题型 */
  function pickQuestionTypes() {
    var all = ['en2zh', 'zh2en', 'listening', 'spelling'];
    return shuffle(all);
  }
