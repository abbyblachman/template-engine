const inquirer = require("inquirer");
const Manager = require('./Manager');
const Intern = require('./Intern');
const Engineer = require('./Engineer');
const fs = require('fs');
const outputPath = './main.html'
const teamMembers = [];


function appMenu() {
    function createManager() {
        inquirer.prompt([
        {   message: "What is your name?",
            name: "username"
          }, 
        {   message: "What is your id?",
          name: "id"
        }, 
        {   message: "What is your email?",
            name: "email"
          }
          
        /* prompt choices here */
      ]).then(answers => {
          const manager = new Manager(answers.username, answers.id, answers.email);
        teamMembers.push(manager);
        /* build manager */
        createTeam();
      });
    }
    function createTeam() {
        inquirer.prompt([
            {  message: "What role do you want to add to your team: intern, engineer, or no more roles?",
                name: "userchoice"
          }
      ]).then(userChoice => {
        if (userChoice.userchoice === 'engineer' ) {
            addEngineer();
        } else if (userChoice.userchoice === 'intern') {
            addIntern();
        } else
        buildTeam();
       
        /* call one function below based on choice */
      });
    }
    function addEngineer() {
      inquirer.prompt([
        {   message: "What is your name?",
            name: "username"
          }, 
        {   message: "What is your id?",
          name: "id"
        }, 
        {   message: "What is your email?",
            name: "email"
          },
          {   message: "What is your Github?",
            name: "github"
          }
      ]).then(answers => {
        const engineer = new Engineer(answers.username, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        createTeam();
      });
    }
    function addIntern() {
      inquirer.prompt([
        {   message: "What is your name?",
            name: "username"
          }, 
        {   message: "What is your id?",
          name: "id"
        }, 
        {   message: "What is your email?",
            name: "email"
          }
        /* prompts here */
      ]).then(answers => {
          const intern = new Intern(answers.username, answers.id, answers.email);
          teamMembers.push(intern);
        /* create interin */
        createTeam();
      });
    }
    function buildTeam() {
      console.log(teamMembers);
      fs.writeFileSync(outputPath, "utf-8");
    }
    createManager();
    
    
  }
  appMenu();