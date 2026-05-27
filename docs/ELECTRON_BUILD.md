# 🖥️ Electron Build Guide — Windows 12 Concept

> **For contributors** who want to package `win12_online` as a standalone `.exe` desktop application using Electron and Node.js.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Minimum Version | Download |
|------|----------------|---------|
| Node.js | v18.0.0 LTS or higher | [nodejs.org](https://nodejs.org) |
| npm | v9.0.0 or higher | Comes with Node.js |
| Git | Any recent version | [git-scm.com](https://git-scm.com) |
| Windows OS | Windows 10 / 11 (64-bit) | — |

> ⚠️ **Important:** Building a Windows `.exe` installer is only fully supported on a **Windows host machine**. Cross-compiling from Linux/macOS requires Wine and additional setup (not covered here).

---

## 📦 Project Structure

```
win12_online/
├── index.html          ← Main entry point (renderer process)
├── main.js             ← Electron main process
├── sw.js               ← Service worker (disabled in Electron — see notes)
├── package.json        ← Build configuration
├── favicon.ico         ← App icon
├── css/                ← Stylesheets
└── docs/               ← Documentation 
```

---

### Key Fields Explained

- **`main`** — Points to `main.js`, which is the Electron main process entry point.
- **`scripts.start`** — Runs the app in development mode (no packaging).
- **`scripts.dist`** — Packages the app into a distributable `.exe` installer.
- **`build.win.target: "nsis"** — Produces a Windows NSIS installer (`.exe`).
- **`build.nsis.oneClick: false`** — Shows the installer wizard instead of silently installing.
- **`build.nsis.allowToChangeInstallationDirectory`** — Lets users choose where to install.
- **`build.publish.provider: "github"`** — Enables GitHub Releases as the auto-update source.

---

## 🚀 Build Steps

### 1. Clone the Repository

```bash
git clone https://github.com/win12-web/win12_online.git
cd win12_online
```

### 2. Install Dependencies

```bash
npm install
```

This installs `electron` and `electron-builder` as defined in `devDependencies`.

### 3. Run in Development Mode

Test the app in Electron before packaging:

```bash
npm start
```

This opens the app in an Electron window. Verify everything works correctly before proceeding to build.

### 4. Package as `.exe`

```bash
npm run dist
```

The output will be placed in the `dist/` folder:

```
dist/
└── Windows 12 Desktop Setup 0.04.exe   ← Installer for end users
```

---

## 🔧 main.js — What It Should Contain

If `main.js` does not yet exist or needs updating, here is the recommended minimal Electron main process for this project:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, 'favicon.ico'),
    title: 'Windows 12 Desktop',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // Service workers are not supported in Electron file:// protocol.
      // The sw.js file is safe to leave in place; it simply won't register.
    }
  });

  win.loadFile('index.html');

  // Remove the default menu bar
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

## 📝 Contributor Notes

### Service Worker (`sw.js`)
The `sw.js` service worker is designed for web browsers using the `https://` protocol. In Electron, files are loaded via `file://`, so **the service worker will not register** and can be safely ignored. Do not remove it — the web version still depends on it.

### App Icon
The build uses `favicon.ico` as the app icon. For best results in Windows (taskbar, installer, desktop shortcut), the `.ico` file should contain multiple resolutions: **16×16, 32×32, 48×48, 256×256**. You can convert or regenerate it using tools like [icoconvert.com](https://icoconvert.com).

### Window Size
The recommended default window size is **1280×800**, with a minimum of **900×600** to prevent the taskbar and UI from collapsing. Adjust in `main.js` if needed.

### Security
- Keep `nodeIntegration: false` and `contextIsolation: true` in `webPreferences`. The app only loads local HTML/CSS/JS and does not need Node.js APIs in the renderer.
- Do not expose `remote` module or use `shell.openExternal` without input validation.

### Version Bumping
Before releasing a new `.exe`, update the `"version"` field in `package.json`. The installer filename and GitHub Release tag will reflect this version automatically.

---

## 📤 Releasing via GitHub

If you publish a build to GitHub Releases:

1. Update `"version"` in `package.json` (e.g. `"0.05"`).
2. Run `npm run dist` to generate the installer.
3. Create a new GitHub Release and upload the `.exe` from the `dist/` folder.
4. Tag the release to match the version (e.g. `v0.05`).

The `"publish": { "provider": "github" }` config in `package.json` supports Electron's built-in auto-updater (`electron-updater`) if you choose to add it later.

---

## ❓ Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| `electron` not found | Dependencies not installed | Run `npm install` |
| Blank white window | `index.html` path is wrong | Verify `win.loadFile('index.html')` path in `main.js` |
| Icon not showing | `.ico` missing resolutions | Regenerate with multiple sizes (16, 32, 48, 256px) |
| Build fails on `dist` | `electron-builder` not installed | Run `npm install` again, or `npm install electron-builder --save-dev` |
| Installer won't run | Missing VC++ Redistributable | Install [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) |

---

## 📄 License

This build guide is part of the `win12_online` project, licensed under **GPL-3.0**.
Any `.exe` distribution must retain attribution to **RobertThePublisher** and link back to the original repository.

---

*Maintained by the win12_online contributors. For issues, open a ticket at [github.com/win12-web/win12_online/issues](https://github.com/win12-web/win12_online/issues).*
