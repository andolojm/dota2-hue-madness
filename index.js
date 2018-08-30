const d2gsi = require("dota2-gsi");
const server = new d2gsi();
const shell = require("node-powershell");
const axios = require("axios");

const config = {};
config.hueBridgeIp = "192.168.1.157";
config.hueUser = "TIAo58Rvf1bLW-se7AY6iewPGQadiVz924FCrDHa";
config.hueApiRoot = `http://${config.hueBridgeIp}/api/${config.hueUser}/`;
config.stateChangeUrl = `${config.hueApiRoot}groups/0/action`;
config.mp3File = "./fire.mp3";
config.shell = null;
config.hasUlt = true;

server.events.on("newclient", function(client) {
  console.log("connected");
  config.shell = getPowershell();
  addEventsToClient(client);
  initPolling(client);
});

const initPolling = client => {
  setInterval(() => {
    // console.log(client.gamestate);
  }, 1000);
};

const addEventsToClient = client => {
  // if (client.gamestate.abilities.ability3.cooldown > 0) {
  //   config.hasUlt = false;
  // }

  for (const key in events) {
    client.on(key, events[key]);
  }
};

const events = {
  "player:last_hits": lastHits => {
    console.log(`EARNED LAST HIT #${lastHits}`);
  },
  "hero:level": level => {
    console.log(`Player reached level ${level}`);
  },
  "abilities:ability3:cooldown": cooldown => watchUlt(cooldown)
};

const watchUlt = cooldown => {
  if (cooldown > 0) {
    if (config.hasUlt) {
      ult();
      config.hasUlt = false;
    }
  } else {
    config.hasUlt = true;
  }
};

const ult = async () => {
  console.log("ULTING");

  playSound(config.shell);

  const result = await requestHueStateChange({
    on: true,
    bri: 255,
    sat: 200,
    hue: 3000
  });

  setTimeout(() => {
    requestHueStateChange({ on: false });
  }, 10000);
};

const requestHueStateChange = body => {
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
};

const getPowershell = () => {
  let powershell = new shell({
    executionPolicy: "Bypass",
    noProfile: true
  });
  powershell.addCommand(
    `& 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe'` +
      ` --qt-start-minimized --play-and-exit --qt-notification=0` +
      ` "${config.mp3File}"`
  );
  return powershell;
};

const playSound = powershell => {
  powershell
    .invoke()
    .then(output => {
      console.log(output);
    })
    .catch(err => {
      console.log(err);
      powershell.dispose;
    });
};
