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
  exports.setSpeechRate = setSpeechRate;
  exports.speak = speak;
  exports.stopSpeak = stopSpeak;
  var _expoSpeech = require("expo-speech");
  var Speech = _interopNamespace(_expoSpeech);
  // 文本转语音（TTS）封装

  var cachedRate;

  /** 设置全局语速（0.5 - 2.0），供 speak 使用 */
  function setSpeechRate(rate) {
    cachedRate = Math.min(2, Math.max(0.5, rate));
  }

  /** 朗读英文单词/句子 */
  function speak(text, opts) {
    if (!text) return;
    Speech.stop();
    Speech.speak(text, {
      language: 'en-US',
      rate: opts?.rate ?? cachedRate ?? 0.9,
      pitch: 1.0,
      onDone: opts?.onDone,
      onError: () => undefined
    });
  }

  /** 停止朗读 */
  function stopSpeak() {
    Speech.stop();
  }
