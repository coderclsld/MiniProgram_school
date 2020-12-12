/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : dpi

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 20/04/2020 22:42:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for doctor
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户的独立openid',
  `docImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `introduce` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '简介',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `evaluateStar` int(10) NULL DEFAULT NULL COMMENT '评价星星',
  `information` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of doctor
-- ----------------------------
INSERT INTO `doctor` VALUES (1, 'oa2H_4-pskzy10YvJo7tiPibud5I', '../../images/noHead.jpg', '博士，好医生', '王医生', 5, '中国工程院院士，著名呼吸病学专家，中国抗击非典型肺炎的领军人物，曾任广州医学院院长、党委书记，广州市呼吸疾病研究所所长、广州呼吸疾病国家重点实验室主任、中华医学会会长。长期从事呼吸内科的医疗、教学、科研工作。重点开展哮喘，慢阻肺疾病，呼吸衰竭和呼吸系统常见疾病的规范化诊疗、疑难病、少见病和呼吸危重症监护与救治等方面的研究.现任国家呼吸系统疾病临床医学研究中心主任、国家卫健委高级别专家组组长、国家健康科普专家');

-- ----------------------------
-- Table structure for interaction
-- ----------------------------
DROP TABLE IF EXISTS `interaction`;
CREATE TABLE `interaction`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctorOpenid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userOpenid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of interaction
-- ----------------------------
INSERT INTO `interaction` VALUES (3, 'oa2H_4-pskzy10YvJo7tiPibud5I', 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '1', '2020-04-20 00:00:00');

-- ----------------------------
-- Table structure for memorandum
-- ----------------------------
DROP TABLE IF EXISTS `memorandum`;
CREATE TABLE `memorandum`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date` datetime(6) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of memorandum
-- ----------------------------
INSERT INTO `memorandum` VALUES (1, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '2020-04-20 00:00:00.000000', '测试备忘录', '这是一条设置用的备忘录');
INSERT INTO `memorandum` VALUES (2, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '2020-04-19 00:00:00.000000', '恋爱', '今天好开心，打了一天代码');
INSERT INTO `memorandum` VALUES (6, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '2020-04-19 00:00:00.000000', '日记', '这是今天的备忘录,确实真是厉害呢\n');
INSERT INTO `memorandum` VALUES (10, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '2020-04-19 00:00:00.000000', '微信小程序', '微信小程序在对动态的数据进行setData操作时需要如下使用如：this.setData({\n          [\'memorandumList[\'+i+\']\'] : item\n        })');
INSERT INTO `memorandum` VALUES (11, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '2020-04-20 00:00:00.000000', '今日备忘录', '踩踩踩踩踩踩');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发送人',
  `addressee` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收信人',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (5, 'oa2H_4-pskzy10YvJo7tiPibud5I', 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '你好！', '2020-04-20');
INSERT INTO `message` VALUES (6, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', 'oa2H_4-pskzy10YvJo7tiPibud5I', '好难过', '2020-04-20');
INSERT INTO `message` VALUES (7, 'oa2H_4-pskzy10YvJo7tiPibud5I', 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '你也觉得吗', '2020-04-20');
INSERT INTO `message` VALUES (8, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', 'oa2H_4-pskzy10YvJo7tiPibud5I', '对啊对啊', '2020-04-20');
INSERT INTO `message` VALUES (9, 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', 'oa2H_4-pskzy10YvJo7tiPibud5I', '你好', '2020-04-20');
INSERT INTO `message` VALUES (10, 'oa2H_4-pskzy10YvJo7tiPibud5I', 'oa2H_4-gO1UGaRsp0L4_VwXleyqk', '你好！', '2020-04-20');

SET FOREIGN_KEY_CHECKS = 1;
