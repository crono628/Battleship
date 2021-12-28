import { shipFactory } from '../factories/ship-factory.js';

const gameBoard = () => {
  let board = [];
  let hold = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      hold.push({
        hasShip: false,
        shotTaken: false,
        shipName: null,
        row: i,
        column: j
      });
    }
    board.push(hold);
    hold = [];
  }

  const fleet = [];
  const findFleetShip = (ship) => fleet.find(({ name }) => name === ship);

  let horizontal = true;

  const toggleAxis = () => (horizontal = !horizontal);

  const legalMove = (xCoordinate, yCoordinate, ship) => {
    let thisMove = true;
    let xLengthArr = [];
    let yLengthArr = [];
    for (let i = 0; i < ship.length; i++) {
      xLengthArr.push(xCoordinate + i);
      yLengthArr.push(yCoordinate + i);
    }
    if (horizontal) {
      if (xLengthArr.some((num) => num > 9)) {
        thisMove = false;
      }
    }
    if (!horizontal) {
      if (yLengthArr.some((num) => num > 9)) {
        thisMove = false;
      }
    }
    return thisMove;
  };

  const placeShip = (yRow, xColumn, boat) => {
    if (legalMove(xColumn, yRow, boat) == true) {
      let shipArray = [];
      for (let i = 0; i < boat.length; i++) {
        if (horizontal) {
          board[yRow][xColumn + i].hasShip = true;
          board[yRow][xColumn + i].shipName = boat.name;
          shipArray.push([yRow, xColumn + i]);
        } else {
          board[yRow + i][xColumn].hasShip = true;
          board[yRow + i][xColumn].shipName = boat.name;
          shipArray.push([yRow + i, xColumn]);
        }
      }
      fleet.push({
        name: boat.name,
        location: shipArray,
        functions: shipFactory(boat)
      });
    } else {
      console.log("false");
      return false;
    }
  };

  const missedShots = [];

  const receiveAttack = (yRow, xColumn) => {
    const here = board[yRow][xColumn];
    here.shotTaken = true;
    if (here.hasShip) {
      let ship = findFleetShip(here.shipName);
      let { location } = ship;
      let findIt = [yRow, xColumn];
      let theIndex;
      location.forEach((spot, index) => {
        if (spot[0] === yRow && spot[1] === xColumn) {
          theIndex = index;
        }
      });
      ship.functions.hit(theIndex, yRow, xColumn);
    }
    if (!here.hasShip) {
      missedShots.push(yRow, xColumn);
    }
  };

  const allSunk = () => {
    let allShipsSunk = false;
    for (let ship of fleet) {
      if (fleet.every((obj) => obj.functions.sunk())) {
        allShipsSunk = true;
      } else allShipsSunk = false;
    }
    return allShipsSunk;
  };

  return {
    placeShip,
    fleet,
    receiveAttack,
    missedShots,
    allSunk,
    toggleAxis,
    board
  };
};

export { gameBoard };
