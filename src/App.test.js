import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import shipFactory from './factories/shipFactory';

describe('ship factory', () => {
  let threes;
  let twos;
  beforeEach(() => {
    threes = shipFactory(3, [0, 10, 20]);
    twos = shipFactory(2, [42, 43]);
  });
  it("takes hits and doesn't sink", () => {
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
