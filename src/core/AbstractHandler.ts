import { AxiosResponse } from 'axios'
import Endpoint = Alexa.API.Endpoint
import * as uuid4 from 'uuid/v4'
import PropertiesItem = Alexa.API.PropertiesItem
import Response = Alexa.API.Response
import Request = Alexa.API.Request
import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { API_VERSION } from './Constants'
import { RequestHandler } from './RequestHandler'

export abstract class AbstractHandler implements RequestHandler {
  protected constructor(private readonly middleware?: MiddlewareService) {}

  public async handle(request: Request): Promise<Response> {
    const { correlationToken, name } = request.directive.header
    const device: Endpoint = request.directive.endpoint as Endpoint

    const properties: PropertiesItem[] = []

    if (this.middleware) {
      const discoveryResponse: AxiosResponse<PropertiesItem[]> = await this.middleware.sendMessage(device.endpointId, [
        { command: name, value: this.getState(request) }
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

  public abstract canHandle(request: Request): boolean

  public abstract getState(request: Request): any
}
