// ═══════════════════════════════════════════════════════════════
//  THEME PLUGIN SYSTEM — Dynamic Theme Manager
//  Windows 12 Conceptual Mock-Up
// ═══════════════════════════════════════════════════════════════

class ThemePlugin {
  constructor(name, colors) {
    this.name = name;
    this.colors = colors;
    this.active = false;
  }

  apply() {
    const root = document.documentElement;
    
    // Apply all color variables
    Object.entries(this.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Store active theme in localStorage
    LS.set('activeTheme', this.name);
    this.active = true;
    
    console.log(`✓ Theme "${this.name}" applied`);
    notif('Theme', `Switched to ${this.name}`, 'https://img.icons8.com/color/48/paint-palette.png');
    return this;
  }

  toggle() {
    if (this.active) {
      this.remove();
    } else {
      this.apply();
    }
  }

  remove() {
    LS.del('activeTheme');
    this.active = false;
    console.log(`✗ Theme "${this.name}" removed`);
  }
}

// ═══════════════════════════════════════════════════════════════
//  THEME DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const THEMES = {
  // DEFAULT: Purple/Magenta/Cyan (original Win12)
  default: {
    name: 'Default',
    colors: {
      purple: '#bc82ff',
      magenta: '#ff007f',
      cyan: '#00d4ff',
      green: '#39ff14',
      dark: 'rgba(14,14,20,0.95)',
      glass: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.08)',
      text: '#fff',
      dim: '#888',
      accent: '#bc82ff'
    }
  },

  // NEON: High-contrast electric neon
  neon: {
    name: 'Neon',
    colors: {
      purple: '#ff00ff',
      magenta: '#ff0080',
      cyan: '#00ffff',
      green: '#00ff00',
      dark: 'rgba(10,0,20,0.98)',
      glass: 'rgba(255,0,255,0.05)',
      border: 'rgba(0,255,255,0.15)',
      text: '#0ff',
      dim: '#666',
      accent: '#ff00ff'
    }
  },

  // DRACULA: Dark theme inspired by Dracula
  dracula: {
    name: 'Dracula',
    colors: {
      purple: '#bd93f9',
      magenta: '#ff79c6',
      cyan: '#8be9fd',
      green: '#50fa7b',
      dark: 'rgba(40,42,54,0.98)',
      glass: 'rgba(255,255,255,0.04)',
      border: 'rgba(189,147,249,0.1)',
      text: '#f8f8f2',
      dim: '#6272a4',
      accent: '#bd93f9'
    }
  },

  // NORD: Arctic, north-bluish color palette
  nord: {
    name: 'Nord',
    colors: {
      purple: '#b48ead',
      magenta: '#d08770',
      cyan: '#88c0d0',
      green: '#a3be8c',
      dark: 'rgba(46,52,64,0.98)',
      glass: 'rgba(255,255,255,0.03)',
      border: 'rgba(129,161,193,0.08)',
      text: '#eceff4',
      dim: '#81a1c1',
      accent: '#88c0d0'
    }
  },

  // SOLARIZED DARK: Precision colors for machines and people
  solarizeddark: {
    name: 'Solarized Dark',
    colors: {
      purple: '#6c71c4',
      magenta: '#d33682',
      cyan: '#2aa198',
      green: '#859900',
      dark: 'rgba(7,54,66,0.98)',
      glass: 'rgba(255,255,255,0.04)',
      border: 'rgba(101,123,131,0.1)',
      text: '#93a1a1',
      dim: '#657b83',
      accent: '#268bd2'
    }
  },

  // MONOKAI: High contrast, saturated colors
  monokai: {
    name: 'Monokai',
    colors: {
      purple: '#ae81ff',
      magenta: '#f92672',
      cyan: '#66d9ef',
      green: '#a1efe4',
      dark: 'rgba(39,40,34,0.98)',
      glass: 'rgba(255,255,255,0.03)',
      border: 'rgba(249,38,114,0.08)',
      text: '#f8f8f2',
      dim: '#75715e',
      accent: '#f92672'
    }
  },

  // GRUVBOX DARK: Retro groove color scheme
  gruvboxdark: {
    name: 'Gruvbox Dark',
    colors: {
      purple: '#d3869b',
      magenta: '#d65d0e',
      cyan: '#8ec07c',
      green: '#b8bb26',
      dark: 'rgba(40,40,40,0.98)',
      glass: 'rgba(255,255,255,0.04)',
      border: 'rgba(211,106,155,0.08)',
      text: '#ebdbb2',
      dim: '#928374',
      accent: '#d3869b'
    }
  },

  // ONE DARK: Atom's One Dark theme
  onedark: {
    name: 'One Dark',
    colors: {
      purple: '#c678dd',
      magenta: '#e06c75',
      cyan: '#56b6c2',
      green: '#98c379',
      dark: 'rgba(40,44,52,0.98)',
      glass: 'rgba(255,255,255,0.03)',
      border: 'rgba(198,120,221,0.08)',
      text: '#abb2bf',
      dim: '#5c6370',
      accent: '#61afef'
    }
  },

  // TOKYONIGHT: Warm neon Tokyo nights
  tokyonight: {
    name: 'Tokyo Night',
    colors: {
      purple: '#bb9af7',
      magenta: '#f7768e',
      cyan: '#7aa2f7',
      green: '#9ece6a',
      dark: 'rgba(26,27,38,0.98)',
      glass: 'rgba(255,255,255,0.04)',
      border: 'rgba(125,207,255,0.08)',
      text: '#c0caf5',
      dim: '#565f89',
      accent: '#7aa2f7'
    }
  },

  // CATPPUCCIN MOCHA: Soothing pastel theme
  catppuccin: {
    name: 'Catppuccin',
    colors: {
      purple: '#cba6f7',
      magenta: '#f5c2e7',
      cyan: '#89dceb',
      green: '#a6e3a1',
      dark: 'rgba(30,30,46,0.98)',
      glass: 'rgba(255,255,255,0.04)',
      border: 'rgba(203,166,247,0.08)',
      text: '#cdd6f4',
      dim: '#6c7086',
      accent: '#89dceb'
    }
  },

  // EVERFOREST: Comfortable & pleasant color scheme
  everforest: {
    name: 'Everforest',
    colors: {
      purple: '#d699b6',
      magenta: '#e67e80',
      cyan: '#7fbbb3',
      green: '#a7c957',
      dark: 'rgba(39,44,52,0.98)',
      glass: 'rgba(255,255,255,0.04)',
      border: 'rgba(214,158,182,0.08)',
      text: '#d4be98',
      dim: '#9da8a7',
      accent: '#7fbbb3'
    }
  },

  // CYBERPUNK: Aggressive electric synthwave
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      purple: '#ff006e',
      magenta: '#ffbe0b',
      cyan: '#00f5ff',
      green: '#39ff14',
      dark: 'rgba(15,0,30,0.98)',
      glass: 'rgba(255,0,110,0.05)',
      border: 'rgba(0,245,255,0.12)',
      text: '#00f5ff',
      dim: '#8b00ff',
      accent: '#ff006e'
    }
  },

  // MATRIX: Digital green on black
  matrix: {
    name: 'Matrix',
    colors: {
      purple: '#00ff00',
      magenta: '#00dd00',
      cyan: '#00aa00',
      green: '#00ff00',
      dark: 'rgba(0,0,0,0.98)',
      glass: 'rgba(0,255,0,0.03)',
      border: 'rgba(0,255,0,0.1)',
      text: '#00ff00',
      dim: '#006600',
      accent: '#00ff00'
    }
  },

  // SUNSET: Warm orange/red gradient feel
  sunset: {
    name: 'Sunset',
    colors: {
      purple: '#ff9500',
      magenta: '#ff3b30',
      cyan: '#ffb84d',
      green: '#ffd60a',
      dark: 'rgba(40,20,10,0.98)',
      glass: 'rgba(255,150,0,0.05)',
      border: 'rgba(255,100,50,0.1)',
      text: '#ffc966',
      dim: '#8b4513',
      accent: '#ff6b35'
    }
  },

  // OCEAN: Deep blues and teals
  ocean: {
    name: 'Ocean',
    colors: {
      purple: '#6eb3d4',
      magenta: '#0077b6',
      cyan: '#00b4d8',
      green: '#90e0ef',
      dark: 'rgba(3,20,40,0.98)',
      glass: 'rgba(0,150,200,0.04)',
      border: 'rgba(0,180,200,0.1)',
      text: '#caf0f8',
      dim: '#4a7c99',
      accent: '#00b4d8'
    }
  },

  // LAVENDER: Soft purple pastels
  lavender: {
    name: 'Lavender',
    colors: {
      purple: '#c8a2e0',
      magenta: '#d5a7d9',
      cyan: '#a5d8e8',
      green: '#b4e5a3',
      dark: 'rgba(45,35,55,0.98)',
      glass: 'rgba(200,162,224,0.05)',
      border: 'rgba(200,162,224,0.1)',
      text: '#e5d5f0',
      dim: '#9b7fb8',
      accent: '#c8a2e0'
    }
  },

  // FOREST: Deep greens and browns
  forest: {
    name: 'Forest',
    colors: {
      purple: '#8fb55f',
      magenta: '#c1d82f',
      cyan: '#56b55f',
      green: '#90ee90',
      dark: 'rgba(20,40,20,0.98)',
      glass: 'rgba(100,150,60,0.04)',
      border: 'rgba(143,181,95,0.1)',
      text: '#d4e5a3',
      dim: '#6b8e23',
      accent: '#8fb55f'
    }
  },

  // CHERRY BLOSSOM: Soft pinks and whites
  cherry: {
    name: 'Cherry Blossom',
    colors: {
      purple: '#e8b4d4',
      magenta: '#e8869d',
      cyan: '#d4c5c5',
      green: '#e8d4c4',
      dark: 'rgba(50,30,40,0.98)',
      glass: 'rgba(232,180,212,0.04)',
      border: 'rgba(232,134,157,0.1)',
      text: '#f0e4e6',
      dim: '#b87a9c',
      accent: '#e8869d'
    }
  },

  // MIDNIGHT: Deep dark blue
  midnight: {
    name: 'Midnight',
    colors: {
      purple: '#7c3aed',
      magenta: '#a855f7',
      cyan: '#06b6d4',
      green: '#10b981',
      dark: 'rgba(15,23,42,0.98)',
      glass: 'rgba(124,58,237,0.05)',
      border: 'rgba(6,182,212,0.08)',
      text: '#e0e7ff',
      dim: '#4c1d95',
      accent: '#7c3aed'
    }
  },

  // RETRO: 80s aesthetic with muted colors
  retro: {
    name: 'Retro 80s',
    colors: {
      purple: '#a78bca',
      magenta: '#d65678',
      cyan: '#5eb3b9',
      green: '#a4c969',
      dark: 'rgba(60,50,65,0.98)',
      glass: 'rgba(167,139,202,0.04)',
      border: 'rgba(214,86,120,0.08)',
      text: '#dbd5e0',
      dim: '#8a7696',
      accent: '#d65678'
    }
  }
};

// ═══════════════════════════════════════════════════════════════
//  THEME MANAGER
// ═══════════════════════════════════════════════════════════════

const ThemeManager = {
  themes: {},
  currentTheme: null,

  init() {
    // Initialize all themes
    Object.entries(THEMES).forEach(([key, data]) => {
      this.themes[key] = new ThemePlugin(key, data.colors);
    });

    // Load previously saved theme or use default
    const savedTheme = LS.get('activeTheme') || 'default';
    if (this.themes[savedTheme]) {
      this.apply(savedTheme);
    } else {
      this.apply('default');
    }

    console.log('✓ Theme Manager initialized');
  },

  apply(themeName) {
    if (!this.themes[themeName]) {
      console.error(`Theme "${themeName}" not found`);
      return;
    }

    // Deactivate previous theme
    if (this.currentTheme) {
      this.themes[this.currentTheme].active = false;
    }

    // Apply new theme
    this.themes[themeName].apply();
    this.currentTheme = themeName;
  },

  getCurrent() {
    return this.currentTheme;
  },

  getAll() {
    return Object.keys(this.themes).map(key => ({
      id: key,
      name: THEMES[key].name
    }));
  },

  random() {
    const themeKeys = Object.keys(this.themes);
    const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    this.apply(randomTheme);
    return randomTheme;
  }
};

// ═══════════════════════════════════════════════════════════════
//  THEME SHORTCUTS
// ═══════════════════════════════════════════════════════════════

// Make ThemeManager globally accessible
window.ThemeManager = ThemeManager;

// Quick theme switcher via keyboard (Ctrl+Shift+T)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'T') {
    e.preventDefault();
    ThemeManager.random();
  }
});

// Initialize when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}
