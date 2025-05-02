// src/screens/cutscene.js
class CutsceneScene extends Phaser.Scene {
    constructor() {
      super('Cutscene');
      this.transitioning = false;
    }
  
    create(data) {
      this.transitioning = false;
      // data.text: string or array of lines
      // data.priorScene: key of the scene to pause/stop
      // data.nextScene: key of the scene to start when done
  
      this.prior = data.priorScene;
      this.next = data.nextScene;
      this.scrollingDone = false;
      this.scene.get('OSTManager').crossfadeTo('cutscene', 500);
      // pause whatever was running
      this.scene.stop(this.prior);
      // fade in
      this.cameras.main.fadeIn(500, 0, 0, 0);
  
      // set up a masked “window”
      const maskZone = this.add.zone(400, 300, 700, 400).setOrigin(0.5);
      const shape = this.make.graphics();
      shape.fillStyle(0xffffff);
      shape.fillRect(
        maskZone.x - maskZone.width / 2,
        maskZone.y - maskZone.height / 2,
        maskZone.width,
        maskZone.height
      );
      const mask = shape.createGeometryMask();
  
      // assemble the text
      const rawText = Array.isArray(data.text)
        ? data.text.join('\n')
        : data.text;
      const textObj = this.add
        .text(
          400,
          maskZone.y + maskZone.height / 2,
          rawText,
          {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: maskZone.width - 20 }
          }
        )
        .setOrigin(0.5, 0)
        .setMask(mask);
  
      // calculate scroll distance & duration (30px/sec)
      const distance = textObj.height + maskZone.height;
      const duration = (distance / 30) * 1000;
  
      this.tweens.add({
        targets: textObj,
        y: maskZone.y - maskZone.height / 2 - textObj.height,
        ease: 'Linear',
        duration,
        onComplete: () => this.onScrollComplete()
      });
  
      // skip hint top-right
      this.add
        .text(780, 20, 'Press [S] to skip', {
          fontSize: '16px',
          fill: '#ff4444',
          stroke: '#000000',
          strokeThickness: 3
        })
        .setOrigin(1, 0);
  
      // key handlers
      this.input.keyboard.on('keydown-S', () => this.endCutscene());
      this.input.keyboard.on('keydown-SPACE', () => {
        if (this.scrollingDone) {
          this.endCutscene();
        }
      });
    }
  
    onScrollComplete() {
      this.scrollingDone = true;
      this.spacePrompt = this.add
        .text(400, 500, 'Press [SPACE] to continue', {
          fontSize: '20px',
          fill: '#ffff00',
          stroke: '#000000',
          strokeThickness: 4
        })
        .setOrigin(0.5)
        .setAlpha(0);
  
      this.tweens.add({
        targets: this.spacePrompt,
        alpha: 1,
        duration: 500
      });
    }
  
    endCutscene() {
      // fade out, then stop prior & start next
      if(!this.transitioning){
      this.transitioning = true;
      this.sound.play('ui');
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.stop(this.prior);
        this.scene.start(this.next);
      });
    }
    }
  }
  
  export default CutsceneScene;
  