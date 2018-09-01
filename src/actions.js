const config = require("./config");
const io = require("./io");

module.exports = {
  ult: async () => {
    console.log("Player Ulted");

    // io.playSound();

    const result = await io.requestHueStateChange({
      on: true,
      bri: 255,
      sat: 222,
      hue: 35000
    });

    setTimeout(() => {
      io.requestHueStateChange({ on: false });
    }, 2500);
  },

  die: async () => {
    console.log("Player Died");

    // io.playSound();

    io.requestHueStateChange({
      on: true,
      bri: 255,
      sat: 255,
      hue: 0
    });
  },

  respawn: async () => {
    console.log("Player Respawned");

    // io.playSound();

    io.requestHueStateChange({
      on: false
    });
  },

  lastHit: async () => {
    console.log("Player earned last hit");

    // io.playSound();

    const result = await io.requestHueStateChange({
      on: true,
      bri: 140,
      sat: 255,
      hue: 7999
    });

    setTimeout(() => {
      io.requestHueStateChange({ on: false });
    }, 1000);
  }
};
