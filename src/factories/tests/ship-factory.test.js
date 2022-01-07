import { shipFactory } from '../ship-factory.js';
import { ships } from '../../components/ships.js';

test('enough hits to sink', () => {
  let newShip = shipFactory(ships.destroyer);
  newShip.hit(0, 0, 0);
  newShip.hit(1, 0, 1);
  expect(newShip.sunk()).toBe(true);
});

test('not enough hits to sink', () => {
  let newShip = shipFactory(ships.destroyer);
  newShip.hit(0, 9);
  expect(newShip.sunk()).toBe(false);
});
