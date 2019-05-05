declare namespace Alexa.ErrorResponseGeneralVALUE_OUT_OF_RANGE {
  export interface ErrorResponseGeneralVALUE_OUT_OF_RANGE {
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
    minimumValue: number
    maximumValue: number
  }
}
