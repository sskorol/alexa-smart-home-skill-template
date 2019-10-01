import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import Request = Alexa.API.Request
import BrightnessRequestPayload = Alexa.API.BrightnessRequestPayload
import { AbstractHandler } from './AbstractHandler'

export class BrightnessHandler extends AbstractHandler {
  constructor(middleware?: MiddlewareService) {
    super(middleware)
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return (
      header.namespace === Interface.BRIGHTNESS &&
      [HeaderName.ADJUST_BRIGHTNESS, HeaderName.SET_BRIGHTNESS].some(headerName => headerName === header.name)
    )
  }

  public getState(request: Request): any {
    const { name } = request.directive.header
    const payload: BrightnessRequestPayload = request.directive.payload as BrightnessRequestPayload
    return (name === HeaderName.ADJUST_BRIGHTNESS ? payload.brightnessDelta : payload.brightness) as number
  }
}
