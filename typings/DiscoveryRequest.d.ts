declare namespace Alexa.DiscoveryRequest {
  export interface DiscoveryRequest {
    directive: Directive
  }
  export interface Directive {
    header: Header
    payload: Payload
  }
  export interface Header {
    namespace: string
    name: string
    payloadVersion: string
    messageId: string
  }
  export interface Payload {
    scope: Scope
  }
  export interface Scope {
    type: string
    token: string
  }
}
