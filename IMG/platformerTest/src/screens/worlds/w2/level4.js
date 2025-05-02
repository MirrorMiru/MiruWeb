import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Spike from '../../../classes/spike.js';

export default class Level4 extends Phaser.Scene {
    constructor() {
        super("l4");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
  
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world2level1', './levels/tilemaps/w2l1.json');
        this.load.image('outskirts-tiles', './levels/tiles/outskirts-tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;
        this.scene.get('OSTManager').crossfadeTo('world2', 500);

        this.cameras.main.setBackgroundColor(0xB3E5FC);
        this.background = this.add.image(0, 0, 'outskirtsSky').setOrigin(0, 0);
        this.background.setScrollFactor(0);


        this.map = this.make.tilemap({
            key: 'world2level1'
        });
        this.tileset = this.map.addTilesetImage('outskirts-tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xdddddd, 0.2);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xdddddd, 0.15);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);


        this.fog2 = this.add.tileSprite(1440, this.map.heightInPixels - 100, this.map.widthInPixels, 1000, 'fog').setAlpha(0.1);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);

        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 86, 5);
        
        this.portal.portalEmitter.stop();



        this.melody = new Melody(this, 5 * 32, 520);
        this.ella = new Ella(this, 6 * 32, 520);

        new Spike(this, 65, 9,0,0).setPipeline('Light2D');
        new Spike(this, 67, 9,0,0).setPipeline('Light2D');
        new Spike(this, 69, 9,1,0).setPipeline('Light2D');
        new Spike(this, 71, 9,0,0).setPipeline('Light2D');

        new Spike(this, 63, 1,1,0).setPipeline('Light2D');
        new Spike(this, 64, 1,1,0).setPipeline('Light2D');
        new Spike(this, 65, 1,1,0).setPipeline('Light2D');
        new Spike(this, 66, 1,0,0).setPipeline('Light2D');
        new Spike(this, 67, 1,1,0).setPipeline('Light2D');
        new Spike(this, 68, 1,0,0).setPipeline('Light2D');

        new Spike(this, 68, 4,1,0).setPipeline('Light2D');
        new Spike(this, 65, 3,1,-16).setPipeline('Light2D').setFlipY(true);
        new Spike(this, 64, 3,0,-16).setPipeline('Light2D').setFlipY(true);

        new Spike(this, 55, 4,0,0).setPipeline('Light2D');
        new Spike(this, 56, 4,0,0).setPipeline('Light2D');
        new Spike(this, 57, 4,1,0).setPipeline('Light2D');

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);
        new Banner(this, 65, 5).setPipeline('Light2D');
        new Banner(this, 67, 5).setPipeline('Light2D');
        new Banner(this, 69, 5).setPipeline('Light2D');
        new Banner(this, 71, 5).setPipeline('Light2D');
        this.fog1 = this.add.tileSprite(1440, this.map.heightInPixels - 200, this.map.widthInPixels, 600, 'fog').setAlpha(0.6);



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
            this.physics.add.overlap(this.melody, button, this.handleButtonPress, null, this);
            this.physics.add.overlap(this.ella, button, this.handleButtonPress, null, this);
            this.physics.add.overlap(this.blocks, button, this.handleButtonPress, null, this);
        });

        this.physics.add.overlap(this.melody, this.portal, this.checkPlayersInPortal, null, this);
        this.physics.add.overlap(this.ella, this.portal, this.checkPlayersInPortal, null, this);

        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.bg.setScrollFactor(0.3);
        this.back.setScrollFactor(0.5);

        this.lights.enable().setAmbientColor(0x252c45);


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
            .setIntensity(0.3);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.3);

        this.sunlight = this.lights.addLight(0, -32, 2000)
            .setColor(0xfeffbb)
            .setIntensity(10);

        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l4",
                hint: "Get to the red button. \n\n Simple platforming, the longer you hold jump the higher you go. \n\n Avoid the dangerous looking buttons!"
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
                    nextScene: "l4",
                    priorScene: "l4"
                });
            });
        }
        });



    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 35, 10, 1));
        this.buttons.push(new Button(this, 74, 6, 4));
    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];
    }

    handleButtonPress(playerOrBlock, button) {
        button.press();

        if (button.type === 4) {
            for (let y = 15; y <= 24; y++) {
                this.groundLayer.removeTileAt(75, y);
            }
        }
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
                    text2: "Level 2: Old Village in the Abyss",
                    text3: "GOOD JOB!",
                    nextScene: "l5",
                    priorScene: "l4"
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
                        currentScene: "l4"
                    });
                    this.buttons = [];
                    this.blocks = [];
                
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileActions = [{}];

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
          

        this.sunlight.setPosition((this.cameras.main.midPoint.x), -200);



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