import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';

export default class Level6 extends Phaser.Scene {
    constructor() {
        super("l6");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world2level3', './levels/tilemaps/w2l3.json');
        this.load.image('outskirts-tiles', './levels/tiles/outskirts-tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;

        this.cameras.main.setBackgroundColor(0xB3E5FC);



        this.map = this.make.tilemap({
            key: 'world2level3'
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


        this.fog2 = this.add.tileSprite(this.map.widthInPixels / 2, this.map.heightInPixels - 100, this.map.widthInPixels, 1000, 'fog').setAlpha(0.2);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);

        this.groundLayer = this.map.createLayer('ground', this.tileset);



        this.createButtons();
        // this.createBadButtons(); // Create bad buttons
        this.createBlocks();

        this.portal = new Portal(this, 62, 7);
 
        this.portal.portalEmitter.stop(); // initially disabled



        this.melody = new Melody(this, 5 * 32, 8 * 32);
        this.ella = new Ella(this, 6 * 32, 8 * 32);

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);

        new Window(this, 1, 23, 0.6);
        new Window(this, 5, 25, 0.6);
        new Window(this, 1, 27, 0.6);
        new Window(this, 1, 29, 0.6);
        new Window(this, 5, 36, 0.6);
        new Window(this, 3, 38, 0.6);
        new Window(this, 57, 32, 0.6);
        new Window(this, 57, 38, 0.6);
        new Window(this, 67, 26, 0.6);
        new Window(this, 67, 28, 0.6);
        new Window(this, 67, 30, 0.6);
        new Window(this, 68, 38, 0.6);


        // new Banner(this, 65,5).setPipeline('Light2D');
        // new Banner(this,67,5).setPipeline('Light2D');
        // new Banner(this,69,5).setPipeline('Light2D');
        // new Banner(this,71,5).setPipeline('Light2D');
        this.fog1 = this.add.tileSprite(this.map.widthInPixels / 2, this.map.heightInPixels - 200, this.map.widthInPixels, 600, 'fog').setAlpha(0.6);



        this.groundLayer.setCollisionBetween(1, 999);
        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);

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

        this.lights.enable().setAmbientColor(0xfff5b5);


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

        this.gradient = this.add.image(this.map.widthInPixels / 2, this.map.heightInPixels / 2, 'grad4').setAlpha(0.7);
        this.gradient.scaleX = 10;
        this.gradient.scaleY = 0.5;
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
                scene: "l6",
                hint: "Stack 3 blocks for the blue button.\n\n Remember to press [R] if you softlock!"
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
                    nextScene: "l6",
                    priorScene: "l6"
                });
            });
        }
        });



    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 21, 30, 2));
        this.buttons.push(new Button(this, 44, 27, 3));

    }


    createBlocks() {
        // Clean up old blocks
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];
    
        // Create new block instances
        this.blocks.push(new Block(this, 23, 23));
        this.blocks.push(new Block(this, 30, 16));
        this.blocks.push(new Block(this, 11, 17));
        this.blocks.push(new Block(this, 59, 12));
    
        // Handle block-to-block interaction (dynamic <-> staticCore)
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
                    text2: "Level 1: Abandoned Campsite",
                    text3: "ONWARDS!",
                    nextScene: "l7",
                    priorScene: "l6"
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
                        currentScene: "l6"
                    });
                    this.buttons = [];
                    this.blocks = [];
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileActions = [{
                buttonIndex: 1,
                tileX: 53,
                tileY: 20,
                tile: 26,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 54,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 55,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 56,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 57,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 58,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 59,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 60,
                tileY: 20,
                tile: 25,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
                }
            }, {
                buttonIndex: 1,
                tileX: 61,
                tileY: 20,
                tile: 33,
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
        this.fog1.tilePositionX += 0.5;
        this.fog2.tilePositionX += 1;
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