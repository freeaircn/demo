import request from '@/utils/request'

export function getGenStartLastLog(station_idx, gen_idx) {
  return request({
    url: '/device/gen_start_last_log',
    method: 'post',
    data: {
      station_idx,
      gen_idx
    }
  })
}

export function logGenStartStop(station_idx, gen_idx, is_running, date_time, username, stop_cause) {
  return request({
    url: '/device/log_gen_start_stop',
    method: 'post',
    data: {
      station_idx,
      gen_idx,
      is_running,
      date_time,
      username,
      stop_cause
    }
  })
}
