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
  exports.isCloudEnabled = isCloudEnabled;
  exports.cloudSignUp = cloudSignUp;
  exports.cloudSignIn = cloudSignIn;
  exports.cloudSignOut = cloudSignOut;
  exports.cloudUserId = cloudUserId;
  exports.cloudPush = cloudPush;
  exports.cloudPull = cloudPull;
  var _reactNativeAsyncStorageAsyncStorage = require("@react-native-async-storage/async-storage");
  var AsyncStorage = _interopDefault(_reactNativeAsyncStorageAsyncStorage);
  var _supabaseSupabaseJs = require("@supabase/supabase-js");
  // 云同步服务（可选、可插拔）
  // 未配置 Supabase 环境变量时，App 完全以离线模式运行，本模块所有函数自动降级。

  var SUPABASE_URL = undefined;
  var SUPABASE_ANON_KEY = undefined;
  var client = null;
  function getClient() {
    return null;
    if (!client) {
      client = (0, _supabaseSupabaseJs.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: AsyncStorage.default,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false
        }
      });
    }
    return client;
  }

  /** 是否已启用云同步 */
  function isCloudEnabled() {
    return Boolean(SUPABASE_URL);
  }

  /** 邮箱密码注册 */
  async function cloudSignUp(email, password) {
    var c = getClient();
    if (!c) return {
      error: '未配置云服务，请使用离线模式'
    };
    var {
      error
    } = await c.auth.signUp({
      email,
      password
    });
    return error ? {
      error: error.message
    } : {};
  }

  /** 邮箱密码登录 */
  async function cloudSignIn(email, password) {
    var c = getClient();
    if (!c) return {
      error: '未配置云服务，请使用离线模式'
    };
    var {
      error
    } = await c.auth.signInWithPassword({
      email,
      password
    });
    return error ? {
      error: error.message
    } : {};
  }

  /** 退出登录 */
  async function cloudSignOut() {
    var c = getClient();
    if (!c) return;
    await c.auth.signOut();
  }

  /** 当前登录用户 id（未登录返回 null） */
  async function cloudUserId() {
    var c = getClient();
    if (!c) return null;
    var {
      data
    } = await c.auth.getSession();
    return data.session?.user?.id ?? null;
  }

  /** 上传用户数据（单行 JSON 快照，last-write-wins） */
  async function cloudPush(userId, payload) {
    var c = getClient();
    if (!c) return {
      error: '未配置云服务'
    };
    var {
      error
    } = await c.from('user_data').upsert({
      user_id: userId,
      payload,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });
    return error ? {
      error: error.message
    } : {};
  }

  /** 拉取用户数据 */
  async function cloudPull(userId) {
    var c = getClient();
    if (!c) return {
      error: '未配置云服务'
    };
    var {
      data,
      error
    } = await c.from('user_data').select('payload, updated_at').eq('user_id', userId).maybeSingle();
    if (error) return {
      error: error.message
    };
    return {
      data: data?.payload ?? null
    };
  }
