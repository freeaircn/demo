<?php
namespace Freeair_App_SDK;

class Constants {

    const TEST_MSG = 'Constant Here';

    const AUTH_SUCCESS = 0;
    const AUTH_FAILED = -1;

    const AUTH_VALID = 0;
    const AUTH_INVALID = -1;

    const AUTH_INPUT_EMPTY = 1;

    const AUTH_DB_QUERY_FAILED = 1;
    const AUTH_DB_PASSWORD_FAILED = 2;
    const AUTH_DB_INSERT_USER_FAILED = 3;

    const AUTH_REGISTER_DUPLICATED_IDENTITY = 1;
    const AUTH_REGISTER_NEWUSER_FAILED = 2;

    const AUTH_LOGIN_EXCEED_ATTEMPTS = 2;
    const AUTH_LOGIN_USER_NOT_EXIST = 3;
    const AUTH_LOGIN_INVALID_PASSWORD = 4;
    const AUTH_LOGIN_USER_NOT_ACTIVE = 5;

    const AUTH_TOKEN_SIGNATURE_INVALID = 1;
    const AUTH_TOKEN_PAYLOAD_INVALID = 2;



    // 初始化 SDK 时缺少配置项
    const E_INIT_LOST_CONFIG = 'E_INIT_LOST_CONFIG';
    // 初始化 SDK 时配置类型错误
    const E_INIT_CONFIG_TYPE = 'E_INIT_CONFIG_TYPE';

    /* AUTH */
    // 自定义 http header
    const WX_HEADER_CODE = 'x-wx-code';
    const WX_HEADER_ENCRYPTED_DATA = 'x-wx-encrypted-data';
    const WX_HEADER_IV = 'x-wx-iv';
    const WX_HEADER_SKEY = 'x-wx-skey';

    // 腾讯云代理登录参数缺失
    const E_PROXY_LOGIN_LOST_PRAMA = 'E_PROXY_LOGIN_LOST_PRAMA';
    // 腾讯云代理登录请求错误
    const E_PROXY_LOGIN_REQUEST_FAILED = 'E_PROXY_LOGIN_REQUEST_FAILED';
    // 腾讯云代理登录失败
    const E_PROXY_LOGIN_FAILED = 'E_PROXY_LOGIN_FAILED';
    // 解密失败
    const E_DECRYPT_FAILED = 'E_DECRYPT_FAILED';

    // 登录成功
    const S_AUTH = 1;
    // 登录失败
    const E_AUTH = 0;

    /* MySQL */
    // 连接数据库错误
    const E_CONNECT_TO_DB = 'E_CONNECT_TO_DB';
    // 函数参数错误
    const E_CALL_FUNCTION_PARAM = 'E_CALL_FUNCTION_PARAM';
    // 插入数据错误
    const E_EXEC_SQL_QUERY = 'E_EXEC_SQL_QUERY';

    /* 信道连接 */
    const E_CONNECT_TO_TUNNEL_SERVER = 'E_CONNECT_TO_TUNNEL_SERVER';

    /* COS */
    const E_INIT_COS_SDK = 'E_INIT_COS_SDK';
}
