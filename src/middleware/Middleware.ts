import axios, { AxiosResponse } from 'axios'
import * as https from 'https'
import { createLogger, Logger } from '../utils/Logger'
import PropertiesItem = Alexa.API.PropertiesItem
import EndpointsItem = Alexa.API.EndpointsItem
import { MiddlewareService } from './MiddlewareService'

const logger: Logger = createLogger('Middleware')

export class Middleware implements MiddlewareService {
  private readonly baseUrl: string = `https://${process.env.HOST}:${process.env.PORT}/api`
  private readonly httpsAgent: https.Agent = new https.Agent({ rejectUnauthorized: false })

  public async sendMessage(deviceId: string, message: object): Promise<AxiosResponse<PropertiesItem[]>> {
    logger.info(`Sending ${JSON.stringify(message)} to ${this.baseUrl}/device/${deviceId}`)
    return axios.post(`${this.baseUrl}/devices/${deviceId}`, message, { httpsAgent: this.httpsAgent })
  }

  public async getDevices(): Promise<AxiosResponse<EndpointsItem[]>> {
    logger.info(`Getting a list of devices from ${this.baseUrl}/devices`)
    return axios.get<EndpointsItem[]>(`${this.baseUrl}/devices`, { httpsAgent: this.httpsAgent })
  }

  public async reportState(deviceId: string): Promise<AxiosResponse<PropertiesItem[]>> {
    logger.info(`Checking ${deviceId} device state at ${this.baseUrl}/device/${deviceId}/state`)
    return axios.get<PropertiesItem[]>(`${this.baseUrl}/devices/${deviceId}/state`, { httpsAgent: this.httpsAgent })
  }
}
