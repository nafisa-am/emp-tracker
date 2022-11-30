
const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require ("express");
const { printTable } = require('console-table-printer');

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // Add MySQL password here
    password: '',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);


run ();

// Inquirer allows question selection

function run() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Roles",
        "Update Employee Role",
        "Remove Employee",
        "Exit"
      ]
    })

    // Switch cases depending on user selection

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

// Function to view choices on user selection

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

// function viewManager() {
//   connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err;
//     console.table(res);
//     run();
//   });
// }


/* -------------------------------- Adds user data into into corresponding functions  -------------------------------- */


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
/* ---------------------------------------------------------------------------------------------------- */

// Function to remove employee from list 

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

// function to update role on list 

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

// Function to exit and stop connection 

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