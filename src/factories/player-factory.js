import { gameBoard } from './gameboard-factory.js';
import { shipFactory } from './ship-factory.js';
import { ships } from '../components/ships.js';

let playerOneTurn = true;

function playerFactory() {
  const playerBoard = gameBoard();
  const playerShips = [];
  ships.forEach((ship) => {
    let newShip = shipFactory(ship);
    playerShips.push(newShip);
  });

  const attack = (someone, somewhere) => {
    someone.playerBoard.receiveAttack(somewhere);
  };

  return { playerBoard, playerShips, attack };
}

export { playerFactory };
