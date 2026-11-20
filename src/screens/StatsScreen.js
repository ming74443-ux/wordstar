/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return StatsScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _servicesSpacedRepetition = require("../services/spacedRepetition");
  var _componentsUi = require("../components/ui");
  var _componentsStats = require("../components/Stats");
  var _theme = require("../theme");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 学习统计

  function StatsScreen() {
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var logs = (0, _storeUseAppStore.useAppStore)(s => s.logs);
    var list = (0, _react.useMemo)(() => Object.values(progress), [progress]);
    var mastered = list.filter(p => p.status === 'mastered').length;
    var learning = list.filter(p => p.status === 'learning').length;
    var review = list.filter(p => p.status === 'review').length;
    var totalCorrect = list.reduce((a, p) => a + p.correctCount, 0);
    var totalWrong = list.reduce((a, p) => a + p.wrongCount, 0);
    var rate = (0, _servicesSpacedRepetition.masteryRate)(progress);
    var accuracy = totalCorrect + totalWrong > 0 ? Math.round(totalCorrect / (totalCorrect + totalWrong) * 100) : 0;
    var todayLog = logs.find(l => l.date === (0, _constants.today)());
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: "\u5B66\u4E60\u7EDF\u8BA1"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: {
              alignItems: 'center',
              paddingVertical: _theme.spacing.sm
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
              style: styles.ring,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.ringNum,
                children: [rate, "%"]
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.ringLabel,
              children: "\u603B\u638C\u63E1\u7387"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Row, {
            style: {
              marginTop: _theme.spacing.md
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u5DF2\u5B66\u5355\u8BCD",
              value: list.length,
              color: _theme.colors.primary
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u5DF2\u638C\u63E1",
              value: mastered,
              color: _theme.colors.success
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u6B63\u786E\u7387",
              value: `${accuracy}%`,
              color: _theme.colors.info
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u4ECA\u65E5"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Row, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u65B0\u5B66",
              value: todayLog?.newCount ?? 0,
              color: _theme.colors.primary
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u590D\u4E60",
              value: todayLog?.reviewCount ?? 0,
              color: _theme.colors.secondary
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u6B63\u786E",
              value: todayLog?.correct ?? 0,
              color: _theme.colors.success
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u9519\u8BEF",
              value: todayLog?.wrong ?? 0,
              color: _theme.colors.danger
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u8FD1 7 \u5929\u5B66\u4E60\u91CF"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsStats.WeeklyBars, {
            logs: logs
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5B66\u4E60\u70ED\u529B\u56FE\uFF08\u8FD1 10 \u5468\uFF09"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsStats.Heatmap, {
            logs: logs
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5355\u8BCD\u72B6\u6001\u5206\u5E03"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.distRow,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.distBar, {
                backgroundColor: _theme.colors.primary
              }],
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.distVal,
                children: learning
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.distLabel,
                children: "\u5B66\u4E60\u4E2D"
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.distBar, {
                backgroundColor: _theme.colors.secondary
              }],
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.distVal,
                children: review
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.distLabel,
                children: "\u590D\u4E60\u4E2D"
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.distBar, {
                backgroundColor: _theme.colors.success
              }],
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.distVal,
                children: mastered
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.distLabel,
                children: "\u5DF2\u638C\u63E1"
              })]
            })]
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
    ring: {
      width: 96,
      height: 96,
      borderRadius: 48,
      borderWidth: 8,
      borderColor: _theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: _theme.colors.primary + '10'
    },
    ringNum: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800',
      color: _theme.colors.primary
    },
    ringLabel: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.sm
    },
    distRow: {
      flexDirection: 'row',
      gap: _theme.spacing.sm
    },
    distBar: {
      flex: 1,
      borderRadius: _theme.radius.md,
      paddingVertical: _theme.spacing.md,
      alignItems: 'center'
    },
    distVal: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800',
      color: '#fff'
    },
    distLabel: {
      fontSize: _theme.fontSize.xs,
      color: '#fff',
      marginTop: 4
    }
  });
