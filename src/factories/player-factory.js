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

    const shipsOntoBoard = () => {
      const edges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

      playerShips.forEach((ship) => {
        let findSpot = playerBoard.board.filter(
          (spot) => spot.hasShip === false
        );
        let goodSpot = findSpot[Math.floor(Math.random() * findSpot.length)];
        if (edgeCheck(ship, edges, 54)) {
          playerBoard.placeShip(goodSpot.id, ship);
        }
      });
    };

    playerShips.length === 5 && playerBoard.board.length === 100
      ? shipsOntoBoard()
      : [];

    function edgeCheck(boat, arr, coordinate) {
      const range = { min: boat.length, max: coordinate + boat.length };

      let result = arr.some(function (num) {
        return num >= this.min && num <= this.max;
      }, range);

      return result;
    }

    const attack = (someone, somewhere) => {
      someone.playerBoard.receiveAttack(somewhere);
    };
    return { playerBoard, playerShips, attack, edgeCheck };
  }
}

export { playerFactory };
