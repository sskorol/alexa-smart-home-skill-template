import * as uuid4 from 'uuid/v4'
import { MiddlewareService } from '../middleware/MiddlewareService'
import Request = Alexa.Request
import { ErrorType } from '../model/ErrorType'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import { createLogger, Logger } from '../utils/Logger'
import { payloadVersion } from './Constants'
import { RequestHandler } from './RequestHandler'

const logger: Logger = createLogger('SmartHomeSkillBuilder')

export class SmartHomeSkillBuilder {
  public static prepare(middleware?: MiddlewareService): SmartHomeSkillBuilder {
    return new SmartHomeSkillBuilder(middleware)
  }

  private readonly handlers: Array<new (middleware?: MiddlewareService) => RequestHandler> = []

  constructor(private readonly middleware?: MiddlewareService) {}

  public requestHandlers<T extends RequestHandler>(
    ...handlers: Array<new () => RequestHandler>
  ): SmartHomeSkillBuilder {
    this.handlers.push(...handlers)
    return this
  }

  public buildLambda(): (request: Request, context: object) => Promise<object> {
    return async (request: Request, context: object) => {
      let response: object

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
              payloadVersion,
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
