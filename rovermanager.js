// Manages multiple Mars Rovers
// User set max area size, eg. (5,5)

const Rover = require("./immutablerover");
const inquirer = require("inquirer");

class RoverManager {
  constructor(xSize, ySize) {
    // limit area travelled
    this.size = {
      x: xSize,
      y: ySize
    };

    this.rovers = [];
    this.activeRover = null;

    this.isPositionAvailable = this.isPositionAvailable.bind(this);
    this.executeCommand = this.executeCommand.bind(this);
  }

  // check if rover is within area and if other rovers are in the same pos
  // return true if legal move
  isPositionAvailable(nextPos) {
    return (
      this.checkPositionWithinArea(nextPos) && !this.getRoverByPosition(nextPos)
    );
  }

  // return true if position is legal
  // eg. x > -1 && x <= 5
  // eg. y > -1 && y <= 5
  checkPositionWithinArea({ x, y }) {
    return x > -1 && y > -1 && x <= this.size.x && y <= this.size.y;
  }

  // takes nextPos and returns
  // return false if nextPos is legal
  getRoverByPosition({ x, y }) {
    // console.log(this.rovers)
    return this.rovers.find(rover => {
      const state = rover.getState();
      //console.log(state);
      //console.log(x, y)
      //console.log(state.pos.x === x && state.pos.y === y)
      return state.pos.x === x && state.pos.y === y;
    });
  }

  // Add rover
  addRover(x, y, heading) {
    this.activeRover = null;

    // check if rover can be added to this spot
    if (!this.isPositionAvailable({ x, y })) {
      return false;
    }

    // create rover
    const rover = new Rover(x, y, heading);

    // push into rovers array
    this.rovers.push(rover);
    this.activeRover = rover;

    return this.rovers.length - 1;
  }

  // // activate rover with given index
  activateRover(index) {
    // return boolean value
    return !!(this.activeRover = this.rovers[index]);
  }

  // execute a command
  executeCommand(command) {
    if (!this.activeRover) {
      return false;
    }

    if (command === "M") {
      return this.activeRover.move(this.isPositionAvailable);
    }

    if (command === "L" || command === "R") {
      return this.activeRover.rotate(command);
    }
  }

  // send command to active rover
  sendCommand(commandList) {
    [...commandList].forEach(this.executeCommand);
  }

  // create array of final rover position

  outputFinalPositions() {
    return this.rovers.map(rover => {
      const state = rover.getState();

      return `${state.pos.x} ${state.pos.y} ${state.heading}`;
    });
  }
}

module.exports = RoverManager;

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

// const rover1 = new RoverManager(5, 5);
// console.log(rover1.addRover(1, 2, "N"));
// console.log(Object.isFrozen(rover1.rovers[0]));

//console.log(rover1.);
// rover1.sendCommand("LMLMLMLMM");

// rover1.addRover(3, 3, "E");
// rover1.sendCommand("MMRMMRMRRM");

// console.log(rover1.outputFinalPositions());
