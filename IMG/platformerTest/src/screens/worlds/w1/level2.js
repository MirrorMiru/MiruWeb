import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Torch from '../../../classes/torch.js';

export default class Level2 extends Phaser.Scene {
    constructor() {
        super("l2");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world1level2', './levels/tilemaps/w1l2.json');
        this.load.image('cadence-tiles', './levels/tiles/cadence-tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;

        this.map = this.make.tilemap({
            key: 'world1level2'
        });
        this.tileset = this.map.addTilesetImage('cadence-tiles');

        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        new Torch(this, 2, 20);
        new Torch(this, 8, 20);
        new Torch(this, 8, 6);

        this.buttons = [
            new Button(this, 14, 2, 3),
            new Button(this, 26, 2, 3),
            new Button(this, 35, 21, 1)
        ];

        this.portal = new Portal(this, 37, 20);
     
        this.portal.portalEmitter.stop();
        
        this.melody = new Melody(this, 100, 680);
        this.ella = new Ella(this, 150, 680);

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);

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

        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.bg.setScrollFactor(0.3);
        this.bgDecals.setScrollFactor(0.3);
        this.back.setScrollFactor(0.5);

        this.lights.enable().setAmbientColor(0x444444);

        this.melody.setPipeline('Light2D');
        this.ella.setPipeline('Light2D');
        this.blocks.forEach(block => block.setPipeline('Light2D'));
        this.buttons.forEach(button => button.setPipeline('Light2D'));
        this.portal.setPipeline('Light2D');
        this.groundLayer.setPipeline('Light2D');
        this.back.setPipeline('Light2D');
        this.rearDecal.setPipeline('Light2D');
        this.transparent.setPipeline('Light2D');
        this.front.setPipeline('Light2D');
        this.bg.setPipeline('Light2D');
        this.bgDecals.setPipeline('Light2D');

        this.topLight = this.lights.addLight(this.cameras.main.width / 2, -500, 600)
            .setColor(0xffccaa)
            .setIntensity(0.6);

        // Add light sources for the players
        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffddbb)
            .setIntensity(0.3);

        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffddbb)
            .setIntensity(0.3);

        // Add a slight glow to the buttons and store the lights
   

        // Add a light source for the portal (initially hidden)
      

        this.input.keyboard.on("keydown-ESC", () => {
            if (!this.transitioning) {
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l2",
                hint: "Get to the other side. \n\n Yellow buttons modify terrain, they have no effect on the portal!"
            });
        }
        });

        this.input.keyboard.on("keydown-R", () => {
            if(!this.transitioning) {
            this.sound.play('reset');
            this.transitioning = true;
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.buttons.forEach(b => b.destroy());
                this.blocks.forEach(b => b.destroy());
                this.buttons = [];
                this.blocks = [];
                this.scene.start("levelText", {
                    text1: "we all make mistakes",
                    text2: "lets give it another go!",
                    text3: "OOPS...",
                    nextScene: "l2",
                    priorScene: "l2"
                });
            });
        }
        });
    }

    checkPlayersInPortal() {
        if (
            this.portal.active &&
            this.physics.overlap(this.melody, this.portal) &&
            this.physics.overlap(this.ella, this.portal)
        ) {
            this.transitioning = true;
            this.portal.active = false;
            this.sound.play("teleport")
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("levelText", {
                    text1: "World 1: Cadence",
                    text2: "Level 3: The City of Cadence",
                    text3: "GOOD JOB!",
                    nextScene: "l3",
                    priorScene: "l2"
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const anyPressed = this.buttons.filter(b => b.type === 3).some(b => b.isPressed);
        if (anyPressed) {
            this.groundLayer.putTileAt(12, 21, 5);
            this.groundLayer.putTileAt(13, 22, 5);
        } else {
            this.groundLayer.removeTileAt(21, 5);
            this.groundLayer.removeTileAt(22, 5);
        }
    }

    checkGameOverCondition() {
        const fallLimit = this.map.heightInPixels + 200;
        if (!this.gameOverTriggered && (this.melody.y > fallLimit || this.ella.y > fallLimit)) {
            this.gameOverTriggered = true;
            this.transitioning = true;
            this.cameras.main.shake(150, 0.0025);
            this.sound.play("thud", { volume: 1.5 });
            this.time.delayedCall(500, () => {
                this.cameras.main.fadeOut(500);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start("over", {
                        text1: "press 'R' to give it another go",
                        text2: "press 'Q' to call it quits",
                        text3: "OUCH...",
                        currentScene: "l2"
                    });
                    this.buttons = [];
                    this.blocks = [];
                 
                });
            });
        }
    }

    update() {
        this.melody.update();
        this.ella.update();
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));

        this.updateTilesBasedOnButtonState();

        this.portal.update(
            this.buttons
              .filter(button => button.type !== 3 && button.type !== 4)
              .every(button => button.isPressed) &&
            this.buttons.some(button => button.type !== 3 && button.type !== 4)
          );
          
        // Update the light position to follow the camera
        this.topLight.setPosition(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - this.cameras.main.height / 2);

        this.melodyLight.setPosition(this.melody.x, this.melody.y);
        this.ellaLight.setPosition(this.ella.x, this.ella.y);

        this.checkGameOverCondition();

        const pulse = 0.5 + Math.sin(this.time.now * 0.005) * 0.3;
        this.portal.portalLight.setIntensity(this.portal.active ? pulse : 0);
    
        const midX = (this.melody.x + this.ella.x) / 2;
        const midY = (this.melody.y + this.ella.y) / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, midX - this.cameras.main.width / 2, 0.1);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, midY - this.cameras.main.height / 2, 0.1);
    }
}