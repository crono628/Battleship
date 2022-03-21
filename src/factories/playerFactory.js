import { ships } from './ships';
import gameboardFactory from './gameboardFactory';

const playerFactory = (name) => {
  let playerOneTurn = true;
  let computer = false;
  let fleet = [];
  let dockYard = { ...ships };
  const prototype = gameboardFactory();

  const handlePlacement = (boat, loc) => {
    for (const choice in dockYard) {
      if (boat === dockYard[choice]) {
        if (prototype.checkEdge(boat, loc)) {
          prototype.placeShip(boat, loc);
          fleet.push({
            boat: boat.name,
            length: boat.length,
            loc,
          });
          delete dockYard[choice];
        }
      }
    }
  };

  const toggleComputer = () => (computer = !computer);
  const handleComputerPlacement = () => {
    if (computer) {
      while (fleet.length < 5) {
        for (const boat in dockYard) {
          let randomNum = Math.floor(Math.random() * 99);
          let randomComputerAxis = Math.random() < 0.5;
          if (randomComputerAxis) {
            prototype.toggleHorizontal();
          }
          if (
            prototype.checkShipPlacement(dockYard[boat], randomNum) &&
            prototype.checkEdge(dockYard[boat], randomNum)
          ) {
            handlePlacement(dockYard[boat], randomNum);
          }
        }
      }
    }
    if (fleet.length === 5) {
      return;
    } else {
      handleComputerPlacement();
    }
  };

  const attack = (someone, somewhere) => {};

  return Object.assign({}, prototype, {
    name,
    fleet,
    dockYard,
    handlePlacement,
    handleComputerPlacement,
    toggleComputer,
  });
};

export default playerFactory;
