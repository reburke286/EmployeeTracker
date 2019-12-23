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

const code = {
  // Starting Function
  inquireUser: function() {
    return inquirer
      .prompt([
        {
          type: "rawlist",
          name: "prompt",
          message: "What do you want to do?",
          choices: [
            { name: "View Employees", value: 0 },
            { name: "Update Employee Role", value: 1 },
            { name: "Add", value: 2 }
          ]
        }
      ])
      .then(answers => {
        if (answers.prompt === 0) {
          viewEmployees();
        } else if (answers.prompt === 1) {
          updateEmployeeRole();
        } else if (answers.prompt === 2) {
          add();
        } else {
          console.log("You have not chosen well. Please try again.");
        }
      });
  }
};

// View Functions
function viewEmployees() {
  const query = connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, roles.role_title, roles.salary, department.dept_name FROM department INNER JOIN roles ON roles.dept_id = department.id INNER JOIN employee ON employee.role_id = roles.id",
    function(err, res) {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
    }
  );
}

function viewDepartments() {
  const query = "SELECT * FROM employeetracker_db.department;";
  connection.query(query, function(err, res) {
    const tableDept = cTable.getTable(res);
    console.log(tableDept);
  });
}

function viewRoles() {
  const query = "SELECT * FROM employeetracker_db.roles;";
  connection.query(query, function(err, res) {
    const tableDept = cTable.getTable(res);
    console.log(tableDept);
  });
}

//Update Functions
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

//Add Functions
function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What department would you like to add?"
      }
    ])
    .then(answers => {
      const newDept = answers.addDept;
      console.log(newDept);
      const query = "INSERT INTO department (`dept_name`) VALUES (?);";
      connection.query(query, [newDept], function(err, res) {
        if (err) throw err;
        console.log("You have successfully added a department.");
      });
      viewDepartments();
    });
}

function addRole() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "What role would you like to add?"
      },
      {
        type: "rawlist",
        name: "dept",
        message: "Please choose which department the role belongs to.",
        choices: [
          { name: "Student", value: 7 },
          { name: "Professor", value: 8 },
          { name: "Chaos", value: 9 },
          { name: "Ghosts", value: 10 },
          { name: "House Elves", value: 11 }
        ]
      }
    ])
    .then(answers => {
      const newRole = answers.addRole;
      const deptID = answers.dept;
      const query =
        "INSERT INTO roles (`role_title`, `dept_id`) VALUES (?, ?);";
      connection.query(query, [newRole, deptID], function(err, res) {
        if (err) throw err;
        console.log("You have successfully added a role.");
      });
      viewRoles();
    });
}

function addEmployee() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter your new employee's first name."
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter their last name."
      },
      {
        type: "rawlist",
        name: "role_id",
        message: "Please choose their company role.",
        choices: [
          { name: "Gryffindor", value: 1 },
          { name: "Headmaster", value: 2 },
          { name: "Head of House", value: 3 },
          { name: "Ravenclaw", value: 4 },
          { name: "Slytherin", value: 5 },
          { name: "Poltergeist", value: 6 },
          { name: "Kitchen Helper", value: 7 }
        ]
      },
      {
        type: "rawlist",
        name: "manager_id",
        message: "Please select their manager. If none, choose TBD.",
        choices: [
          { name: "Albus Dumbledore", value: 2 },
          { name: "Severus Snape", value: 3 },
          { name: "Minerva McGonnagall", value: 5 },
          { name: "Filius Flitwick", value: 9 },
          { name: "TBD", value: 0 }
        ]
      }
    ])
    .then(answers => {
      const firstName = answers.first_name;
      const lastName = answers.last_name;
      const roleID = answers.role_id;
      const managerID = answers.manager_id;
      const query =
        "INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?);";
      connection.query(
        query,
        [firstName, lastName, roleID, managerID],
        function(err, res) {
          if (err) throw err;
          console.log("You have successfully added a role.");
        }
      );
      viewEmployees();
    });
}
function add() {
  return inquirer
    .prompt([
      {
        type: "rawlist",
        name: "add",
        message: "Which would you like to add?",
        choices: [
          { name: "Department", value: 1 },
          { name: "Employee", value: 2 },
          { name: "Role", value: 3 }
        ]
      }
    ])
    .then(answers => {
      switch (answers.add) {
        case 1:
          addDepartment();
          break;

        case 2:
          console.log("You're going to add an employee");
          addEmployee();
          break;

        case 3:
          addRole();
          break;
      }
    });
}

module.exports = code;
