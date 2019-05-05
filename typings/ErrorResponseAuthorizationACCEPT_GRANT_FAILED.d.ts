declare namespace Alexa.ErrorResponseAuthorizationACCEPT_GRANT_FAILED {
  export interface ErrorResponseAuthorizationACCEPT_GRANT_FAILED {
    event: Event
  }
  export interface Event {
    header: Header
    payload: Payload
  }
  export interface Header {
    namespace: string
    name: string
    payloadVersion: string
    messageId: string
    correlationToken: string
  }
  export interface Payload {
    type: string
    message: string
  }
}
