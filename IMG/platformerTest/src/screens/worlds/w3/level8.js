import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Imp from '../../../classes/imp.js';
import Torch from '../../../classes/torch.js';

export default class Level8 extends Phaser.Scene {
    constructor() {
        super("l8");
        this.transitioning = false;
        this.buttons = [];
        this.badButtons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world3level2', './levels/tilemaps/w3l2.json');
        this.load.image('wasteland_tiles', './levels/tiles/wasteland_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;


        this.cameras.main.setBackgroundColor(0xFAD6A5);



        this.map = this.make.tilemap({
            key: 'world3level2'
        });
        this.tileset = this.map.addTilesetImage('wasteland_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 47, 21);

        this.portal.portalEmitter.stop();

        this.melody = new Melody(this, 4 * 32, 22 * 32);
        this.ella = new Ella(this, 5 * 32, 22 * 32);

        this.imp1 = new Imp(this, 7, 1);
        this.imp2 = new Imp(this, 22, 17);

        this.spider1 = new Spider(this, 4, 19, 3, 7)
        this.spider2 = new Spider(this, 31, 13, 30, 32)


        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);

        new Torch(this, 33, 15);
        new Torch(this, 45, 3);
        new Torch(this, 45, 0);
        new Torch(this, 43, 17);




        this.groundLayer.setCollisionBetween(1, 999);
        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);
        this.physics.add.collider(this.imp1, this.groundLayer);

        this.physics.add.collider(this.imp2, this.groundLayer);

        this.physics.add.collider(this.melody, this.spider1, () => {
            this.spider1.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider1, () => {
            this.spider1.knockbackPlayer(this.ella);
        });


        this.physics.add.collider(this.melody, this.spider2, () => {
            this.spider2.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider2, () => {
            this.spider2.knockbackPlayer(this.ella);
        });


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

            this.physics.add.collider(this.imp1, block.staticCore);
            this.physics.add.collider(this.imp1, block);

            
            this.physics.add.collider(this.imp2, block.staticCore);
            this.physics.add.collider(this.imp2, block);
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

        this.lights.enable().setAmbientColor(0xfffce6);


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

        this.gradient = this.add.image(this.map.widthInPixels / 2, this.map.heightInPixels / 2, 'grad4').setAlpha(0.6);
        this.gradient.scaleX = 10;
        this.gradient.scaleY = 0.3;
        this.gradient.blendMode = 'MULTIPLY';
        this.gradient.setPipeline('Light2D');

        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.1);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.1);

       



        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l8",
                hint: "The poor imp on the top bridge has locked herself out of her house.\nThat also just so happens to be where the only blue button is.\nImps follow the midpoint between both players.\n\nAfter unlocking the 2nd rock spider, launch one player to the right, the other will push the yellow button AFTER you have launched. Manipulate your distance to let the imp push the blue button, then go down to the portal."
            });
        }
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
                    nextScene: "l8",
                    priorScene: "l8"
                });
            });
        }
        });



    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 5, 9, 3));
        this.buttons.push(new Button(this, 18, 9, 3));
        this.buttons.push(new Button(this, 24, 18, 3));
        this.buttons.push(new Button(this, 31, 17, 3));
        this.buttons.push(new Button(this, 47, 6, 3));
        this.buttons.push(new Button(this, 44, 4, 3));
        this.buttons.push(new Button(this, 48, 1, 2));

    }



    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];
        this.blocks.push(new Block(this, 23, 17));
        this.blocks.push(new Block(this, 47, 1));


        this.blocks.forEach((block, index) => {
            this.blocks.forEach((otherBlock, otherIndex) => {
                if (index !== otherIndex) {
                    // Make the dynamic block collide with the other block’s static core
                    this.physics.add.collider(block, otherBlock.staticCore);
                }
            });
        });

    }




    checkPlayersInPortal() {
        if (this.portal.active &&
            this.physics.overlap(this.melody, this.portal) &&
            this.physics.overlap(this.ella, this.portal)) {
            this.portal.active = false;
            this.transitioning = true;
            this.sound.play("teleport")
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("levelText", {
                    text1: "World 3: Monster Territories",
                    text2: "Level 2: Royal Hall of the Daemon Queen",
                    text3: "GOOD JOB!",
                    nextScene: "l9",
                    priorScene: "l8"
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
                        currentScene: "l8"
                    });
                    this.buttons = [];
                    this.blocks = [];
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileActions = [{
                buttonIndex: 0,
                tileX: 18,
                tileY: 13,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 11,
                tileY: 10,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 29,
                tileY: 12,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 30,
                tileY: 12,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 31,
                tileY: 12,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 32,
                tileY: 12,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 2,
                tileX: 33,
                tileY: 12,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 3,
                tileX: 42,
                tileY: 9,
                tile: 38,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 4,
                tileX: 45,
                tileY: 1,
                tile: 24,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 4,
                tileX: 45,
                tileY: 1,
                tile: 19,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? this.front2.removeTileAt(x, y) : this.front2.putTileAt(tile, x, y);
                }
            }, {
                buttonIndex: 5,
                tileX: 34,
                tileY: 15,
                tile: 24,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }

        ];

        tileActions.forEach(({
            buttonIndex,
            tileX,
            tileY,
            layer,
            tile = null,
            action
        }) => {
            const button = this.buttons[buttonIndex];

            if (button) {
                action(button.isPressed, this.groundLayer, tileX, tileY, tile);
            }
        });

    }

    update() {
        this.melody.update();
        this.ella.update();
        this.imp1.update(this.melody, this.ella);
        this.imp2.update(this.melody, this.ella);
        this.spider1.update();
        this.spider2.update();
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));
        this.portal.update(
            this.buttons
              .filter(button => button.type !== 3 && button.type !== 4)
              .every(button => button.isPressed) &&
            this.buttons.some(button => button.type !== 3 && button.type !== 4)
          );
          




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