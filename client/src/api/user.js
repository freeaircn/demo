import request from '@/utils/request'

export function requestActiveMail(userphone, email) {
  return request({
    url: '/users/request_active_mail',
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

export function resetPassword(hash_code, password) {
  return request({
    url: '/users/reset_password',
    method: 'post',
    data: {
      hash_code,
      password
    }
  })
}

export function requestUserInfo() {
  return request({
    url: '/users/request_user_info',
    method: 'post'
  })
}

export function updateUserInfo(userinfo) {
  return request({
    url: '/users/update_user_info',
    method: 'post',
    data: {
      username: userinfo.username,
      gender: userinfo.gender,
      political_party: userinfo.political_party,
      company: userinfo.company,
      dept_lv10: userinfo.dept_lv10,
      dept_lv20: userinfo.dept_lv20,
      dept_lv30: userinfo.dept_lv30,
      job: userinfo.job
    }
  })
}
