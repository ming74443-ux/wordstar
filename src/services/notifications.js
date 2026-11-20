/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      if (k === 'default') return;
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  exports.ensurePermissions = ensurePermissions;
  exports.scheduleDailyReminder = scheduleDailyReminder;
  exports.cancelReminder = cancelReminder;
  exports.applyReminder = applyReminder;
  require("react-native");
  var _expoNotifications = require("expo-notifications");
  var Notifications = _interopNamespace(_expoNotifications);
  // 本地定时复习提醒（expo-notifications）

  var CHANNEL_ID = 'review-reminder';

  // 前台也展示通知
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  });

  /** 请求通知权限，返回是否已授权 */
  async function ensurePermissions() {
    try {
      var current = await Notifications.getPermissionsAsync();
      if (current.granted) return true;
      var req = await Notifications.requestPermissionsAsync();
      return req.granted;
    } catch {
      return false;
    }
  }

  /** Android 需要先建通知渠道 */
  async function ensureChannel() {
    {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: '复习提醒',
        importance: Notifications.AndroidImportance.HIGH
      });
    }
  }
  /** 设置每日定时提醒（覆盖旧的） */
  async function scheduleDailyReminder(opts) {
    try {
      await ensureChannel();
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: opts.title || '该复习单词啦',
          body: opts.body || '今天还有单词要复习，快来打卡吧！',
          // sound: true=默认提示音；'reminder.wav'=自定义铃声（需打包后生效，Expo Go 中回落为默认）
          sound: opts.sound ? opts.customSound ? 'reminder.wav' : true : false
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: opts.hour,
          minute: opts.minute,
          channelId: CHANNEL_ID
        }
      });
    } catch {
      // 通知失败不阻塞 App
    }
  }

  /** 取消提醒 */
  async function cancelReminder() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch {
      // 忽略
    }
  }

  /** 根据设置应用提醒：开启则按时间调度，关闭则取消 */
  async function applyReminder(enabled, opts) {
    if (!enabled) {
      await cancelReminder();
      return;
    }
    var granted = await ensurePermissions();
    if (granted) {
      await scheduleDailyReminder(opts);
    }
  }
