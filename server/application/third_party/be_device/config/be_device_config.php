<?php
/**
 * Name:    device config
 * Author:  freeair
 *
 * Added Awesomeness: Phil Sturgeon
 *
 * Created:  2019.04.26
 *
 * Description:
 *
 * Requirements: PHP5.6 or above
 *
 * @package
 * @author
 * @link
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/*
 | -------------------------------------------------------------------------
 | Database group name option.
 | -------------------------------------------------------------------------
 | Allows to select a specific group for the database connection
 |
 | Default is empty: uses default group defined in CI's configuration
 | (see application/config/database.php, $active_group variable)
 */
$config['database_group_name'] = 'to_db_sshk_device';

/*
| -------------------------------------------------------------------------
| Tables.
| -------------------------------------------------------------------------
| Database table names.
*/
$config['tables']['g1_start_stop_log']    = 'g1_start_stop_log';
$config['tables']['g2_start_stop_log']    = 'g2_start_stop_log';
$config['tables']['g3_start_stop_log']    = 'g3_start_stop_log';

/*
 | Users table column and Group table column you want to join WITH.
 |
 | Joins from users.id
 | Joins from groups.id
 */
$config['join']['users']  = 'user_id';
