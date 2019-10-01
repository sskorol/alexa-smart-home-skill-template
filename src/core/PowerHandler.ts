import { MiddlewareService } from '../middleware/MiddlewareService'
import { HeaderName } from '../model/HeaderName'
import { Interface } from '../model/Interface'
import Request = Alexa.API.Request
import { AbstractHandler } from './AbstractHandler'

export class PowerHandler extends AbstractHandler {
  constructor(middleware?: MiddlewareService) {
    super(middleware)
  }

  public canHandle(request: Request): boolean {
    const { header } = request.directive
    return (
      header.namespace === Interface.POWER &&
      [HeaderName.TURN_ON, HeaderName.TURN_OFF].some(headerName => headerName === header.name)
    )
  }

  public getState<T>(request: Request): any {
    const { name } = request.directive.header
    return name === HeaderName.TURN_ON
  }
}
