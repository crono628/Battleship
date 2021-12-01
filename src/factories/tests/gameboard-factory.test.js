import { gameBoard } from '../gameboard-factory.js';

test('100 items', () => {
  const newBoard = gameBoard();
  expect(newBoard.board.length).toBe(100);
});

test('horizontal is true', () => {
  const newBoard = gameBoard();
  expect(newBoard.horizontal).toBe(true);
});
