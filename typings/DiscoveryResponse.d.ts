declare namespace Alexa.Discovery {
  export interface Response {
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
  export interface Payload {
    endpoints: EndpointsItem[]
  }
  export interface EndpointsItem {
    endpointId: string
    manufacturerName: string
    friendlyName: string
    description: string
    displayCategories: string[]
    cookie: Cookie
    capabilities: CapabilitiesItem[]
  }
  export interface Cookie {
    detail1?: string
    detail2?: string
  }
  export interface CapabilitiesItem {
    type: string
    interface: string
    version: string
    properties?: Properties
    supportsDeactivation?: boolean
    cameraStreamConfigurations?: CameraStreamConfigurationsItem[]
  }
  export interface Properties {
    supported: SupportedItem[]
    proactivelyReported: boolean
    retrievable: boolean
  }
  export interface SupportedItem {
    name: string
  }
  export interface CameraStreamConfigurationsItem {
    protocols: string[]
    resolutions: ResolutionsItem[]
    authorizationTypes: string[]
    videoCodecs: string[]
    audioCodecs: string[]
  }
  export interface ResolutionsItem {
    width: number
    height: number
  }
}
