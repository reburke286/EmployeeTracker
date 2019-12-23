const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const code = require("./index.js");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0286",
  database: "employeetracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  code.inquireUser();
});
