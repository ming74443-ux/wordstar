/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.WordCard = WordCard;
  exports.SpeakButton = SpeakButton;
  exports.WordTag = WordTag;
  var _react = require("react");
  var _reactNative = require("react-native");
  var _theme = require("../theme");
  var _servicesTts = require("../services/tts");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 单词卡片（可翻转 + 发音）

  function WordCard({
    word,
    flipped,
    onFlip,
    showTag
  }) {
    var anim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    (0, _react.useEffect)(() => {
      _reactNative.Animated.timing(anim, {
        toValue: flipped ? 1 : 0,
        duration: 220,
        useNativeDriver: true
      }).start();
    }, [flipped]);
    var frontRotate = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    var backRotate = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg']
    });
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Pressable, {
      onPress: onFlip,
      style: styles.wrap,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Animated.View, {
        style: [styles.face, {
          transform: [{
            rotateY: frontRotate
          }]
        }],
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.word,
          children: word.word
        }), word.phonetic ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.phonetic,
          children: word.phonetic
        }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.hint,
          children: "\u70B9\u51FB\u5361\u7247\u770B\u610F\u601D"
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.Animated.View, {
        style: [styles.face, styles.back, {
          transform: [{
            rotateY: backRotate
          }]
        }],
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.wordSmall,
          children: word.word
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
      })]
    });
  }
  function SpeakButton({
    text,
    size = 22
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: () => (0, _servicesTts.speak)(text),
      style: styles.speak,
      hitSlop: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: {
          fontSize: size
        },
        children: "\uD83D\uDD0A"
      })
    });
  }
  function WordTag({
    word
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.tagRow,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.tag, {
          backgroundColor: _theme.colors.primary + '18',
          color: _theme.colors.primary
        }],
        children: _constants.GRADE_LABELS[word.grade - 1] ?? `${word.grade}年级`
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.tag, {
          backgroundColor: _theme.colors.secondary + '18',
          color: _theme.colors.secondary
        }],
        children: (0, _constants.bookName)(word.textbook)
      }), word.unit ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.tag, {
          backgroundColor: _theme.colors.warning + '18',
          color: '#B45309'
        }],
        children: word.unit
      }) : null]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    wrap: {
      width: '100%',
      height: 320,
      borderRadius: _theme.radius.xl
    },
    face: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: _theme.radius.xl,
      backgroundColor: _theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      padding: _theme.spacing.lg,
      backfaceVisibility: 'hidden',
      ..._theme.shadow.card
    },
    back: {
      backgroundColor: '#EEF0FF'
    },
    word: {
      fontSize: 44,
      fontWeight: '800',
      color: _theme.colors.text
    },
    wordSmall: {
      fontSize: _theme.fontSize.lg,
      fontWeight: '700',
      color: _theme.colors.textMuted,
      marginBottom: _theme.spacing.sm
    },
    phonetic: {
      fontSize: _theme.fontSize.md,
      color: _theme.colors.textMuted,
      marginTop: _theme.spacing.sm
    },
    hint: {
      position: 'absolute',
      bottom: 18,
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textLight
    },
    meaning: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800',
      color: _theme.colors.primaryDark,
      textAlign: 'center'
    },
    exampleBox: {
      marginTop: _theme.spacing.md,
      padding: _theme.spacing.md,
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.md,
      width: '100%'
    },
    example: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.text,
      textAlign: 'center',
      fontStyle: 'italic'
    },
    exampleZh: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      textAlign: 'center',
      marginTop: 4
    },
    speak: {
      marginTop: _theme.spacing.sm
    },
    tagRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: _theme.spacing.xs
    },
    tag: {
      fontSize: _theme.fontSize.xs,
      fontWeight: '600',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: _theme.radius.full,
      marginRight: _theme.spacing.xs,
      marginBottom: _theme.spacing.xs,
      overflow: 'hidden'
    }
  });
