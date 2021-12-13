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
  newShip.hit(0, 15);
  expect(newShip.sunk()).toBe(false);
  expect(newShip.showHealth()).toEqual([{ hitIndex: 15 }, { hitIndex: null }]);
});

test('ship has directions', () => {
  let newShip = shipFactory(ships.battleship);
  expect(newShip.getDirections()[0].length).toBe(4);
  expect(newShip.getDirections()[1].length).toBe(4);
  expect(newShip.getDirections()[1]).toEqual([0, 10, 20, 30]);
  expect(newShip.getDirections().length).toBe(2);
});

test('ship has length, health', () => {
  let newShip = shipFactory(ships.battleship);
  expect(newShip.getLength()).toBe(4);
  expect(newShip.showHealth()).toEqual([
    { hitIndex: null },
    { hitIndex: null },
    { hitIndex: null },
    { hitIndex: null },
  ]);
});
