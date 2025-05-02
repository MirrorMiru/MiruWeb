import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Block from '../../../classes/block.js';
import Portal from '../../../classes/portal.js';
import Window from '../../../classes/window.js';
import Torch from '../../../classes/torch.js';

export default class Level3 extends Phaser.Scene {
    constructor() {
        super("l3");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
     
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world1level3', './levels/tilemaps/w1l3.json');
        this.load.image('cadence-tiles', './levels/tiles/cadence-tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.transitioning = false;
        this.gameOverTriggered = false;
        this.map = this.make.tilemap({
            key: 'world1level3'
        });
        this.tileset = this.map.addTilesetImage('cadence-tiles');
        this.buildingFar = this.map.createLayer('bg', this.tileset).setY(-150);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xdddddd, 0.4);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);
        this.buildingMid = this.map.createLayer('decal-bg', this.tileset).setY(-25);
        this.buildingMid2 = this.map.createLayer('decal-bg-2', this.tileset).setY(-25);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xdddddd, 0.3);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 62, 18);
     
        this.portal.portalEmitter.stop();

        this.melody = new Melody(this, 64, 800);
        this.ella = new Ella(this, 80, 800);

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);

        new Window(this, 24, 15, 0.2);
        new Window(this, 24, 19, 0.2);
        new Window(this, 24, 23, 0.2);
        new Window(this, 24, 27, 0.2);

        new Window(this, 29, 15, 0.2);
        new Window(this, 29, 19, 0.2);
        new Window(this, 29, 23, 0.2);
        new Window(this, 29, 27, 0.2);

        new Window(this, 49, 15, 0.2);
        new Window(this, 49, 18, 0.2);
        new Window(this, 49, 21, 0.2);
        new Window(this, 49, 24, 0.2);
        new Window(this, 49, 27, 0.2);

        new Window(this, 51, 21, 0.2);
        new Window(this, 51, 24, 0.2);
        new Window(this, 51, 27, 0.2);

        new Window(this, 59, 21, 0.2);
        new Window(this, 59, 26, 0.2);

        new Window(this, 63, 21, 0.2);
        new Window(this, 63, 26, 0.2);

        new Torch(this, 8, 25);

        const fogOverlay3 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xcccccc, 0.3);
        fogOverlay3.setOrigin(0);
        fogOverlay3.setScrollFactor(0);

        this.groundLayer.setCollisionBetween(1, 16);
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
        this.cameras.main.setBackgroundColor('#464646');

        this.buildingFar.setScrollFactor(0.15);
        this.buildingMid.setScrollFactor(0.3);
        this.buildingMid2.setScrollFactor(0.3);

        this.lights.enable().setAmbientColor(0x444444);

        this.melody.setPipeline('Light2D');
        this.ella.setPipeline('Light2D');
        this.blocks.forEach(block => block.setPipeline('Light2D'));
        this.buttons.forEach(button => button.setPipeline('Light2D'));
        this.portal.setPipeline('Light2D');
        this.groundLayer.setPipeline('Light2D');
        this.buildingFar.setPipeline('Light2D');
        this.rearDecal.setPipeline('Light2D');
        this.transparent.setPipeline('Light2D');
        this.front.setPipeline('Light2D');
        this.buildingMid.setPipeline('Light2D');
        this.buildingMid2.setPipeline('Light2D');

        this.topLight = this.lights.addLight(this.cameras.main.width / 2, -500, 600)
            .setColor(0xffccaa)
            .setIntensity(0.6);

        // Add light sources for the players
        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffddbb)
            .setIntensity(0.4);

        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffddbb)
            .setIntensity(0.4);

        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l3",
                hint: "Obtain the block and get it to the blue button. \n\n Be observant and look for hidden pathways. \n\n You will have to split up. \n\n Press [R] if you softlock!"
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
                    nextScene: "l3",
                    priorScene: "l3"
                });
            });
        }
        });

    }


    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 31, 22, 3)); //2nd jump -
        this.buttons.push(new Button(this, 34, 22, 3)); //1st jump
        this.buttons.push(new Button(this, 49, 4, 3));
        this.buttons.push(new Button(this, 27, 7, 3));
        this.buttons.push(new Button(this, 49, 18, 2));
    }

    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

        this.blocks.push(new Block(this, 49, 6));
        this.blocks.push(new Block(this, 28, 3));

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
                    text1: "World 2: The Outskirts",
                    text2: "Level 1: The Old Mines",
                    text3: "ONWARDS!",
                    nextScene: "l4",
                    priorScene: "l3"
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
                        currentScene: "l3"
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
            tileX: 33,
            tileY: 8,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 0,
            tileX: 34,
            tileY: 8,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 0,
            tileX: 35,
            tileY: 8,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 1,
            tileX: 45,
            tileY: 11,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 1,
            tileX: 46,
            tileY: 11,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 2,
            tileX: 49,
            tileY: 7,
            tile: 9,
            action: (pressed, layer, x, y) => {
                pressed ? layer.removeTileAt(x, y) : layer.putTileAt(x, y);
            }
        }, {
            buttonIndex: 3,
            tileX: 34,
            tileY: 29,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 3,
            tileX: 35,
            tileY: 19,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }, {
            buttonIndex: 3,
            tileX: 36,
            tileY: 19,
            tile: 9,
            action: (pressed, layer, x, y, tile) => {
                pressed ? layer.putTileAt(tile, x, y) : layer.removeTileAt(x, y);
            }
        }];

        tileActions.forEach(({
            buttonIndex,
            tileX,
            tileY,
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
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));

    this.portal.update(
  this.buttons
    .filter(button => button.type !== 3 && button.type !== 4)
    .every(button => button.isPressed) &&
  this.buttons.some(button => button.type !== 3 && button.type !== 4)
);


        this.topLight.setPosition(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - this.cameras.main.height / 2);

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