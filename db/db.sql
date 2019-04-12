CREATE DATABASE db_users CHARACTER SET utf8;

/*
 * Create Tables for rbac
 */
CREATE TABLE `rbac_permissions` (
  `ID` int(11) NOT NULL auto_increment,
  `Lft` int(11) NOT NULL,
  `Rght` int(11) NOT NULL,
  `Title` char(64) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY  (`ID`),
  KEY `Title` (`Title`),
  KEY `Lft` (`Lft`),
  KEY `Rght` (`Rght`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;

CREATE TABLE `rbac_rolepermissions` (
  `RoleID` int(11) NOT NULL,
  `PermissionID` int(11) NOT NULL,
  `AssignmentDate` int(11) NOT NULL,
  PRIMARY KEY  (`RoleID`,`PermissionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `rbac_roles` (
  `ID` int(11) NOT NULL auto_increment,
  `Lft` int(11) NOT NULL,
  `Rght` int(11) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY  (`ID`),
  KEY `Title` (`Title`),
  KEY `Lft` (`Lft`),
  KEY `Rght` (`Rght`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `rbac_userroles` (
  `UserID` int(11) NOT NULL,
  `RoleID` int(11) NOT NULL,
  `AssignmentDate` int(11) NOT NULL,
  PRIMARY KEY  (`UserID`,`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*
 * Insert Initial Table Data for rbac
 */

INSERT INTO `rbac_permissions` (`ID`, `Lft`, `Rght`, `Title`, `Description`)
VALUES (1, 0, 1, 'root', 'root');

INSERT INTO `rbac_roles` (`ID`, `Lft`, `Rght`, `Title`, `Description`)
VALUES (1, 0, 1, 'root', 'root');

INSERT INTO `rbac_rolepermissions` (`RoleID`, `PermissionID`, `AssignmentDate`)
VALUES (1, 1, UNIX_TIMESTAMP());

INSERT INTO `rbac_userroles` (`UserID`, `RoleID`, `AssignmentDate`)
VALUES (1, 1, UNIX_TIMESTAMP());

/*
 * Create Tables for organization-ship
 */


/* 政党 */
CREATE TABLE `org_political_party` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_company` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_dept_level_1` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_dept_level_2` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_dept_level_3` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_dept_level_4` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_dept_level_5` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `org_jobs` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `org_parties` (`id`, `name`)
VALUES (1, '无党派');
INSERT INTO `org_parties` (`id`, `name`)
VALUES (2, '中共党员');
INSERT INTO `org_parties` (`id`, `name`)
VALUES (3, '其他党派');

INSERT INTO `org_company` (`id`, `name`)
VALUES (1, '保山能源发展股份有限公司');

INSERT INTO `org_dept_level_1` (`id`, `name`)
VALUES (1, '松山河口电厂');
INSERT INTO `org_dept_level_1` (`id`, `name`)
VALUES (2, '苏家河口电厂');

INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (1, '检修班');
INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (2, '运行一班');
INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (3, '运行二班');
INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (4, '运行三班');
INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (5, '运行四班');
INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (6, '运行五班');
INSERT INTO `org_dept_level_2` (`id`, `name`)
VALUES (7, '办公室');

INSERT INTO `org_jobs` (`id`, `name`)
VALUES (1, '检修员');
INSERT INTO `org_jobs` (`id`, `name`)
VALUES (2, '运行员');
INSERT INTO `org_jobs` (`id`, `name`)
VALUES (3, '班长');

/*
 * Create Tables for auth
 */

CREATE TABLE `auth_groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth_groups` (`id`, `name`, `description`) VALUES
     (1,'admin','Administrator'),
     (2,'members','General User');

CREATE TABLE `auth_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phone` char(20) NOT NULL,
  `username` char(10) NULL,
  `email` char(40) NULL,
  `active` tinyint(1) unsigned DEFAULT NULL,
  `detailed_info_done` tinyint(1) unsigned DEFAULT NULL,
  `updated_on` int(11) unsigned NULL,
  `created_on` int(11) unsigned NULL,
  `last_login` int(11) unsigned NULL,
  `gender` char(1) NULL,
  `id_card_num` char(25) NULL,
  `party_id` tinyint(4) unsigned DEFAULT NULL,
  `company_id` tinyint(4) unsigned DEFAULT NULL,
  `dept_LV1_id` tinyint(4) unsigned DEFAULT NULL,
  `dept_LV2_id` tinyint(4) unsigned DEFAULT NULL,
  `dept_LV3_id` tinyint(4) unsigned DEFAULT NULL,
  `dept_LV4_id` tinyint(4) unsigned DEFAULT NULL,
  `dept_LV5_id` tinyint(4) unsigned DEFAULT NULL,
  `job_id` tinyint(4) unsigned DEFAULT NULL,
  `ip_address` char(45) NULL,
  `password` varchar(255) NOT NULL,
  `forgotten_password_selector` varchar(255) DEFAULT NULL,
  `forgotten_password_code` varchar(255) DEFAULT NULL,
  `forgotten_password_time` int(11) unsigned DEFAULT NULL,
  `activation_selector` varchar(255) DEFAULT NULL,
  `activation_code` varchar(255) DEFAULT NULL,
  `activation_time` int(11) unsigned DEFAULT NULL,
  `remember_selector` varchar(255) DEFAULT NULL,
  `remember_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `uc_email` UNIQUE (`email`),
  CONSTRAINT `uc_phone` UNIQUE (`phone`),
  CONSTRAINT `uc_activation_selector` UNIQUE (`activation_selector`),
  CONSTRAINT `uc_forgotten_password_selector` UNIQUE (`forgotten_password_selector`),
  CONSTRAINT `uc_remember_selector` UNIQUE (`remember_selector`),
  KEY `fk_users_party_idx` (`party_id`),
  KEY `fk_users_company_idx` (`company_id`),
  KEY `fk_users_dept_LV1_idx` (`dept_LV1_id`),
  KEY `fk_users_dept_LV2_idx` (`dept_LV2_id`),
  KEY `fk_users_dept_LV3_idx` (`dept_LV3_id`),
  KEY `fk_users_dept_LV4_idx` (`dept_LV4_id`),
  KEY `fk_users_dept_LV5_idx` (`dept_LV5_id`),
  KEY `fk_users_job_idx` (`job_id`),
  CONSTRAINT `fk_users_party_id` FOREIGN KEY (`party_id`) REFERENCES `org_parties` (`id`),
  CONSTRAINT `fk_users_company_id` FOREIGN KEY (`company_id`) REFERENCES `org_company` (`id`),
  CONSTRAINT `fk_users_dept_LV1_id` FOREIGN KEY (`dept_LV1_id`) REFERENCES `org_dept_level_1` (`id`),
  CONSTRAINT `fk_users_dept_LV2_id` FOREIGN KEY (`dept_LV2_id`) REFERENCES `org_dept_level_2` (`id`),
  CONSTRAINT `fk_users_dept_LV3_id` FOREIGN KEY (`dept_LV3_id`) REFERENCES `org_dept_level_3` (`id`),
  CONSTRAINT `fk_users_dept_LV4_id` FOREIGN KEY (`dept_LV4_id`) REFERENCES `org_dept_level_4` (`id`),
  CONSTRAINT `fk_users_dept_LV5_id` FOREIGN KEY (`dept_LV5_id`) REFERENCES `org_dept_level_5` (`id`),
  CONSTRAINT `fk_users_job_id` FOREIGN KEY (`job_id`) REFERENCES `org_jobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth_users` (`id`, `phone`, `username`, `email`, `active`, `password`) VALUES
    ('1','13812345678','管理员','admin@163.com','1','$argon2i$v=19$m=4096,t=2,p=2$bWVjN0c4MEVtS2ZzakJUMw$IR3GQ945dWBrmjlZkKUUTqax09APo8EoMFIDOVwjdy0');

/*
INSERT INTO `auth_users` (`id`, `ip_address`, `username`, `password`, `email`, `activation_code`, `forgotten_password_code`, `created_on`, `last_login`, `active`, `company`, `phone`) VALUES
    ('1','127.0.0.1','administrator','$2y$08$200Z6ZZbp3RAEXoaWcMA6uJOFicwNZaqk4oDhqTUiFXFe63MG.Daa','admin@admin.com','',NULL,'1268889823','1268889823','1', '1','13812345678');
*/

CREATE TABLE `auth_users_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_groups_users1_idx` (`user_id`),
  KEY `fk_users_groups_groups1_idx` (`group_id`),
  CONSTRAINT `uc_users_groups` UNIQUE (`user_id`, `group_id`),
  CONSTRAINT `fk_users_groups_users1` FOREIGN KEY (`user_id`) REFERENCES `auth_users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_groups_groups1` FOREIGN KEY (`group_id`) REFERENCES `auth_groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth_users_groups` (`id`, `user_id`, `group_id`) VALUES
     (1,1,1),
     (2,1,2);

CREATE TABLE `auth_login_attempts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `login` varchar(100) NOT NULL,
  `time` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `auth_verification_code` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` char(40) NULL,
  `code` char(5) NULL,
  `created_on` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
*/

DROP TABLE IF EXISTS `auth_users_groups`;
DROP TABLE IF EXISTS `auth_users`;
DROP TABLE IF EXISTS `org_jobs`;
DROP TABLE IF EXISTS `org_dept_level_5`;
DROP TABLE IF EXISTS `org_dept_level_4`;
DROP TABLE IF EXISTS `org_dept_level_3`;
DROP TABLE IF EXISTS `org_dept_level_2`;
DROP TABLE IF EXISTS `org_dept_level_1`;
DROP TABLE IF EXISTS `org_company`;
DROP TABLE IF EXISTS `org_parties`;
