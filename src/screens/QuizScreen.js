/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return QuizScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _hooksUseStudyList = require("../hooks/useStudyList");
  var _storeUseAppStore = require("../store/useAppStore");
  var _servicesLearning = require("../services/learning");
  var _servicesTts = require("../services/tts");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 测验闯关：选择题 + 拼写

  var TYPE_LABEL = {
    en2zh: '看英文，选中文意思',
    zh2en: '看中文，选英文单词',
    listening: '听发音，选中文意思',
    spelling: '根据提示，拼写单词'
  };
  function QuizScreen({
    route,
    navigation
  }) {
    var mode = route.params?.mode ?? 'new';
    var unit = route.params?.unit;
    var {
      list
    } = (0, _hooksUseStudyList.useStudyList)(mode, unit);
    var scopeWords = (0, _storeUseAppStore.useAppStore)(s => s.scopeWords);
    var recordAnswer = (0, _storeUseAppStore.useAppStore)(s => s.recordAnswer);
    var questions = (0, _react.useMemo)(() => {
      var types = ['en2zh', 'zh2en', 'listening', 'spelling'];
      return list.map((w, i) => (0, _servicesLearning.buildQuestion)(w, scopeWords, types[i % types.length]));
    }, [list, scopeWords]);
    var [index, setIndex] = (0, _react.useState)(0);
    var [answered, setAnswered] = (0, _react.useState)(false);
    var [correct, setCorrect] = (0, _react.useState)(false);
    var [spellInput, setSpellInput] = (0, _react.useState)('');
    var [correctCount, setCorrectCount] = (0, _react.useState)(0);
    var [finished, setFinished] = (0, _react.useState)(false);
    var q = questions[index];
    (0, _react.useEffect)(() => {
      if (q && (q.type === 'listening' || q.type === 'spelling')) {
        var t = setTimeout(() => (0, _servicesTts.speak)(q.word.word), 350);
        return () => clearTimeout(t);
      }
    }, [index, q]);
    if (finished) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top', 'bottom'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.center,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.bigEmoji,
            children: correctCount >= list.length * 0.8 ? '🏆' : correctCount >= list.length * 0.5 ? '💪' : '📚'
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.doneTitle,
            children: "\u95EF\u5173\u5B8C\u6210\uFF01"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.doneSub,
            children: ["\u7B54\u5BF9 ", correctCount, " / ", list.length, " \u9898"]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.doneSub,
            children: ["\u6B63\u786E\u7387 ", list.length ? Math.round(correctCount / list.length * 100) : 0, "%"]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
            style: {
              marginTop: _theme.spacing.lg,
              width: '80%'
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: "\u8FD4\u56DE\u9996\u9875",
              onPress: () => navigation.goBack()
            })
          })]
        })
      });
    }
    if (!q) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top', 'bottom'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.center,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.bigEmoji,
            children: "\uD83C\uDF1F"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.doneTitle,
            children: "\u4ECA\u65E5\u4EFB\u52A1\u5DF2\u5B8C\u6210"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
            style: {
              marginTop: _theme.spacing.lg,
              width: '80%'
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: "\u8FD4\u56DE\u9996\u9875",
              onPress: () => navigation.goBack()
            })
          })]
        })
      });
    }
    var submit = ok => {
      setCorrect(ok);
      setAnswered(true);
      if (ok) setCorrectCount(c => c + 1);
      recordAnswer(q.word.id, ok ? 5 : 2);
    };
    var next = () => {
      setSpellInput('');
      setAnswered(false);
      if (index + 1 >= questions.length) setFinished(true);else setIndex(index + 1);
    };
    var isSpelling = q.type === 'spelling';
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topBar,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
          style: styles.counter,
          children: [index + 1, " / ", questions.length]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.ProgressBar, {
          value: index + 1,
          max: questions.length,
          color: _theme.colors.success
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.typeLabel,
        children: TYPE_LABEL[q.type]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Card, {
        style: styles.promptCard,
        children: q.type === 'en2zh' || q.type === 'listening' ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.promptWord,
            children: q.word.word
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: () => (0, _servicesTts.speak)(q.word.word),
            hitSlop: 12,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: {
                fontSize: 24,
                marginLeft: _theme.spacing.sm
              },
              children: "\uD83D\uDD0A"
            })
          })]
        }) : q.type === 'zh2en' ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.promptWord,
          children: q.word.meaning
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.promptWord,
            children: q.word.meaning
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: () => (0, _servicesTts.speak)(q.word.word),
            style: {
              alignSelf: 'center',
              marginTop: _theme.spacing.sm
            },
            hitSlop: 12,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: {
                fontSize: 26
              },
              children: "\uD83D\uDD0A \u542C\u53D1\u97F3"
            })
          })]
        })
      }), isSpelling ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
          style: [styles.input, answered && (correct ? styles.inputOk : styles.inputBad)],
          value: spellInput,
          onChangeText: setSpellInput,
          placeholder: "\u8F93\u5165\u82F1\u6587\u5355\u8BCD",
          autoCapitalize: "none",
          autoCorrect: false,
          editable: !answered
        }), !answered ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
          title: "\u63D0\u4EA4",
          onPress: () => submit((0, _servicesLearning.isSpellingCorrect)(spellInput, q.word.word)),
          disabled: !spellInput.trim(),
          style: {
            marginTop: _theme.spacing.md
          }
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.feedback, correct ? styles.okText : styles.badText],
            children: correct ? '✅ 正确！' : `❌ 正确答案：${q.word.word}`
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: index + 1 >= questions.length ? '查看结果' : '下一题',
            onPress: next,
            style: {
              marginTop: _theme.spacing.sm
            }
          })]
        })]
      }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: {
          marginTop: _theme.spacing.md
        },
        children: [q.options.map((opt, i) => {
          var isAnswer = answered && i === q.answerIndex;
          return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            disabled: answered,
            onPress: () => submit(i === q.answerIndex),
            style: [styles.option, isAnswer && styles.optionCorrect],
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.optionText,
              children: opt
            }), isAnswer ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.check,
              children: "\u2713"
            }) : null]
          }, i);
        }), answered ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.feedback, correct ? styles.okText : styles.badText],
            children: correct ? '✅ 回答正确！' : `❌ 正确答案已标出`
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: index + 1 >= questions.length ? '查看结果' : '下一题',
            onPress: next,
            style: {
              marginTop: _theme.spacing.sm
            }
          })]
        }) : null]
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: _theme.colors.background,
      padding: _theme.spacing.md
    },
    topBar: {
      marginBottom: _theme.spacing.md
    },
    counter: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginBottom: _theme.spacing.xs
    },
    typeLabel: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      textAlign: 'center',
      marginBottom: _theme.spacing.sm
    },
    promptCard: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: _theme.spacing.xl
    },
    promptWord: {
      fontSize: _theme.fontSize.xxl,
      fontWeight: '800',
      color: _theme.colors.text,
      textAlign: 'center'
    },
    input: {
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.md,
      borderWidth: 1.5,
      borderColor: _theme.colors.border,
      padding: _theme.spacing.md,
      fontSize: _theme.fontSize.lg,
      marginTop: _theme.spacing.md,
      textAlign: 'center'
    },
    inputOk: {
      borderColor: _theme.colors.success
    },
    inputBad: {
      borderColor: _theme.colors.danger
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.md,
      borderWidth: 1.5,
      borderColor: _theme.colors.border,
      padding: _theme.spacing.md,
      marginBottom: _theme.spacing.sm
    },
    optionCorrect: {
      backgroundColor: '#E8F9EE',
      borderColor: _theme.colors.success
    },
    optionText: {
      fontSize: _theme.fontSize.md,
      fontWeight: '600',
      color: _theme.colors.text
    },
    check: {
      fontSize: _theme.fontSize.lg,
      color: _theme.colors.success,
      fontWeight: '800'
    },
    feedback: {
      fontSize: _theme.fontSize.md,
      fontWeight: '700',
      textAlign: 'center'
    },
    okText: {
      color: _theme.colors.success
    },
    badText: {
      color: _theme.colors.danger
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: _theme.spacing.lg
    },
    bigEmoji: {
      fontSize: 64
    },
    doneTitle: {
      fontSize: _theme.fontSize.xxl,
      fontWeight: '800',
      color: _theme.colors.text,
      marginTop: _theme.spacing.md
    },
    doneSub: {
      fontSize: _theme.fontSize.md,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.sm,
      textAlign: 'center'
    }
  });
