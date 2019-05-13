import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { API_VERSION } from './Constants'
import { RequestHandler } from './RequestHandler'
import Request = Alexa.API.Request
import Response = Alexa.API.Response
import PropertiesItem = Alexa.API.PropertiesItem
import Endpoint = Alexa.API.Endpoint

export class StateHandler implements RequestHandler {
  constructor(private readonly middleware?: MiddlewareService) {}

  public async handle(request: Request): Promise<Response> {
    const { directive } = request
    const { header, endpoint } = directive

    const properties: PropertiesItem[] = []
    if (this.middleware && endpoint) {
      const stateResponse: AxiosResponse<PropertiesItem[]> = await this.middleware.reportState(endpoint.endpointId)
      properties.push(...stateResponse.data)
    }

    return {
      context: {
        properties
      },
      event: {
        header: {
          namespace: Interface.ALEXA,
          name: HeaderName.STATE_REPORT,
          payloadVersion: API_VERSION,
          messageId: uuid4(),
          correlationToken: header.correlationToken
        },
        endpoint: directive.endpoint as Endpoint,
        payload: {}
      }
    }
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return header.namespace === Interface.ALEXA && header.name === HeaderName.REPORT_STATE
  }
}
