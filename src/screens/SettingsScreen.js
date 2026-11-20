/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return SettingsScreen;
    }
  });
  require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _componentsUi = require("../components/ui");
  var _servicesTts = require("../services/tts");
  var _servicesNotifications = require("../services/notifications");
  var _theme = require("../theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 设置

  function SettingsScreen() {
    var settings = (0, _storeUseAppStore.useAppStore)(s => s.settings);
    var updateSettings = (0, _storeUseAppStore.useAppStore)(s => s.updateSettings);
    var rateStep = 0.1;
    var adjustRate = d => {
      var r = Math.min(2, Math.max(0.5, Math.round((settings.speechRate + d) * 10) / 10));
      (0, _servicesTts.setSpeechRate)(r);
      updateSettings({
        speechRate: r
      });
      (0, _servicesTts.speak)('Hello', {
        rate: r
      });
    };
    var adjustTarget = (key, d) => {
      updateSettings({
        [key]: Math.max(1, Math.min(100, settings[key] + d))
      });
    };
    var applyNow = () => {
      var s = _storeUseAppStore.useAppStore.getState().settings;
      (0, _servicesNotifications.applyReminder)(s.remindEnabled, {
        hour: s.reminderHour,
        minute: s.reminderMinute,
        title: s.reminderTitle,
        body: s.reminderBody,
        sound: s.reminderSound,
        customSound: s.reminderCustomSound
      });
    };
    var toggleRemind = v => {
      updateSettings({
        remindEnabled: v
      });
      applyNow();
    };
    var adjustReminderHour = d => {
      var s = _storeUseAppStore.useAppStore.getState().settings;
      var h = (s.reminderHour + d + 24) % 24;
      updateSettings({
        reminderHour: h
      });
      applyNow();
    };
    var adjustReminderMinute = d => {
      var s = _storeUseAppStore.useAppStore.getState().settings;
      var m = (s.reminderMinute + d + 60) % 60;
      updateSettings({
        reminderMinute: m
      });
      applyNow();
    };
    var resetPin = () => {
      _reactNative.Alert.alert('重置家长密码', '将清空家长密码，下次进入家长模式时重新设置。确定吗？', [{
        text: '取消',
        style: 'cancel'
      }, {
        text: '重置',
        style: 'destructive',
        onPress: () => updateSettings({
          parentPinHash: ''
        })
      }]);
    };
    var ToggleRow = ({
      label,
      value,
      onToggle
    }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.row,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.rowLabel,
        children: label
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Switch, {
        value: value,
        onValueChange: onToggle,
        trackColor: {
          true: _theme.colors.primary
        }
      })]
    });
    var StepperRow = ({
      label,
      value,
      onMinus,
      onPlus
    }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.row,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.rowLabel,
        children: label
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.stepper,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.stepBtn,
          onPress: onMinus,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.stepTxt,
            children: "\u2212"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.stepVal,
          children: value
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: styles.stepBtn,
          onPress: onPlus,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.stepTxt,
            children: "\uFF0B"
          })
        })]
      })]
    });
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: "\u8BBE\u7F6E"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5B66\u4E60\u504F\u597D"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ToggleRow, {
            label: "\uD83D\uDD0A \u81EA\u52A8\u53D1\u97F3",
            value: settings.autoSpeak,
            onToggle: v => updateSettings({
              autoSpeak: v
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StepperRow, {
            label: "\u8BED\u901F",
            value: `${settings.speechRate.toFixed(1)}x`,
            onMinus: () => adjustRate(-0.1),
            onPlus: () => adjustRate(rateStep)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StepperRow, {
            label: "\u6BCF\u65E5\u65B0\u8BCD\u76EE\u6807",
            value: settings.dailyNewTarget,
            onMinus: () => adjustTarget('dailyNewTarget', -1),
            onPlus: () => adjustTarget('dailyNewTarget', 1)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StepperRow, {
            label: "\u6BCF\u65E5\u590D\u4E60\u76EE\u6807",
            value: settings.dailyReviewTarget,
            onMinus: () => adjustTarget('dailyReviewTarget', -1),
            onPlus: () => adjustTarget('dailyReviewTarget', 1)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ToggleRow, {
            label: "\u23F0 \u590D\u4E60\u63D0\u9192",
            value: settings.remindEnabled,
            onToggle: toggleRemind
          }), settings.remindEnabled ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(StepperRow, {
              label: "\u63D0\u9192\xB7\u65F6",
              value: String(settings.reminderHour).padStart(2, '0'),
              onMinus: () => adjustReminderHour(-1),
              onPlus: () => adjustReminderHour(1)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StepperRow, {
              label: "\u63D0\u9192\xB7\u5206",
              value: String(settings.reminderMinute).padStart(2, '0'),
              onMinus: () => adjustReminderMinute(-5),
              onPlus: () => adjustReminderMinute(5)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ToggleRow, {
              label: "\uD83D\uDD14 \u63D0\u793A\u97F3",
              value: settings.reminderSound,
              onToggle: v => {
                updateSettings({
                  reminderSound: v
                });
                applyNow();
              }
            }), settings.reminderSound ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ToggleRow, {
                label: "\uD83C\uDFB5 \u81EA\u5B9A\u4E49\u94C3\u58F0",
                value: settings.reminderCustomSound,
                onToggle: v => {
                  updateSettings({
                    reminderCustomSound: v
                  });
                  applyNow();
                }
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.hintText,
                children: "\u81EA\u5B9A\u4E49\u94C3\u58F0\u9700\u6253\u5305\u6210\u5B89\u88C5\u5305\u540E\u751F\u6548\uFF08Expo Go \u4E2D\u4F1A\u56DE\u843D\u4E3A\u7CFB\u7EDF\u9ED8\u8BA4\u97F3\uFF09"
              })]
            }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.fieldLabel,
              children: "\u63D0\u9192\u6587\u6848\uFF08\u81EA\u5B9A\u4E49\uFF09"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
              style: styles.input,
              value: settings.reminderTitle,
              onChangeText: t => updateSettings({
                reminderTitle: t
              }),
              onEndEditing: applyNow,
              placeholder: "\u63D0\u9192\u6807\u9898"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
              style: styles.input,
              value: settings.reminderBody,
              onChangeText: t => updateSettings({
                reminderBody: t
              }),
              onEndEditing: applyNow,
              placeholder: "\u63D0\u9192\u6B63\u6587"
            })]
          }) : null]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5B89\u5168"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u91CD\u7F6E\u5BB6\u957F\u5BC6\u7801",
            variant: "outline",
            onPress: resetPin
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5173\u4E8E"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.about,
            children: "\u5355\u8BCD\u661F WordStar v1.0.0"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.about,
            children: "\u9762\u5411 1-9 \u5E74\u7EA7\u7684\u82F1\u8BED\u5355\u8BCD\u8BFB\u5199\u8BB0 App"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.about,
            children: "\u91C7\u7528 SM-2 \u95F4\u9694\u91CD\u590D\u7B97\u6CD5\u79D1\u5B66\u8BB0\u5FC6"
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: _theme.spacing.md
    },
    rowLabel: {
      fontSize: _theme.fontSize.md,
      fontWeight: '600',
      color: _theme.colors.text
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    stepBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: _theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    stepTxt: {
      color: '#fff',
      fontSize: _theme.fontSize.lg,
      fontWeight: '800'
    },
    stepVal: {
      fontSize: _theme.fontSize.md,
      fontWeight: '700',
      color: _theme.colors.text,
      marginHorizontal: _theme.spacing.md,
      minWidth: 40,
      textAlign: 'center'
    },
    fieldLabel: {
      fontSize: _theme.fontSize.sm,
      fontWeight: '700',
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.sm,
      marginBottom: _theme.spacing.xs
    },
    hintText: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textLight,
      marginTop: _theme.spacing.xs,
      lineHeight: 16
    },
    input: {
      backgroundColor: _theme.colors.background,
      borderRadius: _theme.radius.md,
      borderWidth: 1,
      borderColor: _theme.colors.border,
      padding: _theme.spacing.md,
      fontSize: _theme.fontSize.md,
      marginBottom: _theme.spacing.sm
    },
    about: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginBottom: 4
    }
  });
