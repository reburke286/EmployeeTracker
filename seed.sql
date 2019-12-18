DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NULL,
  salary DECIMAL(8,2) NULL,
  dept_id INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id)
);