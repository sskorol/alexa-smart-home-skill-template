import axios, { AxiosResponse } from 'axios'
import * as https from 'https'
import { createLogger, Logger } from '../utils/Logger'
import EndpointsItem = Alexa.DiscoveryResponse.EndpointsItem
import PropertiesItem = Alexa.StateReport.PropertiesItem
import { MiddlewareService } from './MiddlewareService'

const logger: Logger = createLogger('Middleware')

export class Middleware implements MiddlewareService {
  private readonly baseUrl: string = `https://${process.env.HOST}:${process.env.PORT}`
  private readonly httpsAgent: https.Agent = new https.Agent({ rejectUnauthorized: false })

  public async sendMessage(deviceId: string, message: any): Promise<AxiosResponse> {
    logger.info(`Sending ${JSON.stringify(message)} to ${this.baseUrl}/device/${deviceId}`)
    return axios.post(`${this.baseUrl}/device/${deviceId}`, message, { httpsAgent: this.httpsAgent })
  }

  public async discoverDevices(message: any): Promise<AxiosResponse<EndpointsItem[]>> {
    return axios.post<EndpointsItem[]>(`${this.baseUrl}/discovery`, message, { httpsAgent: this.httpsAgent })
  }

  public async getDevices(): Promise<AxiosResponse<EndpointsItem[]>> {
    return axios.get<EndpointsItem[]>(`${this.baseUrl}/devices`, { httpsAgent: this.httpsAgent })
  }

  public async reportState(deviceId: string): Promise<AxiosResponse<PropertiesItem[]>> {
    return axios.get<PropertiesItem[]>(`${this.baseUrl}/device/${deviceId}/state`, { httpsAgent: this.httpsAgent })
  }
}
