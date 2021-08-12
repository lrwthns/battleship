/**
 * @jest-environment jsdom
 */

import { Ship } from '../app-logic';

describe('Ship factory function', () => {
  let submarine;
  let carrier;
  beforeEach(() => {
    submarine = Ship('A', 1, true, 3);
    carrier = Ship('C', 3, false, 5);
  });
  test('accepts a hit', () => {
    submarine.hit('A1');
    expect(submarine.hits).toEqual(['A1']);
    submarine.hit('A2');
    expect(submarine.hits).toEqual(['A1', 'A2']);
    carrier.hit('D3');
    expect(carrier.hits).toEqual(['D3']);
    carrier.hit('E3');
    expect(carrier.hits).toEqual(['D3', 'E3']);
  });
  test('shows that the boat is sunk', () => {
    submarine.hit('A2');
    expect(submarine.isSunk()).toBe(false);
    submarine.hit('A1');
    submarine.hit('A3');
    expect(submarine.isSunk()).toBe(true);
    carrier.hit('F3');
    carrier.hit('C3');
    expect(carrier.isSunk()).toBe(false);
    carrier.hit('D3');
    carrier.hit('E3');
    carrier.hit('G3');
    expect(carrier.isSunk()).toBe(true);
  })
})