import { playerFactory } from '../player-factory.js';
import { findShip } from '../../helpers/find-ship.js';

test('player has 5 ships', () => {
  const playerOne = playerFactory('human');
  expect(playerOne.playerShips.length).toBe(5);
});

test('cpu has 5 ships placed randomly', () => {
  const cpuPlayer = playerFactory();

  expect(cpuPlayer.playerBoard.board.map((item) => item.hasShip).length).toBe(
    100
  );
});

test('ship placed horizontal, is attacked, shows attack in players ship array', () => {
  const playerOne = playerFactory('human');
  const playerTwo = playerFactory('opponent');
  playerTwo.playerBoard.placeShip(55, playerTwo.playerShips[4]);
  playerOne.attack(playerTwo, 55);
  playerTwo.playerShips[4].hit(
    findShip(
      playerTwo.playerBoard.board,
      playerTwo.playerShips[4].name,
      playerTwo.playerBoard.board[55]
    )
  );
  expect(playerTwo.playerBoard.board[55].shotTaken).toBe(true);
  expect(playerTwo.playerBoard.board[55].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[56].shotTaken).toBe(false);
  expect(playerTwo.playerBoard.board[56].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[57].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[58].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[59].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[60].hasShip).toBe(false);
  expect(playerTwo.playerShips[4].getHealth()).toStrictEqual([
    'x',
    null,
    null,
    null,
    null,
  ]);
});

test('ship placed vertical, is attacked, shows attack in players ship array', () => {
  const playerOne = playerFactory('human');
  const playerTwo = playerFactory('opponent');
  playerTwo.playerBoard.vertical();
  playerTwo.playerBoard.placeShip(55, playerTwo.playerShips[4]);
  playerOne.attack(playerTwo, 65);
  playerTwo.playerShips[4].hit(
    findShip(
      playerTwo.playerBoard.board,
      playerTwo.playerShips[4].name,
      playerTwo.playerBoard.board[65]
    )
  );
  expect(playerTwo.playerBoard.board[55].shotTaken).toBe(false);
  expect(playerTwo.playerBoard.board[56].shotTaken).toBe(false);
  expect(playerTwo.playerBoard.board[65].shotTaken).toBe(true);
  expect(playerTwo.playerBoard.board[55].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[56].hasShip).toBe(false);
  expect(playerTwo.playerBoard.board[75].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[85].hasShip).toBe(true);
  expect(playerTwo.playerBoard.board[95].hasShip).toBe(true);
  expect(playerTwo.playerShips[4].getHealth()).toStrictEqual([
    null,
    'x',
    null,
    null,
    null,
  ]);
});
