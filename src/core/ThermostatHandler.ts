import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { AbstractHandler } from './AbstractHandler'
import Request = Alexa.API.Request
import ThermostatRequestPayload = Alexa.API.ThermostatRequestPayload
import Value = Alexa.API.Value

export class ThermostatHandler extends AbstractHandler {
  private readonly defaultTemperature: number = 20
  private readonly defaultThermostatMode: string = 'AUTO'

  constructor(middleware?: MiddlewareService) {
    super(middleware)
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return (
      header.namespace === Interface.THERMOSTAT &&
      [HeaderName.SET_TARGET_TEMPERATURE, HeaderName.SET_THERMOSTAT_MODE, HeaderName.ADJUST_TARGET_TEMPERATURE].some(
        headerName => headerName === header.name
      )
    )
  }

  public getState(request: Request): any {
    const { name } = request.directive.header
    const payload: ThermostatRequestPayload = request.directive.payload as ThermostatRequestPayload
    const { targetSetpoint, thermostatMode } = payload
    return name === HeaderName.SET_TARGET_TEMPERATURE || name === HeaderName.ADJUST_TARGET_TEMPERATURE
      ? targetSetpoint
        ? (targetSetpoint as Value).value
        : this.defaultTemperature
      : thermostatMode
      ? (thermostatMode as Value).value
      : this.defaultThermostatMode
  }
}
