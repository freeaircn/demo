/**
 *
 */
import { DEVICE } from '@/Device_Config'

export function getStationName(idx) {
  if (idx === '') {
    return ''
  }
  const id = Number(idx) - 1
  if (id >= 0 && id < DEVICE.STATION_LIST.length) {
    return DEVICE.STATION_LIST[id]
  } else {
    return ''
  }
}
