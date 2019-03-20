/**
 *

1 更改base url:
  【前端】config/prod.env.js，更改BASE_API地址
    module.exports = {
      NODE_ENV: '"production"',
      BASE_API: '"http://127.0.0.1"',
    }

  【后端】application\config\config.php
  更改$config['base_url']地址
    $config['base_url'] = '';

2 【后端】application\config\database.php
  更改数据库连接信息
  $db['to_db_users'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => '', // 账号
	'password' => '', // 密码
	'database' => 'db_users',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);

3 【后端】ion_auth\config\config.php
  更改email参数：
  $config['email_config'] = [
    'mailtype' => 'html',
    'charset' => 'utf-8',
    'protocol' => 'smtp',
    'smtp_host' => 'ssl://smtp.163.com',
    'smtp_user' => '',    // 发送邮箱地址
    'smtp_port' => 465,
    'smtp_pass' => '',    // 邮箱密码
    'validate' => true,
    'priority' => 3,
    'crlf' => '\r\n',
    'newline' => '\r\n'
  ];

  更改JWT参数：
  $config['jwt_config'] = [
    'issuer' => 'b-Server',
    'audience' => 'client',
    'nbf' => 0,
    'exp' => 3600,
    'secret_code' => '' // 签名密钥
  ];

4 【后端】设置时区index.php
  文件开头位置
  date_default_timezone_set('Asia/Shanghai');


*/
