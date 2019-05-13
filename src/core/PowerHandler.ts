import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { API_VERSION } from './Constants'
import { RequestHandler } from './RequestHandler'
import Request = Alexa.API.Request
import Response = Alexa.API.Response
import Endpoint = Alexa.API.Endpoint
import PropertiesItem = Alexa.API.PropertiesItem

export class PowerHandler implements RequestHandler {
  constructor(private readonly middleware?: MiddlewareService) {}

  public async handle(request: Request): Promise<Response> {
    const { correlationToken, name } = request.directive.header
    const device: Endpoint = request.directive.endpoint as Endpoint
    const state: boolean = name === HeaderName.TURN_ON

    const properties: PropertiesItem[] = []

    if (this.middleware) {
      const discoveryResponse: AxiosResponse<PropertiesItem[]> = await this.middleware.sendMessage(device.endpointId, [
        { command: name, state }
      ])
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
          payloadVersion: API_VERSION,
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
      header.namespace === Interface.POWER &&
      [HeaderName.TURN_ON, HeaderName.TURN_OFF].some(headerName => headerName === header.name)
    )
  }
}
