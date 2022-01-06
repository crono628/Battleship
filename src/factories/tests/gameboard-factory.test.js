import { ships } from '../../components/ships.js';
import { gameBoardFactory } from '../gameboard-factory.js';

test('place carrier horizontal', () => {
  const newBoard = gameBoardFactory();
  newBoard.placeShip(3, 0, ships.carrier);
  expect(newBoard.board[3][0].hasShip).toBe(true);
  expect(newBoard.board[3][1].hasShip).toBe(true);
  expect(newBoard.board[3][2].hasShip).toBe(true);
  expect(newBoard.board[3][3].hasShip).toBe(true);
  expect(newBoard.board[3][4].hasShip).toBe(true);
  expect(newBoard.board[3][5].hasShip).toBe(false);
});

test('place carrier toggleAxis', () => {
  const newBoard = gameBoardFactory();
  newBoard.toggleAxis();
  newBoard.placeShip(0, 5, ships.carrier);
  expect(newBoard.board[0][5].hasShip).toBe(true);
  expect(newBoard.board[1][5].hasShip).toBe(true);
  expect(newBoard.board[2][5].hasShip).toBe(true);
  expect(newBoard.board[3][5].hasShip).toBe(true);
  expect(newBoard.board[4][5].hasShip).toBe(true);
  expect(newBoard.board[5][5].hasShip).toBe(false);
});

test('receive attack', () => {
  const newBoard = gameBoardFactory();
  newBoard.receiveAttack(5, 0);
  expect(newBoard.board[5][0].shotTaken).toBe(true);
  expect(newBoard.board[5][0].hasShip).toBe(false);
});

test('place carrier horizontal and take a hit', () => {
  const newBoard = gameBoardFactory();
  newBoard.placeShip(3, 0, ships.carrier);
  newBoard.receiveAttack(3, 1);
  expect(newBoard.board[3][0].hasShip).toBe(true);
  expect(newBoard.board[3][1].shotTaken).toBe(true);
  expect(newBoard.board[3][2].shotTaken).toBe(false);
});

test('place carrier vertical, take a hit and not sink', () => {
  const newBoard = gameBoardFactory();
  newBoard.toggleAxis();
  newBoard.placeShip(0, 5, ships.carrier);
  newBoard.receiveAttack(1, 5);
  let carrier = newBoard.fleet.find((x) => x.name == 'carrier');
  expect(newBoard.board[1][5].hasShip).toBe(true);
  expect(newBoard.board[1][5].shotTaken).toBe(true);
  expect(carrier.functions.sunk()).toBe(false);
});

test('place carrier vertical, get sunk individually and collectively', () => {
  const newBoard = gameBoardFactory();
  newBoard.toggleAxis();
  newBoard.placeShip(0, 5, ships.carrier);
  newBoard.receiveAttack(0, 5);
  newBoard.receiveAttack(1, 5);
  newBoard.receiveAttack(2, 5);
  newBoard.receiveAttack(3, 5);
  newBoard.receiveAttack(4, 5);
  let carrier = newBoard.fleet.find((x) => x.name == 'carrier');
  expect(newBoard.board[0][5].hasShip).toBe(true);
  expect(newBoard.board[4][5].hasShip).toBe(true);
  expect(newBoard.board[0][5].shotTaken).toBe(true);
  expect(newBoard.board[4][5].shotTaken).toBe(true);
  expect(carrier.functions.sunk()).toBe(true);
  expect(newBoard.allSunk()).toBe(true);
});

test('ships cannot be placed over one another', () => {
  const newBoard = gameBoardFactory();
  newBoard.placeShip(0, 0, ships.cruiser);
  newBoard.placeShip(0, 2, ships.destroyer);
  newBoard.toggleAxis();
  newBoard.placeShip(0, 0, ships.submarine);
  expect(newBoard.board[1][0].hasShip).toBe(false);
  expect(newBoard.board[0][2].hasShip).toBe(true);
  expect(newBoard.board[0][0].hasShip).toBe(true);
  expect(newBoard.board[0][2].shipName).toBe('cruiser');
  expect(newBoard.board[0][3].hasShip).toBe(false);
});

test('ships will fit on the board', () => {
  const newBoard = gameBoardFactory();
  newBoard.placeShip(3, 6, ships.carrier);
  expect(newBoard.board[3][8].hasShip).toBe(false);
});

test('cannot place 2 of the same ship', () => {
  const newBoard = gameBoardFactory();
  newBoard.placeShip(0, 0, ships.cruiser);
  newBoard.placeShip(1, 0, ships.cruiser);
  newBoard.toggleAxis();
  newBoard.placeShip(2, 0, ships.cruiser);
  newBoard.placeShip(3, 0, ships.battleship);
  expect(newBoard.board[0][0].hasShip).toBe(true);
  expect(newBoard.board[1][0].hasShip).toBe(false);
  expect(newBoard.board[2][0].hasShip).toBe(false);
  expect(newBoard.board[3][0].hasShip).toBe(true);
  expect(newBoard.board[4][0].hasShip).toBe(true);
});
