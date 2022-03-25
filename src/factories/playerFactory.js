import { ships } from './ships';
import gameboardFactory from './gameboardFactory';

const playerFactory = (name) => {
  let playerOneTurn = true;
  let computer = false;
  let fleet = [];
  let dockYard = { ...ships };

  const prototype = gameboardFactory();

  const handlePlacement = (boat, loc) => {
    if (boat !== undefined) {
      let sectionArr = [];
      for (let i = 0; i < boat.length; i++) {
        prototype.getDirection()
          ? sectionArr.push(loc + i)
          : sectionArr.push(loc + i * 10);
      }
      for (const choice in dockYard) {
        if (boat === dockYard[choice]) {
          if (prototype.checkEdge(boat, loc)) {
            prototype.placeShip(boat, loc);
            fleet.push({
              boat: boat.name,
              length: boat.length,
              loc: sectionArr,
            });
            delete dockYard[choice];
          }
        }
      }
    }
  };
  const togglePlayerOne = () => (playerOneTurn = !playerOneTurn);
  const toggleComputer = () => (computer = !computer);
  const handleComputerPlacement = () => {
    if (fleet.length === 0) {
      while (fleet.length < 5) {
        console.log('computer placement');
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
    } else if (fleet.length === 5) {
      console.log('done');
      return;
    } else {
      handleComputerPlacement();
    }
  };

  const attack = (someone, somewhere) => {
    someone.receiveAttack(somewhere);
  };

  return Object.assign({}, prototype, {
    name,
    fleet,
    dockYard,
    handlePlacement,
    handleComputerPlacement,
    toggleComputer,
    togglePlayerOne,
    attack,
  });
};

export default playerFactory;
