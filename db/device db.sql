CREATE DATABASE db_sshk_devices CHARACTER SET utf8;

/*
 * 机组启停时间记录
 */
CREATE TABLE `g1_start_stop_log` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `start_on` int(11) unsigned NOT NULL,
  `start_recoder` char(8) NOT NULL,
  `stop_on` int(11) unsigned NULL,
  `stop_recoder` char(8) NULL,
  `is_running` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `g2_start_stop_log` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `start_on` int(11) unsigned NOT NULL,
  `start_recoder` char(8) NOT NULL,
  `stop_on` int(11) unsigned NULL,
  `stop_recoder` char(8) NULL,
  `is_running` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `g3_start_stop_log` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `start_on` int(11) unsigned NOT NULL,
  `start_recoder` char(8) NOT NULL,
  `stop_on` int(11) unsigned NULL,
  `stop_recoder` char(8) NULL,
  `is_running` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;





/* 删除
 */
DROP TABLE IF EXISTS `g_start_stop_log`;
DROP TABLE IF EXISTS `g3_start_stop_log`;
DROP TABLE IF EXISTS `g2_start_stop_log`;
DROP TABLE IF EXISTS `g1_start_stop_log`;

DROP DATABASE IF EXISTS `db_devices`;
DROP DATABASE IF EXISTS `db_sshk_devices`;