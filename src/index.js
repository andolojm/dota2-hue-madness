const d2gsi = require("dota2-gsi");
const server = new d2gsi();
const events = require("./events");

server.events.on("newclient", function(client) {
  console.log("Connected");
  addEventsToClient(client);
  initPolling(client);
});

/* Actions to take every second
   - Useful for debugging & reading game state */
const initPolling = client => {
  setInterval(() => {
    doEverySecond(client.gamestate);
  }, 1000);
};

const doEverySecond = gamestate => {
  // console.log(gamestate);
};

const addEventsToClient = client => {
  for (const key in events) {
    client.on(key, events[key]);
  }
};
