import Request = Alexa.API.Request
import Response = Alexa.API.Response

export interface RequestHandler {
  handle(request: Request): Promise<Response> | Response

  canHandle(request: Request): boolean
}
