# 🏗️ Architecture

> How WIN12 WEB is organized internally.

---

# 🌌 Overview

WIN12 WEB uses a modular architecture designed to scale over time.

The project separates systems into folders to improve:

* maintainability
* readability
* contributor workflow
* future expansion

---

# 📁 Folder Structure

```txt
/
├── api/
├── apps/
├── assets/
├── css/
├── docs/
├── js/
├── system/
├── index.html
├── sw.js
└── package.json
```

---

# ⚡ Core Systems

## API Layer

The API layer contains reusable operating system functions.

Files:

```txt
api/
├── apps.js
├── system.js
└── window-manager.js
```

Responsibilities:

* app registration
* system control
* window management

---

## CSS Layer

The CSS layer contains modular styling.

Examples:

```txt
css/
├── win12.css
├── browser.css
├── desktop.css
├── taskbar.css
├── themes.css
└── animations.css
```

---

## Applications

Applications are separated from the operating system core.

Examples:

* Browser
* Settings
* Terminal
* Explorer

---

# 🔀 Branch Strategy

## main

Stable branch.

## dev

Experimental branch.

New systems should be tested in `dev` before reaching `main`.

---

# 🚀 Future Expansion

Planned systems:

* Notification API
* Widget Framework
* Theme Engine
* File Manager
* Settings API
* AI Integration

---

# 🧠 Design Goals

```txt
Modular
Scalable
Maintainable
Experimental
```

---

> "The future desktop runs inside the browser."
