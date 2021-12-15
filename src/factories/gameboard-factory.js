import { shipFactory } from '../factories/ship-factory.js';

const gameBoard = () => {
  const board = [];
  for (let i = 0; i < 100; i++) {
    board.push({ hasShip: false, shotTaken: false, shipType: null, id: i });
  }
  const fleet = [];

  let horizontal = true;
  const toggleAxis = () => (horizontal = !horizontal);

  const testEdge = (coordinate, boat) => {
    let edges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    for (let i = 0; i < boat.length; i++) {
      if (edges.some((edge) => coordinate + i === edge)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const placeShip = (coordinate, boat) => {
    let shipArray = [];
    for (let i = 0; i < boat.length; i++) {
      if (horizontal) {
        board[coordinate + i].hasShip = true;
        board[coordinate + i].shipType = boat.name;
        shipArray.push(coordinate + i);
      } else {
        board[coordinate + i * 10].hasShip = true;
        board[coordinate + i * 10].shipType = boat.name;
        shipArray.push(coordinate + i * 10);
      }
    }
    fleet.push({
      name: boat.name,
      location: shipArray,
      functions: shipFactory(boat),
    });
  };

  const findFleetShip = (ship) => fleet.find(({ name }) => name === ship);
  const findBoardLocation = (coordinate) =>
    board.find(({ id }) => id === coordinate);

  const missedShots = [];
  const receiveAttack = (coordinate) => {
    const here = board[coordinate];
    here.shotTaken = true;
    if (here.hasShip) {
      const ship = findFleetShip(here.shipType);
      ship.functions.hit(ship.location.indexOf(coordinate), coordinate);
    }
    if (!here.hasShip) {
      missedShots.push(coordinate);
    }
  };

  const allSunk = () => {
    for (let ship of fleet) {
      if (fleet.every((obj) => obj.functions.sunk())) {
        return true;
      } else return false;
    }
  };

  return {
    placeShip,
    fleet,
    findFleetShip,
    findBoardLocation,
    receiveAttack,
    missedShots,
    allSunk,
    toggleAxis,
    board,
    testEdge,
  };
};

export { gameBoard };
