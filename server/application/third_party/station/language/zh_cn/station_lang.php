<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* Name:  Device Lang - Chinese Simplified
*
* Author: freeair

* Location:
*
* Created:  2019.04.28
*
* Description:  Simplified Chinese language file for messages and errors
*
*/

// 公共
$lang['POST_INPUT_EMPTY']    = '提交的数据有误！';
$lang['USERS_TOKEN_INVALID'] = '用户凭据或失效，请重新登录！';

// Controller - Users
// Signup Proecess
$lang['USERS_SIGNUP_IDENTITY_EXISTING']          = ' 已被其他用户注册！';
$lang['USERS_SIGNUP_EMAIL_EXISTING']             = ' 已被其他用户注册！';
$lang['USERS_SIGNUP_USER_CREATE_FAILED']         = '服务器创建新用户失败，请稍后再试(203)';
$lang['USERS_SIGNUP_CREATE_VERIFICATION_FAILED'] = '发送验证码失败，请重新获取！';
$lang['USERS_SIGNUP_VERIFY_VERIFICATION_FAILED'] = '验证码不正确或已失效！';

// Login Proecess
$lang['USERS_LOGIN_FAILED']           = '用户登录失败！';
$lang['USERS_LOGIN_GEN_TOKEN_FAILED'] = '服务器处理用户登录请求失败，请重新登录！(251)';

// Activation Proecess
$lang['USERS_ACTIVATE_IDENTITY_NOT_EXISTING'] = ' 用户不存在';
$lang['USERS_ACTIVATE_USER_BEEN_ACTIVATED']   = ' 用户已经激活';
$lang['USERS_ACTIVATE_INPUT_EMAIL_INVALID']   = '邮箱不符，输入的邮箱地址与用户注册的邮箱 ';
$lang['USERS_ACTIVATE_GEN_CODE_FAILED']       = '服务器处理激活用户失败，请重试(303)';
$lang['USERS_ACTIVATE_SEND_MAIL_FAILED']      = '服务器发送激活邮件失败，请重试(304)';

// Users settings Proecess
$lang['USERS_GET_USER_INFO_FAILED']  = '服务器查询用户信息失败！';
$lang['USERS_UPDATE_PROFILE_FAILED'] = '服务器更新用户信息失败！';
$lang['USERS_USER_INFO_INCORRECT']   = '提交的用户信息有误，请重新登录再更改！';
$lang['USERS_EMAIL_UPDATE_FAILED']   = '邮箱更新失败，请重试！';
$lang['USERS_PHONE_UPDATE_FAILED']   = '手机号更新失败，请重试！';

// Users Forgot Password Proecess
$lang['USERS_PASSWORD_IDENTITY_NOT_EXISTING'] = ' 用户不存在';
$lang['USERS_PASSWORD_INPUT_EMAIL_INVALID']   = '邮箱不符，用户注册的邮箱是: ';
$lang['USERS_PASSWORD_GEN_CODE_FAILED']       = '服务器处理忘记密码失败，请重试(403)';
$lang['USERS_PASSWORD_SEND_MAIL_FAILED']      = '服务器发送邮件失败，请重试(404)';
$lang['USERS_PASSWORD_RESET_INVALID']         = '链接已失效，无法提交新密码';
$lang['USERS_PASSWORD_RESET_FAILED']          = '服务器更新密码失败，请重试';
$lang['USERS_PASSWORD_OLD_INVALID']           = '输入的旧密码错误';
$lang['USERS_PASSWORD_UPDATE_FAILED']         = '服务器更新密码失败，请重试';

// generators $lang[''] = '';
$lang['GEN_GET_START_LAST_LOG_FAILED']  = '服务器罢工了，请选择机组编号！';
$lang['GEN_SET_START_STOP_LOG_FAILED']  = '服务器罢工了，请重新提交！';
$lang['GEN_SET_START_STOP_LOG_SUCCESS'] = '机组开/停机事件上传成功！';
