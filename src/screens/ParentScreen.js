/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return ParentScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _servicesSpacedRepetition = require("../services/spacedRepetition");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 家长模式：PIN 门禁 + 孩子学习概览 + 每日目标设置

  function ParentScreen({
    navigation
  }) {
    var settings = (0, _storeUseAppStore.useAppStore)(s => s.settings);
    var updateSettings = (0, _storeUseAppStore.useAppStore)(s => s.updateSettings);
    var profiles = (0, _storeUseAppStore.useAppStore)(s => s.profiles);
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var logs = (0, _storeUseAppStore.useAppStore)(s => s.logs);
    var updateProfile = (0, _storeUseAppStore.useAppStore)(s => s.updateProfile);
    var addProfile = (0, _storeUseAppStore.useAppStore)(s => s.addProfile);
    var [unlocked, setUnlocked] = (0, _react.useState)(false);
    var [pin, setPin] = (0, _react.useState)('');
    var [pinConfirm, setPinConfirm] = (0, _react.useState)('');
    var [settingPin, setSettingPin] = (0, _react.useState)(false);
    var children = (0, _react.useMemo)(() => profiles.filter(p => p.role === 'child'), [profiles]);
    var startPinSetup = () => {
      setPin('');
      setPinConfirm('');
      setSettingPin(true);
    };
    var confirmPinSetup = () => {
      if (pin.length !== 4) {
        _reactNative.Alert.alert('提示', '请设置 4 位数字密码');
        return;
      }
      if (pin !== pinConfirm) {
        _reactNative.Alert.alert('提示', '两次输入不一致，请重试');
        return;
      }
      updateSettings({
        parentPinHash: (0, _storeUseAppStore.hashPin)(pin)
      });
      setSettingPin(false);
      setUnlocked(true);
    };
    var tryUnlock = () => {
      if ((0, _storeUseAppStore.hashPin)(pin) === settings.parentPinHash) {
        setUnlocked(true);
        setPin('');
      } else {
        _reactNative.Alert.alert('密码错误', '请重试');
      }
    };
    var adjustTarget = (childId, key, delta) => {
      var child = children.find(c => c.id === childId);
      if (!child) return;
      var next = Math.max(1, Math.min(100, child[key] + delta));
      updateProfile(childId, {
        [key]: next
      });
    };

    // 门禁界面
    if (!unlocked) {
      var needsSetup = !settings.parentPinHash;
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top', 'bottom'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.gate,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.gateEmoji,
            children: "\uD83D\uDD10"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.gateTitle,
            children: needsSetup ? '设置家长密码' : '家长模式'
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.gateSub,
            children: needsSetup ? '首次使用家长模式，请设置 4 位数字密码' : settingPin ? '确认新密码' : '请输入 4 位家长密码'
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
            style: styles.pinInput,
            keyboardType: "number-pad",
            maxLength: 4,
            secureTextEntry: true,
            value: needsSetup || settingPin ? pin : pin,
            onChangeText: needsSetup || settingPin ? setPin : setPin,
            placeholder: "\u2022\u2022\u2022\u2022",
            textAlign: "center"
          }), settingPin ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
            style: styles.pinInput,
            keyboardType: "number-pad",
            maxLength: 4,
            secureTextEntry: true,
            value: pinConfirm,
            onChangeText: setPinConfirm,
            placeholder: "\u518D\u6B21\u8F93\u5165",
            textAlign: "center"
          }) : null, needsSetup || settingPin ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u786E\u8BA4\u8BBE\u7F6E",
            onPress: confirmPinSetup,
            style: {
              width: '80%'
            }
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u89E3\u9501",
            onPress: tryUnlock,
            style: {
              width: '80%'
            }
          }), !needsSetup && !settingPin ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: startPinSetup,
            style: {
              marginTop: _theme.spacing.md
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.link,
              children: "\u5FD8\u8BB0\u5BC6\u7801\uFF1F\u91CD\u65B0\u8BBE\u7F6E"
            })
          }) : null]
        })
      });
    }

    // 家长仪表盘
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.headerRow,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.title,
            children: "\u5BB6\u957F\u4E2D\u5FC3"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: () => navigation.goBack(),
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.close,
              children: "\u5173\u95ED"
            })
          })]
        }), children.length === 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u8FD8\u6CA1\u6709\u5B69\u5B50\u6863\u6848"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "+ \u6DFB\u52A0\u5B69\u5B50\u6863\u6848",
            onPress: () => {
              addProfile({
                role: 'child',
                name: '小朋友',
                grade: 3
              });
            }
          })]
        }) : children.map(child => {
          var rate = (0, _servicesSpacedRepetition.masteryRate)(progress);
          var todayLog = logs.find(l => l.date === (0, _constants.today)());
          var learned = Object.keys(progress).length;
          return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
            style: {
              marginBottom: _theme.spacing.md
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.childHeader,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.childAvatar,
                children: child.avatar
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                style: {
                  flex: 1
                },
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.childName,
                  children: child.name
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.childSub,
                  children: _constants.GRADE_LABELS[child.grade - 1] ?? child.grade + '年级'
                })]
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Row, {
              style: {
                marginTop: _theme.spacing.md
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
                label: "\u5DF2\u5B66\u5355\u8BCD",
                value: learned,
                color: _theme.colors.primary
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
                label: "\u638C\u63E1\u7387",
                value: `${rate}%`,
                color: _theme.colors.success
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.StatItem, {
                label: "\u4ECA\u65E5\u7B54\u9898",
                value: (todayLog?.correct ?? 0) + (todayLog?.wrong ?? 0),
                color: _theme.colors.info
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.targetRow,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                style: styles.targetItem,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.targetLabel,
                  children: "\u6BCF\u65E5\u65B0\u8BCD"
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.stepper,
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: styles.stepBtn,
                    onPress: () => adjustTarget(child.id, 'dailyNewTarget', -1),
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.stepTxt,
                      children: "\u2212"
                    })
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.stepVal,
                    children: child.dailyNewTarget
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: styles.stepBtn,
                    onPress: () => adjustTarget(child.id, 'dailyNewTarget', 1),
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.stepTxt,
                      children: "\uFF0B"
                    })
                  })]
                })]
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                style: styles.targetItem,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.targetLabel,
                  children: "\u6BCF\u65E5\u590D\u4E60"
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.stepper,
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: styles.stepBtn,
                    onPress: () => adjustTarget(child.id, 'dailyReviewTarget', -1),
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.stepTxt,
                      children: "\u2212"
                    })
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.stepVal,
                    children: child.dailyReviewTarget
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                    style: styles.stepBtn,
                    onPress: () => adjustTarget(child.id, 'dailyReviewTarget', 1),
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.stepTxt,
                      children: "\uFF0B"
                    })
                  })]
                })]
              })]
            })]
          }, child.id);
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
          title: "+ \u6DFB\u52A0\u5B69\u5B50\u6863\u6848",
          variant: "outline",
          onPress: () => addProfile({
            role: 'child',
            name: '小朋友',
            grade: 3
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
      padding: _theme.spacing.md,
      paddingBottom: _theme.spacing.xl
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: _theme.spacing.md
    },
    title: {
      fontSize: _theme.fontSize.xxl,
      fontWeight: '800',
      color: _theme.colors.text
    },
    close: {
      fontSize: _theme.fontSize.md,
      color: _theme.colors.primary,
      fontWeight: '700'
    },
    gate: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: _theme.spacing.lg
    },
    gateEmoji: {
      fontSize: 56
    },
    gateTitle: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800',
      color: _theme.colors.text,
      marginTop: _theme.spacing.md
    },
    gateSub: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.xs,
      marginBottom: _theme.spacing.lg
    },
    pinInput: {
      width: '60%',
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.md,
      padding: _theme.spacing.md,
      fontSize: _theme.fontSize.xxl,
      letterSpacing: 12,
      marginBottom: _theme.spacing.md,
      textAlign: 'center'
    },
    link: {
      color: _theme.colors.primary,
      fontSize: _theme.fontSize.sm
    },
    childHeader: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    childAvatar: {
      fontSize: 34,
      marginRight: _theme.spacing.md
    },
    childName: {
      fontSize: _theme.fontSize.lg,
      fontWeight: '700',
      color: _theme.colors.text
    },
    childSub: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: 2
    },
    targetRow: {
      flexDirection: 'row',
      gap: _theme.spacing.md,
      marginTop: _theme.spacing.md
    },
    targetItem: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: _theme.colors.background,
      borderRadius: _theme.radius.md,
      padding: _theme.spacing.sm
    },
    targetLabel: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginBottom: 4
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
      fontWeight: '800',
      color: _theme.colors.text,
      marginHorizontal: _theme.spacing.md,
      minWidth: 24,
      textAlign: 'center'
    }
  });
