declare namespace Alexa.ChannelControllerResponse {
  export interface ChannelControllerResponse {
    context: Context
    event: Event
  }
  export interface Context {
    properties: PropertiesItem[]
  }
  export interface PropertiesItem {
    namespace: string
    name: string
    value: Value
    timeOfSample: string
    uncertaintyInMilliseconds: number
  }
  export interface Value {
    number?: string
    callSign?: string
    affiliateCallSign?: string
    value?: string
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
  export interface Payload {}
}
