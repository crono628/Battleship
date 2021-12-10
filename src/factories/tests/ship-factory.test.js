import { shipFactory } from '../ship-factory.js';
import { ships } from '../../components/ships.js';

test('health is null array equal to ship length', () => {
  let newShip = shipFactory(ships[4]);
  expect(newShip.getHealth().length).toBe(5);
  expect(newShip.getHealth()).toStrictEqual([
    { hitIndex: null },
    { hitIndex: null },
    { hitIndex: null },
    { hitIndex: null },
    { hitIndex: null },
  ]);
});

test('a hit will recorde the index and coordinate of the attack', () => {
  let newShip = shipFactory(ships[4]);
  newShip.hit(0, 50);
  newShip.hit(3, 53);
  expect(newShip.getHealth()).toEqual([
    { hitIndex: 50 },
    { hitIndex: null },
    { hitIndex: null },
    { hitIndex: 53 },
    { hitIndex: null },
  ]);
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

test('the ship has a name', () => {
  let newShip = shipFactory(ships[4]);
  expect(newShip.name).toBe('carrier');
});
