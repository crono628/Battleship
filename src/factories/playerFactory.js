import { ships } from './ships';
import gameboardFactory from './gameboardFactory';

const playerOneTurn = true;
const computer = false;

const playerFactory = (name) => {
  let fleet = [];
  let dockYard = { ...ships };
  const prototype = gameboardFactory();

  const handlePlacement = (boat, loc) => {
    for (const choice in dockYard) {
      if (boat === dockYard[choice]) {
        prototype.placeShip(boat, loc);
        fleet.push(boat);

        delete dockYard[choice];
      }
    }
  };

  // if (name !== 'computer') {
  //   for (let boat in dockYard) {
  //     fleet.push(dockYard[boat]);
  //   }
  // } else {
  //   while (fleet.length < 5) {
  //     let randomBool = Math.random() < 0.5;
  //     for (let boat in dockYard) {
  //     }
  //     if (randomBool) {
  //       prototype.toggleHorizontal();
  //       prototype.placeShip();
  //     } else {
  //       prototype.placeShip();
  //     }
  //   }
  // }

  return Object.assign({}, prototype, {
    name,
    fleet,
    dockYard,
    handlePlacement,
  });
};

export default playerFactory;
