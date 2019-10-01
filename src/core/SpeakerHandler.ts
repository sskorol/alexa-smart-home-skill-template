import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import Request = Alexa.API.Request
import SpeakerRequestPayload = Alexa.API.SpeakerRequestPayload
import { AbstractHandler } from './AbstractHandler'

export class SpeakerHandler extends AbstractHandler {
  constructor(middleware?: MiddlewareService) {
    super(middleware)
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return (
      header.namespace === Interface.SPEAKER &&
      [HeaderName.ADJUST_VOLUME, HeaderName.SET_VOLUME, HeaderName.SET_MUTE].some(
        headerName => headerName === header.name
      )
    )
  }

  public getState(request: Request): any {
    const { name } = request.directive.header
    const payload: SpeakerRequestPayload = request.directive.payload as SpeakerRequestPayload
    return name === HeaderName.SET_VOLUME || name === HeaderName.ADJUST_VOLUME ? payload.volume : payload.mute
  }
}
