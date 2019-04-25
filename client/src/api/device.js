import request from '@/utils/request'

export function getGenStartLastLog(station_idx, gen_idx) {
  return request({
    url: '/users/gen_start_last_log',
    method: 'post',
    data: {
      station_idx,
      gen_idx
    }
  })
}
