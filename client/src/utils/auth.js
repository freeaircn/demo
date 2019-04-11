import Cookies from 'js-cookie'
import { Config } from '@/Freeair_App_Config'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMailServerUrl(str) {
  const regexMail = /@([a-z1-9]{2,3})/
  const mailServer = regexMail.exec(str)
  if (mailServer !== null && mailServer[0] === '@163') {
    return Config.MAIL_163_URL
  }
  if (mailServer !== null && mailServer[0] === '@126') {
    return Config.MAIL_126_URL
  }
  if (mailServer !== null && mailServer[0] === '@139') {
    return Config.MAIL_139_URL
  }
  if (mailServer !== null && mailServer[0] === '@qq') {
    return Config.MAIL_QQ_URL
  }
  return false
}
