import { shipFactory } from '../ship-factory.js';
import { ships } from '../../components/ships.js';

test('health is null array equal to ship length', () => {
  let newShip = shipFactory(ships[4]);
  expect(newShip.getHealth().length).toBe(5);
  expect(newShip.getHealth()).toStrictEqual([null, null, null, null, null]);
});

test('a hit anywhere will replace null with an X', () => {
  let newShip = shipFactory(ships[4]);
  newShip.hit(0);
  newShip.hit(3);
  expect(newShip.getHealth()).toStrictEqual(['x', null, null, 'x', null]);
});

test('enough hits will sink the ship', () => {
  let newShip = shipFactory(ships[4]);
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  newShip.hit(4);
  expect(newShip.sunk()).toBe(true);
});

test('not enough hits will not sink the ship', () => {
  let newShip = shipFactory(ships[4]);
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(4);
  expect(newShip.sunk()).toBe(false);
});
