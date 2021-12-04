import { gameBoard } from '../gameboard-factory.js';
import { shipFactory } from '../ship-factory.js';
import { ships } from '../../components/ships.js';
import { findShip } from '../../helpers/find-ship.js';

test('100 items', () => {
  const newBoard = gameBoard();
  expect(newBoard.board.length).toBe(100);
});

test('place carrier horizontal', () => {
  const newBoard = gameBoard();
  newBoard.placeShip(15, ships[4]);
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[16].hasShip).toBe(true);
  expect(newBoard.board[17].hasShip).toBe(true);
  expect(newBoard.board[18].hasShip).toBe(true);
  expect(newBoard.board[19].hasShip).toBe(true);
});

test('place carrier vertical', () => {
  const newBoard = gameBoard();
  newBoard.vertical();
  newBoard.placeShip(5, ships[4]);
  expect(newBoard.board[5].hasShip).toBe(true);
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[25].hasShip).toBe(true);
  expect(newBoard.board[35].hasShip).toBe(true);
  expect(newBoard.board[45].hasShip).toBe(true);
});

test('receive attack', () => {
  const newBoard = gameBoard();
  newBoard.receiveAttack(5);
  expect(newBoard.board[5].shotTaken).toBe(true);
});

test('place carrier horizontal and take a hit', () => {
  const newCarrier = shipFactory(ships[4]);
  const newBoard = gameBoard();
  newBoard.placeShip(15, newCarrier);
  newBoard.receiveAttack(16);
  newCarrier.hit(findShip(newBoard.board, newCarrier.name, newBoard.board[25]));
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[16].hasShip).toBe(true);
  expect(newBoard.board[17].hasShip).toBe(true);
  expect(newBoard.board[18].hasShip).toBe(true);
  expect(newBoard.board[19].hasShip).toBe(true);
  expect(newBoard.board[16].shotTaken).toBe(true);
});

test('place carrier vertical, take a hit and not sink', () => {
  const newCarrier = shipFactory(ships[4]);
  const newBoard = gameBoard();
  newBoard.vertical();
  newBoard.placeShip(5, ships[4]);
  newBoard.receiveAttack(25);
  newCarrier.hit(findShip(newBoard.board, newCarrier.name, newBoard.board[25]));
  expect(newBoard.board[5].hasShip).toBe(true);
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[25].hasShip).toBe(true);
  expect(newBoard.board[35].hasShip).toBe(true);
  expect(newBoard.board[45].hasShip).toBe(true);
  expect(newBoard.board[25].shotTaken).toBe(true);
  expect(newCarrier.sunk()).toBe(false);
});

test('place carrier horizontal and get sunk', () => {
  const newCarrier = shipFactory(ships[4]);
  const newBoard = gameBoard();
  newBoard.placeShip(15, newCarrier);
  newBoard.receiveAttack(15);
  newBoard.receiveAttack(16);
  newBoard.receiveAttack(17);
  newBoard.receiveAttack(18);
  newBoard.receiveAttack(19);
  newCarrier.hit(0);
  newCarrier.hit(1);
  newCarrier.hit(2);
  newCarrier.hit(3);
  newCarrier.hit(4);
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[16].hasShip).toBe(true);
  expect(newBoard.board[17].hasShip).toBe(true);
  expect(newBoard.board[18].hasShip).toBe(true);
  expect(newBoard.board[19].hasShip).toBe(true);
  expect(newBoard.board[16].shotTaken).toBe(true);
  expect(newCarrier.sunk()).toBe(true);
});

test('take shots and miss a placed ship', () => {
  const newBoard = gameBoard();
  newBoard.placeShip(15, ships[4]);
  newBoard.receiveAttack(25);
  newBoard.receiveAttack(26);
  newBoard.receiveAttack(27);
  newBoard.receiveAttack(28);
  newBoard.receiveAttack(29);
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[16].hasShip).toBe(true);
  expect(newBoard.board[17].hasShip).toBe(true);
  expect(newBoard.board[18].hasShip).toBe(true);
  expect(newBoard.board[19].hasShip).toBe(true);
  expect(newBoard.board[25].shotTaken).toBe(true);
  expect(newBoard.board[26].shotTaken).toBe(true);
  expect(newBoard.board[27].shotTaken).toBe(true);
  expect(newBoard.board[28].shotTaken).toBe(true);
  expect(newBoard.board[29].shotTaken).toBe(true);
});

test('all ships sunk', () => {
  const newCarrier = shipFactory(ships[4]);
  const newBoard = gameBoard();
  newBoard.placeShip(15, newCarrier);
  newBoard.receiveAttack(15);
  newBoard.receiveAttack(16);
  newBoard.receiveAttack(17);
  newBoard.receiveAttack(18);
  newBoard.receiveAttack(19);
  newCarrier.hit(0);
  newCarrier.hit(1);
  newCarrier.hit(2);
  newCarrier.hit(3);
  newCarrier.hit(4);
  expect(newBoard.board[15].hasShip).toBe(true);
  expect(newBoard.board[16].hasShip).toBe(true);
  expect(newBoard.board[17].hasShip).toBe(true);
  expect(newBoard.board[18].hasShip).toBe(true);
  expect(newBoard.board[19].hasShip).toBe(true);
  expect(newBoard.board[16].shotTaken).toBe(true);
  expect(newCarrier.sunk()).toBe(true);
  expect(newBoard.allShipsSunk()).toBe(true);
});
