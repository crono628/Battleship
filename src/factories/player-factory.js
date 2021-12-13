import { gameBoard } from './gameboard-factory.js';
import { shipFactory } from './ship-factory.js';
import { ships } from '../components/ships.js';

let playerOneTurn = true;

function playerFactory(human) {
  if (human) {
    const {
      loadBoard,
      placeShip,
      vertical,
      receiveAttack,
      getBoard,
      getFleetCoordinates,
      allShipsSunk,
    } = gameBoard();

    const attack = (someone, somewhere) => {
      someone.receiveAttack(somewhere);
    };
    return {
      attack,
      loadBoard,
      placeShip,
      vertical,
      receiveAttack,
      getBoard,
      getFleetCoordinates,
      allShipsSunk,
    };
    // } else {
    //   // this is the cpu controller
    //   const playerBoard = gameBoard();
    //   const playerShips = [];

    //   const shipsOntoBoard = () => {
    //     playerShips.forEach((ship) => {
    //       const edges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    //       const findSpots = playerBoard.board.filter(
    //         (spot) => spot.hasShip === false
    //       );

    //       const taken = ship.directions[randomizer(ship.directions)].some(
    //         (spot) => findSpots[randomizer(findSpots) + spot]
    //       );
    //       const overflow = ship.directions[randomizer(ship.directions)].some(
    //         (spot) => edges[(spot, spot + 1)]
    //       );
    //       if (!taken && !overflow) {
    //         playerBoard.placeShip(findSpots[randomizer(findSpots)], ship);
    //       }
    //     });
    //   };

    //   playerShips.length === 5 && playerBoard.board.length === 100
    //     ? shipsOntoBoard()
    //     : [];

    //   function randomizer(arr) {
    //     return Math.floor(Math.random() * arr.length);
    //   }

    //   const attack = (someone, somewhere) => {
    //     someone.playerBoard.receiveAttack(somewhere);
    //   };
    //   return { playerBoard, playerShips, attack };
  }
}

export { playerFactory };
