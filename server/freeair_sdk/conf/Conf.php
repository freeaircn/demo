<?php
namespace Freeair_App_SDK\conf;

use \Exception as Exception;
use \Freeair_App_SDK\Constants;

class Conf {

    private static $TestMsg = 'Conf Here';

    // 适配config参数
    /*
    | -------------------------------------------------------------------------
    | Database group name option.
    | -------------------------------------------------------------------------
    | Allows to select a specific group for the database connection
    |
    | Default is empty: uses default group defined in CI's configuration
    | (see application/config/database.php, $active_group variable)
    */


    // 用户数据库相关
    private static $DbName = 'for_db_auth';
    private static $DbUsersTblName = 'phprbac_users';
    private static $DbRolesTblName = 'phprbac_roles';
    private static $DbPermissionsTblName = 'phprbac_permissions';
    private static $DbRolePermissionTblName = 'phprbac_rolepermissions';
    private static $DbUserRoleTblName = 'phprbac_userroles';
    private static $DbLoginAttemptsTblName = 'login_attempts';

    // 用户注册处理相关
    private static $ManualActivation = FALSE;

    // 用户登录处理相关
    // private static $EnableTrackLoginAttempts = TRUE;
    // private static $EnableTrackLoginIP = TRUE;
    private static $MaxLoginAttempts = 3;
    private static $LockoutTime = 60;    // The number of seconds to lockout an account due to exceeded attempts
    private static $IdentityCol = 'phone';  // You can use any unique column in your table as identity column. The values will be used for login purposes

    private static $JwtIssuer = 'IN';
    private static $JwtAudience = 'INer';
    private static $JwtID = '4f1g2iHg9vba';
    private static $JwtNbf = 0;
    private static $JwtExp = 600;
    private static $JwtSecretCode = 'QaLmW2N7';


    // $config['tables']['users']           = 'users';
    // $config['tables']['groups']          = 'groups';
    // $config['tables']['users_groups']    = 'users_groups';
    // $config['tables']['login_attempts']  = 'login_attempts';




    public static function __callStatic($name, $arguemnts) {
        $class = get_class();

        if (strpos($name, 'get') === 0) {
            $key = preg_replace('/^get/', '', $name);

            if (property_exists($class, $key)) {
                $value = self::$$key;

                if (strpos($key, 'Log') === 0) {
                    return $value;
                }

                if (is_string($value) && !$value) {
                    throw new Exception("`{$key}`不能为空，请确保 SDK 配置已正确初始化", 1);
                }

                return $value;
            }
        }

        if (strpos($name, 'set') === 0) {
            $key = preg_replace('/^set/', '', $name);
            $value = isset($arguemnts[0]) ? $arguemnts[0] : NULL;

            if (property_exists($class, $key)) {
                if (gettype($value) === gettype(self::$$key)) {
                    self::$$key = $value;
                } else {
                    throw new Exception("Call to method {$class}::{$name}() with invalid arguements", 1);
                }
                return;
            }
        }

        throw new Exception("Call to undefined method {$class}::{$name}()", 1);
    }

    public static function setup($config = NULL) {
        if (!is_array($config)) {
            throw new Exception(Constants::E_INIT_LOST_CONFIG);
        }

        $class = get_class();

        foreach ($config as $key => $value) {
            $key = ucfirst($key);
            if (property_exists($class, $key)) {
                if (gettype($value) === gettype(self::$$key)) {
                    if (gettype($value) === 'array') {
                        self::$$key = array_merge(self::$$key, $value);
                    } else {
                        self::$$key = $value;
                    }
                } else {
                    throw new Exception(Constants::E_INIT_CONFIG_TYPE . ': ' . $key);
                }
            }
        }
    }
}
