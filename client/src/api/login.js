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
