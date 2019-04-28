import request from '@/utils/request'

export function queryStartLastLog(station_idx, gen_idx) {
  return request({
    url: '/generators/query_start_last_log',
    method: 'post',
    data: {
      station_idx,
      gen_idx
    }
  })
}

export function postStartStopLog(station_idx, gen_idx, is_running, date_time, username, stop_cause) {
  return request({
    url: '/generators/post_start_stop_log',
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
