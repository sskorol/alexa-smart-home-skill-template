declare namespace Alexa {
  import BrightnessRequestPayload = Alexa.Misc.BrightnessRequestPayload

  export interface Request {
    directive: Directive
  }

  export interface Directive {
    header: Header
    payload: Payload | BrightnessRequestPayload
    endpoint?: Endpoint
  }

  export interface Header {
    namespace: string
    name: string
    payloadVersion: string
    messageId: string
    correlationToken: string
  }

  export interface Payload {
    grant?: Grant
    grantee?: Grantee
  }

  export interface Grant {
    type: string
    code: string
  }

  export interface Grantee {
    type: string
    token: string
  }

  export interface Endpoint {
    scope: Scope
    endpointId: string
    cookie: Cookie
  }

  export interface Scope {
    type: string
    token: string
  }

  export interface Cookie {}
}
