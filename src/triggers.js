const config = require("./config");
const actions = require("./actions");

// } TODO find a way to not ult if script starts while ult is on CD
module.exports = {
  watchUlt: cooldown => {
    if (cooldown > 0) {
      if (config.hasUlt) {
        actions.ult();
        config.hasUlt = false;
      }
    } else {
      config.hasUlt = true;
    }
  }
};
