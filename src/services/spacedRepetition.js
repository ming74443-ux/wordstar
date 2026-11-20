/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.initialProgress = initialProgress;
  exports.applySM2 = applySM2;
  exports.masteryRate = masteryRate;
  var _constants = require("../constants");
  // SM-2 间隔重复算法
  // 参考：SuperMemo SM-2，广泛用于背单词 App（Anki、墨墨等）

  /** 生成单词的初始进度记录 */
  function initialProgress(wordId) {
    return {
      wordId,
      easeFactor: _constants.INITIAL_EASE,
      interval: 0,
      repetitions: 0,
      dueDate: (0, _constants.today)(),
      status: 'new',
      correctCount: 0,
      wrongCount: 0,
      inWrongBook: false
    };
  }
  function deriveStatus(repetitions, interval) {
    if (repetitions >= 5 && interval >= 21) return 'mastered';
    if (repetitions >= 1) return 'review';
    return 'learning';
  }

  /**
   * 根据答题质量更新进度
   * @param prev 上一次进度
   * @param quality SM-2 质量分 0-5（5=完美，4=犹豫后正确，3=勉强正确，2=错误但记得，1=错误，0=完全忘记）
   */
  function applySM2(prev, quality) {
    var q = Math.max(0, Math.min(5, Math.round(quality)));
    var correct = q >= 3;
    var {
      easeFactor,
      interval,
      repetitions
    } = prev;

    // 更新难易系数 EF
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
    if (correct) {
      if (repetitions === 0) interval = 1;else if (repetitions === 1) interval = 6;else interval = Math.round(interval * easeFactor);
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }
    return {
      ...prev,
      easeFactor,
      interval,
      repetitions,
      dueDate: (0, _constants.addDays)((0, _constants.today)(), interval),
      status: deriveStatus(repetitions, interval),
      correctCount: prev.correctCount + (correct ? 1 : 0),
      wrongCount: prev.wrongCount + (correct ? 0 : 1),
      lastReviewedAt: Date.now(),
      // 答对后从错词本移除（连续答对 2 次才移除更合理，此处答对即移出）
      inWrongBook: correct ? false : true
    };
  }

  /** 掌握率：掌握词 / 已学词 */
  function masteryRate(progress) {
    var list = Object.values(progress);
    if (list.length === 0) return 0;
    var mastered = list.filter(p => p.status === 'mastered').length;
    return Math.round(mastered / list.length * 100);
  }
