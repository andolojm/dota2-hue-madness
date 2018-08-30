const config = require("./config");
const shell = require("node-powershell");
const axios = require("axios");

module.exports = {
  requestHueStateChange: body => {
    return new Promise((resolve, reject) => {
      axios
        .put(config.stateChangeUrl, body)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  playSound: async () => {
    const powershell = new shell({
      executionPolicy: "Bypass",
      noProfile: true
    });

    powershell.addCommand(
      `& 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe'` +
        ` --qt-start-minimized --play-and-exit --qt-notification=0` +
        ` "${config.mp3File}"`
    );

    const output = await powershell.invoke();
    console.log(output);

    // TODO this is definitely a memory leak. Dispose somehow.
    // The below line doesn't seem to work, just crashes the whole thing.
    // powershell.dispose();
  }
};
