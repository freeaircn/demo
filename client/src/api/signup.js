import request from '@/utils/request'

export function isPhoneExisting(userPhone) {
  return request({
    url: '/users/check_phone',
    method: 'post',
    data: {
      phone: userPhone
    }
  })
}

export function isEmailExisting(email) {
  return request({
    url: '/users/check_email',
    method: 'post',
    data: {
      email: email
    }
  })
}

export function createUser(phone, email, password) {
  return request({
    url: '/users/create_user',
    method: 'post',
    data: {
      phone,
      email,
      password
    }
  })
}
