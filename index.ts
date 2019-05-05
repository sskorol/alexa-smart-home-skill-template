import { AuthorizationHandler } from './src/core/AuthorizationHandler'
import { BrightnessHandler } from './src/core/BrightnessHandler'
import { DiscoveryHandler } from './src/core/DiscoveryHandler'
import { PowerHandler } from './src/core/PowerHandler'
import { SmartHomeSkillBuilder } from './src/core/SmartHomeSkillBuilder'
import { StateHandler } from './src/core/StateHandler'
import { Middleware } from './src/middleware/Middleware'

exports.handler = SmartHomeSkillBuilder.prepare(new Middleware())
  .requestHandlers(AuthorizationHandler, PowerHandler, BrightnessHandler, DiscoveryHandler, StateHandler)
  .buildLambda()
