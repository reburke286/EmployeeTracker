const mysql = require("mysql");
const inquirer = require("inquirer");

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
  inquireUser();
});

function inquireUser() {
  return inquirer
    .prompt([
      {
        type: "rawlist",
        name: "prompt",
        message: "What do you want to do?",
        choices: [
          "View Employees",
          "Update Employee Information",
          "Add Employee"
        ]
      }
    ])
    .then(answers => {
      if ((answers.prompt = "View Employees")) {
        seeEmployees();
      }
      console.log(answers);
    });
}

function seeEmployees() {
  const query = connection.query(
    // the ? is serving as a placeholder for the object or array below
    // if it's passing one argument you list it out as an object
    "SELECT id, first_name, last_name FROM employee",
    //callback function
    function(err, res) {
      if (err) throw err;
      console.log(res, joinEmployeesAndDepartments());
    }
  );

  function joinEmployeesAndDepartments() {
    const query = connection.query(
      "SELECT roles.role_title, roles.salary, department.dept_name FROM department INNER JOIN roles ON roles.dept_id = department.id",
      function(err, res) {
        if (err) throw err;
        console.log(res);
      }
    );
  }

  // logs the actual query being run
  console.log(query.sql);
}
