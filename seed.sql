INSERT INTO department (dept_name)
VALUES ("Student"), ("Professor"), ("Chaos");

INSERT INTO roles (role_title, salary, dept_id)
VALUES ("Gryffindor", 0.00, 1), ("Headmaster", 300000.00, 2), ("Head of House", 180000.00, 2), ("Ravenclaw", 0.00, 1), ("Slytherin", 0.00, 1), ("Poltergeist", 6.66, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Albus", "Dumbledore", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Severus", "Snape", 3, 1), ("Minerva", "McGonagall", 3, 1), ("Filius", "Flitwick", 3, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Harry", "Potter", 1), ("Draco", "Malfoy", 5), ("Pansy", "Parkinson", 5), ("Hermione", "Granger", 1), ("Luna", "Lovegood", 4);

INSERT INTO employee (first_name, role_id)
VALUES ("Peeves", 6);

