/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return WrongWordsScreen;
    }
  });
  var _react = require("react");
  var _reactNative = require("react-native");
  var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
  var _storeUseAppStore = require("../store/useAppStore");
  var _servicesLearning = require("../services/learning");
  var _componentsWordCard = require("../components/WordCard");
  var _componentsUi = require("../components/ui");
  var _theme = require("../theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 错词本

  function WrongWordsScreen({
    navigation
  }) {
    var progress = (0, _storeUseAppStore.useAppStore)(s => s.progress);
    var toggleWrongBook = (0, _storeUseAppStore.useAppStore)(s => s.toggleWrongBook);
    var [wrongWords, setWrongWords] = (0, _react.useState)([]);
    (0, _react.useEffect)(() => {
      var alive = true;
      (0, _servicesLearning.fetchWrongWords)(progress).then(ws => {
        if (alive) setWrongWords(ws);
      });
      return () => {
        alive = false;
      };
    }, [progress]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.safe,
      edges: ['top', 'bottom'],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: "\u9519\u8BCD\u672C"
        }), wrongWords.length === 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.EmptyState, {
          icon: "\uD83C\uDFAF",
          title: "\u6CA1\u6709\u9519\u8BCD",
          subtitle: "\u7B54\u9519\u7684\u5355\u8BCD\u4F1A\u81EA\u52A8\u52A0\u5165\u9519\u8BCD\u672C\uFF0C\u65B9\u4FBF\u96C6\u4E2D\u590D\u4E60"
        }) : wrongWords.map(w => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.row,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            style: {
              flex: 1
            },
            onPress: () => navigation.navigate('WordDetail', {
              wordId: w.id
            }),
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
                size: 16
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
              style: styles.meaning,
              numberOfLines: 1,
              children: w.meaning
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsUi.Button, {
            title: "\u5DF2\u638C\u63E1",
            variant: "success",
            small: true,
            onPress: () => toggleWrongBook(w.id)
          })]
        }, w.id))]
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
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.md,
      padding: _theme.spacing.md,
      marginBottom: _theme.spacing.sm
    },
    word: {
      fontSize: _theme.fontSize.lg,
      fontWeight: '700',
      color: _theme.colors.text,
      marginRight: _theme.spacing.sm
    },
    meaning: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: 2
    }
  });
