import { shipFactory } from './ship-factory.js';
import ships from '../components/ships.js';
const height = 10;

function gameBoard() {
  const board = [];
  const getBoard = () => board;
  const fleetCoordinates = [];
  const getFleetCoordinates = () => fleetCoordinates;
  let horizontal = true;
  const vertical = () => {
    horizontal = !horizontal;
  };

  const loadBoard = () => {
    for (let i = 0; i < height * height; i++) {
      board.push({ hasShip: false, shotTaken: false, id: i });
    }
  };

  board.length === 0 ? loadBoard() : [];

  const placeShip = (coordinate, boat) => {
    let shipArray = [];
    for (let i = 0; i < boat.length; i++) {
      if (horizontal) {
        board[coordinate + i].hasShip = true;
        shipArray.push(coordinate + i);
      } else {
        board[coordinate + i * height].hasShip = true;
        shipArray.push(coordinate + i * height);
      }
    }
    fleetCoordinates.push(shipArray);
  };

  const receiveAttack = (coordinate) => {
    board[coordinate].shotTaken = true;
  };

  const allShipsSunk = () => {
    let allShips = board.filter((square) => square.hasShip === true);
    if (allShips.every((ship) => ship.shotTaken === true)) {
      return true;
    }
  };

  return {
    loadBoard,
    placeShip,
    vertical,
    receiveAttack,
    getBoard,
    getFleetCoordinates,
    allShipsSunk,
  };
}

export { gameBoard };
