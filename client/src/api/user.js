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

export function updateUserProfile(profile) {
  return request({
    url: '/users/update_user_profile',
    method: 'post',
    data: {
      username: profile.username,
      gender: profile.gender,
      political_party: profile.political_party,
      company: profile.company,
      dept_lv10: profile.dept_lv10,
      dept_lv20: profile.dept_lv20,
      dept_lv30: profile.dept_lv30,
      job: profile.job
    }
  })
}

export function updatePassword(old_pwd, new_pwd) {
  return request({
    url: '/users/update_password',
    method: 'post',
    data: {
      old_pwd,
      new_pwd
    }
  })
}

export function updateEmail(old_email, new_email, verification_code) {
  return request({
    url: '/users/update_email',
    method: 'post',
    data: {
      old_email,
      new_email,
      verification_code
    }
  })
}
