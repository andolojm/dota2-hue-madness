## Setup

- Set up a user for your Hue bridge: [Hue Documentation](https://www.developers.meethue.com/documentation/getting-started)
- Configure the Hue user, Hue bridge IP, and anything else needed in `src/config.js`
- Create a `gamestate_integration` folder within dota 2's `cfg` directory. The default install location should be:
  - `C:\Program Files (x86)\Steam\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration`
- Create a file titled `gamestate_integration_<NAME>.cfg`, where `<NAME>` = the name if your application. The file's contents should match the below.
- Run the app with `yarn install && yarn start`

The code assumes that powershell is available to play sounds.

```json
"dota2-gsi Configuration"
{
    "uri"               "http://localhost:3000/"
    "timeout"           "5.0"
    "buffer"            "0.1"
    "throttle"          "0.1"
    "heartbeat"         "30.0"
    "data"
    {
        "buildings"     "1"
        "provider"      "1"
        "map"           "1"
        "player"        "1"
        "hero"          "1"
        "abilities"     "1"
        "items"         "1"
        "draft"         "1"
        "wearables"     "1"
    }
    "auth"
    {
        "token"         "hello1234"
    }
}
```

## Extending the code

- index.js starts a listener that recieves dota 2 game state
- events.js feeds events to listener, containing triggers (I.e. Trigger on `hero_level` field change)
- triggers.js contains logic to determine when to fire actions (I.e. Determine when a hero has ulted based on `cooldown` fields)
- actions.js contains display logic to take action based on the triggers (I.e. Red lights when a hero dies, until they respawn)
- io.js contains reusable calls to change lighting, play sound, etc. outside of the dota game
