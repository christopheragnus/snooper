const inquirer = require("inquirer");
const RoverManager = require("./rovermanager");

var questions = [
  {
    type: "input",
    name: "grid_x",
    message: "Enter x coordinate for grid:",
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
  {
    type: "input",
    name: "grid_y",
    message: "Enter y coordinate for grid:",
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
  {
    type: "input",
    name: "rover_x",
    message: "Add rover x coordinate:",
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
  {
    type: "input",
    name: "rover_y",
    message: "Add rover y coordinate:",
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
  {
    type: "list",
    name: "heading",
    message: "Add rover heading:",
    choices: ["North", "South", "East", "West"],
    filter: function(val) {
      return val.slice(0, 1);
    }
  },
  {
    type: "input",
    name: "rover_commands",
    message: "Enter rover commands eg.LMLMLM:",
    validate: function(value) {
      let valid = !!value.toUpperCase().match(/^[LRM]+$/g);
      return valid || "You can only enter L or R or M";
    }
  },
  {
    type: "list",
    name: "option",
    message: "Add another rover?",
    default: "No",
    choices: ["Yes", "No"]
  }
];

inquirer.prompt(questions).then(answers => {
  //console.log(JSON.stringify(answers, null, "  "));
  const { grid_x, grid_y, rover_x, rover_y, heading, rover_commands } = answers;
  const rover1 = new RoverManager(grid_x, grid_y);
  rover1.addRover(rover_x, rover_y, heading);
  rover1.sendCommand(rover_commands);
  if (answers.option === "Yes") {
    return inquirer.prompt(questions.slice(2, 6)).then(answers => {
      const { rover_x, rover_y, heading, rover_commands } = answers;
      rover1.addRover(rover_x, rover_y, heading);
      rover1.sendCommand(rover_commands);
      console.log("Rover final positions:", rover1.outputFinalPositions());
    });
  }

  return console.log("Rover final positions:", rover1.outputFinalPositions());
});
