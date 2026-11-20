/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return ProfileScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 我的：档案切换 + 功能入口

  function ProfileScreen({
    navigation
  }) {
    var profiles = (0, _storeUseAppStore.useAppStore)(s => s.profiles);
    var activeProfile = (0, _storeUseAppStore.useAppStore)(_storeUseAppStore.useActiveProfile);
    var setActiveProfile = (0, _storeUseAppStore.useAppStore)(s => s.setActiveProfile);
    var addProfile = (0, _storeUseAppStore.useAppStore)(s => s.addProfile);
    var deleteProfile = (0, _storeUseAppStore.useAppStore)(s => s.deleteProfile);
    var resetProgress = (0, _storeUseAppStore.useAppStore)(s => s.resetProgress);
    var cloudEnabled = (0, _storeUseAppStore.useAppStore)(s => s.cloudEnabled);
    var cloudEmail = (0, _storeUseAppStore.useAppStore)(s => s.cloudEmail);
    var syncNow = (0, _storeUseAppStore.useAppStore)(s => s.syncNow);
    var [showAdd, setShowAdd] = (0, _react.useState)(false);
    var [newName, setNewName] = (0, _react.useState)('');
    var [newRole, setNewRole] = (0, _react.useState)('child');
    var [newGrade, setNewGrade] = (0, _react.useState)(3);
    var handleAdd = () => {
      if (!newName.trim()) return;
      addProfile({
        name: newName.trim(),
        role: newRole,
        grade: newRole === 'child' ? newGrade : 0
      });
      setShowAdd(false);
      setNewName('');
      setNewRole('child');
      setNewGrade(3);
    };
    var handleDelete = id => {
      _reactNative.Alert.alert('删除档案', '确定删除该档案吗？', [{
        text: '取消',
        style: 'cancel'
      }, {
        text: '删除',
        style: 'destructive',
        onPress: () => deleteProfile(id)
      }]);
    };
    var handleReset = () => {
      _reactNative.Alert.alert('重置进度', '将清空所有学习进度与统计，词库不受影响。确定继续吗？', [{
        text: '取消',
        style: 'cancel'
      }, {
        text: '重置',
        style: 'destructive',
        onPress: () => resetProgress()
      }]);
    };
    var handleSync = async () => {
      var err = await syncNow();
      _reactNative.Alert.alert(err ? '同步失败' : '同步成功', err ?? '数据已与云端同步');
    };
    var MenuItem = ({
      icon,
      label,
      onPress,
      badge
    }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
      style: styles.menuItem,
      onPress: onPress,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.menuIcon,
        children: icon
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.menuLabel,
        children: label
      }), badge ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.menuBadge,
        children: badge
      }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.chevron,
        children: "\u203A"
      })]
    });
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top'],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: "\u6211\u7684"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5B66\u4E60\u6863\u6848"
          }), profiles.map(p => {
            var active = p.id === activeProfile?.id;
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: [styles.profileRow, active && styles.profileActive],
              onPress: () => setActiveProfile(p.id),
              onLongPress: () => handleDelete(p.id),
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.avatar,
                children: p.avatar
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
                style: {
                  flex: 1
                },
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.profileName,
                  children: p.name
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.profileSub,
                  children: p.role === 'child' ? `${_constants.GRADE_LABELS[p.grade - 1] ?? p.grade + '年级'}` : '家长'
                })]
              }), active ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
                style: styles.activeTag,
                children: "\u5F53\u524D"
              }) : null]
            }, p.id);
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "+ \u6DFB\u52A0\u6863\u6848",
            variant: "outline",
            onPress: () => setShowAdd(true),
            style: {
              marginTop: _theme.spacing.sm
            }
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u5B66\u4E60\u5DE5\u5177"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDCD5",
            label: "\u9519\u8BCD\u672C",
            onPress: () => navigation.navigate('WrongWords')
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDCCA",
            label: "\u5B66\u4E60\u7EDF\u8BA1",
            onPress: () => navigation.navigate('Stats')
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67",
            label: "\u5BB6\u957F\u6A21\u5F0F",
            onPress: () => navigation.navigate('Parent')
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\u2699\uFE0F",
            label: "\u8BBE\u7F6E",
            onPress: () => navigation.navigate('Settings')
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.SectionTitle, {
            title: "\u4E91\u540C\u6B65"
          }), cloudEnabled ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\u2601\uFE0F",
            label: cloudEmail ?? '登录云账号',
            onPress: () => navigation.navigate('Login'),
            badge: cloudEmail ? '已登录' : undefined
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.cloudHint,
            children: "\u672A\u914D\u7F6E\u4E91\u670D\u52A1\uFF0C\u5F53\u524D\u4E3A\u79BB\u7EBF\u6A21\u5F0F\u3002\u53EF\u5728 .env \u914D\u7F6E Supabase \u540E\u542F\u7528\u8D26\u53F7\u4E91\u540C\u6B65\u3002"
          }), cloudEnabled && cloudEmail ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u7ACB\u5373\u540C\u6B65",
            onPress: handleSync,
            style: {
              marginTop: _theme.spacing.sm
            }
          }) : null]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          style: {
            marginTop: _theme.spacing.md
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDDD1\uFE0F",
            label: "\u91CD\u7F6E\u5B66\u4E60\u8FDB\u5EA6",
            onPress: handleReset
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.cloudHint,
            children: "\u957F\u6309\u6863\u6848\u53EF\u5220\u9664"
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Modal, {
        visible: showAdd,
        transparent: true,
        animationType: "fade",
        onRequestClose: () => setShowAdd(false),
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
          style: styles.modalMask,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.modalCard,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.modalTitle,
              children: "\u6DFB\u52A0\u6863\u6848"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
              style: styles.input,
              placeholder: "\u540D\u5B57",
              value: newName,
              onChangeText: setNewName
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.roleRow,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Pill, {
                label: "\uD83D\uDC67 \u5B69\u5B50",
                active: newRole === 'child',
                onPress: () => setNewRole('child')
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Pill, {
                label: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 \u5BB6\u957F",
                active: newRole === 'parent',
                onPress: () => setNewRole('parent')
              })]
            }), newRole === 'child' ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
              style: styles.gradeRow,
              children: _constants.GRADE_LABELS.map((g, i) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Pill, {
                label: g,
                active: newGrade === i + 1,
                onPress: () => setNewGrade(i + 1)
              }, g))
            }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
              style: styles.modalActions,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
                title: "\u53D6\u6D88",
                variant: "ghost",
                onPress: () => setShowAdd(false),
                style: {
                  flex: 1
                }
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
                title: "\u4FDD\u5B58",
                onPress: handleAdd,
                disabled: !newName.trim(),
                style: {
                  flex: 1,
                  marginLeft: _theme.spacing.sm
                }
              })]
            })]
          })
        })
      })]
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
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: _theme.spacing.sm,
      borderRadius: _theme.radius.md,
      marginBottom: _theme.spacing.xs
    },
    profileActive: {
      backgroundColor: _theme.colors.primary + '12'
    },
    avatar: {
      fontSize: 30,
      marginRight: _theme.spacing.md
    },
    profileName: {
      fontSize: _theme.fontSize.md,
      fontWeight: '700',
      color: _theme.colors.text
    },
    profileSub: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: 2
    },
    activeTag: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.primary,
      fontWeight: '700'
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: _theme.spacing.md
    },
    menuIcon: {
      fontSize: 20,
      marginRight: _theme.spacing.md
    },
    menuLabel: {
      flex: 1,
      fontSize: _theme.fontSize.md,
      fontWeight: '600',
      color: _theme.colors.text
    },
    menuBadge: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.success,
      marginRight: _theme.spacing.sm
    },
    chevron: {
      fontSize: _theme.fontSize.lg,
      color: _theme.colors.textLight
    },
    cloudHint: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.sm,
      lineHeight: 18
    },
    modalMask: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: _theme.spacing.lg
    },
    modalCard: {
      width: '100%',
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.xl,
      padding: _theme.spacing.lg
    },
    modalTitle: {
      fontSize: _theme.fontSize.lg,
      fontWeight: '800',
      color: _theme.colors.text,
      marginBottom: _theme.spacing.md
    },
    input: {
      backgroundColor: _theme.colors.background,
      borderRadius: _theme.radius.md,
      padding: _theme.spacing.md,
      fontSize: _theme.fontSize.md,
      marginBottom: _theme.spacing.md
    },
    roleRow: {
      flexDirection: 'row',
      marginBottom: _theme.spacing.sm
    },
    gradeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: _theme.spacing.md
    },
    modalActions: {
      flexDirection: 'row',
      marginTop: _theme.spacing.sm
    }
  });
