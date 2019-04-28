/**
 *
 */
import { STATION } from '@/Station_Config'

export function getStationName(idx) {
  if (idx === '') {
    return ''
  }
  const id = Number(idx) - 1
  if (id >= 0 && id < STATION.LIST.length) {
    return STATION.LIST[id]
  } else {
    return ''
  }
}
