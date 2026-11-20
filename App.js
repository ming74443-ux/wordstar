/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return App;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _expoStatusBar = require("expo-status-bar");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _srcNavigation = require("./src/navigation");
  var AppNavigator = _interopDefault(_srcNavigation);
  var _srcStoreUseAppStore = require("./src/store/useAppStore");
  var _srcServicesNotifications = require("./src/services/notifications");
  var _srcTheme = require("./src/theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // App 入口

  function App() {
    var hydrated = (0, _srcStoreUseAppStore.useAppStore)(s => s.hydrated);
    var hydrate = (0, _srcStoreUseAppStore.useAppStore)(s => s.hydrate);
    (0, _react.useEffect)(() => {
      hydrate().catch(() => _srcStoreUseAppStore.useAppStore.setState({
        hydrated: true
      }));
    }, [hydrate]);
    (0, _react.useEffect)(() => {
      if (hydrated) {
        var s = _srcStoreUseAppStore.useAppStore.getState().settings;
        (0, _srcServicesNotifications.applyReminder)(s.remindEnabled, {
          hour: s.reminderHour,
          minute: s.reminderMinute,
          title: s.reminderTitle,
          body: s.reminderBody,
          sound: s.reminderSound,
          customSound: s.reminderCustomSound
        });
      }
    }, [hydrated]);
    if (!hydrated) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.splash,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.logo,
          children: "\u2B50"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.name,
          children: "\u5355\u8BCD\u661F WordStar"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.tagline,
          children: "1-9 \u5E74\u7EA7\u82F1\u8BED\u5355\u8BCD \xB7 \u8BFB\u5199\u8BB0"
        })]
      });
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSafeAreaContext.SafeAreaProvider, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoStatusBar.StatusBar, {
        style: "auto"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AppNavigator.default, {})]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    splash: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: _srcTheme.colors.background
    },
    logo: {
      fontSize: 64
    },
    name: {
      fontSize: 26,
      fontWeight: '800',
      color: _srcTheme.colors.primary,
      marginTop: 12
    },
    tagline: {
      fontSize: 14,
      color: _srcTheme.colors.textMuted,
      marginTop: 6
    }
  });
