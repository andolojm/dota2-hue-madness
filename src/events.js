const triggers = require("./triggers");

module.exports = {
  "player:last_hits": lastHits => triggers.watchLastHits(lastHits),
  "hero:level": level => {
    console.log(`Player reached level ${level}`);
  },
  "abilities:ability3:cooldown": cooldown => triggers.watchUlt(cooldown),
  "hero:respawn_seconds": seconds => triggers.watchDeath(seconds)
};
