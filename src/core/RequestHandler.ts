import Request = Alexa.Request

export interface RequestHandler {
  handle(request: Request): Promise<object> | object

  canHandle(request: Request): boolean
}
