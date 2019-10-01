import { AuthorizationHandler } from './src/core/AuthorizationHandler'
import { BrightnessHandler } from './src/core/BrightnessHandler'
import { ChannelHandler } from './src/core/ChannelHandler'
import { DiscoveryHandler } from './src/core/DiscoveryHandler'
import { PowerHandler } from './src/core/PowerHandler'
import { SkillBuilders } from './src/core/SkillBuilders'
import { SpeakerHandler } from './src/core/SpeakerHandler'
import { StateHandler } from './src/core/StateHandler'
import { ThermostatHandler } from './src/core/ThermostatHandler'
import { Middleware } from './src/middleware/Middleware'

exports.handler = SkillBuilders.smartHome(new Middleware())
  .addRequestHandlers(
    AuthorizationHandler,
    PowerHandler,
    BrightnessHandler,
    ChannelHandler,
    SpeakerHandler,
    DiscoveryHandler,
    StateHandler,
    ThermostatHandler
  )
  .lambda()
