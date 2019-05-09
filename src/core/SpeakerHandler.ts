import Request = Alexa.Request
import Endpoint = Alexa.Endpoint
import PowerControllerResponse = Alexa.PowerControllerResponse.PowerControllerResponse
import PropertiesItem = Alexa.Misc.PropertiesItem
import SpeakerRequestPayload = Alexa.Misc.SpeakerRequestPayload
import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import { Middleware } from '../middleware/Middleware'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { payloadVersion } from './Constants'
import { RequestHandler } from './RequestHandler'

export class SpeakerHandler implements RequestHandler {
  constructor(private readonly middleware?: Middleware) {}

  public async handle(request: Request): Promise<PowerControllerResponse> {
    const { correlationToken, name } = request.directive.header
    const device: Endpoint = request.directive.endpoint as Endpoint
    const payload: SpeakerRequestPayload = request.directive.payload as SpeakerRequestPayload
    const state: boolean | number | undefined =
      name === HeaderName.SET_VOLUME || name === HeaderName.ADJUST_VOLUME ? payload.volume : payload.mute

    const properties: PropertiesItem[] = []

    if (this.middleware) {
      await this.middleware.sendMessage(device.endpointId, [{ command: name, state }])
      const discoveryResponse: AxiosResponse<PropertiesItem[]> = await this.middleware.reportState(device.endpointId)
      properties.push(...discoveryResponse.data)
    }

    return {
      context: {
        properties
      },
      event: {
        header: {
          namespace: Interface.ALEXA,
          name: HeaderName.RESPONSE,
          payloadVersion,
          messageId: uuid4(),
          correlationToken
        },
        endpoint: request.directive.endpoint as Endpoint,
        payload: {}
      }
    }
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
}
