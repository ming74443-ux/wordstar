/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return LoginScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 云账号登录 / 注册

  function LoginScreen({
    navigation
  }) {
    var cloudEnabled = (0, _storeUseAppStore.useAppStore)(s => s.cloudEnabled);
    var cloudEmail = (0, _storeUseAppStore.useAppStore)(s => s.cloudEmail);
    var signIn = (0, _storeUseAppStore.useAppStore)(s => s.signIn);
    var signUp = (0, _storeUseAppStore.useAppStore)(s => s.signUp);
    var signOut = (0, _storeUseAppStore.useAppStore)(s => s.signOut);
    var [email, setEmail] = (0, _react.useState)('');
    var [password, setPassword] = (0, _react.useState)('');
    var [loading, setLoading] = (0, _react.useState)(false);
    var handle = async kind => {
      if (!email.trim() || !password) {
        _reactNative.Alert.alert('提示', '请输入邮箱和密码（密码至少 6 位）');
        return;
      }
      setLoading(true);
      var err = kind === 'in' ? await signIn(email.trim(), password) : await signUp(email.trim(), password);
      setLoading(false);
      if (err) {
        _reactNative.Alert.alert('失败', err);
      } else {
        _reactNative.Alert.alert('成功', kind === 'in' ? '已登录' : '注册成功（如开启邮箱验证，请先到邮箱确认）');
        navigation.goBack();
      }
    };
    if (!cloudEnabled) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: styles.safe,
        edges: ['top', 'bottom'],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.center,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.emoji,
            children: "\u2601\uFE0F"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.title,
            children: "\u672A\u542F\u7528\u4E91\u540C\u6B65"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.hint,
            children: "\u8BF7\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA .env \u6587\u4EF6\uFF0C\u914D\u7F6E EXPO_PUBLIC_SUPABASE_URL \u4E0E EXPO_PUBLIC_SUPABASE_ANON_KEY \u540E\u91CD\u542F\uFF0C\u5373\u53EF\u542F\u7528\u8D26\u53F7\u4E91\u540C\u6B65\u3002"
          })]
        })
      });
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: "\u4E91\u8D26\u53F7"
        }), cloudEmail ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.loggedIn,
            children: ["\u5DF2\u767B\u5F55\uFF1A", cloudEmail]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u9000\u51FA\u767B\u5F55",
            variant: "danger",
            onPress: async () => {
              await signOut();
              navigation.goBack();
            },
            style: {
              marginTop: _theme.spacing.md
            }
          })]
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_componentsUi.Card, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
            style: styles.input,
            placeholder: "\u90AE\u7BB1",
            value: email,
            onChangeText: setEmail,
            autoCapitalize: "none",
            keyboardType: "email-address"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TextInput, {
            style: styles.input,
            placeholder: "\u5BC6\u7801\uFF08\u81F3\u5C11 6 \u4F4D\uFF09",
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: loading ? '请稍候…' : '登录',
            onPress: () => handle('in'),
            disabled: loading
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u6CE8\u518C\u65B0\u8D26\u53F7",
            variant: "outline",
            onPress: () => handle('up'),
            disabled: loading,
            style: {
              marginTop: _theme.spacing.sm
            }
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
      padding: _theme.spacing.md
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: _theme.spacing.lg
    },
    emoji: {
      fontSize: 56
    },
    title: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800',
      color: _theme.colors.text,
      marginBottom: _theme.spacing.md,
      marginTop: _theme.spacing.md
    },
    hint: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      textAlign: 'center',
      lineHeight: 20
    },
    input: {
      backgroundColor: _theme.colors.background,
      borderRadius: _theme.radius.md,
      padding: _theme.spacing.md,
      fontSize: _theme.fontSize.md,
      marginBottom: _theme.spacing.md
    },
    loggedIn: {
      fontSize: _theme.fontSize.md,
      color: _theme.colors.text,
      textAlign: 'center'
    }
  });
