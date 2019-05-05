declare namespace Alexa.CameraStreamControllerRequest {
  export interface CameraStreamControllerRequest {
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
    scope: Scope
    endpointId: string
    cookie: Cookie
  }
  export interface Scope {
    type: string
    token: string
  }
  export interface Cookie {}
  export interface Payload {
    cameraStreams: CameraStreamsItem[]
  }
  export interface CameraStreamsItem {
    protocol: string
    resolution: Resolution
    authorizationType: string
    videoCodec: string
    audioCodec: string
  }
  export interface Resolution {
    width: number
    height: number
  }
}
