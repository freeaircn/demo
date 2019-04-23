import request from '@/utils/request'

export function getGenStartLog(new_phone) {
  return request({
    url: '/users/update_phone',
    method: 'post',
    data: {
      new_phone
    }
  })
}
