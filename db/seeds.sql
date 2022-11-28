INSERT INTO department (name)
VALUES 
        ("IT"),
        ("Customer Service"),
        ("Retail"),
        ("Human Resources");

SELECT * FROM department;

INSERT INTO role (title, salary,department_id )
VALUES
        ("Manager", 35000, 1),
        ("Data Analyst", 30000, 3),
        ("HR Officer", 25000, 4),
        ("Customer Service Assistant", 20000, 6),
        ("Retail Assitant", 20000, 5),
        ("Intern", 18000, 8);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ("Bruce", "Wayne", 1, 12),
        ("Peter", "Parker", 3, NULL),
        ("Tony", "Stark", 9, 3),
        ("Bruce", "Banner", 4, NULL),
        ("Selina", "Kyle", 7, NULL),
        ("Ororo", "Munroe", 5, 2),
        ("Natasha", "Romanoff", 2, 6);

SELECT * FROM employee;