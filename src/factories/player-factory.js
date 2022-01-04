import { autoShip } from '../helpers/auto-ship.js';
import { gameBoardFactory } from './gameboard-factory.js';
import { ships } from '../components/ships.js';

let playerOneTurn = true;
let switchTurn = () => (playerOneTurn = !playerOneTurn);

const playerFactory = (human) => {
  if (human) {
    let prototype = gameBoardFactory();
    let shipsClone = { ...ships };
    const attack = (someOne, someY, someX) => {
      if (playerOneTurn) {
        someOne.receiveAttack(someY, someX);
        switchTurn();
      } else console.log('not human turn');
    };
    return Object.assign({}, prototype, { attack, shipsClone });
  } else {
    let prototype = gameBoardFactory();
    const attack = (someOne, someY, someX) => {
      if (!playerOneTurn) {
        someOne.receiveAttack(someY, someX);
        switchTurn();
      } else console.log('not cpu turn');
    };

    let shipsClone = { ...ships };
    for (let ship in shipsClone) {
      // prototype.placeShip(randomTwo, randomOne, ship)
    }

    return Object.assign({}, prototype, { attack, shipsClone });
  }
};

export { playerFactory };
