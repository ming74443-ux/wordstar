/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.useStudyList = useStudyList;
  exports.useScopeWords = useScopeWords;
  var _react = require("react");
  var _storeUseAppStore = require("../store/useAppStore");
  var _servicesLearning = require("../services/learning");
  // 学习清单 hook：按需加载 + 会话快照（避免答题过程中列表变化）

  function useStudyList(mode, unit) {
    var scopeWords = (0, _storeUseAppStore.useAppStore)(s => s.scopeWords);
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var settings = (0, _storeUseAppStore.useAppStore)(s => s.settings);
    var currentBook = (0, _storeUseAppStore.useAppStore)(s => s.currentBook);
    var currentGrade = (0, _storeUseAppStore.useAppStore)(s => s.currentGrade);
    var [result, setResult] = (0, _react.useState)({
      list: [],
      newWords: [],
      reviewWords: []
    });

    // 会话键：教材/年级/模式/单元 变化时重新快照
    var sessionKey = `${currentBook}-${currentGrade}-${mode}-${unit ?? 'all'}`;
    (0, _react.useEffect)(() => {
      var alive = true;
      (async () => {
        if (unit) {
          var unitWords = scopeWords.filter(w => w.unit === unit);
          if (alive) {
            setResult({
              list: unitWords,
              newWords: unitWords.filter(w => !progress[w.id]),
              reviewWords: unitWords.filter(w => !!progress[w.id])
            });
          }
          return;
        }
        var newWords = (0, _servicesLearning.selectNewWords)(scopeWords, progress, settings.dailyNewTarget);
        var reviewWords = [];
        if (mode !== 'new') {
          reviewWords = await (0, _servicesLearning.fetchReviewWords)(progress, settings.dailyReviewTarget);
        }
        if (!alive) return;
        if (mode === 'review') {
          setResult({
            list: reviewWords,
            newWords: [],
            reviewWords
          });
        } else {
          setResult({
            list: [...newWords, ...reviewWords],
            newWords,
            reviewWords
          });
        }
      })();
      return () => {
        alive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionKey]);
    return result;
  }
  function useScopeWords() {
    return (0, _storeUseAppStore.useAppStore)(s => s.scopeWords);
  }
