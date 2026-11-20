/* Recovered from Metro build cache. Original source lost; this is transpiled CommonJS. */
"use strict";

  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  var _expo = require("expo");
  var _App = require("./App");
  var App = _interopDefault(_App);
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  (0, _expo.registerRootComponent)(App.default);
