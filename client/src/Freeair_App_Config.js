
export const Config = {

  // ! dev
  REGEX_POHONE: /^[1][0-9]$/,
  REGEX_MAIL: /^(\w)+(\.\w+)*@(\w)+((\.\+w)+)$/,
  REGEX_PASSWORD: /^[0-9a-zA-Z]+$/,
  REGEX_ZH_CHAR: /^([\u4e00-\u9fa5]){2,5}$/,

  // ! prod
  // REGEX_POHONE: /^[1][3,4,5,7,8][0-9]{9}$/,
  // REGEX_MAIL: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
  // REGEX_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
  // REGEX_ZH_CHAR: /^([\u4e00-\u9fa5]){2,5}$/,

  MAIL_163_URL: 'https://mail.163.com',
  MAIL_126_URL: 'https://mail.126.com',
  MAIL_QQ_URL: 'https://mail.qq.com'
}
