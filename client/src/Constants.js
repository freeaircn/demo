
export const Constants = {

  TEST_MSG: 'Test message',

  SUCCESS: 0,
  /**
   * 后端code定义
   */
  // ! 公共code
  POST_INPUT_EMPTY: 101,
  USERS_TOKEN_INVALID: 110,

  // ! 变量名组成：控制器名_流程_描述
  // ! Users Signup流程 code：201~249
  USERS_SIGNUP_IDENTITY_EXISTING: 201,
  USERS_SIGNUP_EMAIL_EXISTING: 202,
  USERS_SIGNUP_USER_CREATE_FAILED: 203,
  USERS_SIGNUP_LOG_USER_INFO_FAILED: 204,
  // USERS_SIGNUP_USER_ACTIVATE_FAILED: 206,

  // ! Users Login流程 code：250~299
  USERS_LOGIN_FAILED: 250,
  USERS_LOGIN_GEN_TOKEN_FAILED: 251,

  // ! Users Active Mail流程 code：300~349
  USERS_ACTIVATE_IDENTITY_NOT_EXISTING: 300,
  USERS_ACTIVATE_USER_BEEN_ACTIVATED: 301,
  USERS_ACTIVATE_INPUT_EMAIL_INVALID: 302,
  USERS_ACTIVATE_GEN_CODE_FAILED: 303,
  USERS_ACTIVATE_SEND_MAIL_FAILED: 304,

  // ! Users Get user info流程 code：350~399
  USERS_GET_USER_INFO_FAILED: 350
}
