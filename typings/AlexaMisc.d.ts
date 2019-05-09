declare namespace Alexa.Misc {
  export interface PropertiesItem {
    namespace: string
    name: string
    value: Value | string
    timeOfSample: string
    uncertaintyInMilliseconds: number
  }

  export interface Value {
    value: string | number
    scale?: string
  }

  export interface BrightnessRequestPayload {
    brightnessDelta?: number
    brightness?: number
  }

  export interface SpeakerRequestPayload {
    volume?: number
    volumeDefault?: number
    mute?: boolean
  }
}
