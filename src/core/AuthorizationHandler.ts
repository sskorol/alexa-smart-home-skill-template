import * as uuid4 from 'uuid/v4'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { RequestHandler } from './RequestHandler'
import Request = Alexa.API.Request
import Response = Alexa.API.Response

export class AuthorizationHandler implements RequestHandler {
  public handle(request: Request): Response {
    return {
      event: {
        header: {
          namespace: Interface.AUTHORIZATION,
          name: HeaderName.ACCEPT_GRANT_RESPONSE,
          payloadVersion: request.directive.header.payloadVersion,
          messageId: uuid4()
        },
        payload: {}
      }
    }
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return header.namespace === Interface.AUTHORIZATION && header.name === HeaderName.ACCEPT_GRANT
  }
}
