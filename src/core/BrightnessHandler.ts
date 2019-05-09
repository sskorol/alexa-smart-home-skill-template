import Request = Alexa.Request
import Endpoint = Alexa.Endpoint
import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import BrightnessRequestPayload = Alexa.REST.BrightnessRequestPayload
import { MiddlewareService } from '../middleware/MiddlewareService'
import Response = Alexa.GenericController.Response
import PropertiesItem = Alexa.REST.PropertiesItem
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { payloadVersion } from './Constants'
import { RequestHandler } from './RequestHandler'

export class BrightnessHandler implements RequestHandler {
  constructor(private readonly middleware?: MiddlewareService) {}

  public async handle(request: Request): Promise<Response> {
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
