// import {api} from 'api.js';

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
        message: "Who has contributed to this project?",
        name: "contributors"
      },
      {
        type: "input",
        message: "What tests, if any, does this project feature?",
        name: "tests"
      }
    ])

    .then(function(response) {
        var unameInput = response.username;
        var title = response.title;
        var description = response.description;
        var install = response.install;
        var usage = response.usage;
        var license = response.license;
        var contributors = response.contributors;
        var tests = response.tests;    

      axios({
          method: 'get',
          url: `https://api.github.com/users/${unameInput}`,
        })
          .then(function(response) {
          var username = response.data.login;
          var profImgUrl = response.data.avatar_url;
          console.log(username);
          console.log(profImgUrl);
        


        const script = `${title}
                ${description}
                ${install}
                ${usage}
                ${license}
                ${contributors}
                ${tests}
                ${username}
                ${profImgUrl}`

        fs.writeFile("README.md", script, function(err) {
              
                if (err) {
                    return console.log(err);
                    }
                      
                    console.log('README.md file successfully created!');
                      
        });
      });
    }
    
);






function init() {
    
}

init();
