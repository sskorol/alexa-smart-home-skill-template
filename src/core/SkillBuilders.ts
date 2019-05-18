import * as uuid4 from 'uuid/v4'
import { MiddlewareService } from '../middleware/MiddlewareService'
import { ErrorType } from '../model/ErrorType'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { createLogger, Logger } from '../utils/Logger'
import { API_VERSION } from './Constants'
import { RequestHandler } from './RequestHandler'
import Request = Alexa.API.Request
import Response = Alexa.API.Response
import Context = Alexa.API.Context

const logger: Logger = createLogger('SkillBuilders')

export class SkillBuilders {
  public static smartHome(middleware?: MiddlewareService): SkillBuilders {
    return new SkillBuilders(middleware)
  }

  private readonly handlers: Array<new (middleware?: MiddlewareService) => RequestHandler> = []

  constructor(private readonly middleware?: MiddlewareService) {}

  public addRequestHandlers<T extends RequestHandler>(...handlers: Array<new () => RequestHandler>): SkillBuilders {
    this.handlers.push(...handlers)
    return this
  }

  public lambda(): (request: Request, context: Context) => Promise<Response> {
    return async (request: Request, context: Context) => {
      let response: Response

      logger.info('[REQUEST]', JSON.stringify(request), JSON.stringify(context))

      const requestHandler: RequestHandler | undefined = this.handlers
        .map(Handler => new Handler(this.middleware))
        .find(handler => handler.canHandle(request))

      if (requestHandler) {
        response = await requestHandler.handle(request)
      } else {
        response = {
          event: {
            header: {
              namespace: Interface.ALEXA,
              name: HeaderName.ERROR_RESPONSE,
              payloadVersion: API_VERSION,
              messageId: uuid4(),
              correlationToken: uuid4()
            },
            endpoint: request.directive.endpoint,
            payload: {
              type: ErrorType.INTERNAL_ERROR,
              message: 'Sorry, but I cannot process your request right now. Try again later.'
            }
          }
        }
      }

      logger.info('[RESPONSE]', JSON.stringify(response))

      return response
    }
  }
}
