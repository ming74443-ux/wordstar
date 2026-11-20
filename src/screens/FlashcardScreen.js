/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return FlashcardScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _hooksUseStudyList = require("../hooks/useStudyList");
  var _storeUseAppStore = require("../store/useAppStore");
  var _componentsWordCard = require("../components/WordCard");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 卡片学习会话

  function FlashcardScreen({
    route,
    navigation
  }) {
    var mode = route.params?.mode ?? 'new';
    var unit = route.params?.unit;
    var {
      list
    } = (0, _hooksUseStudyList.useStudyList)(mode, unit);
    var recordAnswer = (0, _storeUseAppStore.useAppStore)(s => s.recordAnswer);
    var [index, setIndex] = (0, _react.useState)(0);
    var [flipped, setFlipped] = (0, _react.useState)(false);
    var [finished, setFinished] = (0, _react.useState)(false);
    var [knownCount, setKnownCount] = (0, _react.useState)(0);
    if (finished) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top', 'bottom'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.center,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.bigEmoji,
            children: "\uD83C\uDF89"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.doneTitle,
            children: "\u592A\u68D2\u4E86\uFF01"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.doneSub,
            children: ["\u672C\u6B21\u5B66\u4E60 ", list.length, " \u4E2A\u5355\u8BCD\uFF0C\u8BA4\u8BC6 ", knownCount, " \u4E2A"]
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
    if (list.length === 0) {
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
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.doneSub,
            children: "\u6CA1\u6709\u5F85\u5B66\u7684\u5355\u8BCD\u5566\uFF0C\u660E\u5929\u518D\u6765\u5427\uFF01"
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
    var word = list[index];
    var handleAnswer = quality => {
      recordAnswer(word.id, quality);
      if (quality >= 3) setKnownCount(c => c + 1);
      if (index + 1 >= list.length) {
        setFinished(true);
      } else {
        setIndex(index + 1);
        setFlipped(false);
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topBar,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
          style: styles.counter,
          children: [index + 1, " / ", list.length]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.ProgressBar, {
          value: index + 1,
          max: list.length
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.cardArea,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsWordCard.WordCard, {
          word: word,
          flipped: flipped,
          onFlip: () => setFlipped(!flipped)
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsWordCard.SpeakButton, {
          text: word.word,
          size: 26
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
        style: styles.actions,
        children: !flipped ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
          title: "\uD83D\uDC40 \u67E5\u770B\u91CA\u4E49",
          onPress: () => setFlipped(true),
          style: {
            width: '100%'
          }
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
          style: {
            width: '100%'
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.gradeRow,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: "\uD83D\uDE1E \u4E0D\u8BA4\u8BC6",
              variant: "danger",
              onPress: () => handleAnswer(1),
              style: styles.gradeBtn
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: "\uD83E\uDD14 \u6A21\u7CCA",
              variant: "secondary",
              onPress: () => handleAnswer(3),
              style: styles.gradeBtn
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: "\uD83D\uDE04 \u8BA4\u8BC6",
              variant: "success",
              onPress: () => handleAnswer(4),
              style: styles.gradeBtn
            })]
          })
        })
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
    cardArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    actions: {
      paddingTop: _theme.spacing.md
    },
    gradeRow: {
      flexDirection: 'row',
      gap: _theme.spacing.sm
    },
    gradeBtn: {
      flex: 1,
      paddingHorizontal: 4
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
