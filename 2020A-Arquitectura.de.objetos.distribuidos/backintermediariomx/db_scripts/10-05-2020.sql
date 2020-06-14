-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sql3341753
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sql3341753
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sql3341753` DEFAULT CHARACTER SET utf8 ;
USE `sql3341753` ;

-- -----------------------------------------------------
-- Table `sql3341753`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`User` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Password` LONGTEXT NOT NULL,
  `Biography` LONGTEXT NULL,
  `City` VARCHAR(45) NULL,
  `Country` VARCHAR(45) NULL,
  PRIMARY KEY (`UserID`));


-- -----------------------------------------------------
-- Table `sql3341753`.`Publication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`Publication` (
  `PublicationID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `Folio` VARCHAR(45) NOT NULL,
  `UserID` INT NOT NULL,
  `Published` TINYINT(1) NOT NULL,
  `Cover` text NULL,
  `Title` text NOT NULL,
  `Details` MEDIUMTEXT NULL,
  `EventDate` DATETIME NOT NULL,
  `Price` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`PublicationID`),
  INDEX `fk_Publication_User1_idx` (`UserID` ASC),
  CONSTRAINT `fk_Publication_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `sql3341753`.`User` (`UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql3341753`.`Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`Booking` (
  `BookingID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `PublicationID` INT NOT NULL,
  `UserID` INT NOT NULL,
  `Folio` VARCHAR(45) NOT NULL,
  `Total` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`BookingID`),
  INDEX `fk_Booking_Publication1_idx` (`PublicationID` ASC),
  INDEX `fk_Booking_User1_idx` (`UserID` ASC),
  CONSTRAINT `fk_Booking_Publication`
    FOREIGN KEY (`PublicationID`)
    REFERENCES `sql3341753`.`Publication` (`PublicationID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Booking_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `sql3341753`.`User` (`UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql3341753`.`UserContact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`UserContact` (
  `UserContactID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `UserID` INT NOT NULL,
  `Contact` VARCHAR(45) NOT NULL,
  `IsEmail` TINYINT(1) NULL,
  `IsPhoneNumber` TINYINT(1) NULL,
  `IsMain` TINYINT(1) NULL,
  PRIMARY KEY (`UserContactID`),
  UNIQUE INDEX `Contact_UNIQUE` (`Contact` ASC),
  INDEX `fk_UserContact_User1_idx` (`UserID` ASC),
  CONSTRAINT `fk_UserContact_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `sql3341753`.`User` (`UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql3341753`.`UserProfilePicture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`UserProfilePicture` (
  `UserProfilePictureID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `UserID` INT NOT NULL,
  `Path` LONGTEXT NOT NULL,
  `Size` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserProfilePictureID`),
  INDEX `fk_UserProfilePicture_User1_idx` (`UserID` ASC),
  CONSTRAINT `fk_UserProfilePicture_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `sql3341753`.`User` (`UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql3341753`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`Category` (
  `CategoryID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CategoryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql3341753`.`UseHasCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`UseHasCategory` (
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdtedAt` DATETIME NOT NULL,
  `UserID` INT NOT NULL,
  `CategoryID` INT NOT NULL,
  PRIMARY KEY (`UserID`, `CategoryID`),
  INDEX `fk_User_has_Category_Category1_idx` (`CategoryID` ASC),
  INDEX `fk_User_has_Category_User1_idx` (`UserID` ASC),
  CONSTRAINT `fk_UserHasCategory_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `sql3341753`.`User` (`UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_UserHasCategory_Category`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `sql3341753`.`Category` (`CategoryID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `sql3341753`.`PublicationHasCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`PublicationHasCategory` (
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `PublicationID` INT NOT NULL,
  `CategoryID` INT NOT NULL,
  PRIMARY KEY (`PublicationID`, `CategoryID`),
  INDEX `fk_Publication_has_Category_Category1_idx` (`CategoryID` ASC),
  INDEX `fk_Publication_has_Category_Publication1_idx` (`PublicationID` ASC),
  CONSTRAINT `fk_PublicationHasCategory_Publication`
    FOREIGN KEY (`PublicationID`)
    REFERENCES `sql3341753`.`Publication` (`PublicationID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_PublicationHasCategory_Category`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `sql3341753`.`Category` (`CategoryID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sql3341753`.`PublicationComment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sql3341753`.`PublicationComment` (
  `PublicationCommentID` INT NOT NULL AUTO_INCREMENT,
  `Status` TINYINT(1) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  `UserID` INT NOT NULL,
  `PublicationID` INT NOT NULL,
  `Comment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PublicationCommentID`),
  INDEX `fk_PublicationComment_Publication1_idx` (`PublicationID` ASC),
  INDEX `fk_PublicationComment_User1_idx` (`UserID` ASC),
  CONSTRAINT `fk_PublicationComment_Publication`
    FOREIGN KEY (`PublicationID`)
    REFERENCES `sql3341753`.`Publication` (`PublicationID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_PublicationComment_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `sql3341753`.`User` (`UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
