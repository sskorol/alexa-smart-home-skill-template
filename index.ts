import { AuthorizationHandler } from './src/core/AuthorizationHandler'
import { BrightnessHandler } from './src/core/BrightnessHandler'
import { ChannelHandler } from './src/core/ChannelHandler'
import { DiscoveryHandler } from './src/core/DiscoveryHandler'
import { PowerHandler } from './src/core/PowerHandler'
import { SmartHomeSkillBuilder } from './src/core/SmartHomeSkillBuilder'
import { SpeakerHandler } from './src/core/SpeakerHandler'
import { StateHandler } from './src/core/StateHandler'
import { Middleware } from './src/middleware/Middleware'

exports.handler = SmartHomeSkillBuilder.with(new Middleware())
  .withRequestHandlers(
    AuthorizationHandler,
    PowerHandler,
    BrightnessHandler,
    ChannelHandler,
    SpeakerHandler,
    DiscoveryHandler,
    StateHandler
  )
  .buildLambdaResponse()
