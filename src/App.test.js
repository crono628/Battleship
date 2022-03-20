import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import shipFactory from './factories/shipFactory';
import gameboardFactory from './factories/gameboardFactory';
import playerFactory from './factories/playerFactory';
import { ships } from './factories/ships';

describe('ship factory', () => {
  let threes;
  let twos;
  beforeEach(() => {
    threes = shipFactory(3, [0, 10, 20]);
    twos = shipFactory(2, [42, 43]);
  });
  it("takes some hits and doesn't sink", () => {
    threes.hit(10);
    threes.hit(20);
    expect(threes.publicHealth).toEqual([null, 'x', 'x']);
    expect(threes.sunk()).toBe(false);
  });
  it('takes enough hits and sinks', () => {
    threes.hit(0);
    threes.hit(10);
    threes.hit(20);
    twos.hit(42);
    twos.hit(43);
    expect(threes.sunk()).toBe(true);
    expect(twos.sunk()).toBe(true);
  });
});

describe('gameboard factory', () => {
  let human;
  let computer;
  beforeEach(() => {
    human = gameboardFactory();
    computer = gameboardFactory();
  });
  it('produces 100 cells with hasShip and shotTaken properties', () => {
    expect(human.publicBoard.length).toBe(100);
    expect(human.publicBoard.every((item) => item.hasShip === false)).toBe(
      true
    );
    expect(human.publicBoard.every((item) => item.shotTaken === false)).toBe(
      true
    );
  });
  it('receives attacks', () => {
    human.receiveAttack(10);
    expect(human.publicBoard[10].shotTaken).toBe(true);
    expect(human.publicBoard[11].shotTaken).toBe(false);
    expect(computer.publicBoard[10].shotTaken).toBe(false);
  });
  it('knows where horizontal edges are', () => {
    expect(human.checkEdge(ships.carrier, 10)).toBe(true);
    expect(human.checkEdge(ships.battleship, 17)).toBe(false);
    expect(human.checkEdge(ships.cruiser, 88)).toBe(false);
  });
  it('knows where vertical edges are', () => {
    human.toggleHorizontal();
    expect(human.checkEdge(ships.carrier, 0)).toBe(true);
    expect(human.checkEdge(ships.battleship, 99)).toBe(false);
    expect(human.checkEdge(ships.cruiser, 90)).toBe(false);
  });
  it('places ship horizontally and does not overlap other ships', () => {
    human.placeShip(ships.carrier, 0);
    human.placeShip(ships.battleship, 3);
    expect(human.publicBoard[2].hasShip).toBe(true);
    expect(human.publicBoard[5].hasShip).toBe(false);
    expect(computer.publicBoard[2].hasShip).toBe(false);
  });
  it('places ship vertically and does not overlap other ships', () => {
    human.toggleHorizontal();
    human.placeShip(ships.carrier, 0);
    human.placeShip(ships.battleship, 30);
    expect(human.publicBoard[20].hasShip).toBe(true);
    expect(human.publicBoard[50].hasShip).toBe(false);
    expect(computer.publicBoard[20].hasShip).toBe(false);
  });
});

describe('player factory', () => {
  let human;
  let computer;
  beforeEach(() => {
    human = playerFactory('human');
    computer = playerFactory('computer');
  });
  it('inherits gameboard', () => {
    expect(human.publicBoard.length).toBe(100);
    expect(computer.publicBoard.length).toBe(100);
  });
  it('deletes ship from dockyard and adds to fleet after placeShip', () => {
    human.handlePlacement(human.dockYard.carrier, 10);
    human.handlePlacement(human.dockYard.carrier, 20);

    expect(human.fleet.length).toBe(1);
    expect(Object.keys(human.dockYard).length).toBe(4);
  });
  it('places all boats for the computer randomly and legally', () => {
    computer.toggleComputer();
    computer.handleComputerPlacement();
    let boardHasShip = computer.publicBoard.filter((spot) => spot.hasShip);
    expect(Object.keys(computer.dockYard).length).toBe(0);
    expect(computer.fleet.length).toBe(5);
    expect(boardHasShip.length).toBe(17);
  });
});
