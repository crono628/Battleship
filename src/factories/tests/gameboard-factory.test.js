import { gameBoard } from '../gameboard-factory.js';
import { ships } from '../../components/ships.js';

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
