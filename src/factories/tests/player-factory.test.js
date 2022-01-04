import { playerFactory } from '../player-factory.js';
import { ships } from '../../components/ships.js';

test('player has 5 ships', () => {
  const playerOne = playerFactory('human');
  playerOne.placeShip(0, 0, ships.battleship);
  playerOne.placeShip(1, 0, ships.carrier);
  playerOne.placeShip(2, 0, ships.cruiser);
  playerOne.placeShip(2, 0, ships.destroyer);
  playerOne.placeShip(3, 0, ships.destroyer);
  playerOne.placeShip(4, 0, ships.submarine);
  console.log(playerOne.fleet.find((x) => x.name == 'destroyer'));
  expect(playerOne.fleet.length).toBe(5);
});

// test('cpu has 5 ships placed randomly and legally', () => {
//   const cpuPlayer = playerFactory();

//   expect(
//     cpuPlayer.playerBoard.board.filter((item) => item.hasShip === true).length
//   ).toBe(17);
// });
