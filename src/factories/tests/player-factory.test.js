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
  expect(playerOne.fleet.length).toBe(5);
});

test('cpu has 5 ships placed legally and randomly (vertical and horizontal) ', () => {
  const cpuPlayer = playerFactory();
  expect(cpuPlayer.fleet.length).toBe(5);
});

test('player and cpu take turns attacking', () => {
  const playerOne = playerFactory('human');
  const cpu = playerFactory();
  playerOne.placeShip(0, 0, playerOne.shipsClone.carrier);
  cpu.attack(playerOne, 0, 0);
  expect(cpu.attack(playerOne, 0, 0)).toBe(false);
});
