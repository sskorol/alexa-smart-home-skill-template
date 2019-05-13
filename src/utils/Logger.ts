import * as moment from 'moment-timezone'
import { TIMEZONE } from '../core/Constants'

export interface Logger {
  info(message: string, ...rest: any[]): void

  warn(message: string, ...rest: any[]): void

  error(message: string, ...rest: any[]): void
}

const log = (level: string, tag: string, message: string, ...rest: any[]) =>
  console[level].apply(console[level], [
    `[${moment()
      .tz(TIMEZONE)
      .format()}] [${tag}] ${message}`,
    ...rest
  ])

export function createLogger(tag: string): Logger {
  return {
    info: (message, ...rest) => log('log', tag, message, ...rest),
    warn: (message, ...rest) => log('warn', tag, message, ...rest),
    error: (message, ...rest) => log('error', tag, message, ...rest)
  }
}
