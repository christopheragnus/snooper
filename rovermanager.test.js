const RoverManager = require("./rovermanager");

describe("Solution", function() {
  it("add rover 1,2 N and send command LMLMLMLMM returns 1,3 N", function() {
    const rover1 = new RoverManager(5, 5);
    rover1.addRover(1, 2, "N");
    rover1.sendCommand("LMLMLMLMM");
    expect(rover1.outputFinalPositions()).toEqual(["1 3 N"]);
  });

  it("add rover 3,3 E and send command MMRMMRMRRM returns 5,1 E", function() {
    const rover1 = new RoverManager(5, 5);
    rover1.addRover(3, 3, "E");
    rover1.sendCommand("MMRMMRMRRM");
    expect(rover1.outputFinalPositions()).toEqual(["5 1 E"]);
  });

  it("check if first rover object is immutable", function() {
    const rover1 = new RoverManager(5, 5);
    rover1.addRover(3, 3, "E");
    expect(Object.isFrozen(rover1.rovers[0])).toBeTruthy();
  });
});
