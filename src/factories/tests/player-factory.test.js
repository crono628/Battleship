import { playerFactory } from '../player-factory.js';
import { ships } from '../../components/ships.js';

// test('player has 5 ships', () => {
//   const playerOne = playerFactory('human');
//   playerOne.placeShip(10, ships.battleship);
//   playerOne.placeShip(20, ships.carrier);
//   playerOne.placeShip(30, ships.cruiser);
//   playerOne.placeShip(40, ships.destroyer);
//   playerOne.placeShip(50, ships.submarine);
//   console.log(playerOne.fleetCoordinates);
//   console.log(playerOne.board);
//   expect(playerOne.fleetCoordinates.length).toBe(5);
// });

test('player has 5 sunk ships individually and collectively', () => {
  const playerOne = playerFactory('human');
  playerOne.placeShip(10, ships.battleship);
  playerOne.placeShip(20, ships.carrier);
  playerOne.placeShip(30, ships.cruiser);
  playerOne.placeShip(40, ships.destroyer);
  playerOne.placeShip(50, ships.submarine);
  console.log(playerOne.getFleetCoordinates());

  expect(playerOne.getFleetCoordinates().length).toBe(5);
});

// test('cpu has 5 ships placed randomly and legally', () => {
//   const cpuPlayer = playerFactory();

//   expect(
//     cpuPlayer.playerBoard.board.filter((item) => item.hasShip === true).length
//   ).toBe(17);
// });
