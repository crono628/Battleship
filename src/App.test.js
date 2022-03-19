import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import shipFactory from './factories/shipFactory';
import gameboardFactory from './factories/gameboardFactory';
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
    let testProps = human.publicBoard.every((item) => {
      return item.hasShip === false, item.shotTaken === false;
    });
    expect(human.publicBoard.length).toBe(100);
    expect(testProps).toBe(true);
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
