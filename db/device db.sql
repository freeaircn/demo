CREATE DATABASE db_devices CHARACTER SET utf8;

/*
 * 机组启停时间记录
 */
CREATE TABLE `g_start_stop_log` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `station_id` tinyint(1) unsigned NOT NULL,
  `g_id` tinyint(1) unsigned NOT NULL,
  `start_on` int(11) unsigned NOT NULL,
  `start_recoder` char(8) NOT NULL,
  `stop_on` int(11) unsigned NULL,
  `stop_recoder` char(8) NULL,
  `is_stopped` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `station_id` (`station_id`),
  KEY `g_id` (`g_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;



/* 删除
 */
DROP TABLE IF EXISTS `g_start_stop_log`;
