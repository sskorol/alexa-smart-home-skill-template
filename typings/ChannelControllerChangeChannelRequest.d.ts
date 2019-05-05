declare namespace Alexa.ChannelControllerChangeChannelRequest {
  export interface ChannelControllerChangeChannelRequest {
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
    channel: Channel
    channelMetadata: ChannelMetadata
  }
  export interface Channel {
    number: string
    callSign: string
    affiliateCallSign: string
    uri: string
  }
  export interface ChannelMetadata {
    name: string
    image: string
  }
}
