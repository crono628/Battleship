import { shipFactory } from '../factories/ship-factory.js';

const gameBoardFactory = () => {
  let board = [];
  let hold = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      hold.push({
        hasShip: false,
        shotTaken: false,
        shipName: null,
        row: i,
        column: j,
      });
    }
    board.push(hold);
    hold = [];
  }

  const fleet = [];
  function findFleetShip(ship) {
    return fleet.find(({ name }) => name === ship);
  }

  function preventDouble(ship) {
    for (const boat in fleet) {
      const finder = fleet[boat];
      if (finder.name == ship.name) {
        return false;
      } else return true;
    }
    return true;
  }

  let horizontal = true;

  const toggleAxis = () => (horizontal = !horizontal);

  const legalMove = (xCoordinate, yCoordinate, ship) => {
    let isLegal = true;
    let possibilities = [];
    if (xCoordinate + ship.length > 10 || yCoordinate + ship.length > 10) {
      isLegal = false;
      return false;
    } else if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        possibilities.push([yCoordinate, xCoordinate + i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        possibilities.push([yCoordinate + i, xCoordinate]);
      }
    }
    if (possibilities.length == ship.length) {
      for (let i = 0; i < possibilities.length; i++) {
        let possibility = possibilities[i];
        for (let j = 0; j < possibility.length; j++) {
          if (board[possibility[0]][possibility[1]].hasShip == true) {
            isLegal = false;
          }
        }
      }
    }
    return isLegal;
  };

  const placeShip = (yRow, xColumn, boat) => {
    if (!findFleetShip(boat) && preventDouble(boat)) {
      if (legalMove(xColumn, yRow, boat)) {
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
          functions: shipFactory(boat),
        });
      } else {
        return false;
      }
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
      missedShots.push([yRow, xColumn]);
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
    board,
  };
};

export { gameBoardFactory };
