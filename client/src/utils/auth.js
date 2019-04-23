import Cookies from 'js-cookie'
import { Constants } from '@/Constants'

const TokenKey = 'Admin-Token'
var ExpTime = 1.0 / Constants.COOKIE_EXP

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
