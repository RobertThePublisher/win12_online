// ═══════════════════════════════════════════════
//  THEME PLUGIN — Custom Stylesheet Loader
// ═══════════════════════════════════════════════

class ThemePlugin {
  constructor(name, stylesheetUrl) {
    this.name = name;
    this.stylesheetUrl = stylesheetUrl;
    this.linkElement = null;
  }

  load() {
    // Create and inject link element
    this.linkElement = document.createElement('link');
    this.linkElement.rel = 'stylesheet';
    this.linkElement.href = this.stylesheetUrl;
    this.linkElement.id = `theme-${this.name}`;
    document.head.appendChild(this.linkElement);
    console.log(`✓ Theme "${this.name}" loaded`);
    return this;
  }

  unload() {
    if (this.linkElement) {
      this.linkElement.remove();
      console.log(`✗ Theme "${this.name}" unloaded`);
    }
  }

  toggle() {
    if (this.linkElement) {
      this.unload();
    } else {
      this.load();
    }
  }
}

// Usage in index.html:
// <link rel="stylesheet" href="plugins/theme-plugin.css" id="theme-plugin">
// <script src="plugins/theme-plugin.js"></script>
// <script>
//   const darkTheme = new ThemePlugin('dark', 'plugins/dark-theme.css');
//   darkTheme.load();
// </script>
