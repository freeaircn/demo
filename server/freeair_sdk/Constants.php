<?php
namespace Freeair_App_SDK;

class Constants {

  const TEST_MSG = 'Constant Here';

  const SUCCESS = 0;

  // const AUTH_VALID = 0;
  // const AUTH_INVALID = -1;

  // const AUTH_INPUT_EMPTY = 1;

  // const AUTH_DB_QUERY_FAILED = 1;
  // const AUTH_DB_PASSWORD_FAILED = 2;
  // const AUTH_DB_INSERT_USER_FAILED = 3;

  // ! 公共错误码
  const POST_INPUT_EMPTY = 101;

  // ! 变量名组成：控制器名_子功能名_代码描述
  // ! Users控制器，Signup子功能，代码201~299
  const USERS_SIGNUP_IDENTITY_NOT_EXISTING = 201;
  const USERS_SIGNUP_IDENTITY_EXISTING = 202;
  const USERS_SIGNUP_EMAIL_NOT_EXISTING = 203;
  const USERS_SIGNUP_EMAIL_EXISTING = 204;
  const USERS_SIGNUP_USER_CREATE_FAILED = 205;
  const USERS_SIGNUP_USER_ACTIVATE_FAILED = 206;
  const USERS_SIGNUP_LOG_USERINFO_FAILED = 207;

  const USERS_LOGIN_FAILED = 208;
  const USERS_TOKEN_INVALID = 209;
  const USERS_TOKEN_VALIDATE_FAILED = 210;

  const USERS_ACTIVATE_IDENTITY_NOT_EXISTING = 211;
  const USERS_ACTIVATE_USER_BEEN_ACTIVATED = 212;
  const USERS_ACTIVATE_INPUT_EMAIL_INVALID = 213;
  const USERS_ACTIVATE_GEN_CODE_FAILED = 214;
  const USERS_ACTIVATE_SEND_MAIL_FAILED = 215;

  // const AUTH_LOGIN_EXCEED_ATTEMPTS = 2;
  // const AUTH_LOGIN_USER_NOT_EXIST = 3;
  // const AUTH_LOGIN_INVALID_PASSWORD = 4;
  // const AUTH_LOGIN_USER_NOT_ACTIVE = 5;

  // const AUTH_TOKEN_SIGNATURE_INVALID = 1;
  // const AUTH_TOKEN_PAYLOAD_INVALID = 2;

  // 初始化 SDK 时缺少配置项
  const E_INIT_LOST_CONFIG = 'E_INIT_LOST_CONFIG';
  // 初始化 SDK 时配置类型错误
  const E_INIT_CONFIG_TYPE = 'E_INIT_CONFIG_TYPE';

  // /* AUTH */
  // // 自定义 http header
  // const WX_HEADER_CODE = 'x-wx-code';
  // const WX_HEADER_ENCRYPTED_DATA = 'x-wx-encrypted-data';
  // const WX_HEADER_IV = 'x-wx-iv';
  // const WX_HEADER_SKEY = 'x-wx-skey';

  // // 腾讯云代理登录参数缺失
  // const E_PROXY_LOGIN_LOST_PRAMA = 'E_PROXY_LOGIN_LOST_PRAMA';
  // // 腾讯云代理登录请求错误
  // const E_PROXY_LOGIN_REQUEST_FAILED = 'E_PROXY_LOGIN_REQUEST_FAILED';
  // // 腾讯云代理登录失败
  // const E_PROXY_LOGIN_FAILED = 'E_PROXY_LOGIN_FAILED';
  // // 解密失败
  // const E_DECRYPT_FAILED = 'E_DECRYPT_FAILED';

  // // 登录成功
  // const S_AUTH = 1;
  // // 登录失败
  // const E_AUTH = 0;

  // /* MySQL */
  // // 连接数据库错误
  // const E_CONNECT_TO_DB = 'E_CONNECT_TO_DB';
  // // 函数参数错误
  // const E_CALL_FUNCTION_PARAM = 'E_CALL_FUNCTION_PARAM';
  // // 插入数据错误
  // const E_EXEC_SQL_QUERY = 'E_EXEC_SQL_QUERY';

  // /* 信道连接 */
  // const E_CONNECT_TO_TUNNEL_SERVER = 'E_CONNECT_TO_TUNNEL_SERVER';

  // /* COS */
  // const E_INIT_COS_SDK = 'E_INIT_COS_SDK';
}
