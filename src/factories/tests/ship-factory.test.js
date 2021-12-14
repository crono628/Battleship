import { shipFactory } from '../ship-factory.js';
import { ships } from '../../components/ships.js';

test('enough hits to sink', () => {
  let newShip = shipFactory(ships.destroyer);
  newShip.hit(0, 9);
  newShip.hit(1, 10);
  expect(newShip.sunk()).toBe(true);
});

test('not enough hits to sink', () => {
  let newShip = shipFactory(ships.destroyer);
  newShip.hit(0, 9);
  expect(newShip.sunk()).toBe(false);
});

test('ship has directions and length', () => {
  let newShip = shipFactory(ships.battleship);
  expect(newShip.directions()[0].length).toBe(4);
  expect(newShip.directions()[1].length).toBe(4);
  expect(newShip.directions()[1]).toEqual([0, 10, 20, 30]);
  expect(newShip.directions().length).toBe(2);
});
