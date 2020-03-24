var inquirer = require("inquirer");
var fs = require('fs');
const axios = require('axios');

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    {
      type: "input",
      message: "Give a basic description of your project.",
      name: "description"
    },
    {
      type: "input",
      message: "Give the installation information here:",
      name: "install"
    },
    {
        type: "input",
        message: "Outline usage information for your project:",
        name: "usage"
      },
      {
        type: "input",
        message: "Explain the licensing of your project:",
        name: "license"
      },
      {
        type: "input",
        message: "What contributions will be considered for this project?",
        name: "contributions"
      },
      {
        type: "input",
        message: "What tests, if any, does this project feature?",
        name: "tests"
      },
      {
        type: "input",
        message: "What badge label would you like to use?",
        name: "badgeLabel"
      },
      {
        type: "input",
        message: "What badge message would you like to use?",
        name: "badgeMsg"
      },
      {
        type: "list",
        message: "What badge color would you like to use?",
        name: "badgeColor",
        choices: ["brightgreen", "green", "yellowgreen", "yellow", "orange", "red", "lightgrey", "blue"]
      }
    ])

    .then(function(response) {
        var unameInput = response.username;
        var title = response.title;
        var description = response.description;
        var install = response.install;
        var usage = response.usage;
        var license = response.license;
        var contributions = response.contributions;
        var tests = response.tests;   
        var badgeLabel = encodeURIComponent(response.badgeLabel);
        var badgeMsg = encodeURIComponent(response.badgeMsg);
        var badgeColor = response.badgeColor;
        var badgeUrl = `https://img.shields.io/badge/${badgeLabel}-${badgeMsg}-${badgeColor}`;

      axios({
          method: 'get',
          url: `https://api.github.com/users/${unameInput}`,
        })
          .then(function(response) {
          var email = response.data.email;
          var profImgUrl = response.data.avatar_url;
        


        const script = ` ![badge image](${badgeUrl} "Project Badge")
# ${title}
***
## Description
${description}
***
## Table of Contents
- Installation
- Usage
- Licensing Info
- Contributions
- Tests
- Creator Info
***
## Installation Requirements
${install}
***
## Usage
${usage}
***
## Licensing Info
${license}
***
## Contributions
${contributions}
***
## Tests
${tests}
***
## Github Creator Info
![profile image](${profImgUrl} "Logo Title Text 1")
${email}`
        

        fs.writeFile("README.md", script, function(err) {
              
                if (err) {
                    return console.log(err);
                    }
                      
                    console.log('README.md file successfully created!');
                      
        });
      });
    }
    
);