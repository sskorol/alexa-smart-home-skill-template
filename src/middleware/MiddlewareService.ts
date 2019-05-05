import { AxiosResponse } from 'axios'
import EndpointsItem = Alexa.DiscoveryResponse.EndpointsItem
import PropertiesItem = Alexa.StateReport.PropertiesItem

export interface MiddlewareService {
  sendMessage(deviceId: string, message: any): Promise<AxiosResponse>

  discoverDevices(message: any): Promise<AxiosResponse<EndpointsItem[]>>

  getDevices(): Promise<AxiosResponse<EndpointsItem[]>>

  reportState(deviceId: string): Promise<AxiosResponse<PropertiesItem[]>>
}
