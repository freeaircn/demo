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

/** Client请求通过邮件获取验证码 */
export function requestCode(email) {
  return request({
    url: '/users/request_code',
    method: 'post',
    data: {
      email: email
    }
  })
}

/** Client请求校验验证码 */
export function checkVerificationCode(email, code) {
  return request({
    url: '/users/check_verification_code',
    method: 'post',
    data: {
      email: email,
      code: code
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

export function logUserInfo(userid, username, gender, parties, company, deptLevel1, deptLevel2, job) {
  return request({
    url: '/users/log_user_info',
    method: 'post',
    data: {
      userid,
      username,
      gender,
      parties,
      company,
      dept_level_1: deptLevel1,
      dept_level_2: deptLevel2,
      job
    }
  })
}
