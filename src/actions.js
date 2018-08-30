const config = require("./config");
const io = require("./io");

module.exports = {
  ult: async () => {
    console.log("ULTING");

    io.playSound();

    const result = await io.requestHueStateChange({
      on: true,
      bri: 255,
      sat: 200,
      hue: 3000
    });

    setTimeout(() => {
      io.requestHueStateChange({ on: false });
    }, 10000);
  }
};
