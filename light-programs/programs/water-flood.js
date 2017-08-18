const SoundBasedFunction = require("./../base-programs/SoundBasedFunction");
const ColorUtils = require("./../utils/ColorUtils");
const _ = require('lodash');

module.exports = class Func extends SoundBasedFunction {
  constructor(config, leds) {
    super(config, leds);

    this.volumes = []
    this.volumeSum = 0

    this.waterLevel = 0.5;
  }

  drawFrame(draw, done) {
    const colors = new Array(this.numberOfLeds)
    const geometry = this.position || this.geometry;

    let vol = this.averageRelativeVolumeSmoothed;

    for (let i = 0; i < this.numberOfLeds; i++) {
      let posY = 1 - (geometry.y[i] / geometry.height);
      let volumeHeight = Math.max(0, (vol+0.1)*(vol+0.1));
      let whiteBorderWidth = 0.95

      if (this.config.whiteBorder && (posY < volumeHeight) && (posY > (volumeHeight*whiteBorderWidth))) {
        colors[i] = "#666666";
      } else if (posY < volumeHeight) {
        let timeY = Math.sin(geometry.y[i] * this.config.escala + this.timeInMs * this.config.velocidad / 50);
        let timeX = Math.sin(geometry.x[i] * this.config.escala + this.timeInMs * this.config.velocidad / 20);
        colors[i] = ColorUtils.HSVtoHex(this.config.color + 0.6 + (timeX * 0.05 + 0.025), 1, timeY+0.7);
      } else {
        colors[i] = "#000000";
      }
    }

    draw(colors)
    done();
  }

  static presets() {
    return {
      "default": {velocidad: 0.4, whiteBorder: true},
      "gold": {velocidad: 0.1, whiteBorder: false, escala: 0.5, color: 0.42}
    }
  }

  // Override and extend config Schema
  static configSchema() {
    let res = super.configSchema();
    res.escala = {type: Number, min: 0.01, max: 5, step: 0.01, default: 1}
    res.color = {type: Number, min: 0, max: 1, step: 0.01, default: 0}
    res.velocidad = {type: Number, min: -3, max: 3, step: 0.01, default: 0.6}
    res.whiteBorder = {type: Boolean, default: false}
    return res;
  }
}