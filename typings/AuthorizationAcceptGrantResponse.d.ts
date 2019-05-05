declare namespace Alexa.AuthorizationAcceptGrantResponse {
  export interface AuthorizationAcceptGrantResponse {
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
  }
  export interface Payload {}
}
