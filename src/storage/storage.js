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
  Object.defineProperty(exports, "storage", {
    enumerable: true,
    get: function () {
      return storage;
    }
  });
  Object.defineProperty(exports, "DEFAULT_SETTINGS", {
    enumerable: true,
    get: function () {
      return DEFAULT_SETTINGS;
    }
  });
  var _reactNativeAsyncStorageAsyncStorage = require("@react-native-async-storage/async-storage");
  var AsyncStorage = _interopDefault(_reactNativeAsyncStorageAsyncStorage);
  // 本地持久化（小数据用 AsyncStorage；词库大数据见 src/db/words.ts 的 SQLite）

  var KEYS = {
    progress: '@wordstar/progress',
    logs: '@wordstar/logs',
    profiles: '@wordstar/profiles',
    session: '@wordstar/session',
    settings: '@wordstar/settings'
  };
  var storage = {
    async getJSON(key, fallback) {
      try {
        var raw = await AsyncStorage.default.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    async setJSON(key, value) {
      await AsyncStorage.default.setItem(key, JSON.stringify(value));
    },
    async remove(key) {
      await AsyncStorage.default.removeItem(key);
    },
    getProgress: () => storage.getJSON(KEYS.progress, {}),
    setProgress: v => storage.setJSON(KEYS.progress, v),
    getLogs: () => storage.getJSON(KEYS.logs, []),
    setLogs: v => storage.setJSON(KEYS.logs, v),
    getProfiles: () => storage.getJSON(KEYS.profiles, []),
    setProfiles: v => storage.setJSON(KEYS.profiles, v),
    getSession: () => storage.getJSON(KEYS.session, {
      activeProfileId: null,
      isParentMode: false
    }),
    setSession: v => storage.setJSON(KEYS.session, v),
    getSettings: () => storage.getJSON(KEYS.settings, DEFAULT_SETTINGS),
    setSettings: v => storage.setJSON(KEYS.settings, v)
  };
  var DEFAULT_SETTINGS = {
    parentPinHash: '',
    autoSpeak: true,
    speechRate: 0.9,
    dailyNewTarget: 10,
    dailyReviewTarget: 20,
    remindEnabled: true,
    reminderHour: 20,
    reminderMinute: 0,
    reminderTitle: '📚 该复习单词啦',
    reminderBody: '今天还有单词要复习，快来打卡吧！',
    reminderSound: true,
    reminderCustomSound: true
  };
