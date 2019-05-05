import { Command } from '../model/Command'
import { HeaderName } from '../model/HeaderName'
import { match } from './Matcher'

export function getCommandFor(headerName: string): string {
  return match(headerName)
    .on(
      header => [HeaderName.TURN_ON, HeaderName.TURN_OFF].some(currentHeader => currentHeader === header),
      () => Command.POWER
    )
    .on(header => HeaderName.SET_BRIGHTNESS === header, () => Command.SET_BRIGHTNESS)
    .on(header => HeaderName.ADJUST_BRIGHTNESS === header, () => Command.ADJUST_BRIGHTNESS)
    .otherwise(() => {
      throw new Error(`${headerName} is not registered`)
    })
}
