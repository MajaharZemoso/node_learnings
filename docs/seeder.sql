-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema node
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema node
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `node` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `cash_kick_amount` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`payment` (
  `id` INT NOT NULL COMMENT '	',
  `due_data` DATE NULL,
  `status` ENUM("upcoming") NULL,
  `expected_amount` INT NULL,
  `outstanding` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_payment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cashkick`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cashkick` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `status` ENUM("pending") NULL,
  `maturity` DATE NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  `total_received` INT NULL,
  `total_financed` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_cashkick_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_cashkick_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`contract`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contract` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` ENUM("monthly") NULL,
  `status` ENUM("available") NULL,
  `per_payment` INT NULL,
  `term_length` INT NULL,
  `payment_amount` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`contract_has_cashkick`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contract_has_cashkick` (
  `contract_id` INT NOT NULL,
  `cashkick_id` INT NOT NULL,
  PRIMARY KEY (`contract_id`, `cashkick_id`),
  INDEX `fk_contract_has_cashkick_cashkick1_idx` (`cashkick_id` ASC) VISIBLE,
  INDEX `fk_contract_has_cashkick_contract1_idx` (`contract_id` ASC) VISIBLE,
  CONSTRAINT `fk_contract_has_cashkick_contract1`
    FOREIGN KEY (`contract_id`)
    REFERENCES `mydb`.`contract` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contract_has_cashkick_cashkick1`
    FOREIGN KEY (`cashkick_id`)
    REFERENCES `mydb`.`cashkick` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `node` ;

-- -----------------------------------------------------
-- Table `node`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `node`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `quantity` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `userId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `node`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
