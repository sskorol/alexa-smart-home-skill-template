import { AxiosResponse } from 'axios'
import * as uuid4 from 'uuid/v4'
import Endpoint = Alexa.Endpoint
import { Middleware } from '../middleware/Middleware'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import StateReport = Alexa.StateReport.StateReport
import PropertiesItem = Alexa.StateReport.PropertiesItem
import Request = Alexa.Request
import { RequestHandler } from './RequestHandler'

export class StateHandler implements RequestHandler {
  constructor(private readonly middleware?: Middleware) {}

  public async handle(request: Request): Promise<StateReport> {
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
          payloadVersion: header.payloadVersion,
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
