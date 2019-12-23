Add departments, roles, employees

departments:
inquirer > "Which department would you to add?"
.then(answers => {
    const query = "INSERT INTO department (`department`) VALUES (?);"
})
