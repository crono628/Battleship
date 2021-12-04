import { playerFactory } from '../player-factory.js';

test('player has 5 ships', () => {
  const playerOne = playerFactory();
  expect(playerOne.playerShips.length).toBe(5);
});

test('ship place horizontal and is attacked', () => {
  const playerOne = playerFactory();
  const playerTwo = playerFactory();
  playerTwo.playerBoard.placeShip(55, playerTwo.playerShips[4]);
  playerOne.attack(playerTwo, 55);
  expect(playerTwo.playerShips[4].getHealth().length).toBe(5);
  expect(playerTwo.playerBoard.board[55].shotTaken).toBe(true);
  expect(playerTwo.playerBoard.board[55].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[56].shotTaken).toBe(false);
  expect(playerTwo.playerBoard.board[56].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[57].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[58].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[59].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[60].hasShip).toBe(false);
});

test('ship place vertical and is attacked', () => {
  const playerOne = playerFactory();
  const playerTwo = playerFactory();
  playerTwo.playerBoard.vertical();
  playerTwo.playerBoard.placeShip(55, playerTwo.playerShips[4]);
  playerOne.attack(playerTwo, 65);
  expect(playerTwo.playerShips[4].getHealth().length).toBe(5);
  expect(playerTwo.playerBoard.board[55].shotTaken).toBe(false);
  expect(playerTwo.playerBoard.board[56].shotTaken).toBe(false);
  expect(playerTwo.playerBoard.board[65].shotTaken).toBe(true);
  expect(playerTwo.playerBoard.board[55].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[56].hasShip).toBe(false);
  expect(playerTwo.playerBoard.board[75].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[85].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[95].hasShip).toBe(true);
});
