/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return BooksScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _componentsUi = require("../components/ui");
  var _componentsWordCard = require("../components/WordCard");
  var _theme = require("../theme");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 词书：教材/年级选择 + 按单元分组浏览与学习

  function BooksScreen({
    navigation
  }) {
    var scopeWords = (0, _storeUseAppStore.useAppStore)(s => s.scopeWords);
    var scopeLoading = (0, _storeUseAppStore.useAppStore)(s => s.scopeLoading);
    var bookCounts = (0, _storeUseAppStore.useAppStore)(s => s.bookCounts);
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var currentBook = (0, _storeUseAppStore.useAppStore)(s => s.currentBook);
    var currentGrade = (0, _storeUseAppStore.useAppStore)(s => s.currentGrade);
    var setBook = (0, _storeUseAppStore.useAppStore)(s => s.setBook);
    var setGrade = (0, _storeUseAppStore.useAppStore)(s => s.setGrade);
    var [expandedUnit, setExpandedUnit] = (0, _react.useState)(null);
    var book = _constants.BOOKS.find(b => b.id === currentBook) ?? _constants.BOOKS[0];

    // 按单元分组，保持词库生成顺序（上→下、单元号升序）
    var units = (0, _react.useMemo)(() => {
      var map = new Map();
      var order = [];
      for (var w of scopeWords) {
        var key = w.unit ?? '未分组';
        if (!map.has(key)) {
          map.set(key, []);
          order.push(key);
        }
        map.get(key).push(w);
      }
      return order.map(unit => ({
        unit,
        words: map.get(unit)
      }));
    }, [scopeWords]);
    var learnedInScope = scopeWords.filter(w => progress[w.id]).length;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        style: {
          flex: 1
        },
        contentContainerStyle: styles.container,
        keyboardShouldPersistTaps: "handled",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: "\u8BCD\u4E66"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.ScrollView, {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          contentContainerStyle: styles.bookRow,
          children: _constants.BOOKS.map(b => {
            var active = b.id === currentBook;
            var cnt = bookCounts[b.id] ?? 0;
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              onPress: () => {
                setBook(b.id);
                setExpandedUnit(null);
              },
              style: [styles.bookCard, active && {
                borderColor: b.color,
                backgroundColor: b.color + '12'
              }],
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
                style: [styles.bookDot, {
                  backgroundColor: b.color
                }]
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.bookName, active && {
                  color: b.color
                }],
                children: b.shortName
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.bookCount,
                children: [cnt, " \u8BCD"]
              })]
            }, b.id);
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.bookDesc,
          children: book.description
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
          style: styles.gradeWrap,
          children: book.grades.map(g => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Pill, {
            label: _constants.GRADE_LABELS[g - 1],
            active: g === currentGrade,
            color: book.color,
            onPress: () => {
              setGrade(g);
              setExpandedUnit(null);
            }
          }, g))
        }), scopeLoading ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.loading,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.ActivityIndicator, {
            size: "large",
            color: _theme.colors.primary
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.loadingText,
            children: "\u52A0\u8F7D\u4E2D\u2026"
          })]
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.metaRow,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.metaText,
              children: ["\u5171 ", scopeWords.length, " \u8BCD \xB7 \u5DF2\u5B66 ", learnedInScope, " \u8BCD \xB7 ", units.length, " \u4E2A\u5355\u5143"]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
              style: {
                marginTop: _theme.spacing.xs
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.ProgressBar, {
                value: learnedInScope,
                max: scopeWords.length,
                color: book.color,
                height: 6
              })
            })]
          }), units.length === 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.EmptyState, {
            icon: "\uD83D\uDCED",
            title: "\u8FD9\u4E2A\u5E74\u7EA7\u8FD8\u6CA1\u6709\u8BCD",
            subtitle: "\u53EF\u4EE5\u5207\u6362\u5E74\u7EA7\uFF0C\u6216\u901A\u8FC7\u300C\u5BFC\u5165\u8BCD\u4E66\u300D\u6DFB\u52A0\u5185\u5BB9"
          }) : units.map(({
            unit,
            words: unitWords
          }) => {
            var learned = unitWords.filter(w => progress[w.id]).length;
            var mastered = unitWords.filter(w => progress[w.id]?.status === 'mastered').length;
            var expanded = expandedUnit === unit;
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.unitCard,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                style: styles.unitHeader,
                onPress: () => setExpandedUnit(expanded ? null : unit),
                activeOpacity: 0.7,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                  style: {
                    flex: 1
                  },
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    },
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.unitTitle,
                      children: unit
                    }), mastered === unitWords.length && unitWords.length > 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.masteredBadge,
                      children: "\u2713 \u5168\u90E8\u638C\u63E1"
                    }) : null]
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
                    style: styles.unitMeta,
                    children: [unitWords.length, " \u8BCD \xB7 \u5DF2\u5B66 ", learned, " \xB7 \u5DF2\u638C\u63E1 ", mastered]
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
                    style: {
                      marginTop: _theme.spacing.xs
                    },
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.ProgressBar, {
                      value: learned,
                      max: unitWords.length,
                      color: book.color,
                      height: 6
                    })
                  })]
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.chevron,
                  children: expanded ? '▾' : '›'
                })]
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                style: styles.unitActions,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
                  title: `📇 学习 (${unitWords.length})`,
                  small: true,
                  onPress: () => navigation.navigate('Flashcard', {
                    mode: 'new',
                    unit
                  }),
                  style: styles.unitBtn
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
                  title: "\u270F\uFE0F \u6D4B\u9A8C",
                  small: true,
                  variant: "success",
                  onPress: () => navigation.navigate('Quiz', {
                    mode: 'new',
                    unit
                  }),
                  style: [styles.unitBtn, {
                    marginLeft: _theme.spacing.xs
                  }]
                })]
              }), expanded ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
                style: styles.wordList,
                children: unitWords.map(w => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.wordRow,
                  onPress: () => navigation.navigate('WordDetail', {
                    wordId: w.id
                  }),
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                    style: {
                      flex: 1
                    },
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                      style: {
                        flexDirection: 'row',
                        alignItems: 'center'
                      },
                      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.word,
                        children: w.word
                      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsWordCard.SpeakButton, {
                        text: w.word,
                        size: 14
                      }), progress[w.id] ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.learnedTag,
                        children: "\u5DF2\u5B66"
                      }) : null]
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.meaning,
                      numberOfLines: 1,
                      children: w.meaning
                    })]
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.chevron,
                    children: "\u203A"
                  })]
                }, w.id))
              }) : null]
            }, unit);
          })]
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
      padding: _theme.spacing.md,
      paddingBottom: _theme.spacing.xl
    },
    title: {
      fontSize: _theme.fontSize.xxl,
      fontWeight: '800',
      color: _theme.colors.text,
      marginBottom: _theme.spacing.md
    },
    bookRow: {
      paddingBottom: _theme.spacing.sm
    },
    bookCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: _theme.spacing.sm,
      paddingHorizontal: _theme.spacing.md,
      borderRadius: _theme.radius.lg,
      borderWidth: 1.5,
      borderColor: _theme.colors.border,
      backgroundColor: _theme.colors.card,
      marginRight: _theme.spacing.sm
    },
    bookDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: _theme.spacing.sm
    },
    bookName: {
      fontSize: _theme.fontSize.md,
      fontWeight: '700',
      color: _theme.colors.text
    },
    bookCount: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginLeft: _theme.spacing.sm
    },
    bookDesc: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.xs,
      marginBottom: _theme.spacing.md
    },
    gradeWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: _theme.spacing.sm
    },
    metaRow: {
      marginBottom: _theme.spacing.sm
    },
    metaText: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted
    },
    loading: {
      alignItems: 'center',
      paddingVertical: _theme.spacing.xl
    },
    loadingText: {
      fontSize: _theme.fontSize.md,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.sm
    },
    unitCard: {
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.lg,
      padding: _theme.spacing.md,
      marginBottom: _theme.spacing.sm
    },
    unitHeader: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    unitTitle: {
      fontSize: _theme.fontSize.md,
      fontWeight: '800',
      color: _theme.colors.text,
      flex: 1
    },
    unitMeta: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: 2
    },
    unitActions: {
      flexDirection: 'row',
      marginTop: _theme.spacing.sm
    },
    unitBtn: {
      flex: 1
    },
    wordList: {
      marginTop: _theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: _theme.colors.border,
      paddingTop: _theme.spacing.sm
    },
    wordRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: _theme.spacing.sm,
      borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
      borderBottomColor: _theme.colors.border
    },
    word: {
      fontSize: _theme.fontSize.md,
      fontWeight: '700',
      color: _theme.colors.text,
      marginRight: _theme.spacing.xs
    },
    meaning: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: 2
    },
    learnedTag: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.success,
      marginLeft: _theme.spacing.xs,
      fontWeight: '600'
    },
    masteredBadge: {
      fontSize: _theme.fontSize.xs,
      fontWeight: '800',
      color: '#15803D',
      backgroundColor: '#DCFCE7',
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: _theme.radius.full,
      marginLeft: _theme.spacing.sm,
      overflow: 'hidden'
    },
    chevron: {
      fontSize: _theme.fontSize.lg,
      color: _theme.colors.textLight
    }
  });
