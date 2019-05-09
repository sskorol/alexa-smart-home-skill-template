import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import { MiddlewareService } from '../middleware/MiddlewareService'
import Request = Alexa.Request
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import Response = Alexa.Discovery.Response
import EndpointsItem = Alexa.Discovery.EndpointsItem
import { RequestHandler } from './RequestHandler'

export class DiscoveryHandler implements RequestHandler {
  constructor(private readonly middleware?: MiddlewareService) {}

  public async handle(request: Request): Promise<Response> {
    const endpoints: EndpointsItem[] = []

    if (this.middleware) {
      const discoveryResponse: AxiosResponse<EndpointsItem[]> = await this.middleware.getDevices()
      endpoints.push(...discoveryResponse.data)
    }

    return {
      event: {
        header: {
          namespace: Interface.DISCOVERY,
          name: HeaderName.DISCOVER_RESPONSE,
          payloadVersion: request.directive.header.payloadVersion,
          messageId: uuid4()
        },
        payload: {
          endpoints
        }
      }
    }
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return header.namespace === Interface.DISCOVERY && header.name === HeaderName.DISCOVER
  }
}
