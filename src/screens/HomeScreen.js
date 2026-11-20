/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return HomeScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _hooksUseStudyList = require("../hooks/useStudyList");
  var _servicesSpacedRepetition = require("../services/spacedRepetition");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 首页：今日计划 + 学习入口

  function calcStreak(logDates) {
    var streak = 0;
    var d = (0, _constants.today)();
    if (!logDates.has(d)) d = (0, _constants.addDays)(d, -1); // 今天还没学，则从昨天算
    while (logDates.has(d)) {
      streak += 1;
      d = (0, _constants.addDays)(d, -1);
    }
    return streak;
  }
  function HomeScreen({
    navigation
  }) {
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var logs = (0, _storeUseAppStore.useAppStore)(s => s.logs);
    var settings = (0, _storeUseAppStore.useAppStore)(s => s.settings);
    var currentBook = (0, _storeUseAppStore.useAppStore)(s => s.currentBook);
    var currentGrade = (0, _storeUseAppStore.useAppStore)(s => s.currentGrade);
    var profile = (0, _storeUseAppStore.useAppStore)(_storeUseAppStore.useActiveProfile);
    var {
      newWords,
      reviewWords
    } = (0, _hooksUseStudyList.useStudyList)('new');
    var logDates = (0, _react.useMemo)(() => new Set(logs.map(l => l.date)), [logs]);
    var streak = calcStreak(logDates);
    var todayLog = logs.find(l => l.date === (0, _constants.today)());
    var mastered = (0, _servicesSpacedRepetition.masteryRate)(progress);
    var learnedCount = Object.keys(progress).length;
    var book = _constants.BOOKS.find(b => b.id === currentBook);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.header,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.hello,
              children: ["Hi, ", profile?.name ?? '同学', " \uD83D\uDC4B"]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.subtitle,
              children: [_constants.GRADE_LABELS[currentGrade - 1], " \xB7 ", book?.name]
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.streakBox,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
              style: styles.streakNum,
              children: ["\uD83D\uDD25 ", streak]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.streakLabel,
              children: "\u8FDE\u7EED\u6253\u5361"
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: styles.planCard,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u4ECA\u65E5\u5B66\u4E60\u8BA1\u5212"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.goalRow,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.goalCol,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.goalLabel,
                children: "\uD83C\uDD95 \u65B0\u8BCD"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.ProgressBar, {
                value: todayLog?.newCount ?? 0,
                max: settings.dailyNewTarget,
                color: _theme.colors.primary
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.goalCount,
                children: [todayLog?.newCount ?? 0, " / ", settings.dailyNewTarget]
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.goalCol,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.goalLabel,
                children: "\uD83D\uDD01 \u590D\u4E60"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.ProgressBar, {
                value: todayLog?.reviewCount ?? 0,
                max: settings.dailyReviewTarget,
                color: _theme.colors.secondary
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.goalCount,
                children: [todayLog?.reviewCount ?? 0, " / ", settings.dailyReviewTarget]
              })]
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.planButtons,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: `📇 卡片学习 (${newWords.length})`,
              onPress: () => navigation.navigate('Flashcard', {
                mode: 'new'
              }),
              style: styles.planBtn
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
              title: `✏️ 测验闯关 (${newWords.length})`,
              variant: "success",
              onPress: () => navigation.navigate('Quiz', {
                mode: 'new'
              }),
              style: styles.planBtn
            })]
          }), reviewWords.length > 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: `🔁 复习已学单词 (${reviewWords.length})`,
            variant: "outline",
            onPress: () => navigation.navigate('Quiz', {
              mode: 'review'
            }),
            style: {
              marginTop: _theme.spacing.sm
            }
          }) : null]
        }), reviewWords.length > 0 && settings.remindEnabled ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.remind,
          onPress: () => navigation.navigate('Quiz', {
            mode: 'review'
          }),
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.remindText,
            children: ["\u23F0 \u4F60\u6709 ", reviewWords.length, " \u4E2A\u5355\u8BCD\u5230\u671F\u590D\u4E60\uFF0C\u70B9\u51FB\u5F00\u59CB"]
          })
        }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u6211\u7684\u5B66\u4E60",
            right: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.more,
              onPress: () => navigation.navigate('Stats'),
              children: "\u67E5\u770B\u7EDF\u8BA1 \u203A"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Row, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u5DF2\u5B66\u5355\u8BCD",
              value: learnedCount,
              color: _theme.colors.primary
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u638C\u63E1\u7387",
              value: `${mastered}%`,
              color: _theme.colors.success
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
              label: "\u4ECA\u65E5\u6B63\u786E",
              value: todayLog?.correct ?? 0,
              color: _theme.colors.info
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: _theme.spacing.md
    },
    hello: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800',
      color: _theme.colors.text
    },
    subtitle: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: 2
    },
    streakBox: {
      alignItems: 'center',
      backgroundColor: '#FFF4E5',
      paddingVertical: _theme.spacing.sm,
      paddingHorizontal: _theme.spacing.md,
      borderRadius: _theme.radius.lg
    },
    streakNum: {
      fontSize: _theme.fontSize.md,
      fontWeight: '800',
      color: '#C2410C'
    },
    streakLabel: {
      fontSize: _theme.fontSize.xs,
      color: '#C2410C'
    },
    planCard: {
      marginBottom: _theme.spacing.md
    },
    goalRow: {
      flexDirection: 'row',
      gap: _theme.spacing.md,
      marginBottom: _theme.spacing.md
    },
    goalCol: {
      flex: 1
    },
    goalLabel: {
      fontSize: _theme.fontSize.sm,
      fontWeight: '700',
      color: _theme.colors.text,
      marginBottom: _theme.spacing.xs
    },
    goalCount: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: 4,
      textAlign: 'right'
    },
    planButtons: {
      flexDirection: 'row',
      gap: _theme.spacing.sm
    },
    planBtn: {
      flex: 1
    },
    remind: {
      backgroundColor: '#FEF3C7',
      borderRadius: _theme.radius.md,
      padding: _theme.spacing.md,
      marginBottom: _theme.spacing.md
    },
    remindText: {
      color: '#92400E',
      fontWeight: '600'
    },
    more: {
      color: _theme.colors.primary,
      fontSize: _theme.fontSize.sm,
      fontWeight: '600'
    }
  });
