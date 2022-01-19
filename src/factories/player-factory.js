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
        if ((someY, someX)) {
          someOne.receiveAttack(someY, someX);
          switchTurn();
        } else {
          let rando = Math.floor(Math.random() * 9);
          someOne.receiveAttack(rando, rando);
        }
      } else return false;
    };

    let shipsClone = { ...ships };
    while (prototype.fleet.length < 5) {
      for (let ship in shipsClone) {
        let rando = Math.floor(Math.random() * 9);
        prototype.randomAxis();
        if (prototype.placeShip(rando, rando, shipsClone[ship]) !== false) {
          delete shipsClone[ship];
        }
      }
    }

    return Object.assign({}, prototype, { attack, shipsClone });
  }
};

export { playerFactory, playerOneTurn, switchTurn };
