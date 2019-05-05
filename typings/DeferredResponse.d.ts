declare namespace Alexa.DeferredResponse {
  export interface DeferredResponse {
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
    estimatedDeferralInSeconds: number
  }
}
