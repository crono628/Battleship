import { gameBoard } from './gameboard-factory.js';
import { shipFactory } from './ship-factory.js';
import { ships } from '../components/ships.js';

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

    function shipsOntoBoard() {
      playerShips.forEach((ship) => {
        let findSpot = playerBoard.board.filter(
          (item) => item.hasShip === false
        );
        let goodSpot = findSpot[Math.floor(Math.random() * findSpot.length)];
        console.log(findSpot);
        console.log(goodSpot);

        return playerBoard.placeShip(parseInt(goodSpot), ship);
      });
    }

    playerShips.length === 5 ? shipsOntoBoard() : [];

    function attack(someone, somewhere) {
      someone.playerBoard.receiveAttack(somewhere);
    }
    return { playerBoard, playerShips, attack, shipsOntoBoard };
  }
}

export { playerFactory };
