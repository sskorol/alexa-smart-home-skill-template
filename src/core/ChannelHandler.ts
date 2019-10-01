import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import Request = Alexa.API.Request
import { AbstractHandler } from './AbstractHandler'
import BrightnessRequestPayload = Alexa.API.BrightnessRequestPayload

export class ChannelHandler extends AbstractHandler {
  constructor(middleware?: MiddlewareService) {
    super(middleware)
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return (
      header.namespace === Interface.CHANNEL &&
      [HeaderName.CHANGE_CHANNEL, HeaderName.SKIP_CHANNELS].some(headerName => headerName === header.name)
    )
  }

  public getState(request: Request): any {
    const { name } = request.directive.header
    const payload: BrightnessRequestPayload = request.directive.payload as BrightnessRequestPayload
    return (name === HeaderName.ADJUST_BRIGHTNESS ? payload.brightnessDelta : payload.brightness) as number
  }
}
