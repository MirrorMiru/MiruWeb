import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Torch from '../../../classes/torch.js';

export default class Level5 extends Phaser.Scene {
    constructor() {
        super("l5");
        this.transitioning = false;
        this.buttons = [];

        this.blocks = [];

        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world2level2', './levels/tilemaps/w2l2.json');
        this.load.image('outskirts-tiles', './levels/tiles/outskirts-tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;
        this.cameras.main.setBackgroundColor(0xB3E5FC);

        this.map = this.make.tilemap({
            key: 'world2level2'
        });
        this.tileset = this.map.addTilesetImage('outskirts-tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x211e18, 0.2);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);

        this.back = this.map.createLayer('back', this.tileset);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x59544b, 0.5);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);

        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);

        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createButtons();

        this.createBlocks();

        this.portal = new Portal(this, 28, 6);
      
        this.portal.portalEmitter.stop();


        this.melody = new Melody(this, 2 * 32, 7 * 32);
        this.ella = new Ella(this, 3 * 32, 7 * 32);

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);

        this.groundLayer.setCollisionBetween(1, 999);
        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);

        new Torch(this, 13, 18);
        new Torch(this, 19, 27);
        new Torch(this, 4, 39);
        new Torch(this, 6, 48);
        new Torch(this, 32, 49);
        new Torch(this, 30, 39);
        new Torch(this, 30, 31);
        new Torch(this, 19, 48);
        new Torch(this, 29, 62);
        new Torch(this, 6, 34);







        this.blocks.forEach(block => {
     
            // Melody collides with the static parts
            this.physics.add.collider(this.melody, block.staticCore);
            this.physics.add.collider(this.melody, block.staticTop);
            this.physics.add.collider(this.melody, block);
        
            // Ella collides with the static parts
            this.physics.add.collider(this.ella, block.staticCore);
            this.physics.add.collider(this.ella, block.staticTop);
            this.physics.add.collider(this.ella, block);
        
            // The block's static core collides with the ground
            this.physics.add.collider(block.staticCore, this.groundLayer);
        
            // Optional: the visual block itself can still be pushed or affected by terrain
            this.physics.add.collider(block, this.groundLayer);
        
            // Let blocks interact physically (stack, bounce, etc.)
            this.physics.add.collider(block, this.blocks);
        });

        this.buttons.forEach(button => {
            this.physics.add.overlap(this.melody, button, button.press, null, button);
            this.physics.add.overlap(this.ella, button, button.press, null, button);
            this.physics.add.overlap(this.blocks, button, button.press, null, button);
        });

        this.physics.add.overlap(this.melody, this.portal, this.checkPlayersInPortal, null, this);
        this.physics.add.overlap(this.ella, this.portal, this.checkPlayersInPortal, null, this);

        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.bg.setScrollFactor(0.3);
        this.back.setScrollFactor(0.5);
        this.bgDecals.setScrollFactor(0.5);

        this.lights.enable().setAmbientColor(0x544e36);

        this.melody.setPipeline('Light2D');
        this.ella.setPipeline('Light2D');
        this.blocks.forEach(block => block.setPipeline('Light2D'));
        this.buttons.forEach(button => button.setPipeline('Light2D'));

        this.portal.setPipeline('Light2D');
        this.groundLayer.setPipeline('Light2D');

        this.rearDecal.setPipeline('Light2D');
        this.transparent.setPipeline('Light2D');
        this.front.setPipeline('Light2D');
        this.front2.setPipeline('Light2D');

        this.gradient = this.add.image(this.map.widthInPixels / 2, this.map.heightInPixels / 2, 'grad4').setAlpha(0.55);
        this.gradient.scaleX = 4;
        this.gradient.blendMode = 'MULTIPLY';
        this.gradient.setPipeline('Light2D');

        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.3);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.3);

   


        this.sunlight = this.lights.addLight(0, -32, 3000)
            .setColor(0xfeffbb)
            .setIntensity(1);

        this.input.keyboard.on("keydown-ESC", () => {
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l5",
                hint: "Find the 2 red buttons. \n\n 1: first house from the top on the left, one player has to unlock the door from the house below. \n 2: bridge at the bottom \n \n remember to look for hidden tunnels"
            });
        });

        this.input.keyboard.on("keydown-R", () => {
            if(!this.transitioning) {
            this.sound.play('reset');
            this.cameras.main.fadeOut(500);
            this.transitioning = true;
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.buttons.forEach(b => b.destroy());
                this.blocks.forEach(b => b.destroy());
                this.buttons = [];
                this.blocks = [];
                this.scene.start("levelText", {
                    text1: "we all make mistakes",
                    text2: "lets give it another go!",
                    text3: "OOPS...",
                    nextScene: "l5",
                    priorScene: "l5"
                });
            });
        }
        });

    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];

        this.buttons.push(new Button(this, 8, 40, 3));
        this.buttons.push(new Button(this, 9, 40, 3));
        this.buttons.push(new Button(this, 10, 40, 3));
        this.buttons.push(new Button(this, 11, 37, 4));
        this.buttons.push(new Button(this, 9, 19, 4));
        this.buttons.push(new Button(this, 12, 16, 1));
        this.buttons.push(new Button(this, 8, 74, 1));
    }

    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

    }



    checkPlayersInPortal() {
        if (this.portal.active &&
            this.physics.overlap(this.melody, this.portal) &&
            this.physics.overlap(this.ella, this.portal)) {
            this.portal.active = false;
            this.transitioning = true;
            this.cameras.main.fadeOut(1000);
            this.sound.play("teleport")
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("levelText", {
                    text1: "World 2: The Outskirts",
                    text2: "Level 3: Countryside",
                    text3: "GOOD JOB!",
                    nextScene: "l6",
                    priorScene: "l5"
                });
            });
        }
    }


    checkGameOverCondition() {
        const fallLimit = this.map.heightInPixels + 200;
        if (!this.gameOverTriggered && (this.melody.y > fallLimit || this.ella.y > fallLimit)) {
            this.gameOverTriggered = true;
            this.transitioning = true;
            this.sound.play("thud", { volume: 1.5 });
            this.cameras.main.shake(150, 0.0025);
            this.time.delayedCall(500, () => {
                this.cameras.main.fadeOut(500);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start("over", {
                        text1: "press 'R' to give it another go",
                        text2: "press 'Q' to call it quits",
                        text3: "OUCH...",
                        currentScene: "l5"
                    });
                    this.buttons = [];
                    this.blocks = [];
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileActions = [

            {
                buttonIndex: 0,
                tileX: 18,
                tileY: 36,
                tile: 26,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 0,
                tileX: 19,
                tileY: 36,
                tile: 25,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 0,
                tileX: 20,
                tileY: 36,
                tile: 33,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 18,
                tileY: 39,
                tile: 26,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 19,
                tileY: 39,
                tile: 25,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 20,
                tileY: 39,
                tile: 33,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 18,
                tileY: 44,
                tile: 26,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 19,
                tileY: 44,
                tile: 25,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 20,
                tileY: 44,
                tile: 33,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 3,
                tileX: 13,
                tileY: 19,
                tile: 25,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 4,
                tileX: 7,
                tileY: 34,
                tile: 25,
                layer: this.groundLayer,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },

            {
                buttonIndex: 3,
                tileX: 13,
                tileY: 19,
                tile: 23,
                layer: this.front2,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 4,
                tileX: 7,
                tileY: 34,
                tile: 23,
                layer: this.front2,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }

        ];

        tileActions.forEach(({
            buttonIndex,
            tileX,
            tileY,
            tile = null,
            layer,
            action
        }) => {
            const button = this.buttons[buttonIndex];

            if (button) {
                action(button.isPressed, layer, tileX, tileY, tile);
            }
        });

    }

    update() {

        this.melody.update();
        this.ella.update();
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));

 this.portal.update(
  this.buttons
    .filter(button => button.type !== 3 && button.type !== 4)
    .every(button => button.isPressed) &&
  this.buttons.some(button => button.type !== 3 && button.type !== 4)
);


        this.sunlight.setPosition((this.cameras.main.midPoint.x), (this.cameras.main.midPoint.y) - 300);

        this.melodyLight.setPosition(this.melody.x, this.melody.y);
        this.ellaLight.setPosition(this.ella.x, this.ella.y);

     

  
        this.checkGameOverCondition();
        this.updateTilesBasedOnButtonState();

        const pulse = 0.5 + Math.sin(this.time.now * 0.005) * 0.3;
        this.portal.portalLight.setIntensity(this.portal.active ? pulse : 0);
    

        const midX = (this.melody.x + this.ella.x) / 2;
        const midY = (this.melody.y + this.ella.y) / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, midX - this.cameras.main.width / 2, 0.1);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, midY - this.cameras.main.height / 2, 0.1);

    }
}