-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.3.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table lawyer.beforecase
CREATE TABLE IF NOT EXISTS `beforecase` (
  `beforecase_id` int(11) NOT NULL AUTO_INCREMENT,
  `beforecase_name` varchar(100) DEFAULT NULL,
  KEY `Index 1` (`beforecase_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.casedocuments
CREATE TABLE IF NOT EXISTS `casedocuments` (
  `DocumentID` int(11) NOT NULL AUTO_INCREMENT,
  `LawyerID` int(11) DEFAULT NULL,
  `DocumentStatus` int(11) DEFAULT NULL,
  `DateReceived` varchar(50) DEFAULT NULL,
  `clientID` int(11) DEFAULT NULL,
  `Receiver` int(11) DEFAULT NULL,
  `Customer_ref` varchar(50) DEFAULT NULL,
  `tsb_ref` varchar(15) DEFAULT NULL,
  `claimamount` int(11) DEFAULT NULL,
  `assured` varchar(100) DEFAULT NULL,
  `timebar` varchar(50) DEFAULT NULL,
  `insurance_type` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT current_timestamp(),
  `case_documentstatus` int(11) DEFAULT 0,
  `created_by` int(11) DEFAULT NULL,
  `customer_reponsive` int(11) DEFAULT NULL,
  PRIMARY KEY (`DocumentID`),
  KEY `FK_casedocuments_employees` (`LawyerID`),
  KEY `FK_casedocuments_beforecase` (`Receiver`),
  CONSTRAINT `FK_casedocuments_beforecase` FOREIGN KEY (`Receiver`) REFERENCES `beforecase` (`beforecase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_casedocuments_employees` FOREIGN KEY (`LawyerID`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.caseexpenses
CREATE TABLE IF NOT EXISTS `caseexpenses` (
  `ExpenseID` int(11) NOT NULL AUTO_INCREMENT,
  `Payer` int(11) DEFAULT NULL,
  `PaymentStatus` int(11) DEFAULT 1,
  `PaymentDate` varchar(100) DEFAULT NULL,
  `expensesType` int(11) DEFAULT NULL,
  `expenses_ref` varchar(50) DEFAULT NULL,
  `expenses` int(11) DEFAULT NULL,
  `paid_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`ExpenseID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.caselawyer
CREATE TABLE IF NOT EXISTS `caselawyer` (
  `caselawyer_id` int(11) NOT NULL AUTO_INCREMENT,
  `caselawyer_case_id` int(11) DEFAULT NULL,
  `caselawyer_employee_id` int(11) DEFAULT NULL,
  `caselawyer_employee_type` int(11) DEFAULT NULL,
  KEY `Index 1` (`caselawyer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.casenotice
CREATE TABLE IF NOT EXISTS `casenotice` (
  `CaseNotice_id` int(11) NOT NULL AUTO_INCREMENT,
  `CaseNotice_lawyer_id` int(11) DEFAULT 0,
  `CaseNotice_amount` int(11) DEFAULT 0,
  `CaseNotice_to` varchar(50) DEFAULT NULL,
  `CaseNotice_ref` varchar(50) DEFAULT NULL,
  `CaseNotice_senddate` varchar(50) DEFAULT NULL,
  `CaseNotice_callback_type` int(11) DEFAULT NULL,
  `CaseNotice_callback_who` varchar(200) DEFAULT NULL,
  KEY `Index 1` (`CaseNotice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.cases
CREATE TABLE IF NOT EXISTS `cases` (
  `CaseID` int(11) NOT NULL AUTO_INCREMENT,
  `ClientID` int(11) DEFAULT NULL,
  `CaseTypeID` int(11) DEFAULT NULL,
  `CourtID` int(11) DEFAULT NULL,
  `Customer_ref` varchar(50) DEFAULT NULL,
  `Customer_res` int(11) DEFAULT NULL,
  `case_courtType` int(11) DEFAULT NULL,
  `plaintiff_type` tinyint(1) DEFAULT NULL,
  `rednum` varchar(50) DEFAULT NULL,
  `blacknum` varchar(50) DEFAULT NULL,
  `ReciveWarrantDate` varchar(50) DEFAULT NULL,
  `DuedateSummittree` varchar(50) DEFAULT NULL,
  `tsb_ref` varchar(15) DEFAULT NULL,
  `insurance_type` int(11) DEFAULT NULL,
  `case_remark` varchar(255) DEFAULT NULL,
  `claimAmount` int(11) DEFAULT NULL,
  `customer_resposive` int(11) DEFAULT NULL,
  PRIMARY KEY (`CaseID`),
  KEY `ClientID` (`ClientID`),
  KEY `CaseTypeID` (`CaseTypeID`),
  KEY `CourtID` (`CourtID`),
  CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`ClientID`) REFERENCES `clients` (`ClientID`),
  CONSTRAINT `cases_ibfk_2` FOREIGN KEY (`CaseTypeID`) REFERENCES `casetypes` (`CaseTypeID`),
  CONSTRAINT `cases_ibfk_3` FOREIGN KEY (`CourtID`) REFERENCES `courts` (`CourtID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.casetypes
CREATE TABLE IF NOT EXISTS `casetypes` (
  `CaseTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `CaseTypeName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CaseTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.case_defendant
CREATE TABLE IF NOT EXISTS `case_defendant` (
  `case_defendant_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_defendant_firstname` varchar(50) DEFAULT NULL,
  `case_defendant_lastname` varchar(50) DEFAULT NULL,
  `case_id` varchar(50) DEFAULT NULL,
  KEY `Index 1` (`case_defendant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.case_expantime
CREATE TABLE IF NOT EXISTS `case_expantime` (
  `case_expantime` int(11) NOT NULL AUTO_INCREMENT,
  `case_expantime_remark` varchar(255) DEFAULT NULL,
  `case_expantime_date` varchar(50) DEFAULT NULL,
  `tsb_ref` varchar(5) DEFAULT NULL,
  KEY `Index 1` (`case_expantime`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.case_plainiff
CREATE TABLE IF NOT EXISTS `case_plainiff` (
  `case_plainiff_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_plainiff_firstname` varchar(50) DEFAULT NULL,
  `case_plainiff_lastname` varchar(50) DEFAULT NULL,
  `case_id` int(11) DEFAULT NULL,
  KEY `Index 1` (`case_plainiff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.case_timeline
CREATE TABLE IF NOT EXISTS `case_timeline` (
  `case_timeline_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_timeline_detail` varchar(255) DEFAULT NULL,
  `case_timebar_incoming` varchar(50) DEFAULT NULL,
  `case_timebar_status` int(11) DEFAULT current_timestamp(),
  `case_id` int(11) DEFAULT 0,
  `case_timeline_end` int(11) DEFAULT 0,
  KEY `Index 1` (`case_timeline_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.case_todolist
CREATE TABLE IF NOT EXISTS `case_todolist` (
  `case_todolist` int(11) NOT NULL AUTO_INCREMENT,
  `case_todolist_name` varchar(50) DEFAULT NULL,
  `case_todolist_sucess` int(11) DEFAULT 0,
  `case_timeline_id` int(11) DEFAULT NULL,
  `case_id` int(11) DEFAULT NULL,
  KEY `Index 1` (`case_todolist`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `ClientID` int(11) NOT NULL AUTO_INCREMENT,
  `ClientName` varchar(100) DEFAULT NULL,
  `ClientType` int(11) DEFAULT NULL,
  `ClientHomenum` varchar(15) DEFAULT NULL,
  `ClientProvince` varchar(20) DEFAULT NULL,
  `Clientamphure` varchar(20) DEFAULT NULL,
  `Clienttambon` varchar(20) DEFAULT NULL,
  `Clientzipcode` varchar(5) DEFAULT NULL,
  `ClientTax` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ClientID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.client_user
CREATE TABLE IF NOT EXISTS `client_user` (
  `client_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_user_firstname` varchar(50) DEFAULT NULL,
  `client_user_lastname` varchar(50) DEFAULT NULL,
  `client_user_phone` varchar(10) DEFAULT NULL,
  `client_user_email` varchar(50) DEFAULT NULL,
  `client_ID` int(11) DEFAULT NULL,
  KEY `Index 1` (`client_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.courts
CREATE TABLE IF NOT EXISTS `courts` (
  `CourtID` int(11) NOT NULL AUTO_INCREMENT,
  `CourtName` varchar(100) DEFAULT NULL,
  `CourtType` int(11) DEFAULT NULL,
  PRIMARY KEY (`CourtID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.customertypes
CREATE TABLE IF NOT EXISTS `customertypes` (
  `customertypes_id` int(11) NOT NULL AUTO_INCREMENT,
  `customertypes_name` varchar(100) DEFAULT NULL,
  KEY `Index 1` (`customertypes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.customer_responses
CREATE TABLE IF NOT EXISTS `customer_responses` (
  `customer_responses_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_responses_firstname` varchar(20) DEFAULT NULL,
  `customer_responses_lastname` varchar(20) DEFAULT NULL,
  `customer_responses_email` varchar(20) DEFAULT NULL,
  `customer_responses_phone` varchar(10) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  KEY `Index 1` (`customer_responses_id`),
  KEY `FK_customer_responses_clients` (`customer_id`),
  CONSTRAINT `FK_customer_responses_clients` FOREIGN KEY (`customer_id`) REFERENCES `clients` (`ClientID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_role` int(11) NOT NULL DEFAULT 0,
  `employee_firstname` varchar(100) DEFAULT NULL,
  `employee_cardno` varchar(100) DEFAULT NULL,
  `employee_lastname` varchar(100) DEFAULT NULL,
  `employee_phone` char(10) DEFAULT NULL,
  `employee_email` varchar(50) DEFAULT NULL,
  `employee_username` varchar(50) DEFAULT NULL,
  `employee_password` varchar(255) DEFAULT NULL,
  `employee_linetoken` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.employeescasetype
CREATE TABLE IF NOT EXISTS `employeescasetype` (
  `employeescasetype_id` int(11) NOT NULL AUTO_INCREMENT,
  `employeescasetype_name` varchar(100) DEFAULT NULL,
  KEY `Index 1` (`employeescasetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.employeesjob
CREATE TABLE IF NOT EXISTS `employeesjob` (
  `employeesjob_id` int(11) NOT NULL AUTO_INCREMENT,
  `employeesjob_name` varchar(100) DEFAULT NULL,
  KEY `Index 1` (`employeesjob_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.expensestype
CREATE TABLE IF NOT EXISTS `expensestype` (
  `expensesType_id` int(11) NOT NULL AUTO_INCREMENT,
  `expensesType_name` varchar(50) DEFAULT NULL,
  KEY `Index 1` (`expensesType_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.insurance_type
CREATE TABLE IF NOT EXISTS `insurance_type` (
  `insurance_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `insurance_type_name` varchar(50) DEFAULT NULL,
  KEY `Index 1` (`insurance_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) DEFAULT NULL,
  KEY `Index 1` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.settingsusers
CREATE TABLE IF NOT EXISTS `settingsusers` (
  `settingsusers_primarybutton` varchar(20) DEFAULT NULL,
  `settingsusers_cancelbutton` varchar(20) DEFAULT NULL,
  `settingsusers_fontsize` int(11) DEFAULT NULL,
  `settingsusers_fontcolor` varchar(20) DEFAULT NULL,
  `settingsusers_primarycolor` varchar(20) DEFAULT NULL,
  `settingsusers_user_id` int(11) DEFAULT NULL,
  `settingsusers_fontbuttoncolor` varchar(20) DEFAULT NULL,
  `settingsusers_backgroundcolor` varchar(20) DEFAULT NULL,
  KEY `Index 1` (`settingsusers_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table lawyer.timeline_status
CREATE TABLE IF NOT EXISTS `timeline_status` (
  `timeline_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_status_name` varchar(50) DEFAULT NULL,
  KEY `Index 1` (`timeline_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
