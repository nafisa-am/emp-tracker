const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require("console.table");
const express = require ("express");

// import mysql from 'mysql2'; 
// import inquirer from 'inquirer';
// import table from 'console.table';
// import express from 'express';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

// connection.connect(err => {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
//   console.log("Welcome to this tacker!");
//   run();
// });

run ();

function run() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add employee",
        "Add department",
        "Add roles",
        "Update employee role",
        "Remove employee",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all employees":
        viewEmployee();
        break;
      
      case "View all departments":
        viewDepartment();
        break;
    
      case "View all roles":
        viewRole();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "Add department":
        addDepartment();
        break;

      case "Add roles":
        addRole();
        break;

      case "Update employee role":
        updateRole();
        break;

      case "Remove employee":
        removeEmployee();
        break;

      case "Exit":
        exit();
        break;
      }
    });
}

function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function viewMan() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
      name: "first_name",
      type: "input",
      message: "Enter the employee's first name.",
      validate: function(answer) {
        if (answer !== "") {
            return true;
        }
        return "Employee's first name must contain at least one character.";
        }
      },
      {
      name: "last_name",
      type: "input",
      message: "Enter the employee's last name.",
      validate: function(answer) {
        if (answer !== "") {
            return true;
        }
        return "Employee's first name must contain at least one character.";
        }

      },
      {
      name: "role_id",
      type: "input",
      message: "Enter the employee's role id.",
      validate: function(answer) {
        if (isNaN(answer) === false) {
            return true;
        }
        return false;
        }
      },
      {
      name: "manager_id",
      type: "input",
      message: "Enter the employee's manager id.",
      validate: function(answer) {
          if (isNaN(answer) === false) {
              return true;
          }
          return false;
      }
      }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO employee SET ?",
        {first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id || 0,
          manager_id: answer.manager_id || 0},
        function(err) {
          if (err) throw err;
          console.log("You have successfully added this employee!");
          run();
        }
      );
  });
};

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the department you want to add."
      })
    .then(function(answer) {
      connection.query("INSERT INTO department SET ?",
        { name: answer.department },
        function(err) {
          if (err) throw err;
          console.log("You have successfully added this department!");
          run();
        }
      );
  });
};

function addRole() {
  inquirer
    .prompt([
      {
      name: "title",
      type: "input",
      message: "Please enter the role's title.",
      validate: function(answer) {
        if (answer !== "") {
            return true;
        }
        return "The role must contain at least one character.";
        }
      },
      {
      name: "salary",
      type: "input",
      message: "Please enter the role's salary.",

      },
      {
      name: "department_id",
      type: "input",
      message: "Please enter the department id.",
      validate: function(answer) {
        if (isNaN(answer) === false) {
            return true;
        }
        return false;
      }

      }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO role SET ?",
        {title: answer.title,
          salary: answer.salary || 0,
          department_id: answer.department_id || 0},
        function(err) {
          if (err) throw err;
          console.log("You have successfully added this role!");
          run();
        }
      );
  });
};

function removeEmployee() {
  inquirer
    .prompt([
    {
    name: "id",
    type: "input",
    message: "Please enter the Employee id",

    }
    ]).then(function(answer) {
      connection.query("DELETE FROM employee WHERE id = ?", [answer.id],
      function(err) {
        if (err) throw err;
        console.log("You have successfully removed this employee!");
        run();
      })
    })
}


 updateRole = () => {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
      inquirer 
        .prompt([
          {
          name: "updateRole",
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].last_name);
            }
            return choiceArray;
          }
          }
        ])
        .then(function(answer) {
          inquirer
            .prompt([
              {
              name: "changeRole",
              type: "input",
              message: "What is the employee's new role id number?"
              },
          ])
          .then(function (roleAnswer) {
            connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [roleAnswer.changeRole, answer.updateRole]);
            console.log("You have successfully updated the employee's role!");
            run();
        })

    });
  })
};

function exit() {
  console.log("Thank you for using Emplyee Tracker!");
  connection.end();
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});