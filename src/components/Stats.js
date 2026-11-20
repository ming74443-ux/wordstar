/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.Heatmap = Heatmap;
  exports.WeeklyBars = WeeklyBars;
  require("react");
  var _reactNative = require("react-native");
  var _theme = require("../theme");
  var _constants = require("../constants");
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 学习统计图表：热力图 + 近 7 天柱状图

  /** 最近 n 天学习热力图 */
  function Heatmap({
    logs,
    days = 70,
    cols = 10
  }) {
    var map = new Map();
    for (var l of logs) map.set(l.date, l.newCount + l.reviewCount);
    var cells = [];
    for (var i = days - 1; i >= 0; i--) {
      var d = (0, _constants.addDays)((0, _constants.today)(), -i);
      cells.push({
        date: d,
        count: map.get(d) ?? 0
      });
    }
    var colorFor = c => {
      if (c === 0) return _theme.colors.border;
      if (c <= 5) return _theme.colors.primary + '55';
      if (c <= 15) return _theme.colors.primary + '99';
      return _theme.colors.primary;
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
      style: styles.heatWrap,
      children: cells.map(c => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
        style: [styles.cell, {
          backgroundColor: colorFor(c.count)
        }]
      }, c.date))
    });
  }

  /** 近 7 天学习柱状图 */
  function WeeklyBars({
    logs
  }) {
    var map = new Map();
    for (var l of logs) map.set(l.date, l);
    var daysArr = [];
    var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    for (var i = 6; i >= 0; i--) {
      var d = (0, _constants.addDays)((0, _constants.today)(), -i);
      var _l = map.get(d);
      var wd = new Date(d + 'T00:00:00').getDay();
      daysArr.push({
        label: weekdays[wd],
        newCount: _l?.newCount ?? 0,
        reviewCount: _l?.reviewCount ?? 0
      });
    }
    var max = Math.max(1, ...daysArr.map(d => d.newCount + d.reviewCount));
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
      style: styles.barsWrap,
      children: [daysArr.map((d, i) => {
        var total = d.newCount + d.reviewCount;
        var h = Math.max(4, Math.round(total / max * 90));
        return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
          style: styles.barCol,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.barVal,
            children: total > 0 ? total : ''
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
            style: styles.barStack,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
              style: {
                height: Math.round(d.reviewCount / max * 90),
                backgroundColor: _theme.colors.secondary + 'AA',
                width: 14,
                borderRadius: 3
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
              style: {
                height: Math.round(d.newCount / max * 90),
                backgroundColor: _theme.colors.primary,
                width: 14,
                borderRadius: 3,
                marginTop: 2
              }
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
            style: styles.barLabel,
            children: d.label
          })]
        }, i);
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNative.View, {
        style: styles.legendRow,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
          style: [styles.dot, {
            backgroundColor: _theme.colors.primary
          }]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.legendText,
          children: "\u65B0\u5B66"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.View, {
          style: [styles.dot, {
            backgroundColor: _theme.colors.secondary + 'AA',
            marginLeft: _theme.spacing.md
          }]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: styles.legendText,
          children: "\u590D\u4E60"
        })]
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    heatWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 3
    },
    cell: {
      width: 14,
      height: 14,
      borderRadius: 3
    },
    barsWrap: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingTop: _theme.spacing.sm
    },
    barCol: {
      alignItems: 'center',
      flex: 1
    },
    barStack: {
      flexDirection: 'column-reverse',
      height: 92,
      justifyContent: 'flex-end'
    },
    barVal: {
      fontSize: 10,
      color: _theme.colors.textMuted,
      marginBottom: 2
    },
    barLabel: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginTop: 4
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: _theme.spacing.sm
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 3
    },
    legendText: {
      fontSize: _theme.fontSize.xs,
      color: _theme.colors.textMuted,
      marginLeft: 4
    }
  });
