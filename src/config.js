const config = {};
config.hueBridgeIp = "192.168.1.157";
config.hueUser = "TIAo58Rvf1bLW-se7AY6iewPGQadiVz924FCrDHa";
config.hueApiRoot = `http://${config.hueBridgeIp}/api/${config.hueUser}/`;
config.stateChangeUrl = `${config.hueApiRoot}groups/0/action`;
config.mp3File = "./sounds/fire.mp3";
config.hasUlt = true;

module.exports = config;
