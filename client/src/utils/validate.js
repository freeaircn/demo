/**
 * Created by jiachenpan on 16/11/18.
 */

import { Config } from '@/Freeair_App_Config'

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isValidEmail(str) {
  const regexMail = Config.REGEX_MAIL
  return regexMail.test(str)
}

export function isValidCodeInput(str) {
  const regexCode = Config.REGEX_VERIFICAITON_CODE
  return regexCode.test(str)
}

export function isValidPhone(str) {
  const regexPhone = Config.REGEX_POHONE
  return regexPhone.test(str)
}

export function isValidPassword(str) {
  const regexPassword = Config.REGEX_PASSWORD
  return regexPassword.test(str)
}

export function isValidChineseName(str) {
  const regexChineseName = Config.REGEX_CHINESE_NAME
  return regexChineseName.test(str)
}
