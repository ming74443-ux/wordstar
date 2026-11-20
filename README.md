# WordStar 单词星（重建版）

Expo / React Native 项目。原 `D:\deepseek\wordstar` 源码目录在 2026-11-20 16:42 被安装程序覆盖删除，本目录是从编译产物恢复出来的可编译版本。

## 代码来源

| 来源 | 内容 |
| --- | --- |
| Metro 编译缓存（`%TEMP%\metro-cache`，1032 个 `.mp`） | 30 个业务模块的转译后 JS + 词库 `src/data/words.json`（13171 词） |
| 已安装 APK（`WordStar-base.apk`） | 包名、版本、ABI、依赖清单核对 |

恢复方式：按依赖图还原目录结构，把 Metro 模块包装 `__d(...)` 剥掉、`_dependencyMap[n]` 换成实际 `require("...")`，得到标准 CommonJS 模块。**逻辑与原文一致，但原始 TSX 源码、注释、类型标注无法还原。**

## 目录

```
index.js                       入口（registerRootComponent）
App.js                         根组件
src/
  navigation/index.js          路由（native-stack + bottom-tabs）
  screens/                     11 个页面
    HomeScreen / BooksScreen / FlashcardScreen / QuizScreen
    WordDetailScreen / WrongWordsScreen / StatsScreen
    ProfileScreen / SettingsScreen / ParentScreen / LoginScreen
  components/                  ui.js / WordCard.js / Stats.js
  store/useAppStore.js         zustand 全局状态
  services/                    learning / spacedRepetition / tts / sync / notifications
  hooks/useStudyList.js
  db/                          database.js（expo-sqlite）/ words.js
  storage/storage.js           AsyncStorage 封装
  data/words.json              词库
  theme.js  constants.js
```

## 运行

```bash
npm install
npx expo start
```

## 打 Android 包

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

签名信息在 `android/gradle.properties`（`WORDSTAR_*`），keystore 为 `android/app/wordstar-release.keystore`（alias `wordstar`，口令 `wordstar2026`）。

## 打 iOS 包

本机是 Windows，无法编译 iOS。走 GitHub Actions：

1. 推到 GitHub 私有仓库
2. Actions 里手动触发 `Build unsigned iOS IPA`
3. 下载 artifact `WordStar-unsigned-ipa`
4. Windows 上用 Sideloadly + 免费 Apple ID 自签装机（7 天有效期，最多 3 个 App）

## 已知差异

- 无 App 图标 / 启动图资源（原图随源码丢失，现用 Expo 默认）
- 代码是 JS 而非 TSX
- 依赖版本按 Expo SDK 58 重新对齐，可能与原始 `package.json` 有小版本差异
