import {ColorUtils} from "../utils/ColorUtils";
import {TimeTickedFunction} from "./TimeTickedFunction";

export class Func extends TimeTickedFunction {
  constructor(config, leds) {
    super(config, leds);
    this.stars = [... Array(this.numberOfLeds)].map(() => [0, 0, 0]);
    this.time = 0;
  }

  drawFrame(draw, done) {
    let decay = this.config.decay;

    for (let i = 0; i < this.numberOfLeds; i++) {
      let [r,g,b] = this.stars[i];
      // Dimm all the lights
      [r, g, b] = [r * decay, g * decay, b * decay];

      // Create new stars
      if (Math.random() < this.config.probability) {
        let [r2, g2, b2] = ColorUtils.HSVtoRGB(0 + Math.random() / 5, Math.random(), Math.random() * 0.5 + 0.5);
        [r, g, b] = [r + r2, g + g2, b + b2];
      }

      this.stars[i] = [r, g, b];
    }
    if(this.config.move) {
      let first = this.stars.shift();
      this.stars.push(first);
    }
    draw(this.stars.map(([r,g,b]) => ColorUtils.dim(ColorUtils.rgbToHex(r, g, b), this.config.brillo)));
  }

  static presets(){
    return {
      pocasSlow: {decay: 0.97, probability: 0.0003},
      pocasFast: {decay: 0.88, probability: 0.02},
      muchasFast: {decay: 0.88, probability: 0.1},
      muchasSlow: {decay: 0.95, probability: 0.06},
    }
  }

  static configSchema() {
    let config = super.configSchema();
    config.decay = {type: Number, min: 0, max: 1, step: 0.005, default: 0.90}
    config.brillo = {type: Number, min: 0, max: 1, step: 0.01, default: 1}
    config.probability = {type: Number, min: 0, max: 1, step: 0.0001, default: 0.001}
    config.move = {type: Boolean, default: false}
    return config;
  }
}