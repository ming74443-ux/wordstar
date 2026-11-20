/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "APP_NAME", {
    enumerable: true,
    get: function () {
      return APP_NAME;
    }
  });
  Object.defineProperty(exports, "GRADE_LABELS", {
    enumerable: true,
    get: function () {
      return GRADE_LABELS;
    }
  });
  exports.today = today;
  exports.addDays = addDays;
  Object.defineProperty(exports, "BOOKS", {
    enumerable: true,
    get: function () {
      return BOOKS;
    }
  });
  exports.bookName = bookName;
  Object.defineProperty(exports, "INITIAL_EASE", {
    enumerable: true,
    get: function () {
      return INITIAL_EASE;
    }
  });
  Object.defineProperty(exports, "DEFAULT_NEW_TARGET", {
    enumerable: true,
    get: function () {
      return DEFAULT_NEW_TARGET;
    }
  });
  Object.defineProperty(exports, "DEFAULT_REVIEW_TARGET", {
    enumerable: true,
    get: function () {
      return DEFAULT_REVIEW_TARGET;
    }
  });
  // 常量定义

  /** 应用名 */
  var APP_NAME = '单词星 WordStar';

  /** 年级标签 */
  var GRADE_LABELS = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'];

  /** 今日日期 YYYY-MM-DD */
  function today() {
    var d = new Date();
    var m = `${d.getMonth() + 1}`.padStart(2, '0');
    var day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  /** 日期加法：返回 YYYY-MM-DD */
  function addDays(dateStr, days) {
    var d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    var m = `${d.getMonth() + 1}`.padStart(2, '0');
    var day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  /** 词书目录 */
  var BOOKS = [{
    id: 'general',
    name: '通用分级词库',
    shortName: '通用',
    description: '按 1-9 年级难度编排的核心词汇',
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    color: '#5B67F1'
  }, {
    id: 'pep',
    name: '人教版 (PEP)',
    shortName: '人教',
    description: '人教版小学/初中英语教材词汇',
    grades: [3, 4, 5, 6, 7, 8, 9],
    color: '#0EA5E9'
  }, {
    id: 'waiyan',
    name: '外研版',
    shortName: '外研',
    description: '外研社新标准英语教材词汇',
    grades: [3, 4, 5, 6, 7, 8, 9],
    color: '#22C55E'
  }, {
    id: 'yilin',
    name: '译林版',
    shortName: '译林',
    description: '译林牛津英语教材词汇',
    grades: [3, 4, 5, 6, 7, 8, 9],
    color: '#F59E0B'
  }, {
    id: 'bnup',
    name: '北师大版',
    shortName: '北师大',
    description: '北师大版英语教材词汇',
    grades: [3, 4, 5, 6, 7, 8, 9],
    color: '#7C4DFF'
  }];

  /** 教材 id -> 名称 */
  function bookName(id) {
    return BOOKS.find(b => b.id === id)?.name ?? id;
  }

  /** SM-2 初始难易系数 */
  var INITIAL_EASE = 2.5;

  /** 每日新词/复习默认目标 */
  var DEFAULT_NEW_TARGET = 10;
  var DEFAULT_REVIEW_TARGET = 20;
