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
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return AppNavigator;
    }
  });
  require("react");
  var _reactNative = require("react-native");
  var _reactNavigationNative = require("@react-navigation/native");
  var _reactNavigationNativeStack = require("@react-navigation/native-stack");
  var _reactNavigationBottomTabs = require("@react-navigation/bottom-tabs");
  var _theme = require("../theme");
  var _screensHomeScreen = require("../screens/HomeScreen");
  var HomeScreen = _interopDefault(_screensHomeScreen);
  var _screensBooksScreen = require("../screens/BooksScreen");
  var BooksScreen = _interopDefault(_screensBooksScreen);
  var _screensStatsScreen = require("../screens/StatsScreen");
  var StatsScreen = _interopDefault(_screensStatsScreen);
  var _screensProfileScreen = require("../screens/ProfileScreen");
  var ProfileScreen = _interopDefault(_screensProfileScreen);
  var _screensFlashcardScreen = require("../screens/FlashcardScreen");
  var FlashcardScreen = _interopDefault(_screensFlashcardScreen);
  var _screensQuizScreen = require("../screens/QuizScreen");
  var QuizScreen = _interopDefault(_screensQuizScreen);
  var _screensWordDetailScreen = require("../screens/WordDetailScreen");
  var WordDetailScreen = _interopDefault(_screensWordDetailScreen);
  var _screensWrongWordsScreen = require("../screens/WrongWordsScreen");
  var WrongWordsScreen = _interopDefault(_screensWrongWordsScreen);
  var _screensParentScreen = require("../screens/ParentScreen");
  var ParentScreen = _interopDefault(_screensParentScreen);
  var _screensSettingsScreen = require("../screens/SettingsScreen");
  var SettingsScreen = _interopDefault(_screensSettingsScreen);
  var _screensLoginScreen = require("../screens/LoginScreen");
  var LoginScreen = _interopDefault(_screensLoginScreen);
  var _reactJsxRuntime = require("react/jsx-runtime");
  // 导航：底部 Tab + 原生栈

  var Tab = (0, _reactNavigationBottomTabs.createBottomTabNavigator)();
  var Stack = (0, _reactNavigationNativeStack.createNativeStackNavigator)();
  var TAB_ICONS = {
    Home: '🏠',
    Books: '📚',
    Stats: '📊',
    Profile: '😊'
  };
  function MainTabs() {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Tab.Navigator, {
      screenOptions: ({
        route
      }) => ({
        headerShown: false,
        tabBarActiveTintColor: _theme.colors.primary,
        tabBarInactiveTintColor: _theme.colors.textLight,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        },
        tabBarIcon: ({
          focused
        }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNative.Text, {
          style: {
            fontSize: focused ? 22 : 20,
            opacity: focused ? 1 : 0.55
          },
          children: TAB_ICONS[route.name]
        })
      }),
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Tab.Screen, {
        name: "Home",
        component: HomeScreen.default,
        options: {
          title: '首页'
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Tab.Screen, {
        name: "Books",
        component: BooksScreen.default,
        options: {
          title: '词书'
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Tab.Screen, {
        name: "Stats",
        component: StatsScreen.default,
        options: {
          title: '统计'
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Tab.Screen, {
        name: "Profile",
        component: ProfileScreen.default,
        options: {
          title: '我的'
        }
      })]
    });
  }
  function AppNavigator() {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNavigationNative.NavigationContainer, {
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.Navigator, {
        screenOptions: {
          headerShown: false,
          contentStyle: {
            backgroundColor: _theme.colors.background
          }
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "Main",
          component: MainTabs
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "Flashcard",
          component: FlashcardScreen.default
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "Quiz",
          component: QuizScreen.default
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "WordDetail",
          component: WordDetailScreen.default,
          options: {
            headerShown: true,
            title: '单词详情',
            headerTitleStyle: {
              fontSize: _theme.fontSize.md,
              fontWeight: '700'
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "WrongWords",
          component: WrongWordsScreen.default,
          options: {
            headerShown: true,
            title: '错词本',
            headerTitleStyle: {
              fontSize: _theme.fontSize.md,
              fontWeight: '700'
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "Parent",
          component: ParentScreen.default
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "Settings",
          component: SettingsScreen.default,
          options: {
            headerShown: true,
            title: '设置',
            headerTitleStyle: {
              fontSize: _theme.fontSize.md,
              fontWeight: '700'
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.Screen, {
          name: "Login",
          component: LoginScreen.default,
          options: {
            headerShown: true,
            title: '云账号',
            headerTitleStyle: {
              fontSize: _theme.fontSize.md,
              fontWeight: '700'
            }
          }
        })]
      })
    });
  }
