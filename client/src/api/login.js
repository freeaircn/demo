import request from '@/utils/request'

export function login(userphone, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      userphone,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

export function sendActiveMail(userphone, email) {
  return request({
    url: '/users/active_mail',
    method: 'post',
    data: {
      userphone,
      email
    }
  })
}

export function forgotPassword(userphone, email) {
  return request({
    url: '/users/forgot_password',
    method: 'post',
    data: {
      userphone,
      email
    }
  })
}

export function resetPassword(validate_code, password) {
  return request({
    url: '/users/reset_password',
    method: 'post',
    data: {
      validate_code,
      password
    }
  })
}
