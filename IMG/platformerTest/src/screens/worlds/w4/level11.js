import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Spike from '../../../classes/spike.js';


export default class Level11 extends Phaser.Scene {
    constructor() {
        super("l11");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;

    }

    preload() {
        this.load.tilemapTiledJSON('world4level2', './levels/tilemaps/w4l2.json');
        this.load.image('egypt_tiles', './levels/tiles/egypt_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;

        this.cameras.main.setBackgroundColor(0xa5faf4);



        this.map = this.make.tilemap({
            key: 'world4level2'
        });
        this.tileset = this.map.addTilesetImage('egypt_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 57, 13);
   
        this.portal.portalEmitter.stop();



        this.melody = new Melody(this, 4 * 32, 22 * 32);
        this.ella = new Ella(this, 4 * 32, 22 * 32);


        new Spike(this, 26, 4, 1, 0);
        new Spike(this, 27, 4, 1, 0);
        new Spike(this, 28, 4, 1, 0);

        new Spike(this, 43, 4, 1, 0);

        new Spike(this, 34, 12, 0, -16).setFlipY(true);
        new Spike(this, 35, 12, 0, -16).setFlipY(true);
        new Spike(this, 36, 12, 1, -16).setFlipY(true);




        this.spider = new Spider(this, 43, 4, 41, 45);

        this.spider2 = new Spider(this, 51, 5, 50, 52);

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);




        this.groundLayer.setCollisionBetween(1, 999);
        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);

        this.physics.add.collider(this.melody, this.spider, () => {
            this.spider.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider, () => {
            this.spider.knockbackPlayer(this.ella);
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

        this.lights.enable().setAmbientColor(0xfffadb);


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
                scene: "l11",
                hint: "To reach the wooden platform, press the yellow button and jump from the new platform to the slanted roof, then to the block atop the pillar.\nFrom there, make the tight jump and push the block down to the left to let the 2nd player reach the roof and join you.\n\nThen help each other platform to the right side of the screen."
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
                    nextScene: "l11",
                    priorScene: "l11"
                });
            });
        }
        });




    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 31, 26, 3));
        this.buttons.push(new Button(this, 35, 10, 3));
        this.buttons.push(new Button(this, 23, 8, 3));
        this.buttons.push(new Button(this, 57, 9, 1));



    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

        this.blocks.push(new Block(this,28,13))

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
                    text1: "World 4: Southern Desert",
                    text2: "Level 3: Temple of Anubis",
                    text3: "GOOD JOB!",
                    nextScene: "l12",
                    priorScene: "l11"
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
                        currentScene: "l11"
                    });
                    this.buttons = [];
                    this.blocks = [];
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileGroups = [
            {
                tileX: 41,
                tileY: 23,
                tile: 32,
                layer: this.groundLayer,
                buttons: [0]
            },
            {
                tileX: 27,
                tileY: 11,
                tile: 32,
                layer: this.groundLayer,
                buttons: [1, 2] // Both buttons affect this tile
            }
        ];
    
        tileGroups.forEach(({ tileX, tileY, layer, tile, buttons }) => {
            // Check if ANY of the assigned buttons are pressed
            const isActive = buttons.some(buttonIndex => this.buttons[buttonIndex]?.isPressed);
    
            if (isActive) {
                layer.putTileAt(tile, tileX, tileY);
            } else {
                layer.removeTileAt(tileX, tileY);
            }
        });
    }
    
    

    update() {
        this.melody.update();
        this.ella.update();
        this.spider.update();
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