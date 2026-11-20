/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return WordDetailScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _componentsWordCard = require("../components/WordCard");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _dbWords = require("../db/words");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 单词详情

  function WordDetailScreen({
    route,
    navigation
  }) {
    var {
      wordId
    } = route.params;
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var toggleWrongBook = (0, _storeUseAppStore.useAppStore)(s => s.toggleWrongBook);
    var [word, setWord] = (0, _react.useState)(null);
    var [loaded, setLoaded] = (0, _react.useState)(false);
    (0, _react.useEffect)(() => {
      var alive = true;
      (0, _dbWords.getWordById)(wordId).then(w => {
        if (alive) {
          setWord(w);
          setLoaded(true);
        }
      });
      return () => {
        alive = false;
      };
    }, [wordId]);
    if (!loaded) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.notFound,
          children: "\u52A0\u8F7D\u4E2D\u2026"
        })
      });
    }
    if (!word) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.notFound,
          children: "\u672A\u627E\u5230\u8BE5\u5355\u8BCD"
        })
      });
    }
    var p = progress[word.id];
    var statusLabel = !p ? '未学习' : p.status === 'mastered' ? '已掌握' : p.status === 'review' ? '复习中' : '学习中';
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: {
            alignItems: 'center',
            marginBottom: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.word,
            children: word.word
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: _theme.spacing.xs
            },
            children: [word.phonetic ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.phonetic,
              children: word.phonetic
            }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsWordCard.SpeakButton, {
              text: word.word,
              size: 26
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsWordCard.WordTag, {
          word: word
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.meaningLabel,
            children: "\u4E2D\u6587\u91CA\u4E49"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.meaning,
            children: word.meaning
          }), word.example ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.exampleBox,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.example,
              children: word.example
            }), word.exampleMeaning ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.exampleZh,
              children: word.exampleMeaning
            }) : null]
          }) : null]
        }), p ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Row, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u72B6\u6001",
              value: statusLabel,
              color: p.status === 'mastered' ? _theme.colors.success : _theme.colors.primary
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u7B54\u5BF9",
              value: p.correctCount,
              color: _theme.colors.info
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u7B54\u9519",
              value: p.wrongCount,
              color: _theme.colors.danger
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
            style: styles.divider
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Row, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u95F4\u9694(\u5929)",
              value: p.interval,
              color: _theme.colors.textMuted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u8FDE\u7EED\u6B63\u786E",
              value: p.repetitions,
              color: _theme.colors.textMuted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u4E0B\u6B21\u590D\u4E60",
              value: p.dueDate,
              color: _theme.colors.textMuted
            })]
          })]
        }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: p?.inWrongBook ? '✅ 已加入错词本（点击移除）' : '📕 加入错词本',
            variant: p?.inWrongBook ? 'success' : 'outline',
            onPress: () => toggleWrongBook(word.id)
          })
        })]
      })
    });
  }
  var styles = _reactNative.StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: _theme.colors.background
    },
    container: {
      padding: _theme.spacing.md
    },
    word: {
      fontSize: 40,
      fontWeight: '800',
      color: _theme.colors.text
    },
    phonetic: {
      fontSize: _theme.fontSize.md,
      color: _theme.colors.textMuted,
      marginRight: _theme.spacing.sm
    },
    meaningLabel: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginBottom: 4
    },
    meaning: {
      fontSize: _theme.fontSize.lg,
      fontWeight: '700',
      color: _theme.colors.text
    },
    exampleBox: {
      marginTop: _theme.spacing.md,
      padding: _theme.spacing.md,
      backgroundColor: _theme.colors.background,
      borderRadius: _theme.radius.md
    },
    example: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.text,
      fontStyle: 'italic'
    },
    exampleZh: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: 4
    },
    divider: {
      height: 1,
      backgroundColor: _theme.colors.border,
      marginVertical: _theme.spacing.md
    },
    notFound: {
      textAlign: 'center',
      marginTop: _theme.spacing.xl,
      color: _theme.colors.textMuted
    }
  });
