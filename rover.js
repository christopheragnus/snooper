class Rover {
  constructor(x, y, heading) {
    this.pos = { x, y };
    this.heading = heading;

    // Rover rotating
    this.rotateMap = {
      N: { L: "W", R: "E" },
      E: { L: "N", R: "S" },
      W: { L: "S", R: "N" },
      S: { L: "E", R: "W" }
    };

    // move in direction of heading
    this.moveMap = {
      N: { plane: "y", amount: +1 },
      E: { plane: "x", amount: +1 },
      W: { plane: "x", amount: -1 },
      S: { plane: "y", amount: -1 }
    };

    //Object.freeze(this);
  }

  // Rotate given direction L || R
  rotate(direction) {
    // let current_heading = []
    // let last_element = current_heading.concat(heading).concat(direction).slice(-1);
    // return this.rotateMap[last_element][direction];
    this.heading = this.rotateMap[this.heading][direction];
  }

  // Move one step in the direction
  // pass isPositionAvailable function into predicate parameter
  move(predicate) {
    //console.log(predicate);
    const moveBy = this.moveMap[this.heading];
    // console.log(moveBy);
    const nextPos = { x: this.pos.x, y: this.pos.y };

    // Set next position
    nextPos[moveBy.plane] += moveBy.amount;

    // Check if move is legal
    const isLegal = predicate(nextPos);

    if (isLegal) {
      this.pos = nextPos;
    }
  }

  // get current state
  getState() {
    return {
      pos: this.pos,
      heading: this.heading
    };
  }
}

// let test = new Rover(5,5,'M')
// console.log(test.getState());

module.exports = Rover;
