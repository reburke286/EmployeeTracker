const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
          { name: "View Employees", value: 0 },
          { name: "Update Employee Information", value: 1 },
          { name: "Add Employee", value: 2 }
        ]
      }
    ])
    .then(answers => {
      if (answers.prompt === 0) {
        viewEmployees();
      } else if (answers.prompt === 1) {
        updateEmployeeRole();
      } else if (answers.prompt === 2) {
        addEmployee();
      } else {
        console.log("You have not chosen well. Please try again.");
      }
    });
}

function viewEmployees() {
  const query = connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, roles.role_title, roles.salary, department.dept_name FROM department INNER JOIN roles ON roles.dept_id = department.id INNER JOIN employee ON employee.role_id = roles.id",
    function(err, res) {
      if (err) throw err;
      const joinedArray = res;
      const table1 = cTable.getTable(joinedArray);
      console.log(table1);
    }
  );
}

function updateEmployeeRole() {
  console.log("You have chosen to update an employee role.");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "empID",
        message: "Please enter the id of the employee you'd like to update."
      },
      {
        type: "rawlist",
        name: "newRole",
        message: "Please choose the role you'd like to assign your employee",
        choices: [
          { name: "Gryffindor", value: 1 },
          { name: "Headmaster", value: 2 },
          { name: "Head of House", value: 3 },
          { name: "Ravenclaw", value: 4 },
          { name: "Slytherin", value: 5 },
          { name: "Poltergeist", value: 6 }
        ]
      }
    ])
    .then(answers => {
      const empID = answers.empID;
      const newRoleID = answers.newRole;
      console.log(empID, newRoleID);
      //       UPDATE employees
      // SET
      //     email = 'mary.patterson@classicmodelcars.com'
      // WHERE
      //     employeeNumber = 1056;
      const query =
        "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?;";
      connection.query(query, [newRoleID, empID], function(err, res) {
        if (err) throw err;
        console.log(
          "You have successfully updated the role! View Employees to see your changes."
        );
        viewEmployees();
      });
    });
}

function addEmployee() {
  console.log("add employee code");
}
