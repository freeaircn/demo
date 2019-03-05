import request from '@/utils/request'

export function isPhoneExisting(userPhone) {
  return request({
    url: '/users/phone',
    method: 'post',
    data: {
      phone: userPhone
    }
  })
}
