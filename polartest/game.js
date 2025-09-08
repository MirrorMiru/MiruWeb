import BootScene from './src/screens/boot.js';
import OptionsScene from './src/screens/options.js';
import Preloader from './src/screens/preloader.js';
import OSTManager from './src/screens/ostmanager.js';
import Menu from './src/screens/menu.js';
import LevelText from './src/screens/leveltext.js';
import GameOver from './src/screens/over.js';
import TestLevel from './src/screens/levels/testlevel.js';
import Pause from './src/screens/pause.js';
import ClickToStart from './src/screens/start.js';

const DEFAULT_SETTINGS = {
  renderMode:   'AUTO',
  physicsDebug: false,
  oldSprites:   false,
  volume:       1,
};

// Load any saved overrides
const saved     = JSON.parse(localStorage.getItem('gameSettings')) || {};
const settings  = { ...DEFAULT_SETTINGS, ...saved };

// --- Phaser Game Config ------------------------------------------------------
const config = {
  title: 'prototype',
  type: Phaser[settings.renderMode],              // AUTO / WEBGL / CANVAS
  width: 1600,
  height: 1200,
  backgroundColor: '#000',

  // Crisp pixels + less shimmer:
  // - pixelArt disables texture smoothing globally (nearest-neighbor)
  // - render.antialias=false avoids linear filtering at the canvas level
  // - render.roundPixels snaps draw positions to whole pixels
  pixelArt: true,
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
    powerPreference: 'high-performance',
    // clearBeforeRender: true, // optional: keep default
  },

  // Strong 60 FPS target + hard cap using setTimeout instead of RAF.
  // (RAF still drives the browser, but Phaser will pace updates to 60)
  fps: {
    target: 60,
    min: 10,
    forceSetTimeOut: true, // "hard cap" the game loop at 60
    smoothStep: false,     // fixed-step style; helps with consistency
  },

  physics: {
    default: 'matter',
    matter: {
      enableSleeping: true,
      gravity: { y: 3 },
      debug: {
        showBody:       !!settings.physicsDebug,
        showStaticBody: !!settings.physicsDebug,
      },
      // With the game loop capped at 60fps, Matter will receive a ~16.66ms delta,
      // yielding a consistent 60 Hz physics step without extra tweaks.
      // You can tune iterations if you want even tighter simulation:
      // positionIterations: 6,
      // velocityIterations: 4,
      // constraintIterations: 2,
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
  },

  // Lights pipeline budget (keep as you had it)
  maxLights: 50,

  scene: [
    BootScene,
    Preloader,
    OSTManager,
    ClickToStart,
    Menu,
    LevelText,
    GameOver,
    Pause,
    OptionsScene,
    TestLevel,
  ],

  audio: {
    disableWebAudio: false,
  },

  // Optional QOL:
  // disableContextMenu: true,
};

const game = new Phaser.Game(config);

// Stash settings in the registry for easy access
game.registry.set('settings', settings);
