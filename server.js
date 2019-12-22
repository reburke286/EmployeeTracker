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
        updateEmployee();
      } else if (answers.prompt === 2) {
        addEmployee();
      } else {
        console.log("You have not chosen well. Please try again.");
      }
      console.log(answers);
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

function updateEmployee() {
  console.log("update employee code");
}

function addEmployee() {
  console.log("add employee code");
}
