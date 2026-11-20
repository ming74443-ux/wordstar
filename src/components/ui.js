/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.Card = Card;
  exports.Button = Button;
  exports.Pill = Pill;
  exports.ProgressBar = ProgressBar;
  exports.SectionTitle = SectionTitle;
  exports.EmptyState = EmptyState;
  exports.Row = Row;
  exports.StatItem = StatItem;
  require("react");
  var _reactNative = require("react-native");
  var _theme = require("../theme");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 通用 UI 组件

  function Card({
    children,
    style
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
      style: [styles.card, style],
      children: children
    });
  }
  function Button({
    title,
    onPress,
    variant = 'primary',
    disabled,
    style,
    small
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      activeOpacity: 0.7,
      disabled: disabled,
      onPress: onPress,
      style: [styles.btn, small && styles.btnSmall, variantStyles[variant], disabled && styles.btnDisabled, style],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.btnText, variant === 'outline' && {
          color: _theme.colors.primary
        }],
        children: title
      })
    });
  }
  var variantStyles = {
    primary: {
      backgroundColor: _theme.colors.primary
    },
    secondary: {
      backgroundColor: _theme.colors.secondary
    },
    success: {
      backgroundColor: _theme.colors.success
    },
    danger: {
      backgroundColor: _theme.colors.danger
    },
    ghost: {
      backgroundColor: _theme.colors.card,
      borderWidth: 1,
      borderColor: _theme.colors.border
    },
    outline: {
      backgroundColor: _theme.colors.card,
      borderWidth: 1.5,
      borderColor: _theme.colors.primary
    }
  };
  function Pill({
    label,
    color,
    active,
    onPress
  }) {
    var bg = active ? color ?? _theme.colors.primary : _theme.colors.card;
    var fg = active ? '#fff' : _theme.colors.text;
    var Wrapper = onPress ? _reactNative.TouchableOpacity : _reactNative.View;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Wrapper, {
      activeOpacity: 0.7,
      onPress: onPress,
      style: [styles.pill, {
        backgroundColor: bg,
        borderColor: active ? 'transparent' : _theme.colors.border
      }],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.pillText, {
          color: fg
        }],
        children: label
      })
    });
  }
  function ProgressBar({
    value,
    max,
    color,
    height = 10
  }) {
    var pct = max > 0 ? Math.min(1, value / max) : 0;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
      style: [styles.progressTrack, {
        height
      }],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
        style: [styles.progressFill, {
          width: `${Math.round(pct * 100)}%`,
          backgroundColor: color ?? _theme.colors.primary,
          height
        }]
      })
    });
  }
  function SectionTitle({
    title,
    right
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.sectionTitleRow,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.sectionTitle,
        children: title
      }), right]
    });
  }
  function EmptyState({
    icon,
    title,
    subtitle
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.empty,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.emptyIcon,
        children: icon
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.emptyTitle,
        children: title
      }), subtitle ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.emptySubtitle,
        children: subtitle
      }) : null]
    });
  }
  function Row({
    children,
    style
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
      style: [styles.row, style],
      children: children
    });
  }
  function StatItem({
    label,
    value,
    color
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.statItem,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.statValue, {
          color: color ?? _theme.colors.primary
        }],
        children: value
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
        style: styles.statLabel,
        children: label
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    card: {
      backgroundColor: _theme.colors.card,
      borderRadius: _theme.radius.lg,
      padding: _theme.spacing.md,
      ..._theme.shadow.card
    },
    btn: {
      borderRadius: _theme.radius.md,
      paddingVertical: 14,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnSmall: {
      paddingVertical: 8,
      paddingHorizontal: 14
    },
    btnDisabled: {
      opacity: 0.5
    },
    btnText: {
      color: '#fff',
      fontSize: _theme.fontSize.md,
      fontWeight: '700'
    },
    pill: {
      borderRadius: _theme.radius.full,
      paddingVertical: 7,
      paddingHorizontal: 14,
      borderWidth: 1,
      marginRight: _theme.spacing.sm,
      marginBottom: _theme.spacing.sm
    },
    pillText: {
      fontSize: _theme.fontSize.sm,
      fontWeight: '600'
    },
    progressTrack: {
      backgroundColor: _theme.colors.border,
      borderRadius: _theme.radius.full,
      overflow: 'hidden'
    },
    progressFill: {
      borderRadius: _theme.radius.full
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: _theme.spacing.sm
    },
    sectionTitle: {
      fontSize: _theme.fontSize.lg,
      fontWeight: '800',
      color: _theme.colors.text
    },
    empty: {
      alignItems: 'center',
      paddingVertical: _theme.spacing.xl
    },
    emptyIcon: {
      fontSize: 44,
      marginBottom: _theme.spacing.sm
    },
    emptyTitle: {
      fontSize: _theme.fontSize.md,
      fontWeight: '700',
      color: _theme.colors.text
    },
    emptySubtitle: {
      fontSize: _theme.fontSize.sm,
      color: _theme.colors.textMuted,
      marginTop: 4,
      textAlign: 'center'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    statItem: {
      alignItems: 'center',
      flex: 1
    },
    statValue: {
      fontSize: _theme.fontSize.xl,
      fontWeight: '800'
    },
    statLabel: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: 2
    }
  });
