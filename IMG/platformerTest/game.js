import BootScene from './src/screens/boot.js';
import OptionsScene from './src/screens/options.js';
import Preloader from './src/screens/preloader.js';
import OSTManager from './src/screens/ostmanager.js';
import Menu from './src/screens/menu.js';
import LevelText from './src/screens/leveltext.js';
import Level1 from './src/screens/worlds/w1/level1.js';
import Level2 from './src/screens/worlds/w1/level2.js';
import Level3 from './src/screens/worlds/w1/level3.js';
import GameOver from './src/screens/over.js';
import Select from './src/screens/select/select.js';
import Level4 from './src/screens/worlds/w2/level4.js';
import Level5 from './src/screens/worlds/w2/level5.js';
import Level6 from './src/screens/worlds/w2/level6.js';
import Level7 from './src/screens/worlds/w3/level7.js';
import Level8 from './src/screens/worlds/w3/level8.js';
import Level9 from './src/screens/worlds/w3/level9.js';
import Level10 from './src/screens/worlds/w4/level10.js';
import Level11 from './src/screens/worlds/w4/level11.js';
import Level12 from './src/screens/worlds/w4/level12.js';
import Level13 from './src/screens/worlds/w5/level13.js';
import Level14 from './src/screens/worlds/w5/level14.js';
import Level15 from './src/screens/worlds/w5/level15.js';
import Level16 from './src/screens/worlds/w6/level16.js';
import Level17 from './src/screens/worlds/w6/level17.js';   
import Level18 from './src/screens/worlds/w6/level18.js';
import Pause from './src/screens/pause.js';
import HowTo from './src/screens/howto.js';
import World1 from './src/screens/select/world1.js';
import World2 from './src/screens/select/world2.js';
import World3 from './src/screens/select/world3.js';
import World4 from './src/screens/select/world4.js';
import World5 from './src/screens/select/world5.js';
import World6 from './src/screens/select/world6.js';    
import CutsceneScene from './src/screens/cutscene.js';
import ClickToStart from './src/screens/start.js';

const DEFAULT_SETTINGS = {
  renderMode:   'AUTO',
  physicsDebug: false,
  oldSprites: false,
  volume: 1,
};

// load any saved overrides
const saved = JSON.parse(localStorage.getItem('gameSettings')) || {};
const settings = { ...DEFAULT_SETTINGS, ...saved };

// Determine if we should lock framerate to 60 or leave it unlocked

const config = {
  title: "Melody and Ella",
  type: Phaser[ settings.renderMode ],        
  width: 800,
  height: 600,
  backgroundColor: '#000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: settings.physicsDebug
    }
  },
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
  },
  maxLights: 50,
  scene: [BootScene, Preloader, OSTManager, ClickToStart, Menu, HowTo, Select, World1, World2, World3, World4, World5, World6, LevelText,
    Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, Level11, Level12, Level13, Level14, Level15, Level16, Level17, Level18,
    GameOver, Pause, CutsceneScene, OptionsScene],
  audio: {
    disableWebAudio: false
  }
};

const game = new Phaser.Game(config);

game.registry.set('settings', settings);
