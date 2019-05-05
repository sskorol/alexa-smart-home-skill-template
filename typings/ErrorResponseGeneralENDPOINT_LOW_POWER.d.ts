declare namespace Alexa.ErrorResponseGeneralENDPOINT_LOW_POWER {
  export interface ErrorResponseGeneralENDPOINT_LOW_POWER {
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
    percentageState: number
  }
}
