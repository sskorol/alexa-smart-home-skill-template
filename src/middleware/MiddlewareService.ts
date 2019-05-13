import { AxiosResponse } from 'axios'
import PropertiesItem = Alexa.API.PropertiesItem
import EndpointsItem = Alexa.API.EndpointsItem

export interface MiddlewareService {
  sendMessage(deviceId: string, message: object): Promise<AxiosResponse<PropertiesItem[]>>

  getDevices(): Promise<AxiosResponse<EndpointsItem[]>>

  reportState(deviceId: string): Promise<AxiosResponse<PropertiesItem[]>>
}
