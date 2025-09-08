// src/classes/led.js
// LED: static image with strong light, no collider

export default class Led extends Phaser.GameObjects.Image {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x - X position (will be x * 300)
   * @param {number} y - Y position (will be y * 300 - 150)
   * @param {number} color - Hex color for the light (e.g., 0xff0000)
   * @param {number} brightness - Light intensity (e.g., 2.0)
   */
  constructor(scene, x, y, color, brightness) {
    super(scene, x * 300+150, y * 300+150, "led");
    scene.add.existing(this);

    // Set pipeline for lighting
    this.setPipeline("Light2D");

    // Add strong light at this position
    this.light = scene.lights.addLight(this.x, this.y, 700, color, brightness);
  }

  preUpdate() {
    // Keep the light following the LED in case it moves
    if (this.light) {
      this.light.x = this.x;
      this.light.y = this.y;
    }
  }

  destroy(fromScene) {
    if (this.light && this.scene.lights) {
      this.scene.lights.removeLight(this.light);
      this.light = null;
    }
    super.destroy(fromScene);
  }
}
