import { shipFactory } from '../factories/ship-factory.js';

const gameBoard = () => {
  const horizontal = true;
  const board = [];
  for (let i = 0; i < 100; i++) {
    board.push({ hasShip: false, shotTaken: false, id: i });
  }
  const fleet = [];
  const fleetCoordinates = [];
  const placeShip = (coordinate, ship) => {
    let shipArray = [];
    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        board[coordinate + i].hasShip = true;
        shipArray.push(coordinate + i);
      } else {
        board[coordinate + i * 10].hasShip = true;
        shipArray.push(coordinate + i * 10);
      }
    }
    fleetCoordinates.push([
      { name: ship.name },
      { location: shipArray },
      shipFactory(ship),
    ]);
  };
  return { placeShip, board, fleetCoordinates, fleet };
};

export { gameBoard };
