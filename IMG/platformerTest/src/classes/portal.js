class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, (x * 32) + 16, (y * 32) + 32, "port");
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.setScale(1);
        this.body.setSize(32, 64);
        this.body.setOffset(0, 16);

        this.scene = scene;

        this.active = false;
        this.setFrame(0);

        this.portalEmitter = scene.add.particles(this.x, this.y, 'blue', {
            speed: {
                min: -20,
                max: 20
            },
            angle: {
                min: 0,
                max: 360
            },
            scale: {
                start: 0.7,
                end: 0
            },
            alpha: {
                start: 0.8,
                end: 0
            },
            lifespan: 2000,
            frequency: 300,
            quantity: 1,

        });

        this.portalLight = scene.lights.addLight(this.x, this.y, 150)
        .setColor(0x3399ff)
        .setIntensity(0);
    }

    static loadAnimations(scene) {
        scene.anims.create({
            key: "activate",
            frames: scene.anims.generateFrameNumbers("port", { start: 0, end: 10 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: "deactivate",
            frames: scene.anims.generateFrameNumbers("port", { start: 0, end: 10 }).reverse(),
            frameRate: 10,
            repeat: 0
        });
    }

    activate() {
        if (!this.active && this.anims.currentAnim?.key !== "activate") {
            this.scene.sound.play("portalO");
            this.play("activate", true);
            this.active = true;
        }
    }

    deactivate() {
        if (this.active && this.anims.currentAnim?.key !== "deactivate") {
            this.play("deactivate", true);
            this.scene.sound.play("portalC")
            this.once("animationcomplete-deactivate", () => {
                this.active = false;
            });
        }
    }

    update(activeSignal) {
        if (activeSignal == true) {
            this.activate();
            this.portalEmitter.start();
        } else {
            this.deactivate();
            this.portalEmitter.stop();
        }
    }
}

export default Portal;
