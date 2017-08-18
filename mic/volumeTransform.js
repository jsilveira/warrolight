const Transform = require('stream').Transform;
const util = require("util");

function MeasureVolume(options) {
  const that = this;
  if (options && options.debug) {
    that.debug = options.debug;
    delete options.debug;
  }
  Transform.call(that, options);
}

util.inherits(MeasureVolume, Transform);

MeasureVolume.prototype._transform = function (chunk, encoding, callback) {
  const extra = 0;
  let totalSound = 0;
  for (let i = 0; i < chunk.length; i = i + (2 + extra)) {
    const firstByte = chunk[i + extra];
    const secondByte = chunk[i + 1 + extra];

    let speechSample = firstByte;
    if (secondByte > 128) {
      speechSample = speechSample + (secondByte - 256) * 256;
    } else {
      speechSample = speechSample + secondByte * 256;
    }

    totalSound = Math.max(totalSound, Math.abs(speechSample));
  }

  const volume = totalSound / 32767.0;

  this.emit('volumeSample', volume);

  // console.log("VOLUME", volume);

  this.push(chunk);
  callback();
};

module.exports = MeasureVolume;