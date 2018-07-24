-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: shengxian
-- ------------------------------------------------------
-- Server version	5.7.21-1ubuntu1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add address',7,'add_address'),(20,'Can change address',7,'change_address'),(21,'Can delete address',7,'delete_address'),(22,'Can add user',8,'add_user'),(23,'Can change user',8,'change_user'),(24,'Can delete user',8,'delete_user'),(25,'Can add cart',9,'add_cart'),(26,'Can change cart',9,'change_cart'),(27,'Can delete cart',9,'delete_cart'),(28,'Can add order',10,'add_order'),(29,'Can change order',10,'change_order'),(30,'Can delete order',10,'delete_order'),(31,'Can add order goods',11,'add_ordergoods'),(32,'Can change order goods',11,'change_ordergoods'),(33,'Can delete order goods',11,'delete_ordergoods'),(34,'Can add prod typ',12,'add_prodtyp'),(35,'Can change prod typ',12,'change_prodtyp'),(36,'Can delete prod typ',12,'delete_prodtyp'),(37,'Can add products',13,'add_products'),(38,'Can change products',13,'change_products'),(39,'Can delete products',13,'delete_products');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(9,'orderapp','cart'),(10,'orderapp','order'),(11,'orderapp','ordergoods'),(12,'productapp','prodtyp'),(13,'productapp','products'),(6,'sessions','session'),(7,'userapp','address'),(8,'userapp','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-07-17 13:34:38.268630'),(2,'auth','0001_initial','2018-07-17 13:34:41.007451'),(3,'admin','0001_initial','2018-07-17 13:34:41.465006'),(4,'admin','0002_logentry_remove_auto_add','2018-07-17 13:34:41.482071'),(5,'contenttypes','0002_remove_content_type_name','2018-07-17 13:34:41.800969'),(6,'auth','0002_alter_permission_name_max_length','2018-07-17 13:34:41.938035'),(7,'auth','0003_alter_user_email_max_length','2018-07-17 13:34:42.139230'),(8,'auth','0004_alter_user_username_opts','2018-07-17 13:34:42.154159'),(9,'auth','0005_alter_user_last_login_null','2018-07-17 13:34:42.433156'),(10,'auth','0006_require_contenttypes_0002','2018-07-17 13:34:42.443151'),(11,'auth','0007_alter_validators_add_error_messages','2018-07-17 13:34:42.459178'),(12,'auth','0008_alter_user_username_max_length','2018-07-17 13:34:42.577806'),(13,'auth','0009_alter_user_last_name_max_length','2018-07-17 13:34:42.705865'),(14,'sessions','0001_initial','2018-07-17 13:34:42.823623'),(18,'userapp','0001_initial','2018-07-18 03:07:07.965512'),(19,'userapp','0002_auto_20180718_1728','2018-07-18 09:28:26.970116'),(22,'productapp','0001_initial','2018-07-18 12:02:54.450247'),(23,'productapp','0002_auto_20180718_1635','2018-07-18 12:02:54.568315'),(24,'orderapp','0001_initial','2018-07-18 12:02:55.072672'),(25,'productapp','0003_auto_20180718_2013','2018-07-18 12:17:44.765833'),(26,'userapp','0003_address_isselect','2018-07-18 13:19:42.016723'),(27,'productapp','0004_prodtyp_typesort','2018-07-20 06:01:15.114127'),(28,'userapp','0004_auto_20180720_2158','2018-07-20 13:58:33.175547');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1rsjy08xu6n0oclnf0dmot7m5w9xrf6i','MTVhNzRlM2E1NTliNGRkOTlhMWFmZWFmZjUwNjAxMzYxNDAzOTIwMDp7ImNvZGUiOiJyOUFmIn0=','2018-08-06 06:46:32.487283'),('57r4x46vyjif1md0mjefksddppd2ptqp','MTI1MmI5NTFkZmQyZmE0MDJmNTk1OGUwN2FmMzA5MThjMzVjNzRjNTp7ImNvZGUiOiIwamJ3In0=','2018-08-06 08:11:10.031418'),('pu9ngocd5lt5brbalc13lc7f0i7u2630','N2EyNDE1ZThjN2NiYjU5ZjI2ZDFhNmQwZWQ4NWU1MzU2NzliNWQ5Mzp7InVzZXJfaWQiOjl9','2018-08-05 03:19:49.943072'),('q4lt8yc1mi35qfzj9db1gceuo4uottbg','OWU3NWRlNGQyNzljNWE5ZmRhNTA3ZWFhZmUzZTliNzc3NGEzMWFkZTp7InZlcmlmeWNvZGUiOiIzdlFKIiwiY29kZSI6IkZNSkIifQ==','2018-08-06 07:24:11.845185'),('qgjnzhis34f06e24e9301x23bzs4at7o','MjM3ZjkxZDQyNmI3ZGIzYzNhMTEyN2I5ZmM2Zjg3NDdkYTlhOTU1MTp7InVzZXJfaWQiOjE4fQ==','2018-08-06 04:00:07.769853'),('u7ztt5smucwfubkd2cpf443jv7hel07b','NGZkNWVjNzRiYzg2ZGY5NDg1YzdjMDhiYzc0MmI2MDZkMjZjM2NjMzp7InZlcmlmeWNvZGUiOiJQZUJUIn0=','2018-08-06 08:03:56.271724'),('udglnvoxryg7dnn02e5h7l76vxd4sv0e','MTRlNmQ3Yjk4NzA1MGI4OTdjNjlkODE1YjA1NWM0NTBkNDM3NzcwNzp7fQ==','2018-08-06 07:05:06.935546'),('vm5wvornu6zrfbwjhkdh4f4q6q5ndm3e','OTY1MTAyMmY5ZmFiMDRiNjZlYWE3Y2ExZjRmYjZhM2Y3MWRhMjEwMjp7InVzZXJfaWQiOjF9','2018-08-02 09:31:15.781543'),('wwmljqm81ws7u86sgllrw7z6r84hf0y0','NjA4ZjEzNjhlZjkzMGZjOTkyN2Q2OTQxOGNhOGJhYzA4NzYwYTgyODp7InVzZXJfaWQiOjE5LCJ2ZXJpZnljb2RlIjoiNWhwMCIsImNvZGUiOiJHMXIwIn0=','2018-08-06 02:03:53.797652');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_address`
--

DROP TABLE IF EXISTS `sx_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `detailAddr` longtext NOT NULL,
  `phone` varchar(12) NOT NULL,
  `zipCode` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `isselect` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sx_address_user_id_aeb70a11_fk_sx_users_id` (`user_id`),
  CONSTRAINT `sx_address_user_id_aeb70a11_fk_sx_users_id` FOREIGN KEY (`user_id`) REFERENCES `sx_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_address`
--

LOCK TABLES `sx_address` WRITE;
/*!40000 ALTER TABLE `sx_address` DISABLE KEYS */;
INSERT INTO `sx_address` VALUES (1,'赵爱蓉','高新六路立人科技','18898987878',715500,9,0),(2,'杨红玉','高新六路立人科技','18829301119',715400,9,0),(3,'哈哈','高新六路立人科技','18890908787',715500,18,0),(4,'panda','雁塔南路','17789895656',714545,18,1);
/*!40000 ALTER TABLE `sx_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_cart`
--

DROP TABLE IF EXISTS `sx_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnt` int(11) NOT NULL,
  `isSelected` tinyint(1) NOT NULL,
  `products_id` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sx_cart_user_id_0bf10ed2_fk_sx_users_id` (`user_id`),
  KEY `sx_cart_products_id_e05c5759_fk_sx_products_productid` (`products_id`),
  CONSTRAINT `sx_cart_products_id_e05c5759_fk_sx_products_productid` FOREIGN KEY (`products_id`) REFERENCES `sx_products` (`productid`),
  CONSTRAINT `sx_cart_user_id_0bf10ed2_fk_sx_users_id` FOREIGN KEY (`user_id`) REFERENCES `sx_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_cart`
--

LOCK TABLES `sx_cart` WRITE;
/*!40000 ALTER TABLE `sx_cart` DISABLE KEYS */;
INSERT INTO `sx_cart` VALUES (1,1,1,'506775',1),(2,2,1,'599178',1),(3,1,1,'599179',1);
/*!40000 ALTER TABLE `sx_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_order`
--

DROP TABLE IF EXISTS `sx_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_order` (
  `orderNum` varchar(50) NOT NULL,
  `orderPrice` decimal(10,2) NOT NULL,
  `payState` int(11) NOT NULL,
  `payType` int(11) NOT NULL,
  `orderState` int(11) NOT NULL,
  `orderTime` datetime(6) NOT NULL,
  `orderChangeTime` datetime(6) NOT NULL,
  `order_address_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`orderNum`),
  KEY `sx_order_order_address_id_f0d62709_fk_sx_address_id` (`order_address_id`),
  KEY `sx_order_user_id_96a24b74_fk_sx_users_id` (`user_id`),
  CONSTRAINT `sx_order_order_address_id_f0d62709_fk_sx_address_id` FOREIGN KEY (`order_address_id`) REFERENCES `sx_address` (`id`),
  CONSTRAINT `sx_order_user_id_96a24b74_fk_sx_users_id` FOREIGN KEY (`user_id`) REFERENCES `sx_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_order`
--

LOCK TABLES `sx_order` WRITE;
/*!40000 ALTER TABLE `sx_order` DISABLE KEYS */;
INSERT INTO `sx_order` VALUES ('002937170608',123.50,0,0,4,'2018-07-22 09:52:17.178613','2018-07-22 09:52:17.266982',1,9),('002939739807',54.90,0,0,0,'2018-07-23 08:02:54.080719','2018-07-23 08:02:54.110030',4,18),('002947255285',392.70,1,0,1,'2018-07-19 12:46:44.825586','2018-07-20 02:10:52.163878',1,1),('002974115603',256.20,0,0,0,'2018-07-23 07:46:07.421035','2018-07-23 07:46:07.511735',4,18),('002983076667',47.50,0,0,4,'2018-07-23 06:43:03.166820','2018-07-23 06:43:03.279084',1,9);
/*!40000 ALTER TABLE `sx_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_ordergoods`
--

DROP TABLE IF EXISTS `sx_ordergoods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_ordergoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnt` int(11) NOT NULL,
  `sumprice` decimal(10,2) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `products_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sx_ordergoods_order_id_b6ca74ce_fk_sx_order_orderNum` (`order_id`),
  KEY `sx_ordergoods_products_id_3c45b03e_fk_sx_products_productid` (`products_id`),
  CONSTRAINT `sx_ordergoods_order_id_b6ca74ce_fk_sx_order_orderNum` FOREIGN KEY (`order_id`) REFERENCES `sx_order` (`orderNum`),
  CONSTRAINT `sx_ordergoods_products_id_3c45b03e_fk_sx_products_productid` FOREIGN KEY (`products_id`) REFERENCES `sx_products` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_ordergoods`
--

LOCK TABLES `sx_ordergoods` WRITE;
/*!40000 ALTER TABLE `sx_ordergoods` DISABLE KEYS */;
INSERT INTO `sx_ordergoods` VALUES (1,4,168.00,'002947255285','10561629'),(2,3,149.70,'002947255285','10720027'),(3,5,75.00,'002947255285','520718'),(8,1,18.50,'002937170608','522541'),(9,1,6.00,'002937170608','525500'),(10,1,99.00,'002937170608','644624'),(11,1,18.50,'002983076667','522541'),(12,1,29.00,'002983076667','522523'),(13,5,125.00,'002974115603','598669'),(14,1,11.50,'002974115603','573623'),(15,3,119.70,'002974115603','523822'),(16,1,15.00,'002939739807','598661'),(17,1,39.90,'002939739807','523821');
/*!40000 ALTER TABLE `sx_ordergoods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_products`
--

DROP TABLE IF EXISTS `sx_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_products` (
  `productid` varchar(20) NOT NULL,
  `productname` varchar(300) DEFAULT NULL,
  `productimg` varchar(150) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `salenums` int(11) DEFAULT NULL,
  `typeid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_products`
--

LOCK TABLES `sx_products` WRITE;
/*!40000 ALTER TABLE `sx_products` DISABLE KEYS */;
INSERT INTO `sx_products` VALUES ('10369670','【2盒】八喜巧克力榛子甜筒冰淇淋组合装（5支装 共340g）','http://pic2.womai.com/upload/601/604/51700/84500/10369670/10369670_0_pic500_5887.jpg',28.00,317,'206740'),('10371081','【2袋】朝日红薯干(片装）400g袋装','http://pic3.womai.com/upload/601/604/51700/84500/10371081/10371081_1_pic500_7979.jpg',31.90,14,'82817'),('10511687','【四瓶】够轻松 原味酸牛奶235g瓶装','http://static.womai.com/images/spacer0.png',17.50,298,'89500'),('10530499','【买五赠一】马迭尔 冰棍芒果味85g袋装','http://pic1.womai.com/upload/601/604/439208/10530499/10530499_1_pic500_25.jpg',49.90,27,'206740'),('10530501','【买五赠一】马迭尔 冰棍朗姆酒味85g袋装','http://pic2.womai.com/upload/601/604/439208/10530501/10530501_1_pic500_4351.jpg',49.90,32,'206740'),('10561629','【六袋】北冰洋 草莓口味袋淋冰淇淋200g 袋装（卡子颜色随机发货）','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/629412/10561629_1_pic500_2647.jpg',42.00,107,'206740'),('10573432','【4盒】[安萃]国产蓝莓12mm-14mm（盒装125g）','http://static.womai.com/images/spacer0.png',29.90,64,'500219'),('10613551','中粮安至选进口肉礼券198型（华北地区）','http://pic2.womai.com/upload/601/603/607/10613551/10613551_1_pic500_814.jpg',198.00,57,'82802'),('10613568','中粮安至选进口肉礼券666型（华北地区）','http://static.womai.com/images/spacer0.png',666.00,44,'82802'),('10634059','【十袋】完达山 袋装风味发酵乳炭烧酸奶180g袋装','http://pic1.womai.com/upload/601/602/65323/641877/10634059_1_pic500_6122.jpg',21.00,12,'89500'),('10683440','[安萃] 泰国椰青3粒装 单粒700g买第2件1.0折','http://pic2.womai.com/upload/601/603/358812/378407/495407/495410/644623/10683440_0_pic500_7301.jpg',59.00,125,'82800'),('10683441','[安萃] 泰国椰青6粒装 单粒700g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/644623/10683441_0_pic500_7301.jpg',78.00,125,'82800'),('10695035','【12盒】[安萃]国产蓝莓12mm-14mm  （单盒装125g）','http://static.womai.com/images/spacer0.png',69.00,674,'500219'),('10706438','【买五赠二】马迭尔 冰棍香草味85g袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/206740/206743/623284/10706438_1_pic500_5257.jpg',49.90,26,'206740'),('10711247','【三盒】八喜巧克力榛子甜筒冰淇淋组合5支装340g','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/516213/10711247_0_pic500_7863.jpg',36.00,27,'206740'),('10714249','【线上专用】提货券 海鲜精品大礼包礼券588型 团XAP9批','http://pic1.womai.com/upload/601/604/439208/10714249/10714249_1_pic500_9739.jpg',589.00,0,'82802'),('10714250','【线上专用】提货券 海鲜优选大礼包D礼券1888型 团XAT9批','http://static.womai.com/images/spacer0.png',1889.00,0,'82802'),('10714252','【线上专用】提货券 海鲜优选大礼包A礼券588型 团XAR9批','http://static.womai.com/images/spacer0.png',589.00,0,'82802'),('10716832','【5枚】进口红心火龙果 单果重320-450g','http://pic1.womai.com/upload/601/603/210641/210654/210656/624167/10716832_0_pic500_4766.jpg',29.90,545,'82800'),('10720027','新疆吊干杏 盒装1000g','http://pic1.womai.com/upload/601/603/606/64306/280374/500219/500228/633659/10720027_1_pic500_8384.jpg',49.90,7,'500219'),('504258','大厨小鲜精选海捕大对虾（黑虎虾）6头 300g 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/82802/82900/504258/504258_0_pic500_2312.jpg',65.00,502,'82802'),('504269','大洋世家海鲜精品大礼包  6730g 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/82802/82900/504269/504269_1_pic500_9915.jpg',588.00,33,'82802'),('506766','大洋世家阿根廷船冻红虾10/20 ([进口食品] 礼盒装 2kg 每公斤17尾左右)','http://static.womai.com/images/spacer0.png',228.00,4308,'82802'),('506770','大洋世家超低温蓝鳍金枪鱼大脂生鱼片礼盒（[进口食品] 超低温）360g 盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82900/506770/506770_0_pic500_613.jpg',799.00,5,'82802'),('506775','大洋世家厄瓜多尔白虾50/60（100-120只） ([进口食品] 活冻 盒装 2000g)','http://pic2.womai.com/upload/601/603/606/201600/201606/206000/506775/506775_1_pic500_1922.jpg',138.00,7895,'219300'),('514339','八喜朗姆冰淇淋550g','http://pic3.womai.com/upload/601/603/514339/514339_1_pic500_8168.jpg',31.50,293,'206740'),('514343','八喜香草冰淇淋550g','http://pic1.womai.com/upload/601/603/514343/514343_1_pic500_2152.jpg',36.80,327,'206740'),('514345','八喜摩卡杏仁冰淇淋550g','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/514345/514345_1_pic500_5271.jpg',29.90,263,'206740'),('514712','约翰丹尼特制提拉米苏蛋糕[9块] (盒装 720g)','http://pic3.womai.com/upload/601/603/606/64306/280375/219400/219423/514712/514712_0_pic500_4647.jpg',109.00,397,'219400'),('515072','湾仔码头上汤小云吞 鲜美虾皇云吞（袋装400g）','http://pic3.womai.com/upload/601/603/515072/515072_1_pic500_51.jpg',29.90,1082,'219424'),('515073','湾仔码头上汤小云吞 鲜美纯肉云吞（袋装600g）','http://pic2.womai.com/upload/601/603/210641/210654/210656/515073/515073_0_pic500_8964.jpg',19.90,1082,'219424'),('515074','湾仔码头云吞港式鲜美大虾云吞皇（袋装360g）','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219426/515074/515074_1_pic500_8342.jpg',36.00,132,'219424'),('515083','湾仔码头面点 秘制豆沙包 350g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219425/515083/515083_0_pic500_1945.jpg',15.80,1598,'219424'),('516203','八喜六合一冰淇淋(盒装 360g)','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/516203/516203_1_pic500_8985.jpg',32.80,1147,'206740'),('516212','八喜摩卡杏仁甜筒冰淇淋组合装（5支装 共340g）','http://pic2.womai.com/upload/601/603/606/64306/280375/206740/206741/516212/516212_1_pic500_9179.JPG',22.90,325,'206740'),('516213','八喜巧克力榛子甜筒冰淇淋组合5支装340g','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/516213/516213_0_pic500_7863.jpg',19.80,1038,'206740'),('516214','八喜香草甜筒冰淇淋组合5支装340g','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/516214/516214_1_pic500_813.JPG',19.80,483,'206740'),('516219','八喜半加仑巧克力(桶装 1100g)','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/516219/516219_0_pic500_3155.jpg',69.00,156,'206740'),('516865','八喜香草冰淇淋90g','http://pic2.womai.com/upload/601/603/516865/516865_1_pic500_7777.jpg',8.80,327,'206740'),('516867','八喜巧克力冰淇淋 (杯装 90g)','http://pic2.womai.com/upload/601/603/516867/516867_0_pic500_433.JPG',8.80,303,'206740'),('516868','八喜朗姆冰淇淋 (杯装 90g)','http://pic3.womai.com/upload/601/603/516868/516868_1_pic500_380.jpg',8.80,294,'206740'),('516869','八喜芒果冰淇淋90g','http://pic3.womai.com/upload/601/603/516869/516869_1_pic500_3276.jpg',8.80,336,'206740'),('518453','王家渡川味香肠 麻辣味 袋装 220g（新旧包装，随机发货）','http://pic3.womai.com/upload/601/603/210641/210654/210656/518453/518453_9_pic500_1491.jpg',21.90,262,'219400'),('518454','王家渡川味香肠 咸鲜味 袋装 220g（新旧包装，随机发货）','http://pic2.womai.com/upload/601/603/606/64306/280375/219400/219420/518454/518454_0_pic500_5634.jpg',21.90,317,'219400'),('520430','[安萃]平谷大桃 盒装1500-1750g  9枚 单果重150-200g','http://pic1.womai.com/upload/601/603/606/64306/280374/82609/520430/520430_0_pic500_9865.jpg',25.80,483,'500219'),('520431','[安萃]平谷大桃 盒装4枚 900g 单果200-250g','http://pic3.womai.com/upload/601/603/606/64306/280374/82609/520431/520431_0_pic500_5434.jpg',19.80,423,'500219'),('520715','中粮家佳康美式脆皮热狗肠(原味) (袋装250g)','http://pic3.womai.com/upload/601/602/61010/520715/520715_1_pic500_3015.jpg',15.00,328,'219400'),('520717','中粮家佳康美式脆皮热狗肠(黑椒味) (袋装250g)','http://pic3.womai.com/upload/601/602/61010/520717/520717_1_pic500_5408.jpg',15.00,149,'219400'),('520718','中粮家佳康台湾风味香肠 (袋装 250g)','http://pic2.womai.com/upload/601/602/61010/520718/520718_1_pic500_7244.jpg',15.00,300,'219400'),('520721','中粮家佳康京味大香肠 (袋装 240g)','http://pic3.womai.com/upload/601/602/61010/520721/520721_0_pic500_5836.JPG',16.00,382,'219400'),('520728','中粮家佳康香嫩梅花肉 (袋装 300g)','http://pic3.womai.com/upload/601/602/61010/520728/520728_1_pic500_583.jpg',19.00,149,'219400'),('520729','中粮家佳康广味香肠 (袋装 200g)','http://pic1.womai.com/upload/601/602/61010/520729/520729_1_pic500_198.jpg',19.80,358,'219400'),('521806','湾仔码头面点 香菇素菜大包390g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219425/521806/521806_1_pic500_7973.jpg',13.90,1597,'219424'),('522310','湾仔码头水饺 三鲜馅 (袋装300g）','http://pic2.womai.com/upload/601/603/90900/216060/216061/522310/522310_1_pic500_3135.JPG',11.50,1673,'219424'),('522523','乐芝牛粒酪香 法国进口原味奶酪15粒 78g','http://pic1.womai.com/upload/601/603/606/64306/280375/89500/206061/522523/522523_1_pic500_9908.jpg',29.00,35,'89500'),('522541','百吉福棒棒奶酪 [原味] (袋装 120g)（新老包装随机发货）','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206061/522541/522541_1_pic500_9361.jpg',18.50,201,'89500'),('523821','湾仔码头水饺玉米蔬菜猪肉馅 (家庭装1320)','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219426/523821/523821_0_pic500_6709.jpg',39.90,1672,'219424'),('523822','湾仔码头水饺三鲜馅 (家庭装1320g)','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219426/523822/523822_1_pic500_6274.jpg',39.90,316,'219424'),('523823','湾仔码头水饺大白菜猪肉馅  (家庭装1320g)','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219426/523823/523823_1_pic500_9159.jpg',39.90,1672,'219424'),('523824','湾仔码头水饺荠菜猪肉 (家庭装1320g)','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219426/523824/523824_1_pic500_982.JPG',39.90,224,'219424'),('523825','湾仔码头水饺韭菜猪肉水饺 (家庭装1320g)','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219426/523825/523825_0_pic500_6158.jpg',39.90,1672,'219424'),('523913','三元酸奶 全脂原味八联杯酸牛奶 100g*8盒装','http://pic1.womai.com/upload/601/602/66008/523913/523913_0_pic500_4040.JPG',9.90,482,'89500'),('523918','三元酸奶 益菌多黄桃酸牛奶 杯装 8*125g','http://pic3.womai.com/upload/601/602/66008/523918/523918_0_pic500_5583.jpg',15.00,96,'89500'),('523932','三元酸奶 青提果肉酸牛奶 袋装 180g','http://static.womai.com/images/spacer0.png',6.00,63,'89500'),('524340','三全水饺 状元玉米蔬菜猪肉水饺(袋装702g)','http://pic2.womai.com/upload/601/603/606/64306/280375/219424/219426/524340/524340_1_pic500_4247.jpg',21.90,97,'219424'),('524344','三全面点 奶黄包 360g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219425/524344/524344_1_pic500_6726.jpg',9.90,210,'219424'),('524838','中粮家佳康精猪里脊肉 [冷冻]  350g盒装','http://pic1.womai.com/upload/601/602/61010/524838/524838_0_pic500_8259.jpg',18.00,74,'82402'),('524839','中粮家佳康猪五花肉[冷冻]350g盒装','http://pic2.womai.com/upload/601/602/61010/524839/524839_0_pic500_2717.jpg',16.80,367,'82402'),('524843','中粮家佳康精猪肉馅 [冷冻] 300g盒装','http://pic2.womai.com/upload/601/602/61010/524843/524843_0_pic500_5724.jpg',9.90,188,'82402'),('524853','中粮家佳康猪棒骨 [冷冻]700g盒装 （2根）','http://static.womai.com/images/spacer0.png',19.90,114,'82402'),('525500','三元酸奶 老北京凝固型 [原味] 酸牛奶  180g杯装','http://pic1.womai.com/upload/601/602/66008/525500/525500_0_pic500_9944.jpg',6.00,216,'89500'),('526986','宗家府泡菜 白菜切件泡菜 (袋装400g)','http://static.womai.com/images/spacer0.png',15.80,288,'82817'),('532606','大洋世家合家欢乐超值海鲜礼盒 3750g  礼盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/82802/82900/532606/532606_1_pic500_8423.jpg',358.00,72,'82802'),('538157','光明如实 无添加发酵乳135g','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/538157/538157_1_pic500_3953.jpg',8.80,127,'89500'),('539118','雀巢雪糕 牛奶棒7支装 413g袋装','http://pic1.womai.com/upload/601/602/51600/539118/539118_0_pic500_8582.jpg',27.90,253,'206740'),('540220','避风塘鲜肉糯米烧卖(袋装240g)','http://pic3.womai.com/upload/601/603/210641/210654/210656/540220/540220_0_pic500_3044.jpg',12.90,271,'219424'),('540992','和路雪梦龙 香草口味冰淇淋5支装 320g盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/540992/540992_0_pic500_8180.jpg',46.50,142,'206740'),('542957','荷美尔 超值鲜嫩火腿片 135g 袋装','http://pic1.womai.com/upload/601/603/606/7200/7205/542957/542957_1_pic500_2243.JPG',12.90,90,'219400'),('545752','平谷蟠桃 3-4枚  盒装350g （单果80-120g）','http://pic3.womai.com/upload/601/603/606/64306/280374/82609/545753/545752_0_pic500_3487.jpg',19.80,44,'500219'),('550674','正宗德州扒鸡清真五香扒鸡 500g 袋装（新老包装，随机发货）','http://pic3.womai.com/upload/601/603/210641/210654/210656/550674/550674_0_pic500_190.jpg',51.00,219,'219400'),('550728','中粮优选海鲜大礼包A 6730g 礼盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82900/550728/550728_1_pic500_8882.jpg',588.00,29,'82802'),('550731','中粮优选海鲜大礼包D 7900g 礼盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82900/550731/550731_1_pic500_5852.jpg',1988.00,20,'82802'),('554214','大洋世家阿根廷船冻红虾20/30（40-60只/盒）2kg 礼盒装','http://pic2.womai.com/upload/601/603/210641/210654/210656/554214/554214_0_pic500_6969.jpg',168.00,4550,'82802'),('555925','湾仔码头上汤小云吞 三鲜云吞 600g 袋装','http://pic1.womai.com/upload/601/603/210641/210654/210656/555925/555925_0_pic500_9159.jpg',34.90,1081,'219424'),('558056','广州酒家凤凰流沙包（袋装337.5g）','http://pic2.womai.com/upload/601/603/606/64306/280375/219424/219425/558056/558056_0_pic500_8400.jpg',16.80,2766,'219424'),('558127','海南迷你青柠檬250g盒装','http://pic3.womai.com/upload/601/603/606/64306/280374/82609/558127/558127_1_pic500_4552.jpg',10.80,1886,'500219'),('562134','CP正大单冻鸡翅中 1000g 袋装  约20个','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/219342/562134/562134_0_pic500_8270.JPG',59.00,629,'82402'),('562264','【包邮】厨王牌厨王鸡【两只装】礼盒箱装（1000g）','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82902/562264/562264_1_pic500_9235.jpg',113.00,9,'82802'),('562613','大洋世家欧派多味金枪鱼罐头礼盒 1165g 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/82802/82900/562613/562613_1_pic500_633.jpg',108.00,28,'82802'),('563568','广州酒家虾饺皇（袋装160g）','http://pic2.womai.com/upload/601/603/606/64306/280375/219424/219430/563568/563568_1_pic500_9508.jpg',18.80,2762,'219424'),('564551','荷美尔 经典台式香肠 250g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82817/219364/564551/564551_0_pic500_3141.JPG',19.80,55,'219400'),('564554','荷美尔 经典美式火腿片 [原味] 250g 袋装','http://pic2.womai.com/upload/601/603/210641/210654/210656/564554/564554_0_pic500_1496.JPG',26.00,23,'219400'),('564698','湾仔码头水饺 玉米蔬菜猪肉水饺 720g 袋装','http://pic3.womai.com/upload/601/603/564698/564698_0_pic500_6574.jpg',25.00,286,'219424'),('564699','湾仔码头水饺 三鲜水饺 720g 袋装','http://pic1.womai.com/upload/601/603/564699/564699_0_pic500_2229.jpg',26.00,379,'219424'),('564702','湾仔码头水饺 芹菜猪肉水饺 720g 袋装','http://pic3.womai.com/upload/601/603/564702/564702_1_pic500_106.jpg',34.90,177,'219424'),('565077','乐世小厨手抓饼 培根味精装5片 600g袋装','http://static.womai.com/images/spacer0.png',22.60,145,'219400'),('566121','总统牌 淡味黄油块 200g','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206061/566121/566121_1_pic500_857.jpg',36.90,63,'89500'),('566124','总统牌 马苏里拉匹萨专用奶酪片 200g【新老包装随机发货】','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206061/566124/566124_1_pic500_1571.jpg',29.90,81,'89500'),('566126','总统牌 三明治专用奶酪片 200g【新老包装随机发货】','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206061/566126/566126_1_pic500_62.jpg',29.00,65,'89500'),('566705','五芳斋速冻100克*5豆沙粽','http://pic3.womai.com/upload/601/603/606/64306/280375/219400/219422/566705/566705_1_pic500_1782.jpg',9.90,71,'219400'),('566943','大洋世家厄瓜多尔白虾30/40 [进口食品] 活冻 60-80只  盒装 2000g','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219301/566943/566943_0_pic500_3153.jpg',258.00,7895,'219300'),('568351','都乐超甜蕉730g/把（3-6支）（单果重160g-245g）','http://pic3.womai.com/upload/601/603/607/359405/362208/568351/568351_1_pic500_2963.jpg',16.80,1137,'82800'),('569435','百吉福芝士片香浓原味100g（新老包装随机发货）','http://pic3.womai.com/upload/601/603/569435/569435_1_pic500_6288.jpg',12.00,155,'89500'),('569438','百吉福低脂芝士片166g袋装（新老包装随机发货）','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206061/569438/569438_1_pic500_2086.jpg',19.80,65,'89500'),('569440','百吉福棒棒奶酪 水果味大袋装500g（新老包装随机发货）','http://pic1.womai.com/upload/601/603/606/64306/280375/89500/206061/569440/569440_0_pic500_2544.jpg',49.90,304,'89500'),('571233','三全面点 葱油花卷 300g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219425/571233/571233_5_pic500_2440.jpg',7.90,145,'219424'),('571242','三全水饺 鸡蛋韭菜水饺 450g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219426/571242/571242_9_pic500_8168.jpg',12.00,716,'219424'),('571244','三全水饺 猪肉大葱水饺 450g袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219424/219426/571244/571244_5_pic500_6894.jpg',9.90,55,'219424'),('571600','中粮安至选澳洲牛腩 1000g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/82505/571600/571600_1_pic500_8950.jpg',88.00,838,'82402'),('571602','中粮安至选澳洲牛腱子1000g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/82505/571602/571602_0_pic500_7507.jpg',65.00,1432,'82402'),('572193','升元荞麦冷面600g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219424/219430/572193/572193_1_pic500_814.JPG',8.80,206,'219424'),('572213','鲜玉米-水果玉米1300g袋装（3-4根）','http://pic1.womai.com/upload/601/603/606/64306/280374/206960/572213/572213_0_pic500_3057.jpg',9.80,106,'206960'),('572215','鲜玉米-糯玉米1000g袋装（3-4根）','http://pic2.womai.com/upload/601/603/606/64306/280374/206960/572215/572215_0_pic500_9180.jpg',8.80,113,'206960'),('573293','【包邮】山上果林散养柴鸡蛋礼券48枚','http://pic3.womai.com/upload/601/603/606/64306/280375/82802/219461/573293/573293_1_pic500_3632.jpg',110.00,1,'82802'),('573294','【包邮】山上果林散养野猪肉礼盒券2000克','http://static.womai.com/images/spacer0.png',299.00,1,'82802'),('573299','【包邮】山养特种野猪肉礼盒3000克','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/219341/573299/573299_1_pic500_7671.jpg',299.00,1,'82802'),('573506','提货券 龙虾普通1只138元团TG3批','http://static.womai.com/images/spacer0.png',138.00,0,'82802'),('573623','三元酸奶 雪凝茯苓酸奶150g*4杯装','http://pic2.womai.com/upload/601/602/66008/573623/573623_0_pic500_8949.jpg',11.50,569,'89500'),('574669','大洋世家阿根廷船冻红虾20/30（45-60只）2kg  盒装','http://pic3.womai.com/upload/601/603/90900/216060/216061/574669/574669_1_pic500_4807.jpg',129.00,4595,'219300'),('576170','和润日式酸奶200g 瓶装','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/576170/576170_1_pic500_8421.jpg',8.80,264,'89500'),('576171','和润丹麦式酸奶200g 瓶装','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/576171/576171_1_pic500_9348.jpg',8.80,126,'89500'),('576178','和润原味酸牛奶910g 瓶装','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/576178/576178_1_pic500_4138.jpg',18.80,73,'89500'),('576181','和润草莓+桑椹低脂酸牛奶910g 瓶装','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/576181/576181_1_pic500_1919.jpg',25.80,79,'89500'),('576182','和润黄桃+芒果低脂酸牛奶910g 瓶装','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/576182/576182_1_pic500_6725.jpg',25.80,82,'89500'),('576186','和润日式酸奶1050g 瓶装','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/576186/576186_1_pic500_6514.jpg',36.00,270,'89500'),('576187','和润丹麦式酸奶1050g 瓶装','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/576187/576187_1_pic500_1595.jpg',34.80,126,'89500'),('576188','和润纯酸奶400g 盒装','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/576188/576188_1_pic500_3494.jpg',12.90,180,'89500'),('579384','荷美尔冷冻生煎西班牙香肠120g袋装（3根）','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219364/579384/579384_0_pic500_6461.jpg',9.90,161,'219400'),('579385','荷美尔冷冻生煎德式香肠120g袋装（3根）','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219364/579385/579385_0_pic500_1839.jpg',9.90,245,'82402'),('579386','荷美尔 冷冻香煎培根120g袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82817/219364/579386/579386_0_pic500_3234.jpg',9.90,380,'219400'),('580086','问鼎食神越南巴沙鱼片（2-3片）800g  袋装','http://pic3.womai.com/upload/601/603/210641/210654/210656/580086/580086_1_pic500_1056.jpg',19.90,1401,'219300'),('580351','三全手抓饼 葱香千丝抓饼320g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219430/580351/580351_1_pic500_1287.jpg',9.90,648,'219424'),('580352','三全手抓饼 原味千丝抓饼320g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219430/580352/580352_1_pic500_4126.JPG',9.90,171,'219424'),('580511','宾格瑞 香蕉味冰棒122g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206743/580511/580511_1_pic500_7982.jpg',7.90,346,'206740'),('580719','大洋世家条冻秋刀鱼（14-16条） 2000g 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/82802/82900/580719/580719_1_pic500_976.jpg',78.00,167,'82802'),('581922','中粮安至选乌拉圭牛腱子 1000g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/82505/581922/581922_2_pic500_8844.jpg',88.00,2855,'82402'),('584317','中粮安至选澳洲谷饲上脑原切牛排 180g 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/82505/584317/584317_1_pic500_899.jpg',32.00,851,'82402'),('584319','中粮安至选澳洲金钱腱（腱子芯） 1000g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/82505/584319/584319_0_pic500_352.jpg',108.00,746,'82402'),('584751','唯品纯牛乳500ml','http://pic1.womai.com/upload/601/603/606/64306/280375/89500/209100/584751/584751_1_pic500_5284.JPG',16.80,200,'89500'),('586534','明治彩盒装 栗子红豆冰激凌雪糕 372g盒装','http://pic2.womai.com/upload/601/602/63317/586534/586534_1_pic500_2758.jpg',36.80,78,'206740'),('588150','优诺优丝 原味  风味发酵乳 135g*3杯','http://pic1.womai.com/upload/601/603/606/64306/280375/89500/206060/588150/588150_1_pic500_5849.jpg',15.80,161,'89500'),('588152','【自营冷藏】优诺优丝 蓝莓果粒  风味发酵乳 135g*3杯','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/588152/588152_1_pic500_9092.JPG',21.00,70,'89500'),('588700','中粮家佳康 早餐切片火腿45g','http://pic2.womai.com/upload/601/602/61010/588700/588700_1_pic500_5644.jpg',6.00,685,'219400'),('590622','问鼎食神蒜蓉粉丝扇贝（6粒装）250g   袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219321/600126/590622_0_pic500_809.jpg',9.90,806,'219300'),('590994','三元酸奶 布朗旎风味发酵乳255g瓶装','http://pic3.womai.com/upload/601/602/66008/590994/590994_0_pic500_7055.jpg',7.80,442,'89500'),('591080','中粮家佳康纽伦堡香肠200g袋装','http://pic2.womai.com/upload/601/602/61010/591080/591080_1_pic500_8795.jpg',25.00,65,'219400'),('593072','宗家府泡菜 白菜切件泡菜1.2kg','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219360/593072/593072_1_pic500_6208.jpg',30.90,8,'219400'),('594570','【包邮】农佳优选山养柴鸡蛋年卡宅配服务30枚*26次','http://static.womai.com/images/spacer0.png',1700.00,1,'82802'),('595074','福成美食家 麻酱烧饼 70g*4枚 袋装（1分钟加工）（新老包装，随机发货）','http://pic2.womai.com/upload/601/603/606/7500/7502/595074/595074_1_pic500_3898.jpg',9.50,555,'219424'),('595098','中粮凌鲜·大洋世家加拿大野生北极虾120+（60-75只）500g  袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/595098/595098_1_pic500_6688.jpg',41.80,2202,'219300'),('595261','【包邮】北水海鲜卡2588型（黄金蟹，波士顿龙虾，银鳕鱼，北极甜虾等10种）','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82900/595261/595261_1_pic500_1641.jpg',2588.00,0,'82802'),('595263','【包邮】北水海鲜卡1198型（黄鱼，石斑鱼，青口贝，北极甜虾等8种）','http://static.womai.com/images/spacer0.png',1198.00,0,'82802'),('595264','【包邮】北水海鲜卡998型（有机黄花鱼，三文鱼，南美白虾等8种）','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82900/595264/595264_1_pic500_7110.jpg',998.00,0,'82802'),('596433','天福号 午餐肉380g袋装（新老包装，随机发货）','http://pic2.womai.com/upload/601/603/606/7500/7501/7514/596433/596433_1_pic500_1066.jpg',17.00,1,'219400'),('596435','天福号 松仁肚250g袋装（新老包装，随机发货）','http://pic1.womai.com/upload/601/603/606/7500/7501/7514/596435/596435_1_pic500_5315.jpg',15.90,20,'219400'),('596438','天福号 小香肠200g袋装（新老包装，随机发货）','http://pic1.womai.com/upload/601/603/606/7500/7501/7514/596438/596438_1_pic500_8342.jpg',19.90,3,'219400'),('596506','荷美尔 超值随意火腿片 50g袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219400/219420/596506/596506_1_pic500_2367.jpg',6.90,41,'219400'),('597732','大厨小鲜蒜蓉粉丝贝（6粒装）270g  袋装（5分钟加工）','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219321/597732/597732_0_pic500_6120.JPG',12.80,2096,'219300'),('598661','卡士草莓果粒鲜酪乳（100g*3）','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/598661/598661_0_pic500_910.jpg',15.00,677,'89500'),('598669','卡士原态酪乳（125g*3）','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/598669/598669_1_pic500_7195.jpg',25.00,713,'89500'),('598737','维理 马铃薯条400g袋装','http://pic1.womai.com/upload/601/603/358812/378407/422422/598737/598737_0_pic500_4761.jpg',9.90,47,'82817'),('599163','中粮凌鲜·大洋世家青虾仁(17-21只，剔虾腺)175g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219301/599163/599163_15_pic500_1462.jpg',18.80,4615,'219300'),('599164','中粮凌鲜·大洋世家两条装东海大黄鱼300/400（2条装）700g  袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/599164/599164_1_pic500_5100.jpg',38.00,1459,'219300'),('599165','中粮凌鲜·大洋世家青虾仁(90-110只，剔虾腺)1kg 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/599165/599165_1_pic500_9327.jpg',82.00,4615,'219300'),('599178','中粮凌鲜·大洋世家厄瓜多尔白虾50/60（100-120只）2kg  盒装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219301/599178/599178_1_pic500_6272.jpg',129.00,7895,'219300'),('599179','中粮凌鲜·大洋世家厄瓜多尔白虾40/50(80-100只)2kg  盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/599179/599179_1_pic500_6863.jpg',145.00,7895,'219300'),('599413','伊利酸奶 大果粒发酵乳（芒果+黄桃）260g杯装','http://static.womai.com/images/spacer0.png',7.80,10,'89500'),('599602','可米酷 无糖冰淇淋 香草口味90g杯装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/599602/599602_1_pic500_2474.jpg',9.90,51,'206740'),('599603','可米酷 无糖冰淇淋 巧克力口味90g杯装','http://pic2.womai.com/upload/601/603/606/64306/280375/206740/206741/599603/599603_1_pic500_1652.jpg',12.90,24,'206740'),('599722','中粮安至选巴西牛腩 1000g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/82505/599722/599722_1_pic500_4408.jpg',69.00,2299,'82402'),('600127','问鼎食神挪威青花鱼片(去骨,单片)150g  袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219302/600127/600127_0_pic500_5175.jpg',9.90,601,'219300'),('600186','明治彩盒装 蓝莓酸奶雪糕10支*46g盒装','http://pic3.womai.com/upload/601/602/63317/600186/600186_0_pic500_4316.jpg',38.00,70,'206740'),('600991','朝日薯干(片）400g袋装','http://pic2.womai.com/upload/601/602/62826/600991/600991_0_pic500_2551.jpg',15.90,748,'219400'),('601892','和路雪迷你可爱多 蓝莓酸奶口味冰淇淋200g盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/601892/601892_1_pic500_901.jpg',18.80,16,'206740'),('601934','德青源 爱的鲜鸡蛋32枚1.37kg箱装（新老包装随机发货）','http://pic2.womai.com/upload/601/603/607/359405/362207/386611/601934/601934_2_pic500_3797.jpg',34.90,139,'82402'),('602325','中粮家佳康 冷冻超值培根1kg袋装买第2件1.0折','http://pic1.womai.com/upload/601/602/61010/602325/602325_20_pic500_3967.jpg',59.90,1248,'82817'),('604098','美登高 超市装红豆沙冰棍390g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/604098/604098_1_pic500_25.jpg',14.80,88,'206740'),('604099','美登高 超市装绿豆沙冰棍390g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206743/604099/604099_0_pic500_5986.jpg',14.80,51,'206740'),('604100','美登高 超市装大红果冰棍450g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/604100/604100_1_pic500_1581.jpg',13.50,90,'206740'),('604935','和润希腊式酸奶不加糖150g杯装','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/604935/604935_1_pic500_8548.jpg',12.90,49,'89500'),('606339','伊丽莎白瓜单枚装700-900g','http://pic3.womai.com/upload/601/603/606/64306/280374/82609/541924/606339_0_pic500_5544.jpg',14.90,346,'500219'),('606484','问鼎食神泰国金枕头榴莲肉（盒装400g）','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219363/606484/606484_1_pic500_4740.jpg',59.00,301,'82800'),('607847','广州酒家核桃包（袋装337.5g）','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219425/607847/607847_0_pic500_9665.jpg',19.00,2759,'219424'),('608166','鹏程无公害精猪五花条500g 袋装 约2-4条','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/219341/608166/608166_0_pic500_8608.jpg',23.80,128,'82402'),('608167','鹏程无公害猪肋排500g 袋装（硬骨+软骨）8-12块','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/219341/608167/608167_0_pic500_9159.jpg',25.80,325,'82402'),('608171','鹏程无公害猪小里脊500g 袋装 约2根','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/219341/608171/608171_0_pic500_7696.jpg',21.80,134,'82402'),('608758','绿环园彩椒2个 350g','http://pic3.womai.com/upload/601/603/607/359405/362207/386613/608758/608758_0_pic500_3299.jpg',12.80,13,'206960'),('608762','绿环园豇豆 250g','http://static.womai.com/images/spacer0.png',7.50,12,'206960'),('608764','绿环园柿子椒2个  250g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608764/608764_0_pic500_8426.jpg',6.90,19,'206960'),('608768','绿环园芹菜 300g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495408/608768/608768_0_pic500_3448.jpg',6.50,29,'206960'),('608771','绿环园单颗圆茄 500g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608771/608771_0_pic500_7164.jpg',7.20,19,'206960'),('608775','绿环园西兰花 300g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608775/608775_0_pic500_8659.jpg',11.80,33,'206960'),('608779','绿环园小黄瓜4-5个  400g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608779/608779_0_pic500_1450.jpg',10.80,30,'206960'),('608782','绿环园铁棍山药 350g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608782/608782_0_pic500_7577.jpg',15.50,15,'206960'),('608783','绿环园 花菇 150g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608783/608783_0_pic500_9005.jpg',13.50,13,'206960'),('608786','绿环园团生菜1颗  500g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608786/608786_0_pic500_7527.jpg',7.20,31,'206960'),('608789','绿环园油菜 300g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608789/608789_0_pic500_6708.jpg',5.90,42,'206960'),('608791','绿环园菜花 400g','http://static.womai.com/images/spacer0.png',8.80,33,'206960'),('608794','绿环园大葱 300g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608794/608794_0_pic500_7729.jpg',5.90,13,'206960'),('608797','绿环园圣女果 350g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495408/608797/608797_0_pic500_9813.jpg',6.80,82,'206960'),('608802','绿环园丝瓜3个 500g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608802/608802_0_pic500_9496.jpg',9.90,13,'206960'),('608805','绿环园大蒜 350g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608805/608805_0_pic500_906.jpg',8.50,9,'206960'),('608806','绿环园胡萝卜3根  500g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495408/608806/608806_0_pic500_297.jpg',8.80,65,'206960'),('608807','绿环园白萝卜2个  1000g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495408/608807/608807_0_pic500_7264.jpg',5.50,28,'206960'),('608809','绿环园洋葱2个 500g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495408/608809/608809_0_pic500_8223.jpg',5.50,11,'206960'),('608810','绿环园红洋葱2个 500g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608810/608810_0_pic500_3996.jpg',6.90,43,'206960'),('608813','绿环园广西荔浦大芋头单枚装 1500g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608813/608813_1_pic500_9457.jpg',29.80,6,'206960'),('608815','绿环园姜 300g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608815/608815_0_pic500_7969.jpg',8.80,17,'206960'),('608841','绿环园迷你土豆 500g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495408/608841/608841_0_pic500_7746.jpg',6.90,13,'206960'),('608843','绿环园毛豆 350g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/608843/608843_0_pic500_5793.jpg',6.50,10,'206960'),('609083','中粮安至选黑椒牛排 160g*2片 盒装（非原切）','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/275397/609083/609083_0_pic500_8674.jpg',42.00,732,'82402'),('609341','三全儿童虾仁胡萝卜水饺300g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219424/219426/609341/609341_0_pic500_6712.jpg',19.80,703,'219424'),('611102','【中粮海外直采】海洋玉爱尔兰野生熟冻黄金蟹 (袋装 400g-600g）','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219320/611102/611102_1_pic500_2907.jpg',29.90,166,'219300'),('611717','【中粮海外直采】马来西亚FIGO炸鱼丸 400g','http://pic2.womai.com/upload/601/603/606/64306/280375/82817/219361/611717/611717_0_pic500_2469.jpg',24.00,75,'82817'),('611718','【中粮海外直采】马来西亚FIGO泰式风味鱼饼 500g','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219361/611718/611718_1_pic500_2407.jpg',32.00,39,'82817'),('611719','【中粮海外直采】马来西亚FIGO香芋鱼丸 500g','http://pic2.womai.com/upload/601/603/606/64306/280375/82817/219361/611719/611719_1_pic500_9958.jpg',26.80,61,'82817'),('611720','【中粮海外直采】马来西亚FIGO五宝一品锅什锦鱼丸 500g','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219361/611720/611720_1_pic500_3213.jpg',39.00,107,'82817'),('611721','【中粮海外直采】马来西亚FIGO干贝形海鲜豆腐鱼饼 500g','http://pic1.womai.com/upload/601/603/606/64306/280375/82817/219361/611721/611721_1_pic500_7514.jpg',26.00,101,'82817'),('612155','[安萃]库尔勒香梨4粒 盒装430g 单果100-120g','http://pic3.womai.com/upload/601/603/607/359405/444205/612155/612155_0_pic500_4272.jpg',6.90,1852,'500219'),('612165','百年栗园冷冻土鸡鸡翅中 500g袋装 散养100—120天 （约11-12个）	','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/219342/612165/612165_1_pic500_1939.jpg',32.00,269,'82402'),('612166','百年栗园土鸡鸡大胸1kg袋装 散养100—120天（3-5片装）	','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/219342/612166/612166_1_pic500_2644.jpg',39.90,101,'82402'),('612169','百年栗园栗园老母鸡 1250g袋装（散养500天）','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/219342/612169/612169_0_pic500_2335.jpg',39.90,334,'82402'),('613288','吉吉荣昌烤乳猪2000g','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/219341/613288/613288_0_pic500_2030.jpg',518.00,20,'82802'),('613814','大成姐妹厨房急鲜封鸡大胸 1000g袋装 （约4-9片）','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/219342/613814/613814_0_pic500_9451.jpg',29.90,149,'82402'),('613815','大成姐妹厨房急鲜封鸡琵琶腿 1000g袋装  （约6-9个）','http://static.womai.com/images/spacer0.png',29.90,75,'82402'),('614590','新希望活润大果粒酸牛奶低温酸奶黄桃+芒果风味酸奶370g盒装','http://static.womai.com/images/spacer0.png',8.00,366,'89500'),('614591','新希望活润大果粒酸牛奶低温酸奶蓝莓+山药风味酸奶370g盒装','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/614591/614591_1_pic500_1131.jpg',12.80,92,'89500'),('616185','烟台六十里有机淡干海参 150g 盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/82802/82900/616185/616185_0_pic500_1725.JPG',1688.00,140,'82802'),('616186','烟台六十里有机淡干海参 50g 袋装','http://static.womai.com/images/spacer0.png',588.00,140,'82802'),('616190','烟台六十里有机淡干海参（80-120头/斤）400g 盒装','http://static.womai.com/images/spacer0.png',4688.00,140,'82802'),('616968','[安萃]库尔勒香梨18粒 盒装1900g 单果100-120g','http://pic2.womai.com/upload/601/603/606/64306/280374/219481/616968/616968_0_pic500_5265.jpg',23.60,1852,'500219'),('616969','[安萃]进口红心火龙果5枚 礼盒装2000g 单果320-450g','http://pic1.womai.com/upload/601/603/606/64306/280374/219481/616969/616969_0_pic500_390.jpg',39.80,2452,'82800'),('617008','口蘑 400g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/617008/617008_0_pic500_4418.jpg',16.80,9,'206960'),('618456','[安萃]山东红富士苹果4枚  盒装800g 单果200-250g','http://pic1.womai.com/upload/601/603/618456/618456_0_pic500_3030.jpg',15.80,382,'500219'),('619281','鲜逢.鱼丸 225g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219361/619281/619281_1_pic500_4507.jpg',18.80,67,'82817'),('619282','鲜逢.爱心鱼豆腐 225g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82817/219361/619282/619282_1_pic500_2577.jpg',19.80,81,'82817'),('619283','鲜逢.龙虾味球 225g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82817/219361/619283/619283_1_pic500_8428.jpg',19.80,87,'82817'),('619316','问鼎食神舟山鲳鱼（平鱼，4条装）400g  袋装（非真空）','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/619316/619316_1_pic500_6838.jpg',21.80,309,'219300'),('620330','晓芹淡干海参（5-8头）20g  礼盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219321/620330/620330_1_pic500_8184.jpg',299.00,409,'82802'),('620331','晓芹淡干海参（20-30头）80g  礼盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219321/620331/620331_1_pic500_8641.jpg',899.00,411,'82802'),('620332','晓芹淡干海参（15-18头）60g  礼盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219321/620332/620332_1_pic500_8882.jpg',690.00,413,'82802'),('620336','天福号 白领厨房天福蒜肠300g袋装（新老包装，随机发货）','http://pic3.womai.com/upload/601/603/606/64306/280375/219400/219420/620336/620336_1_pic500_8810.jpg',17.80,2,'219400'),('620338','天福号 白领厨房熏童子鸡550g袋装（新老包装，随机发货）','http://pic2.womai.com/upload/601/603/606/64306/280375/219400/219420/620338/620338_1_pic500_6936.jpg',29.90,20,'219400'),('620414','福成美食家 火锅盐酥烧饼4片 360g/袋（1分钟加工）','http://pic3.womai.com/upload/601/603/606/64306/280375/219424/219425/620414/620414_1_pic500_2997.jpg',11.50,27,'219424'),('620422','圃美多番茄肉酱意大利面520g','http://static.womai.com/images/spacer0.png',29.90,18,'219424'),('620852','狗不理经典猪肉包420g袋装买第2件1.0折','http://pic2.womai.com/upload/601/603/606/64306/280375/219424/219425/620852/620852_0_pic500_3642.jpg',27.90,199,'219424'),('621398','雪原 内蒙古熟酸奶1000g瓶装（新老包装随机发货）','http://static.womai.com/images/spacer0.png',19.80,156,'89500'),('621400','荷美尔 经典尊享鸡翅（奥尔良风味）235g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219400/219420/621400/621400_0_pic500_3372.jpg',25.00,80,'219400'),('621450','鲟鱼礼盒2.5-3.5斤两条装礼品卡（鲜活鲟龙鱼全国兑换）','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/621450/621450_0_pic500_4596.jpg',366.00,0,'82802'),('621452','鲟鱼礼盒2.5-3.5斤装礼品卡（鲜活鲟龙鱼全国兑换）','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219302/621452/621452_0_pic500_3156.jpg',258.00,0,'82802'),('621454','鲟鱼礼盒8-10斤装礼品卡（鲜活鲟龙鱼全国兑换）','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219302/621454/621454_0_pic500_4991.jpg',658.00,0,'82802'),('621716','进口青苹果袋装850g（6枚装）（单果重130-200g）','http://pic1.womai.com/upload/601/603/358812/378407/495413/495210/621716/621716_1_pic500_6535.jpg',33.80,106,'82800'),('621735','百香果盒装500g（约8-10个）','http://pic2.womai.com/upload/601/603/358812/378407/495407/495410/610282/621735_0_pic500_7828.jpg',17.80,470,'500219'),('622367','提货券 中粮优选海鲜大礼包A588元团FJ8批','http://pic3.womai.com/upload/601/610/611/613/66300/622367/622367_1_pic500_7238.jpg',588.00,0,'82802'),('622368','提货券 中粮优选生鲜大礼包B888元团FK8批','http://pic3.womai.com/upload/601/610/611/613/66300/622368/622368_1_pic500_6867.jpg',888.00,0,'82802'),('622369','提货券 中粮优选生鲜大礼包D1888元团FM8批','http://static.womai.com/images/spacer0.png',1888.00,2,'82802'),('622563','中粮安至选进口肥牛片 480g 袋装','http://static.womai.com/images/spacer0.png',46.00,48,'82402'),('623282','马迭尔 冰棍芒果味85g袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/206740/206743/623282/623282_7_pic500_4155.jpg',10.00,95,'206740'),('623283','马迭尔 冰棍朗姆酒味85g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206743/623283/623283_1_pic500_1625.jpg',10.00,90,'206740'),('623284','马迭尔 冰棍香草味85g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206743/623284/623284_1_pic500_5257.jpg',10.00,201,'206740'),('623285','马迭尔 冰棍榛子味85g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206743/623285/623285_1_pic500_2093.jpg',20.00,22,'206740'),('623286','马迭尔 冰棍榴莲味85g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206743/623286/623286_1_pic500_4607.jpg',10.00,151,'206740'),('623839','中粮家佳康 台湾风味香肠75g袋装','http://pic2.womai.com/upload/601/602/61010/623839/623839_1_pic500_5890.jpg',6.00,22,'219400'),('624165','[安萃] 进口白心火龙果单果装（400-500g)','http://static.womai.com/images/spacer0.png',13.80,427,'82800'),('624167','[安萃]进口红心火龙果单果装(320-450g)','http://pic2.womai.com/upload/601/603/210641/210654/210656/624167/624167_0_pic500_4766.jpg',13.90,545,'82800'),('624871','哈肉联 红肠熏煮香肠90g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219400/219420/624871/624871_1_pic500_9371.jpg',9.00,26,'219400'),('624873','哈肉联 精红肠熏煮香肠85g袋装','http://static.womai.com/images/spacer0.png',9.00,45,'219400'),('625335','恒都乌拉圭牛肋条 1000g袋装','http://static.womai.com/images/spacer0.png',65.00,298,'82402'),('625343','恒都澳洲原切西冷牛排150g袋装 单片装','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/82505/625343/625343_1_pic500_3845.jpg',15.80,8,'82402'),('625348','恒都精选肥牛片（卷）380g袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/82402/82505/625348/625348_2_pic500_3243.jpg',21.80,136,'82402'),('625357','恒都筋肉搭档1000g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/82505/625357/625357_1_pic500_2823.jpg',42.00,186,'82402'),('625367','恒都精品牛肉块1000g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/82505/625367/625367_1_pic500_8434.jpg',38.00,258,'82402'),('625369','宗家府40g切件泡菜5连包','http://pic1.womai.com/upload/601/603/606/64306/280375/82817/219363/625369/625369_1_pic500_6250.jpg',9.90,5,'82817'),('626340','问鼎食神 冷冻树莓400g 盒装','http://pic2.womai.com/upload/601/603/606/64306/280374/234980/500858/626340/626340_1_pic500_7785.jpg',29.90,15,'82817'),('627179','鸿安冷冻牛腱子1000g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/82505/627179/627179_1_pic500_223.jpg',59.00,703,'82402'),('627180','鸿安冷冻牛腩1000g 袋装','http://static.womai.com/images/spacer0.png',55.00,724,'82402'),('627255','佳沃 蓝莓盒装125g（一级果，单果15mm+）','http://static.womai.com/images/spacer0.png',12.80,329,'500219'),('627368','菲诺黄金椰粒椰子冻200g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/627368/627368_1_pic500_6361.jpg',26.00,4,'89500'),('627806','圣牧塞茵苏 熟酸奶1000g瓶装','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/627806/627806_1_pic500_5211.jpg',26.00,13,'89500'),('627817','新希望 原态酪乳零添加酸牛奶礼包100g*10袋','http://pic2.womai.com/upload/601/603/606/64306/280375/89500/206060/627817/627817_1_pic500_2107.jpg',14.90,35,'89500'),('628343','明治 香草味雪糕410g','http://pic3.womai.com/upload/601/602/63317/628343/628343_1_pic500_3972.jpg',38.00,12,'206740'),('628897','[安萃]国产蓝莓12mm-14mm（盒装125g）','http://static.womai.com/images/spacer0.png',8.80,674,'500219'),('629271','洪湖渔家麻辣小龙虾13-15只（30-40g/只）900g  盒装','http://static.womai.com/images/spacer0.png',52.80,29,'219300'),('629272','洪湖渔家十三香小龙虾15-20只（25-35g/只）900g  盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/629272/629272_1_pic500_8228.jpg',68.00,83,'219300'),('629273','洪湖渔家麻辣小龙虾15-20只（25-35g/只）900g  盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/629273/629273_1_pic500_8286.jpg',49.00,97,'219300'),('629412','北冰洋 草莓口味袋淋冰淇淋200g 袋装（卡子颜色随机发货）','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/629412/629412_1_pic500_5750.jpg',7.00,334,'206740'),('629822','鸿安肥牛三号切片500g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/82505/629822/629822_1_pic500_4731.jpg',29.90,69,'82402'),('630212','品鲜大道去头小黄鱼(30-50条) 500g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/630212/630212_1_pic500_2815.JPG',19.90,94,'219300'),('630556','好伯香草鸡肉早餐肠180g袋装','http://static.womai.com/images/spacer0.png',12.90,21,'219400'),('630756','中粮安至选美国猪肋排（软骨） 500g 袋装','http://pic1.womai.com/upload/601/603/358812/378408/495233/495236/630756/630756_1_pic500_5069.jpg',29.00,245,'82402'),('630773','美登高私人定制手切奶酪冰淇淋100g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/206740/206741/630773/630773_1_pic500_7746.jpg',5.00,41,'206740'),('631249','恒都有机牛腱子1000g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/82505/631249/631249_1_pic500_5168.jpg',88.00,108,'82402'),('632167','恒都筋头巴脑500g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/82505/632167/632167_1_pic500_3120.jpg',29.90,188,'82402'),('632216','中粮凌鲜·大洋世家东海大黄鱼（单条，400g-500g/条 ）450g  袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/632216/632216_1_pic500_6805.jpg',45.00,92,'219300'),('632217','中粮凌鲜·大洋世家野生阿根廷红虾 L2（40-60只）2kg  盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/632217/632217_1_pic500_2008.jpg',125.00,335,'219300'),('632219','中粮凌鲜·大洋世家加拿大野生北极虾80+ (36-48只) 400g盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/632219/632219_1_pic500_7716.jpg',48.00,71,'219300'),('632220','中粮凌鲜·大洋世家舟山鲳鱼（平鱼，4条装，100g-200g/条）450g   袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219302/632220/632220_1_pic500_4749.jpg',38.00,224,'219300'),('632221','【2018新虾】中粮凌鲜·大洋世家野生阿根廷红虾 L1 2kg盒装 20-40只','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/632221/632221_1_pic500_2774.jpg',139.00,253,'219300'),('632222','中粮凌鲜·大洋世家原味青虾仁31/40（无添加剂，剔虾腺）500g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219301/632222/632222_0_pic500_6743.jpg',69.90,127,'219300'),('633187','恒都菲力牛排套餐1520g袋装 16片（含料包）','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/82505/633187/633187_1_pic500_6633.jpg',85.00,388,'82402'),('633867','品鲜大道舟山带鱼段（中段，15-20块）500g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/633867/633867_1_pic500_5126.jpg',19.90,152,'219300'),('634273','中粮悠采 跳跳兔奶黄包50g','http://pic2.womai.com/upload/601/603/606/7500/7502/634273/634273_1_pic500_7166.jpg',3.50,152,'219424'),('634275','中粮悠采 乖乖猪香莓包50g','http://pic3.womai.com/upload/601/603/606/7500/7502/634275/634275_1_pic500_1805.jpg',3.50,152,'219424'),('635425','【包邮】福建漳州新鲜六鳌红蜜薯 5斤 ','http://pic2.womai.com/upload/601/603/210641/210654/210657/635425/635425_1_pic500_2885.jpg',29.90,15,'206960'),('635437','光明 赏味酪乳 风味发酵乳 原味无添加酸奶 135g*3','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/635437/635437_1_pic500_1820.jpg',19.90,4,'89500'),('635439','光明 儿童健能 风味发酵乳 原味酸奶 100g*6','http://pic3.womai.com/upload/601/603/606/64306/280375/89500/206060/635439/635439_1_pic500_1222.jpg',14.00,0,'89500'),('637130','大洋世家海鲜精选大礼包 4150g  盒装','http://static.womai.com/images/spacer0.png',288.00,1,'82802'),('637725','马迭尔冰棍 法式酸奶味 80g/支 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/206740/206743/637725/637725_1_pic500_5026.jpg',15.00,3,'206740'),('637726','马迭尔冰棍 抹茶味 85g/支 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206743/637726/637726_1_pic500_5608.jpg',10.00,11,'206740'),('638981','鲜逢.黑椒香肠 225g 盒装（10根）','http://pic1.womai.com/upload/601/603/606/64306/280375/82817/219364/638981/638981_1_pic500_631.jpg',19.80,3,'82817'),('638984','鲜逢.早餐肠 225g （10根 ）盒装','http://static.womai.com/images/spacer0.png',18.80,6,'219400'),('638999','中粮悠采 雪花戗面大馒头560g','http://static.womai.com/images/spacer0.png',16.00,380,'219424'),('639000','中粮悠采 红豆包350g','http://pic2.womai.com/upload/601/603/606/7500/7502/639000/639000_1_pic500_8671.jpg',16.00,439,'219424'),('639001','中粮悠采 葱油花卷300g','http://pic2.womai.com/upload/601/603/606/7500/7502/639001/639001_1_pic500_1784.jpg',15.00,300,'219424'),('639209','丹麦皇冠进口五花肉条500g袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/500825/500828/639209/639209_1_pic500_9257.jpg',23.80,102,'82402'),('639251','都乐皇帝蕉550g-750g/把（8-14支）（单果重35g-55g）','http://pic1.womai.com/upload/601/603/358812/378407/495407/495410/639251/639251_1_pic500_4364.jpg',23.80,28,'82800'),('640334','渔泊湾银鳕鱼扒（3-5块）454g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219302/640334/640334_1_pic500_7569.jpg',188.00,55,'219300'),('640908','恒都乌拉圭牛腱子1000g袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/275397/640908/640908_1_pic500_7573.jpg',59.00,9,'82402'),('640950','渔泊湾阿拉斯加鲑鱼酱（香辣） 120g 罐装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219302/640950/640950_1_pic500_3742.jpg',9.90,59,'82817'),('640953','渔泊湾青虾仁71/90（剔虾腺）908g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/640953/640953_1_pic500_8668.jpg',85.00,92,'219300'),('641889','安心渔 麻辣蛤蜊肉100g袋装','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/641889/641889_1_pic500_4757.jpg',9.90,35,'82817'),('642635','中粮家佳康猪小排400g盒装（约25块）','http://pic1.womai.com/upload/601/602/61010/642635/642635_1_pic500_2401.jpg',18.00,106,'82402'),('642947','东来顺酱牛肉200g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495410/642947/642947_1_pic500_860.jpg',36.00,22,'219400'),('642957','夯番薯冰烤地瓜500g（约2~4个）','http://pic1.womai.com/upload/601/603/606/64306/280375/82817/219363/642957/642957_1_pic500_5262.jpg',26.90,51,'82817'),('643416','问鼎食神 冷冻巴沙鱼片（2片装）450g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219302/643416/643416_1_pic500_582.jpg',19.00,37,'219300'),('643746','王家渡午餐肉肠320g','http://pic2.womai.com/upload/601/603/606/64306/280375/219400/219420/643746/643746_1_pic500_9626.jpg',19.80,3,'219400'),('644082','大洋世家预炸巴沙鱼豆腐（原装芝士味）160g  袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/82817/219361/644082/644082_1_pic500_8935.jpg',15.00,6,'82817'),('644248','大洋世家超值火锅大礼包  3600g 盒装','http://static.womai.com/images/spacer0.png',268.00,0,'82802'),('644527','中粮安至选智利鸡翅中 1000g 袋装（约23-27个）','http://pic1.womai.com/upload/601/603/606/64306/280375/82402/275397/644527/644527_1_pic500_2561.jpg',49.00,250,'82402'),('644623','[安萃] 泰国椰青 单粒装700g','http://pic1.womai.com/upload/601/603/358812/378407/495407/495410/644623/644623_0_pic500_7301.jpg',21.80,126,'82800'),('644624','[安萃] 泰国椰青9粒箱装 单粒重700g 赠开椰器1个','http://pic2.womai.com/upload/601/603/358812/378407/495407/495408/644624/644624_0_pic500_909.jpg',99.00,188,'500219'),('644726','品鲜大道北极甜虾（120-150只）500g  袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219302/644726/644726_1_pic500_4929.jpg',28.00,62,'219300'),('645174','品鲜大道轮切三文鱼排 500g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219302/645174/645174_1_pic500_8545.jpg',59.90,200,'219300'),('645253','大厨小鲜舟山鲳鱼礼盒200/300（428g两条*3）1.284kg  盒装','http://pic2.womai.com/upload/601/603/606/64306/280375/82802/82900/645253/645253_1_pic500_4876.jpg',145.00,0,'82802'),('645806','大厨小鲜舟山大黄鱼300/400（2条装）628g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/645806/645806_1_pic500_3325.jpg',38.80,113,'219300'),('645810','大厨小鲜舟山小黄鱼 20/30（8-12条）450g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219302/645810/645810_1_pic500_9386.jpg',9.90,78,'219300'),('646101','踢馆酱香猪蹄 200g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/219400/219421/646101/646101_0_pic500_819.jpg',25.00,94,'219400'),('646102','踢馆麻辣猪蹄 200g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219400/219421/646102/646102_0_pic500_6165.jpg',26.00,93,'219400'),('647372','中粮安至选阿根廷牛腱子 1000g 袋装','http://pic3.womai.com/upload/601/603/606/64306/280375/82402/82505/647372/647372_1_pic500_3588.jpg',79.00,168,'82402'),('647441','西班牙甜橙袋装1000g（约4-5枚）（单果重230g-270g）','http://pic1.womai.com/upload/601/603/358812/378407/495407/495410/647441/647441_1_pic500_1088.jpg',25.80,108,'82800'),('647443','都乐木瓜单枚装 袋装400g','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/647443/647443_1_pic500_6210.jpg',17.80,4,'82800'),('647445','新西兰加力果袋装1500g（约8-10枚）（单果重160g-190g）','http://pic2.womai.com/upload/601/603/606/64306/280374/82800/582981/647445_0_pic500_5263.jpg',45.80,938,'82800'),('648019','南美虾皇冻带头南美白对虾60/70（108-126只）1.8kg 盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/648019/648019_1_pic500_5966.jpg',108.00,125,'219300'),('648785','泰国进口启盖椰子（易拉环椰子）单粒装 350-450g','http://static.womai.com/images/spacer0.png',26.80,4,'82800'),('648859','绿环园 藕 350g（单段）','http://pic1.womai.com/upload/601/603/606/64306/280374/82609/574003/648859_1_pic500_4529.jpg',9.90,4,'206960'),('649707','佳沛 新西兰阳光金奇异果6粒盒装  540g','http://pic1.womai.com/upload/601/603/606/64306/280374/82800/553100/649707_0_pic500_2209.jpg',37.80,1849,'82800'),('649712','佳沛 新西兰原箱进口金色阳光 金奇异果25枚 3200g','http://pic3.womai.com/upload/601/603/606/64306/280374/82800/553100/649712_0_pic500_2209.jpg',189.00,1776,'82800'),('650086','中粮凌鲜·大洋世家鲜虾仁（33-38只，剔虾线） 250g 袋装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/650086/650086_1_pic500_6659.jpg',42.00,8,'219300'),('650104','中粮凌鲜·大洋世家阿根廷虾仁（13-19只，剔虾线） 300g 袋装','http://pic2.womai.com/upload/601/603/606/64306/280375/219300/219301/650104/650104_1_pic500_9105.jpg',46.80,5,'219300'),('650105','厄瓜多尔白虾 40/50（原装进口，60-75只）1.5kg 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219301/650105/650105_1_pic500_6674.jpg',128.00,42,'219300'),('650106','厄瓜多尔白虾 50/60（原装进口，87-105只）1.75kg  盒装','http://pic2.womai.com/upload/601/603/90900/216060/216062/650106/650106_1_pic500_8113.jpg',89.00,573,'219300'),('650434','佳沛 新西兰原箱进口金色阳光 金奇异果果王22枚 3200g','http://pic3.womai.com/upload/601/603/606/64306/280374/82800/504210/650434_0_pic500_2842.jpg',189.00,1849,'500219'),('650436','佳沛 新西兰原箱进口金色阳光 金奇异果巨无霸18枚 3200g','http://pic1.womai.com/upload/601/603/606/64306/280374/82800/553100/650436_0_pic500_2209.jpg',199.00,1843,'500219'),('650743','佳农 进口香蕉盒装1000g（4-6根）','http://pic2.womai.com/upload/601/603/358812/378408/495233/495236/604561/650743_3_pic500_6917.jpg',19.80,2,'82800'),('650804','佳农 菲律宾进口凤梨单枚装1200g起','http://pic1.womai.com/upload/601/603/358812/378408/495233/495236/604565/650804_1_pic500_2500.jpg',26.80,7,'82800'),('650813','佳农 进口超甜蕉袋装750g（4-6根）','http://pic1.womai.com/upload/601/603/358812/378408/495233/495236/604562/650813_0_pic500_4478.jpg',15.80,81,'82800'),('651122','自营黄金油桃4-6枚 盒装500g（单果重90-150g）','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/651122/651122_1_pic500_8116.jpg',14.90,8,'500219'),('651176','佳沛 新西兰进口金色阳光 金奇异果16枚礼盒装 1440g','http://pic3.womai.com/upload/601/603/606/64306/280374/82800/553100/651176_0_pic500_2209.jpg',119.00,1846,'82800'),('651177','佳沛 新西兰进口金色阳光 金奇异果果王12枚礼盒装 1800g','http://pic1.womai.com/upload/601/603/606/64306/280374/82800/553100/651177_0_pic500_2209.jpg',119.00,1840,'82800'),('651357','云南香格里拉 紫皮独头蒜 盒装2500g','http://pic1.womai.com/upload/601/603/606/64306/280374/206960/500846/651357/651357_1_pic500_5306.jpg',45.80,1,'206960'),('651363','佳沃 新西兰进口爵士苹果4枚盒装 700g（单果重160-200g）','http://pic2.womai.com/upload/601/603/606/64306/280374/82800/500239/651363/651363_1_pic500_6252.jpg',23.80,2,'82800'),('652048','洪湖渔家蒜香小龙虾15-20只（25-35g/只）900g 盒装','http://pic3.womai.com/upload/601/603/606/64306/280375/219300/219301/652048/652048_1_pic500_6202.jpg',48.00,3,'219300'),('652335','【包邮】福建特产六鳌红薯5斤装 大条红心地瓜产','http://pic2.womai.com/upload/601/603/217160/561004/560806/252021/252823/652335/652335_1_pic500_9990.jpg',35.90,0,'206960'),('652431','佳沛 新西兰原箱进口绿奇异果22枚 3200g','http://pic2.womai.com/upload/601/603/358812/378410/495231/495232/652574/652431_1_pic500_1181.jpg',99.90,2446,'82800'),('652432','佳沛 新西兰进口绿奇异果6枚盒装540g','http://pic3.womai.com/upload/601/603/358812/378410/495231/495232/652574/652432_1_pic500_1181.jpg',29.80,2448,'82800'),('652434','佳沛 新西兰原箱进口绿奇异果30-33枚 3200g','http://pic3.womai.com/upload/601/603/358812/378410/495231/495232/652434/652434_0_pic500_2967.jpg',128.00,2424,'82800'),('652572','老宋西瓜 大兴庞各庄西瓜单枚礼盒装1500g-1750g','http://pic3.womai.com/upload/601/603/606/64306/280374/82609/500236/652572/652572_1_pic500_4467.jpg',29.80,10,'500219'),('652573','老宋西瓜 大兴庞各庄西瓜2枚装礼盒3000g-3500g 单果重1500g-1750g','http://pic2.womai.com/upload/601/603/606/64306/280374/82609/500236/652573/652573_1_pic500_3849.jpg',49.80,23,'500219'),('652574','佳沛 新西兰进口绿奇异果16枚盒装1440g','http://pic1.womai.com/upload/601/603/358812/378410/495231/495232/652574/652574_1_pic500_1181.jpg',68.00,2447,'500219'),('652909','【安萃】爆浆牛奶水果玉米8根盒装2000g-单根240-300g','http://pic3.womai.com/upload/601/603/606/64306/280374/206960/500841/652909/652909_4_pic500_676.jpg',55.00,3,'206960'),('653008','哈东金有机速冻鲜糯玉米（黄）280g*6  箱装','http://pic1.womai.com/upload/601/603/606/64306/280374/207920/584096/653008_1_pic500_2121.jpg',21.80,14,'219424'),('653132','枝纯水果胡萝卜 袋装136g','http://pic2.womai.com/upload/601/603/606/64306/280374/206960/500842/653132/653132_1_pic500_9780.jpg',9.90,0,'206960'),('653844','红胖胖熟制速冻优品麻辣小龙虾（4-6钱/只，25-37只）1.5kg  盒装','http://pic2.womai.com/upload/601/603/90900/766021/766205/819013/822211/653844/653844_1_pic500_9801.jpg',65.00,7,'82817'),('653848','红胖胖熟制速冻优品十三香小龙虾（4-6钱/只，25-37只）1.5kg  盒装','http://pic2.womai.com/upload/601/603/90900/766021/766205/819013/822211/653848/653848_1_pic500_133.jpg',79.00,1,'82817'),('653849','红胖胖熟制速冻精品十三香小龙虾（6-8钱/只，19-25只）1.5kg  盒装','http://pic2.womai.com/upload/601/603/90900/766021/766205/819013/822211/653849/653849_1_pic500_1391.jpg',99.00,0,'82817'),('653850','红胖胖熟制速冻优品蒜香小龙虾（4-6钱/只，25-37只）1.5kg  盒装','http://pic1.womai.com/upload/601/603/90900/766021/766205/819013/822211/653850/653850_1_pic500_5333.jpg',79.00,1,'82817'),('653851','红胖胖熟制速冻精品麻辣小龙虾（6-8钱/只，19-25只）1.5kg  盒装','http://pic1.womai.com/upload/601/603/90900/766021/766205/819013/822211/653851/653851_1_pic500_3570.jpg',85.00,3,'82817'),('653852','红胖胖熟制速冻精品蒜香小龙虾（6-8钱/只，19-25只）1.5kg  盒装','http://pic3.womai.com/upload/601/603/90900/766021/766205/819013/822211/653852/653852_1_pic500_30.jpg',85.00,1,'82817'),('653861','【中粮海外直采】泰国山竹4A级盒装1000g（10-12粒）','http://pic3.womai.com/upload/601/603/606/64306/280374/82800/515497/653861_0_pic500_3476.jpg',39.80,305,'82800'),('653862','【中粮海外直采】泰国金枕榴莲单枚2.6kg-3.5kg','http://pic3.womai.com/upload/601/603/606/64306/280374/82800/500248/626866/653862_1_pic500_3942.jpg',133.00,314,'82800'),('653863','【中粮海外直采】泰国金枕榴莲单枚1.6kg-2.5kg','http://pic1.womai.com/upload/601/603/606/64306/280374/82800/500248/626866/653863_1_pic500_3942.jpg',69.00,314,'82800'),('653878','淮白熟制速冻优品十三香小龙虾（3-5钱/只，30-50只）1000g  盒装','http://pic1.womai.com/upload/601/603/90900/766021/766205/819013/822211/653878/653878_1_pic500_2250.jpg',29.90,3,'82817'),('653880','淮白熟制速冻优品麻辣小龙虾（3-5钱/只，30-50只）1000g  盒装','http://pic1.womai.com/upload/601/603/90900/766021/766205/819013/822211/653880/653880_1_pic500_8495.jpg',29.90,10,'82817'),('653883','兴芦 黄瓜4根盒装800g （单根重200g-250g）','http://pic3.womai.com/upload/601/603/606/64306/280374/206960/524886/653883_1_pic500_2285.jpg',9.50,104,'206960'),('654254','思念粽子猪肉粽312g','http://pic3.womai.com/upload/601/603/606/64306/280375/219400/219422/654254/654254_1_pic500_3927.jpg',9.80,1,'219424'),('654255','思念粽子蜜枣粽312g','http://pic1.womai.com/upload/601/603/606/64306/280375/219400/219422/654255/654255_1_pic500_9137.jpg',9.80,2,'219400'),('654653','洪湖渔家麻辣虾球 300g 盒装','http://pic1.womai.com/upload/601/603/606/64306/280375/219300/219301/654653/654653_1_pic500_7950.jpg',39.90,2,'219300'),('654664','兴芦 香菜 盒装 100g','http://pic2.womai.com/upload/601/603/606/64306/280374/206960/585720/654664_1_pic500_2751.jpg',5.90,0,'206960'),('654667','兴芦 油麦菜盒装400g','http://pic2.womai.com/upload/601/603/606/64306/280374/206960/537830/654667_1_pic500_6769.jpg',6.80,0,'206960'),('654679','【中粮海外直采】秘鲁牛油果两粒装（单果重130g-140g）','http://pic1.womai.com/upload/601/603/358812/378407/495413/495210/621727/654679_1_pic500_6711.jpg',9.90,1024,'82800'),('655047','【中粮海外直采】澳大利亚柑4粒盒装520g（单果重130g）','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/655047/655047_1_pic500_5324.jpg',25.80,1,'82800'),('655048','【中粮海外直采】美国车厘子2磅盒装908g（果径26mm-28mm）','http://pic1.womai.com/upload/601/603/606/64306/280374/500219/500222/628288/655048_0_pic500_2215.jpg',79.00,32,'82800'),('655049','【中粮海外直采】美国车厘子1磅盒装454g（果径26mm-28mm）','http://pic2.womai.com/upload/601/603/606/64306/280374/500219/500222/628288/655049_0_pic500_2215.jpg',49.00,21,'82800'),('655227','【安萃】富硒玫瑰香葡萄500g','http://pic2.womai.com/upload/601/603/358812/378407/495407/495410/655227/655227_1_pic500_6604.jpg',29.80,3,'500219'),('655292','天凯乐网红椰子灰冰激凌80g','http://pic1.womai.com/upload/601/603/606/64306/280375/206740/206741/655292/655292_1_pic500_4522.jpg',8.90,1,'206740'),('655419','美国进口土豪金车厘子500g盒装（果径27mm-28mm）','http://pic3.womai.com/upload/601/603/607/359405/362207/386613/628291/655419_1_pic500_3926.jpg',99.00,0,'82800'),('655656','【中粮海外直采】南非红心西柚2粒盒装660g（单果重330g）','http://pic3.womai.com/upload/601/603/358812/378407/495407/495410/655656/655656_1_pic500_7139.jpg',12.80,1,'82800'),('655891','【包邮】贝贝南瓜5斤  香甜粉板栗味小南瓜','http://pic3.womai.com/upload/601/603/217160/561004/560806/252021/252823/655891/655891_1_pic500_2113.png',39.90,1,'206960'),('655892','【包邮】山西黑糯玉米220*8根  新鲜甜糯黑油黑玉米','http://pic2.womai.com/upload/601/603/217160/561004/560806/252021/252823/655892/655892_1_pic500_6785.jpg',49.90,0,'206960'),('655926','新疆吊干杏 盒装500g','http://pic3.womai.com/upload/601/603/606/64306/280374/500219/500228/633659/655926_1_pic500_8384.jpg',25.80,8,'500219'),('656352','福建六鳌蜜薯2300g  8-13根 单根150-400g','http://pic3.womai.com/upload/601/603/606/64306/280374/206960/500840/647989/656352_1_pic500_1404.jpg',33.80,18,'206960'),('656642','山东贝贝南瓜3-4个袋装1350g（单果重250-400g）','http://pic1.womai.com/upload/601/603/606/64306/280374/82609/500236/648009/656642_1_pic500_5087.jpg',25.00,0,'206960'),('657307','【预售】空运加拿大车厘子2磅盒装908g（果径26mm-28mm）预计7月20日陆续发货','http://pic2.womai.com/upload/601/603/358812/378407/495407/495410/657307/657307_1_pic500_6410.jpg',88.00,0,'82800');
/*!40000 ALTER TABLE `sx_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_producttypes`
--

DROP TABLE IF EXISTS `sx_producttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_producttypes` (
  `typeid` int(11) NOT NULL,
  `typename` varchar(50) DEFAULT NULL,
  `typesort` int(11) NOT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_producttypes`
--

LOCK TABLES `sx_producttypes` WRITE;
/*!40000 ALTER TABLE `sx_producttypes` DISABLE KEYS */;
INSERT INTO `sx_producttypes` VALUES (82402,'生肉禽蛋',6),(82800,'进口水果',3),(82802,'礼品礼券',11),(82817,'佐餐',10),(89500,'低温乳品/饮料',4),(206740,'冰品',8),(206960,'精品蔬菜',9),(219300,'海鲜水产',1),(219400,'熟食',7),(219424,'精选主食',5),(500219,'精品水果',2);
/*!40000 ALTER TABLE `sx_producttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sx_users`
--

DROP TABLE IF EXISTS `sx_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sx_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `money` decimal(20,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sx_users`
--

LOCK TABLES `sx_users` WRITE;
/*!40000 ALTER TABLE `sx_users` DISABLE KEYS */;
INSERT INTO `sx_users` VALUES (1,'alisa','','13571934238','zcr011018','D:\\Djang02\\shengxian\\static\\user\\images\\bottom_bg1.png',1,607.30),(2,'zzzzzzzzzz','zzzzzzzzzz','13456778976','d41d8cd98f00b204e9800998ecf8427e','',1,0.00),(6,'zzzalisa','15@qq.com','13571934239','bc11f06afb9b27070673471a23ecc6a9','',1,0.00),(8,'zzzalis','75@qq.com','13571934230','bc11f06afb9b27070673471a23ecc6a9','',1,0.00),(9,'赵爱蓉','123456789@qq.com','13571934231','25d55ad283aa400af464c76d713c07ad','',1,0.00),(13,'cicicicicici','0989@qq.com','13971934239','bc11f06afb9b27070673471a23ecc6a9','',1,0.00),(14,'Alisaalisa','9187@qq.com','13591924239','7836b48ff1acaee7ca7434b6ca13f372','',1,0.00),(15,'aaaaaaaaaa','134@qq.vom','13571923239','7836b48ff1acaee7ca7434b6ca13f372','',1,0.00),(17,'haha','123@qq.com','18767671234','e10adc3949ba59abbe56e057f20f883e','',1,0.00),(18,'haha123','123456@qq.com','18799778989','e10adc3949ba59abbe56e057f20f883e','',1,0.00),(19,'Alisaalisa1','120@qq.com','13571934232','7836b48ff1acaee7ca7434b6ca13f372','',1,0.00);
/*!40000 ALTER TABLE `sx_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-23 16:39:16
