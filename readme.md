## Design

- index.js starts a listener that recieves dota 2 game state
- events.js feeds events to listener, containing triggers (I.e. Trigger on `hero_level` field change)
- triggers.js contains logic to determine when to fire actions (I.e. Determine when a hero has ulted based on `cooldown` fields)
- actions.js contains display logic to take action based on the triggers (I.e. Red lights when a hero dies, until they respawn)
- io.js contains reusable calls to change lighting, play sound, etc. outside of the dota game
