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
  exports.hashPin = hashPin;
  Object.defineProperty(exports, "useAppStore", {
    enumerable: true,
    get: function () {
      return useAppStore;
    }
  });
  exports.useActiveProfile = useActiveProfile;
  exports.useTodayStat = useTodayStat;
  var _zustand = require("zustand");
  var _storageStorage = require("../storage/storage");
  var _servicesSpacedRepetition = require("../services/spacedRepetition");
  var _constants = require("../constants");
  var _servicesSync = require("../services/sync");
  var _dataWordsJson = require("../data/words.json");
  var bundled = _interopDefault(_dataWordsJson);
  var _dbWords = require("../db/words");
  // 全局状态（Zustand）

  /** 简单哈希（用于家长 PIN，非密码学安全，仅本地门禁） */
  function hashPin(pin) {
    var h = 5381;
    for (var i = 0; i < pin.length; i++) {
      h = (h << 5) + h + pin.charCodeAt(i) | 0;
    }
    return 'p' + (h >>> 0).toString(36);
  }
  function newId(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }
  function defaultChildProfile() {
    return {
      id: newId('child'),
      name: '小朋友',
      avatar: '🐣',
      role: 'child',
      grade: 3,
      linkedChildIds: [],
      dailyNewTarget: _storageStorage.DEFAULT_SETTINGS.dailyNewTarget,
      dailyReviewTarget: _storageStorage.DEFAULT_SETTINGS.dailyReviewTarget,
      createdAt: Date.now()
    };
  }
  function upsertTodayLog(logs, isNew, correct) {
    var d = (0, _constants.today)();
    var copy = [...logs];
    var idx = copy.findIndex(l => l.date === d);
    var entry = idx >= 0 ? {
      ...copy[idx]
    } : {
      date: d,
      newCount: 0,
      reviewCount: 0,
      correct: 0,
      wrong: 0,
      durationSec: 0
    };
    if (isNew) entry.newCount += 1;else entry.reviewCount += 1;
    if (correct) entry.correct += 1;else entry.wrong += 1;
    if (idx >= 0) copy[idx] = entry;else copy.push(entry);
    return copy;
  }
  var scopeRequestId = 0; // 竞态守卫：只应用最新一次 scope 请求

  var useAppStore = (0, _zustand.create)((set, get) => ({
    hydrated: false,
    scopeWords: [],
    scopeLoading: false,
    bookCounts: {},
    progress: {},
    logs: [],
    profiles: [],
    activeProfileId: null,
    isParentMode: false,
    settings: _storageStorage.DEFAULT_SETTINGS,
    currentBook: 'general',
    currentGrade: 3,
    cloudEnabled: false,
    cloudEmail: null,
    hydrate: async () => {
      var [progress, logs, profiles, session, settings] = await Promise.all([_storageStorage.storage.getProgress(), _storageStorage.storage.getLogs(), _storageStorage.storage.getProfiles(), _storageStorage.storage.getSession(), _storageStorage.storage.getSettings().then(s => ({
        ..._storageStorage.DEFAULT_SETTINGS,
        ...s
      }))]);

      // 首次启动：把内置词库种子写入 SQLite
      if ((await (0, _dbWords.countWords)()) === 0) {
        await (0, _dbWords.seedWords)(bundled.default.words);
      }
      var bookCounts = await (0, _dbWords.getBookCounts)();
      var scopeWords = await (0, _dbWords.getWordsByScope)(get().currentBook, get().currentGrade);
      var finalProfiles = profiles;
      if (finalProfiles.length === 0) {
        var child = defaultChildProfile();
        finalProfiles = [child];
        await _storageStorage.storage.setProfiles(finalProfiles);
        session.activeProfileId = child.id;
        await _storageStorage.storage.setSession(session);
      }
      if (session.activeProfileId && !finalProfiles.some(p => p.id === session.activeProfileId)) {
        session.activeProfileId = finalProfiles[0]?.id ?? null;
        await _storageStorage.storage.setSession(session);
      }

      // 若已登录云账号，恢复登录态
      var cloudEmail = null;
      if ((0, _servicesSync.isCloudEnabled)()) {
        var cid = await (0, _servicesSync.cloudUserId)();
        cloudEmail = cid ? '已登录云账号' : null;
      }
      set({
        hydrated: true,
        scopeWords,
        bookCounts,
        progress,
        logs,
        profiles: finalProfiles,
        activeProfileId: session.activeProfileId,
        isParentMode: session.isParentMode,
        settings,
        cloudEnabled: (0, _servicesSync.isCloudEnabled)(),
        cloudEmail
      });
    },
    loadScope: async (book, grade) => {
      var reqId = ++scopeRequestId;
      set({
        scopeLoading: true
      });
      try {
        var ws = await (0, _dbWords.getWordsByScope)(book, grade);
        if (reqId === scopeRequestId) set({
          scopeWords: ws,
          scopeLoading: false
        });
      } catch {
        if (reqId === scopeRequestId) set({
          scopeLoading: false
        });
      }
    },
    setBook: b => {
      set({
        currentBook: b
      });
      void get().loadScope(b, get().currentGrade);
    },
    setGrade: g => {
      set({
        currentGrade: g
      });
      void get().loadScope(get().currentBook, g);
    },
    recordAnswer: (wordId, quality) => {
      var {
        progress,
        logs
      } = get();
      var prev = progress[wordId] ?? (0, _servicesSpacedRepetition.initialProgress)(wordId);
      var isNew = !progress[wordId];
      var next = (0, _servicesSpacedRepetition.applySM2)(prev, quality);
      var correct = quality >= 3;
      var newProgress = {
        ...progress,
        [wordId]: next
      };
      var newLogs = upsertTodayLog(logs, isNew, correct);
      set({
        progress: newProgress,
        logs: newLogs
      });
      void _storageStorage.storage.setProgress(newProgress);
      void _storageStorage.storage.setLogs(newLogs);
    },
    toggleWrongBook: wordId => {
      var {
        progress
      } = get();
      var p = progress[wordId] ?? (0, _servicesSpacedRepetition.initialProgress)(wordId);
      var next = {
        ...p,
        inWrongBook: !p.inWrongBook
      };
      var newProgress = {
        ...progress,
        [wordId]: next
      };
      set({
        progress: newProgress
      });
      void _storageStorage.storage.setProgress(newProgress);
    },
    addProfile: patch => {
      var p = {
        id: newId(patch.role === 'parent' ? 'parent' : 'child'),
        name: patch.name ?? '新用户',
        avatar: patch.avatar ?? (patch.role === 'parent' ? '👨‍👩‍👧' : '🐣'),
        role: patch.role ?? 'child',
        grade: patch.grade ?? 3,
        linkedChildIds: patch.linkedChildIds ?? [],
        dailyNewTarget: patch.dailyNewTarget ?? _storageStorage.DEFAULT_SETTINGS.dailyNewTarget,
        dailyReviewTarget: patch.dailyReviewTarget ?? _storageStorage.DEFAULT_SETTINGS.dailyReviewTarget,
        createdAt: Date.now()
      };
      var profiles = [...get().profiles, p];
      set({
        profiles
      });
      void _storageStorage.storage.setProfiles(profiles);
      return p;
    },
    updateProfile: (id, patch) => {
      var profiles = get().profiles.map(p => p.id === id ? {
        ...p,
        ...patch
      } : p);
      set({
        profiles
      });
      void _storageStorage.storage.setProfiles(profiles);
    },
    deleteProfile: id => {
      var profiles = get().profiles.filter(p => p.id !== id);
      var activeProfileId = get().activeProfileId;
      if (activeProfileId === id) activeProfileId = profiles[0]?.id ?? null;
      set({
        profiles,
        activeProfileId
      });
      void _storageStorage.storage.setProfiles(profiles);
      void _storageStorage.storage.setSession({
        activeProfileId,
        isParentMode: get().isParentMode
      });
    },
    setActiveProfile: id => {
      set({
        activeProfileId: id
      });
      void _storageStorage.storage.setSession({
        activeProfileId: id,
        isParentMode: get().isParentMode
      });
    },
    updateSettings: patch => {
      var settings = {
        ...get().settings,
        ...patch
      };
      set({
        settings
      });
      void _storageStorage.storage.setSettings(settings);
    },
    setParentMode: v => {
      set({
        isParentMode: v
      });
      void _storageStorage.storage.setSession({
        activeProfileId: get().activeProfileId,
        isParentMode: v
      });
    },
    importWords: async ws => {
      var existing = new Set(get().scopeWords.map(w => w.id));
      var fresh = ws.filter(w => !existing.has(w.id));
      if (fresh.length === 0) return;
      await (0, _dbWords.insertWords)(fresh);
      await get().loadScope(get().currentBook, get().currentGrade);
      set({
        bookCounts: await (0, _dbWords.getBookCounts)()
      });
    },
    resetProgress: () => {
      set({
        progress: {},
        logs: []
      });
      void _storageStorage.storage.setProgress({});
      void _storageStorage.storage.setLogs([]);
    },
    signIn: async (email, password) => {
      var res = await (0, _servicesSync.cloudSignIn)(email, password);
      if (res.error) return res.error;
      set({
        cloudEmail: email
      });
      return null;
    },
    signUp: async (email, password) => {
      var res = await (0, _servicesSync.cloudSignUp)(email, password);
      if (res.error) return res.error;
      set({
        cloudEmail: email
      });
      return null;
    },
    signOut: async () => {
      await (0, _servicesSync.cloudSignOut)();
      set({
        cloudEmail: null
      });
    },
    syncNow: async () => {
      if (!(0, _servicesSync.isCloudEnabled)()) return '未配置云服务，请先在 .env 中配置 Supabase';
      var uid = await (0, _servicesSync.cloudUserId)();
      if (!uid) return '请先登录云账号';
      var {
        progress,
        logs,
        profiles
      } = get();
      var payload = {
        progress,
        logs,
        profiles,
        syncedAt: Date.now()
      };
      var pushRes = await (0, _servicesSync.cloudPush)(uid, payload);
      if (pushRes.error) return pushRes.error;
      var pullRes = await (0, _servicesSync.cloudPull)(uid);
      if (pullRes.error) return pullRes.error;
      // 简单合并：远端为准（last-write-wins 已在云端完成，此处用远端覆盖本地）
      var remote = pullRes.data;
      if (remote) {
        var next = {};
        if (remote.progress) {
          set({
            progress: remote.progress
          });
          void _storageStorage.storage.setProgress(remote.progress);
        }
        if (remote.logs) {
          set({
            logs: remote.logs
          });
          void _storageStorage.storage.setLogs(remote.logs);
        }
        if (remote.profiles) {
          set({
            profiles: remote.profiles
          });
          void _storageStorage.storage.setProfiles(remote.profiles);
        }
        void next;
      }
      return null;
    }
  }));

  /** 当前激活的档案 */
  function useActiveProfile(state) {
    return state.profiles.find(p => p.id === state.activeProfileId) ?? null;
  }

  /** 今日学习统计 */
  function useTodayStat(state) {
    return state.logs.find(l => l.date === (0, _constants.today)()) ?? {
      date: (0, _constants.today)(),
      newCount: 0,
      reviewCount: 0,
      correct: 0,
      wrong: 0,
      durationSec: 0
    };
  }
