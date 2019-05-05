declare namespace Alexa.ErrorResponseThermostatControllerREQUESTED_SETPOINTS_TOO_CLOSE {
  export interface ErrorResponseThermostatControllerREQUESTED_SETPOINTS_TOO_CLOSE {
    event: Event
  }
  export interface Event {
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
  }
  export interface Scope {
    type: string
    token: string
  }
  export interface Payload {
    type: string
    message: string
    minimumTemperatureDelta: MinimumTemperatureDelta
  }
  export interface MinimumTemperatureDelta {
    value: number
    scale: string
  }
}
