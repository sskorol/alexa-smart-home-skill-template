declare namespace Alexa.ThermostatControllerSetTargetTemperatureDualModeRequest {
  export interface ThermostatControllerSetTargetTemperatureDualModeRequest {
    directive: Directive
  }
  export interface Directive {
    header: Header
    endpoint: Endpoint
    payload: Payload
  }
  export interface Header {
    namespace: string
    name: string
    payloadVersion: string
    messageId: string
    correlationToken: string
  }
  export interface Endpoint {
    scope: Scope
    endpointId: string
    cookie: Cookie
  }
  export interface Scope {
    type: string
    token: string
  }
  export interface Cookie {}
  export interface Payload {
    lowerSetpoint: LowerSetpoint
    upperSetpoint: UpperSetpoint
  }
  export interface LowerSetpoint {
    value: number
    scale: string
  }
  export interface UpperSetpoint {
    value: number
    scale: string
  }
}
