declare namespace Alexa.ErrorResponseGeneralTEMPERATURE_VALUE_OUT_OF_RANGE {
  export interface ErrorResponseGeneralTEMPERATURE_VALUE_OUT_OF_RANGE {
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
    validRange: ValidRange
  }
  export interface ValidRange {
    minimumValue: MinimumValue
    maximumValue: MaximumValue
  }
  export interface MinimumValue {
    value: number
    scale: string
  }
  export interface MaximumValue {
    value: number
    scale: string
  }
}
