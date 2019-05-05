declare namespace Alexa.ThermostatControllerAdjustTargetTemperatureRequest {
  export interface ThermostatControllerAdjustTargetTemperatureRequest {
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
    targetSetpointDelta: TargetSetpointDelta
  }
  export interface TargetSetpointDelta {
    value: number
    scale: string
  }
}
