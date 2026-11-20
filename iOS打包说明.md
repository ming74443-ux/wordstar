# iOS 打包说明（Windows 无 Mac 方案）

当前机器是 Windows，iOS 编译必须 macOS + Xcode。走 GitHub 的免费 macOS 机器出**未签名 IPA**，再用 Sideloadly 自签装机。

## 一、把项目推到 GitHub

1. 打开 https://github.com/new 新建仓库，名字随意（如 `wordstar`），**选 Private**，不要勾选任何初始化文件
2. 在 PowerShell 里运行：

```powershell
cd "D:\英语打包\wordstar-rebuild"
.\push-github.ps1
```

脚本会问你两样东西：

- 仓库地址：`https://github.com/你的用户名/wordstar.git`
- Token：去 https://github.com/settings/tokens 生成 Classic token，勾 `repo` 权限

## 二、让 GitHub 编译 IPA

1. 打开仓库的 **Actions** 标签页
2. 左边选 **Build unsigned iOS IPA** → 右边 **Run workflow** → 绿色按钮
3. 等 15~25 分钟（首次要装 CocoaPods 依赖，比较慢）
4. 跑完后点进这次运行，页面底部 **Artifacts** 下载 `WordStar-unsigned-ipa`

解压得到 `WordStar-unsigned.ipa`。

## 三、装到 iPhone

1. Windows 装 [Sideloadly](https://sideloadly.io/)（需同时装 iTunes 或 Apple Devices 驱动）
2. iPhone 用数据线连电脑
3. Sideloadly 里选 `WordStar-unsigned.ipa`，Apple ID 填你的免费账号
4. 点 Start，输入 Apple ID 密码（会走双重验证）
5. iPhone 上：设置 → 通用 → VPN与设备管理 → 信任你的开发者证书
6. 首次打开如果闪退，设置 → 隐私与安全性 → 开发者模式 → 打开并重启

**免费 Apple ID 的限制**：签名 7 天过期，最多同时 3 个自签 App，过期后重新用 Sideloadly 签一次即可（数据不丢）。

## 常见问题

**Actions 报 `pod install` 失败**：重跑一次，多半是网络抖动。

**xcodebuild 报 scheme 找不到**：确认 `app.json` 里 `name` 是 `WordStar`（工程名由它决定），workflow 里 scheme 也写的是 `WordStar`。

**Sideloadly 报 `Provision.cpp:166`**：Apple ID 双重验证没走完，重新 Start 一次。

**装完打开白屏**：把 iPhone 连电脑，Sideloadly 里点 `Advanced` → 勾 `Enable iOS debug log` 看日志。
