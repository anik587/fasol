CREATE DATABASE IF NOT EXISTS `fasol`;
-- GRANT CREATE ON *.* TO 'root'@'%';
-- GRANT CREATE ON `fasol`.* TO 'root'@'%';
-- USE `fasol`;
CREATE TABLE IF NOT EXISTS `cities_tables` (
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `population` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `allied_cities` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `idx_uuid` (`uuid`)
);