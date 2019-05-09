import Request = Alexa.Request
import Endpoint = Alexa.Endpoint
import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import { Middleware } from '../middleware/Middleware'
import PowerControllerResponse = Alexa.PowerControllerResponse.PowerControllerResponse
import PropertiesItem = Alexa.Misc.PropertiesItem
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { payloadVersion } from './Constants'
import { RequestHandler } from './RequestHandler'
import BrightnessRequestPayload = Alexa.Misc.BrightnessRequestPayload

export class BrightnessHandler implements RequestHandler {
  constructor(private readonly middleware?: Middleware) {}

  public async handle(request: Request): Promise<PowerControllerResponse> {
    const { correlationToken, name } = request.directive.header
    const device: Endpoint = request.directive.endpoint as Endpoint
    const payload: BrightnessRequestPayload = request.directive.payload as BrightnessRequestPayload
    const state: number = (name === HeaderName.ADJUST_BRIGHTNESS
      ? payload.brightnessDelta
      : payload.brightness) as number

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
      header.namespace === Interface.BRIGHTNESS &&
      [HeaderName.ADJUST_BRIGHTNESS, HeaderName.SET_BRIGHTNESS].some(headerName => headerName === header.name)
    )
  }
}
