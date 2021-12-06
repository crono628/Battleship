import { gameBoard } from './gameboard-factory.js';
import { shipFactory } from './ship-factory.js';
import { ships } from '../components/ships.js';
import _, { iteratee, random } from 'lodash';

let playerOneTurn = true;

function playerFactory(human) {
  if (human) {
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
  } else {
    // this is the cpu controller
    const playerBoard = gameBoard();
    const playerShips = [];
    ships.forEach((ship) => {
      let newShip = shipFactory(ship);
      playerShips.push(newShip);
    });

    if (playerShips.length == 5) {
      playerShips.forEach((ship) => {
        playerBoard.placeShip(random(99), iteratee('hasShip', false));
      });
    }

    const attack = (someone, somewhere) => {
      someone.playerBoard.receiveAttack(somewhere);
    };
    return { playerBoard, playerShips, attack };
  }
}

export { playerFactory };
