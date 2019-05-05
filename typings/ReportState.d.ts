declare namespace Alexa.ReportState {
  export interface ReportState {
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
    endpointId: string
    cookie: Cookie
    scope: Scope
  }
  export interface Cookie {}
  export interface Scope {
    type: string
    token: string
  }
  export interface Payload {}
}
