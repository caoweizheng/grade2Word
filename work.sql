/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : work

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-04-13 17:16:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for carlist
-- ----------------------------
DROP TABLE IF EXISTS `carlist`;
CREATE TABLE `carlist` (
  `user` varchar(255) DEFAULT NULL,
  `gid` varchar(11) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `special` varchar(255) DEFAULT NULL,
  `stores` varchar(255) DEFAULT NULL,
  `volume` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carlist
-- ----------------------------
INSERT INTO `carlist` VALUES ('cc', '34', '../imgs/wb_list_g26.png', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Classiques 经典系列 12443/P08GO 男士', '2275', '1', '', '赫柏林官方旗舰店', '3010');
INSERT INTO `carlist` VALUES ('cc', '35', '../imgs/wb_list_g27.png', '【帅气商务款，最新到货！】瑞士柏高Paul Picot -梦想家 商务休闲 P4104.SG.1021.1106 机械男表', '10290', '2', '畅销款式', '柏高官方旗舰店', '1303');
INSERT INTO `carlist` VALUES ('cc', '8', '../imgs/wb_list_g8.png', '黑蛟龙！瑞士进口 迪沃斯DAVOSA-Diving 潜水系列 Ternos特勒斯 HC/200-黑 16155550 机械潜水、商务', '4640', '4', '热卖畅销款', '迪沃斯官方旗舰店', '4118');
INSERT INTO `carlist` VALUES ('cc', '6', '../imgs/wb_list_g6.png', '【商务简约款】瑞士库尔沃CYS-Historiador 历史学家系列 pequenos segundos 3195.1CS.AR 机械男表', '12400', '2', '限时特惠', '库尔沃官方旗舰店', '211');
INSERT INTO `carlist` VALUES ('cc', '40', '../imgs/wb_list_g32.png', '【莫勒-帆船白 412手表节爆款，预计5月中旬陆续发出】来自德国格拉苏蒂·莫勒Muehle·Glashuet', '6688', '4', '412手表节爆款', '莫勒官方旗舰店', '879');
INSERT INTO `carlist` VALUES ('13427431482', '12', '../imgs/wb_list_g12.png', '库尔沃宝玑逆跳款：瑞士库尔沃CYS-Historiador 历史学家系列 Retrogrado 3194.1A(黑色表带) 机械男', '28800', '3', '28800元一口价', '库尔沃官方旗舰店', '456');
INSERT INTO `carlist` VALUES ('13427431482', '13', '../imgs/wb_list_g13.png', '绿蛟龙！瑞士迪沃斯(DAVOSA)-Diving 潜水系列 Ternos特勒斯 HC/200-绿 16155570 机械男表', '4640', '6', '热卖畅销款', '迪沃斯官方旗舰店', '4998');
INSERT INTO `carlist` VALUES ('13427431482', '33', '../imgs/wb_list_g25.png', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Salambo 永恒系列 -Michel小姐- 17001/B', '2480', '2', '限量赠送5年联保卡', '赫柏林官方旗舰店', '2857');
INSERT INTO `carlist` VALUES ('13427431482', '11', '../imgs/wb_list_g11.png', '天梭TISSOT-力洛克系列 T006.407.11.053.00 机械男表', '3420', '5', '4.12手表节', '天梭旗舰店', '5313');
INSERT INTO `carlist` VALUES ('cc', '4', '../imgs/wb_list_g4.png', '瑞士进口 迪沃斯（DAVOSA）-Classic Quartz 经典系列 16246615 男士商务、石英表', '1580', '1', '', '迪沃斯官方旗舰店', '6958');
INSERT INTO `carlist` VALUES ('13427431482', '31', '../imgs/wb_list_g23.png', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Perles 珍珠系列 -雅典娜女神- 16873', '5440', '3', '', '赫柏林官方旗舰店', '3317');

-- ----------------------------
-- Table structure for goodshistory
-- ----------------------------
DROP TABLE IF EXISTS `goodshistory`;
CREATE TABLE `goodshistory` (
  `gid` int(11) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `volume` varchar(10) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `special` varchar(255) DEFAULT NULL,
  `stores` varchar(255) DEFAULT NULL,
  `list_time` varchar(255) DEFAULT '',
  `idx` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodshistory
-- ----------------------------
INSERT INTO `goodshistory` VALUES ('11', '../imgs/wb_list_g11.png', '3420', '5313', '天梭TISSOT-力洛克系列 T006.407.11.053.00 机械男表', '4.12手表节', '天梭旗舰店', '2018-04-08 20:27:17', null);
INSERT INTO `goodshistory` VALUES ('12', '../imgs/wb_list_g12.png', '28800', '456', '库尔沃宝玑逆跳款：瑞士库尔沃CYS-Historiador 历史学家系列 Retrogrado 3194.1A(黑色表带) 机械男', '28800元一口价', '库尔沃官方旗舰店', '2018-04-08 20:27:39', null);
INSERT INTO `goodshistory` VALUES ('10', '../imgs/wb_list_g10.png', '4350', '5305', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-City 都市系列 -法国绅士- 1669/07GO', '限量送钢带', '赫柏林官方旗舰店', '2018-04-08 20:26:57', null);
INSERT INTO `goodshistory` VALUES ('9', '../imgs/wb_list_g9.png', '3120', '5342', '天梭TISSOT-力洛克系列 T006.407.16.053.00 机械男表', '412手表节', '天梭旗舰店', '2018-04-08 20:26:34', null);
INSERT INTO `goodshistory` VALUES ('8', '../imgs/wb_list_g8.png', '4640', '4118', '黑蛟龙！瑞士进口 迪沃斯DAVOSA-Diving 潜水系列 Ternos特勒斯 HC/200-黑 16155550 机械潜水、商务', '热卖畅销款', '迪沃斯官方旗舰店', '2018-04-08 20:26:19', null);
INSERT INTO `goodshistory` VALUES ('7', '../imgs/wb_list_g7.png', '1998', '5684', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Classiques 经典系列 -永恒绅士-- 124', '限量赠送5年联保卡', '赫柏林官方旗舰店', '2018-04-08 20:25:53', null);
INSERT INTO `goodshistory` VALUES ('6', '../imgs/wb_list_g6.png', '12400', '211', '【商务简约款】瑞士库尔沃CYS-Historiador 历史学家系列 pequenos segundos 3195.1CS.AR 机械男表', '限时特惠', '库尔沃官方旗舰店', '2018-04-08 20:25:29', null);
INSERT INTO `goodshistory` VALUES ('5', '../imgs/wb_list_g5.png', '7388', '344', '【飞行员款追加订货中，预计5月中旬到货】格拉苏蒂·莫勒Muehle·Glashuette-Sporty Instrument Watch', '一口价7388元', '莫勒官方旗舰店', '2018-04-08 20:25:05', null);
INSERT INTO `goodshistory` VALUES ('13', '../imgs/wb_list_g13.png', '4640', '4998', '绿蛟龙！瑞士迪沃斯(DAVOSA)-Diving 潜水系列 Ternos特勒斯 HC/200-绿 16155570 机械男表', '热卖畅销款', '迪沃斯官方旗舰店', '2018-04-08 20:27:58', null);
INSERT INTO `goodshistory` VALUES ('14', '../imgs/wb_list_g14.png', '3800', '4963', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Perles 珍珠系列 -巴黎恋人- 16873/B0', '限量赠送5年联保卡', '赫柏林官方旗舰店', '2018-04-08 20:28:19', null);
INSERT INTO `goodshistory` VALUES ('15', '../imgs/wb_list_g15.png', '12320', '5060', '浪琴Longines-名匠系列 L2.628.4.78.6 机械男表', '', '浪琴旗舰店', '2018-04-08 20:28:43', null);

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `gid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `volume` decimal(10,0) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `special` varchar(255) DEFAULT '',
  `stores` varchar(255) DEFAULT NULL,
  `list_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idx` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('1', '../imgs/wb_list_g1.png', '3420', '7851', '全新升级！天梭TISSOT-力洛克系列T006.407.11.033.00 自动机械男表', '80小时动储', '天梭旗舰店', '2018-04-08 20:15:53', null);
INSERT INTO `goodslist` VALUES ('2', '../imgs/wb_list_g2.png', '5770', '7620', '瑞士艺术制表大师爱宝时（EPOS）-Emotion情感系列 罗马假期-水蓝版 3390.152.20.16.25 机械男表高性价比瑞表', '高性价比瑞表', '爱宝时官方旗舰店', '2018-04-08 20:22:50', null);
INSERT INTO `goodslist` VALUES ('3', '../imgs/wb_list_g3.png', '4320', '7153', '瑞士进口 迪沃斯(DAVOSA) -Gentleman绅士系列 Classic 经典之作 16145615 机械男表', '儒雅绅士', '迪沃斯官方旗舰店', '2018-04-08 20:23:09', null);
INSERT INTO `goodslist` VALUES ('4', '../imgs/wb_list_g4.png', '1580', '6958', '瑞士进口 迪沃斯（DAVOSA）-Classic Quartz 经典系列 16246615 男士商务、石英表', '', '迪沃斯官方旗舰店', '2018-04-08 20:23:48', null);
INSERT INTO `goodslist` VALUES ('5', '../imgs/wb_list_g5.png', '7388', '344', '【飞行员款追加订货中，预计5月中旬到货】格拉苏蒂·莫勒Muehle·Glashuette-Sporty Instrument Watch', '一口价7388元', '莫勒官方旗舰店', '2018-04-08 20:25:05', null);
INSERT INTO `goodslist` VALUES ('6', '../imgs/wb_list_g6.png', '12400', '211', '【商务简约款】瑞士库尔沃CYS-Historiador 历史学家系列 pequenos segundos 3195.1CS.AR 机械男表', '限时特惠', '库尔沃官方旗舰店', '2018-04-08 20:25:29', null);
INSERT INTO `goodslist` VALUES ('7', '../imgs/wb_list_g7.png', '1998', '5684', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Classiques 经典系列 -永恒绅士-- 124', '限量赠送5年联保卡', '赫柏林官方旗舰店', '2018-04-08 20:25:53', null);
INSERT INTO `goodslist` VALUES ('8', '../imgs/wb_list_g8.png', '4640', '4118', '黑蛟龙！瑞士进口 迪沃斯DAVOSA-Diving 潜水系列 Ternos特勒斯 HC/200-黑 16155550 机械潜水、商务', '热卖畅销款', '迪沃斯官方旗舰店', '2018-04-08 20:26:19', null);
INSERT INTO `goodslist` VALUES ('9', '../imgs/wb_list_g9.png', '3120', '5342', '天梭TISSOT-力洛克系列 T006.407.16.053.00 机械男表', '412手表节', '天梭旗舰店', '2018-04-08 20:26:34', null);
INSERT INTO `goodslist` VALUES ('10', '../imgs/wb_list_g10.png', '4350', '5305', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-City 都市系列 -法国绅士- 1669/07GO', '限量送钢带', '赫柏林官方旗舰店', '2018-04-08 20:26:57', null);
INSERT INTO `goodslist` VALUES ('11', '../imgs/wb_list_g11.png', '3420', '5313', '天梭TISSOT-力洛克系列 T006.407.11.053.00 机械男表', '4.12手表节', '天梭旗舰店', '2018-04-08 20:27:17', null);
INSERT INTO `goodslist` VALUES ('12', '../imgs/wb_list_g12.png', '28800', '456', '库尔沃宝玑逆跳款：瑞士库尔沃CYS-Historiador 历史学家系列 Retrogrado 3194.1A(黑色表带) 机械男', '28800元一口价', '库尔沃官方旗舰店', '2018-04-08 20:27:39', null);
INSERT INTO `goodslist` VALUES ('13', '../imgs/wb_list_g13.png', '4640', '4998', '绿蛟龙！瑞士迪沃斯(DAVOSA)-Diving 潜水系列 Ternos特勒斯 HC/200-绿 16155570 机械男表', '热卖畅销款', '迪沃斯官方旗舰店', '2018-04-08 20:27:58', null);
INSERT INTO `goodslist` VALUES ('14', '../imgs/wb_list_g14.png', '3800', '4963', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Perles 珍珠系列 -巴黎恋人- 16873/B0', '限量赠送5年联保卡', '赫柏林官方旗舰店', '2018-04-08 20:28:19', null);
INSERT INTO `goodslist` VALUES ('15', '../imgs/wb_list_g15.png', '12320', '5060', '浪琴Longines-名匠系列 L2.628.4.78.6 机械男表', '', '浪琴旗舰店', '2018-04-08 20:28:43', null);
INSERT INTO `goodslist` VALUES ('20', '../imgs/idx_g21.jpg', '7110', '92', '瑞士进口 迪沃斯（DAVOSA）- Pontus All Stars Limited 庞特斯限量系列 梅赛德斯·奔驰300 SL 1954模型 16050066 机械男表', null, '迪沃斯官方旗舰店', '2018-04-08 21:00:51', '34');
INSERT INTO `goodslist` VALUES ('21', '../imgs/idx_g22.jpg', '25600', '76', '【412手表节爆款】丘吉尔限量款 资深钟表媒体人刘兴力力荐：瑞士库尔沃CYS-Robusto 豪门系列 丘吉尔定制限量款 2810.1CGT 机械男表', null, '库尔沃官方旗舰店', '2018-04-08 21:02:01', '35');
INSERT INTO `goodslist` VALUES ('22', '../imgs/idx_g23.jpg', '56744', '4', '欧米茄Omega-超霸系列 311.30.42.30.99.001 机械男表（全球限量1975枚）', null, '欧米茄旗舰店', '2018-04-08 21:02:24', '36');
INSERT INTO `goodslist` VALUES ('23', '../imgs/idx_g24.jpg', '15630', '20', '汉米尔顿Hamilton-卡其-海军系列 先锋 H78719553 机械男表', null, '汉米尔顿旗舰店', '2018-04-08 21:02:33', '37');
INSERT INTO `goodslist` VALUES ('24', '../imgs/wb_list_g16.png', '10080', '170', '莫勒·航海领域的专业时计，来自德国格拉苏蒂Muehle·Glashuette-Sporty 运动系列 M1-25-33-LB 29er风', '商务儒雅', '莫勒官方旗舰店', '2018-04-08 23:28:22', null);
INSERT INTO `goodslist` VALUES ('25', '../imgs/wb_list_g17.png', '12000', '4044', '浪琴longines-名匠系列 L2.628.4.78.3 机械男表', '', '浪琴旗舰店', '2018-04-08 23:31:39', null);
INSERT INTO `goodslist` VALUES ('26', '../imgs/wb_list_g18.png', '6080', '4206', '瑞士艺术制表大师爱宝时（EPOS）-Emotion情感系列 罗马假期-雪白版 3390.152.20.10.30 机械男表', '2892机芯稳准兼顾', '爱宝时官方旗舰店', '2018-04-08 23:32:08', null);
INSERT INTO `goodslist` VALUES ('27', '../imgs/wb_list_g19.png', '4368', '2508', '美度MIDO-贝伦赛丽系列 M8600.4.26.8 机械男表', '', '美度旗舰店', '2018-04-08 23:32:23', null);
INSERT INTO `goodslist` VALUES ('28', '../imgs/wb_list_g20.png', '3120', '3607', '全新升级！天梭TISSOT-力洛克系列 T006.407.16.033.00 自动机械男表', '412手表节', '天梭旗舰店', '2018-04-08 23:32:47', null);
INSERT INTO `goodslist` VALUES ('29', '../imgs/wb_list_g21.png', '4680', '3666', '美度MIDO-贝伦赛丽BARONCELLI系列 M8600.4.26.1 机械男表', '', '美度旗舰店', '2018-04-08 23:33:04', null);
INSERT INTO `goodslist` VALUES ('30', '../imgs/wb_list_g22.png', '3990', '3409', '天梭TISSOT-库图系列 T035.407.11.051.00 机械男表', '', '天梭旗舰店', '2018-04-08 23:33:22', null);
INSERT INTO `goodslist` VALUES ('31', '../imgs/wb_list_g23.png', '5440', '3317', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Perles 珍珠系列 -雅典娜女神- 16873', '', '赫柏林官方旗舰店', '2018-04-08 23:33:37', null);
INSERT INTO `goodslist` VALUES ('32', '../imgs/wb_list_g24.png', '3380', '2887', '天梭TISSOT-力洛克系列 T41.1.183.33 机械女表', '4.12手表节', '天梭旗舰店', '2018-04-08 23:34:00', null);
INSERT INTO `goodslist` VALUES ('33', '../imgs/wb_list_g25.png', '2480', '2857', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Salambo 永恒系列 -Michel小姐- 17001/B', '限量赠送5年联保卡', '赫柏林官方旗舰店', '2018-04-08 23:34:20', null);
INSERT INTO `goodslist` VALUES ('34', '../imgs/wb_list_g26.png', '2275', '3010', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Classiques 经典系列 12443/P08GO 男士', '', '赫柏林官方旗舰店', '2018-04-08 23:34:35', null);
INSERT INTO `goodslist` VALUES ('35', '../imgs/wb_list_g27.png', '10290', '1303', '【帅气商务款，最新到货！】瑞士柏高Paul Picot -梦想家 商务休闲 P4104.SG.1021.1106 机械男表', '畅销款式', '柏高官方旗舰店', '2018-04-08 23:34:56', null);
INSERT INTO `goodslist` VALUES ('36', '../imgs/wb_list_g28.png', '5265', '1279', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Metropole 大都会系列 -诺曼底公爵-', '限量赠送钢带', '赫柏林官方旗舰店', '2018-04-08 23:35:32', null);
INSERT INTO `goodslist` VALUES ('37', '../imgs/wb_list_g29.png', '4350', '2802', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-City 都市系列 1669/04 男士机械表', '', '赫柏林官方旗舰店', '2018-04-12 19:39:14', null);
INSERT INTO `goodslist` VALUES ('38', '../imgs/wb_list_g30.png', '1940', '2971', '天梭TISSOT-俊雅系列 T063.610.11.037.00 石英男表', '', '天梭旗舰店', '2018-04-08 23:36:01', null);
INSERT INTO `goodslist` VALUES ('39', '../imgs/wb_list_g31.png', '3880', '179', '意大利品牌：天铭（Timing）-镂空系列8130SX（玫瑰金壳白色表面）镂空机械男表', '天籁之响，时代之铭', '天铭官方旗舰店', '2018-04-08 23:36:31', null);
INSERT INTO `goodslist` VALUES ('40', '../imgs/wb_list_g32.png', '6688', '879', '【莫勒-帆船白 412手表节爆款，预计5月中旬陆续发出】来自德国格拉苏蒂·莫勒Muehle·Glashuet', '412手表节爆款', '莫勒官方旗舰店', '2018-04-08 23:36:51', null);
INSERT INTO `goodslist` VALUES ('41', '../imgs/wb_list_g33.png', '2030', '2828', '瑞士进口 迪沃斯（DAVOSA）-Classic Quartz 经典系列 16856915 石英女表', '', '迪沃斯官方旗舰店', '2018-04-08 23:37:17', null);
INSERT INTO `goodslist` VALUES ('42', '../imgs/wb_list_g34.png', '2880', '2791', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Metropole 大都会系列 -法国骑士- 12', '', '赫柏林官方旗舰店', '2018-04-08 23:37:46', null);
INSERT INTO `goodslist` VALUES ('43', '../imgs/wb_list_g35.png', '2930', '2488', '天梭TISSOT-海星系列 T065.430.16.031.00 机械男表', '', '天梭旗舰店', '2018-04-08 23:38:03', null);
INSERT INTO `goodslist` VALUES ('44', '../imgs/wb_list_g36.png', '6860', '352', '【412手表节畅销款--预计4月底到货-迪丽热巴同款系列】 菲拉格慕Ferragamo-Cuore Ferragamo系列-FE', '412手表节畅销款', '菲拉格慕官方旗舰店', '2018-04-08 23:49:50', null);
INSERT INTO `goodslist` VALUES ('45', '../imgs/wb_list_g37.png', '4720', '2109', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Perles 珍珠系列 -爱之印记- 16873/B5', '', '赫柏林官方旗舰店', '2018-04-08 23:40:42', null);
INSERT INTO `goodslist` VALUES ('46', '../imgs/wb_list_g38.png', '1940', '2320', '天梭TISSOT-经典系列 T063.610.36.037.00 石英男表', '', '天梭旗舰店', '2018-04-08 23:41:08', null);
INSERT INTO `goodslist` VALUES ('47', '../imgs/wb_list_g39.png', '1500', '1999', '瑞士进口 迪沃斯（DAVOSA）-Amaranto Quartz 阿玛兰托系列 16248015 石英男表', '', '迪沃斯官方旗舰店', '2018-04-08 23:41:33', null);
INSERT INTO `goodslist` VALUES ('48', '../imgs/wb_list_g40.png', '9998', '440', '【商务精英优选】瑞士柏高Paul Picot -梦想家系列 P2061.SG.4000.7601 商务休闲 机械男表', '商务休闲随心切换', '柏高官方旗舰店', '2018-04-08 23:42:04', null);
INSERT INTO `goodslist` VALUES ('49', '../imgs/wb_list_g41.png', '1350', '1846', '瑞士进口 迪沃斯(DAVOSA)-Pianos Quartz 钢琴家系列 16248515 石英男表', '', '迪沃斯官方旗舰店', '2018-04-08 23:42:21', null);
INSERT INTO `goodslist` VALUES ('50', '../imgs/wb_list_g42.png', '35460', '103', '瑞士柏高Paul Picot -Atelier 美学家系列 P7011.20.363V021机械男表（天文台认证)', '送泰国双人游', '柏高官方旗舰店', '2018-04-08 23:42:59', null);
INSERT INTO `goodslist` VALUES ('51', '../imgs/wb_list_g43.png', '1580', '1765', '瑞士进口 迪沃斯（DAVOSA）-Classic Quartz 经典系列 16755615 女士石英表', '', '迪沃斯官方旗舰店', '2018-04-08 23:43:18', null);
INSERT INTO `goodslist` VALUES ('52', '../imgs/wb_list_g44.png', '9300', '163', '【限时赠送原装钢带】瑞士百年高端制表品牌：诺美纳NORMANA-皇族经典系列 50602 机械男表', '限时赠送钢带', '诺美纳官方旗舰店', '2018-04-08 23:43:35', null);
INSERT INTO `goodslist` VALUES ('53', '../imgs/wb_list_g45.png', '3440', '1806', '法国总统夫人之选 法国优雅腕表品牌：赫柏林Michel Herbelin-Newport Yacht Club 纽波特游艇俱乐部', '', '赫柏林官方旗舰店', '2018-04-08 23:44:01', null);
INSERT INTO `goodslist` VALUES ('54', '../imgs/wb_list_g46.png', '10300', '164', '瑞士柏高Paul Picot -梦想家系列 P2061.SG.1131.7203 商务休闲 机械男表 (商务休闲场合佩戴皆可）', '', '柏高官方旗舰店', '2018-04-08 23:44:21', null);
INSERT INTO `goodslist` VALUES ('55', '../imgs/wb_list_g47.png', '5300', '157', '【限时赠送原装牛皮表带】瑞士百年高端制表品牌', '', '爱宝石官方旗舰店', '2018-04-08 23:45:08', null);
INSERT INTO `goodslist` VALUES ('56', '../imgs/wb_list_g48.png', '5684', '256', '瑞士进口 迪沃斯（DAVOSA）-Amaranto Quartz 阿玛兰托系列 162480', '', '天梭旗舰店', '2018-04-08 23:47:53', null);

-- ----------------------------
-- Table structure for idx_goods
-- ----------------------------
DROP TABLE IF EXISTS `idx_goods`;
CREATE TABLE `idx_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `gtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of idx_goods
-- ----------------------------
INSERT INTO `idx_goods` VALUES ('1', '', '', 'imgs/idx_g1.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('2', '', '', 'imgs/idx_g2.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('3', '', '', 'imgs/idx_g3.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('4', '', '', 'imgs/idx_g4.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('5', '', '', 'imgs/idx_g5.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('6', '时间的优雅见证', '小巧迷人，展现女性腕部曲线', 'imgs/idx_g6.jpg', '2018-04-06 13:31:50');
INSERT INTO `idx_goods` VALUES ('7', '3千价位瑞表推荐', '职场商务风，享受人生精彩', 'imgs/idx_g7.jpg', '2018-04-06 13:32:01');
INSERT INTO `idx_goods` VALUES ('8', '质感非凡，少量发售！', '12颗维塞尔顿钻石镶嵌，独特优雅', 'imgs/idx_g8.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('9', '300米防水蓝海马', '致敬精湛工艺与冒险的精神', 'imgs/idx_g9.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('11', '汉米尔顿', '大胆坚定的美国设计', 'imgs/idx_g11.jpg', '2018-04-06 13:32:26');
INSERT INTO `idx_goods` VALUES ('12', '法国赫柏林', '岁月中的恒久坚恒', 'imgs/idx_g12.jpg', '2018-04-06 13:32:38');
INSERT INTO `idx_goods` VALUES ('13', '东方双狮', '低调内涵，精明之选', 'imgs/idx_g13.jpg', '2018-04-06 13:32:43');
INSERT INTO `idx_goods` VALUES ('14', '瑞士驰客', '无谓时间，Rock前行', 'imgs/idx_g14.jpg', '2018-04-06 12:56:01');
INSERT INTO `idx_goods` VALUES ('15', '阿玛尼', '热切追求,人生所有', 'imgs/idx_g15.jpg', '2018-04-06 13:33:02');
INSERT INTO `idx_goods` VALUES ('10', '瑞士天铭', '鉴赏镂空艺术，聆听机芯律动', 'imgs/idx_g10.jpg', '2018-04-06 13:33:04');
INSERT INTO `idx_goods` VALUES ('16', null, null, 'imgs/brands1.jpg', '2018-04-06 15:19:35');
INSERT INTO `idx_goods` VALUES ('17', null, null, 'imgs/brands2.jpg', '2018-04-06 15:19:45');
INSERT INTO `idx_goods` VALUES ('18', null, null, 'imgs/brands3.jpg', '2018-04-06 15:19:50');
INSERT INTO `idx_goods` VALUES ('19', null, null, 'imgs/brands4.jpg', '2018-04-06 15:19:55');
INSERT INTO `idx_goods` VALUES ('20', null, null, 'imgs/brands5.jpg', '2018-04-06 15:19:59');
INSERT INTO `idx_goods` VALUES ('21', null, null, 'imgs/brands6.jpg', '2018-04-06 15:20:08');
INSERT INTO `idx_goods` VALUES ('23', '欧洲皇室御用制表品牌', null, 'imgs/idx_g16.jpg', '2018-04-06 16:46:08');
INSERT INTO `idx_goods` VALUES ('24', '时间，随你掌控', null, 'imgs/idx_g17.jpg', '2018-04-06 16:46:56');
INSERT INTO `idx_goods` VALUES ('25', '让时代与心灵悦动SEIKO', null, 'imgs/idx_g18.jpg', '2018-04-06 16:47:23');
INSERT INTO `idx_goods` VALUES ('26', '可触及的奢华', null, 'imgs/idx_g19.jpg', '2018-04-06 16:59:42');
INSERT INTO `idx_goods` VALUES ('27', null, null, 'imgs/brands7.jpg', '2018-04-06 17:17:15');
INSERT INTO `idx_goods` VALUES ('28', null, null, 'imgs/brands8.jpg', '2018-04-06 17:17:20');
INSERT INTO `idx_goods` VALUES ('29', null, null, 'imgs/brands9.jpg', '2018-04-06 17:17:25');
INSERT INTO `idx_goods` VALUES ('30', null, null, 'imgs/brands10.jpg', '2018-04-06 17:17:31');
INSERT INTO `idx_goods` VALUES ('31', null, null, 'imgs/brands11.jpg', '2018-04-06 17:17:36');
INSERT INTO `idx_goods` VALUES ('32', null, null, 'imgs/brands12.jpg', '2018-04-06 17:17:41');
INSERT INTO `idx_goods` VALUES ('33', null, null, 'imgs/idx_g20.jpg', '2018-04-06 18:00:46');
INSERT INTO `idx_goods` VALUES ('34', '迪沃斯DAVASA', '庞特斯限量系列', 'imgs/idx_g21.jpg', '2018-04-06 18:10:25');
INSERT INTO `idx_goods` VALUES ('35', '库尔沃CYS', '豪门系列 丘吉尔定制款', 'imgs/idx_g22.jpg', '2018-04-06 18:11:05');
INSERT INTO `idx_goods` VALUES ('36', '欧米茄Omega', '周年限定 超霸月球表', 'imgs/idx_g23.jpg', '2018-04-06 18:11:13');
INSERT INTO `idx_goods` VALUES ('37', '汉米尔顿Hamilton', '海军系列 先锋', 'imgs/idx_g24.jpg', '2018-04-06 18:11:19');
INSERT INTO `idx_goods` VALUES ('38', null, '与浪琴名匠628的邂逅', 'imgs/idx_g25.jpg', '2018-04-07 12:38:44');
INSERT INTO `idx_goods` VALUES ('39', null, '迪沃斯绿蛟龙，实在让我心水', 'imgs/idx_g26.jpg', '2018-04-07 12:38:47');
INSERT INTO `idx_goods` VALUES ('40', null, '骚力十足，我的美度指挥官', 'imgs/idx_g27.jpg', '2018-04-07 12:38:52');
INSERT INTO `idx_goods` VALUES ('41', null, '赫柏林大都会，5000元预算机械表购表之路', 'imgs/idx_g28.jpg', '2018-04-07 12:38:54');

-- ----------------------------
-- Table structure for islogin
-- ----------------------------
DROP TABLE IF EXISTS `islogin`;
CREATE TABLE `islogin` (
  `isLogin` tinyint(4) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`isLogin`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of islogin
-- ----------------------------
INSERT INTO `islogin` VALUES ('1', 'cc');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `regist_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('20', 'cc', '202cb962ac59075b964b07152d234b70', '2018-04-12 20:25:42');
INSERT INTO `user` VALUES ('21', '13427431482', 'e10adc3949ba59abbe56e057f20f883e', '2018-04-12 20:55:39');
INSERT INTO `user` VALUES ('22', '13527431482', 'e10adc3949ba59abbe56e057f20f883e', '2018-04-12 20:58:59');
INSERT INTO `user` VALUES ('23', '13724821482', 'e10adc3949ba59abbe56e057f20f883e', '2018-04-13 10:02:57');
SET FOREIGN_KEY_CHECKS=1;
