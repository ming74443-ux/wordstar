/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      if (k === 'default') return;
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  exports.getDb = getDb;
  var _expoSqlite = require("expo-sqlite");
  var SQLite = _interopNamespace(_expoSqlite);
  // SQLite 数据库：打开连接 + 建表

  var db = null;
  async function getDb() {
    if (!db) {
      db = await SQLite.openDatabaseAsync('wordstar.db');
      await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS words (
        id TEXT PRIMARY KEY NOT NULL,
        word TEXT NOT NULL,
        meaning TEXT,
        phonetic TEXT,
        grade INTEGER,
        textbook TEXT,
        unit TEXT,
        example TEXT,
        example_meaning TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_words_scope ON words (textbook, grade);
      CREATE INDEX IF NOT EXISTS idx_words_unit ON words (textbook, grade, unit);
    `);
    }
    return db;
  }
