const triggers = require("./triggers");

module.exports = {
  "player:last_hits": lastHits => {
    console.log(`EARNED LAST HIT #${lastHits}`);
  },
  "hero:level": level => {
    console.log(`Player reached level ${level}`);
  },
  "abilities:ability3:cooldown": cooldown => triggers.watchUlt(cooldown)
};
