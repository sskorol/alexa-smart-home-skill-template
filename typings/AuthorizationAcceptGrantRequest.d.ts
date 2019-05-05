declare namespace Alexa.AuthorizationAcceptGrantRequest {
  export interface AuthorizationAcceptGrantRequest {
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
    correlationToken: string
  }
  export interface Payload {
    grant: Grant
    grantee: Grantee
  }
  export interface Grant {
    type: string
    code: string
  }
  export interface Grantee {
    type: string
    token: string
  }
}
