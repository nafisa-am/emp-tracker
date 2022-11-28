
INSERT INTO department (name)
VALUES 
        ("IT"),
        ("Customer Service"),
        ("Retail"),
        ("Human Resources");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES
        ("Manager", 35000, 1),
        ("Data Analyst", 30000, 3),
        ("HR Officer", 25000, 4),
        ("Customer Service Assistant", 20000, 6),
        ("Retail Assitant", 20000, 5),
        ("Intern", 18000, 8);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, id, manager_id)
VALUES 
        ("Bruce", "Wayne", 1, 1),
        ("Peter", "Parker", 2, NULL),
        ("Tony", "Stark", 3, 3),
        ("Bruce", "Banner", 4, 5),
        ("Selina", "Kyle", 5, NULL),
        ("Ororo", "Munroe", 6, 3),
        ("Natasha", "Romanoff", 7, NULL);

SELECT * FROM employee;