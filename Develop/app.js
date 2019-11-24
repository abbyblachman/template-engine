const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const teamMembers = [];
const idArray = [];


function appMenu() {
  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager's office number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }
  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }
  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }
  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }
  function buildTeam() {
    let htmlString = '';
    let headHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>My Team</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="main.css">
      <link href="https://fonts.googleapis.com/css?family=Calistoga|Roboto&display=swap" rel="stylesheet">
      </head>
      <body>
      <div class="container">
      <div class="card styledheader">
      <div class="container">
      <h1 class="display-4">Team Employee Summary </h1>
      <p class="lead styleddescrip">Our development team members and information.</p>
  </div>
</div>
      <div class="row centerrow">`;
    teamMembers.forEach(member => {
      if (member.getRole() === 'Manager' ) {
      let memberDiv = `
                        <div class="card col-sm-3 styledcardmanager">
                        <div class="card-title styledtitle">${member.getName()}</div>
                        <div class="card-body">
                        <div class="card-subtitle styledposition">${member.getRole()}</div>
                        <div>ID: ${member.getId()}</div>
                        <div>Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></div>
                        <div>Office Number: ${member.getOfficeNumber()}</div>
                        </div>
                        </div>`;
     headHtml += memberDiv;
      }
      else if (member.getRole() === 'Intern') {
        let memberDiv = `<div class="card col-sm-3 styledcardintern">
                        <div class="card-title styledtitle">${member.getName()}</div>
                        <div class="card-body">
                        <div class="card-subtitle styledposition">${member.getRole()}</div>
                        <div>ID: ${member.getId()}</div>
                        <div>Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></div>
                        <div>School: ${member.getSchool()}</div>
                        </div>
                        </div>`;
     headHtml += memberDiv;
      }
      else {
        let memberDiv = `<div class="card col-sm-3 styledcardengineer">
                        <div class="card-title styledtitle">${member.getName()}</div>
                        <div class="card-body">
                        <div class="card-subtitle styledposition">${member.getRole()}</div>
                        <div>ID: ${member.getId()}</div>
                        <div>Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></div>
                        <div>GitHub: <a href="https://www.github.com/${member.getGithub()}">${member.getGithub()}</a></div>
                        </div>
                        </div>`;
     headHtml += memberDiv;
      }  
    });
    const footerHtml = `
      </div>
      </div>
      </body>
      </html>`;
    htmlString = headHtml + footerHtml;
    fs.writeFileSync('./outputs/team.html', htmlString, "utf-8");
  }
  createManager();
}
appMenu();