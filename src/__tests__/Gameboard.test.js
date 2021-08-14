/**
 * @jest-environment jsdom
 */

import { Gameboard } from '../app-logic';

describe('playerGameboard factory function', () => {
  let playerGameboard;
  beforeEach(() => {
    playerGameboard = Gameboard();
    playerGameboard.placeShip('A', 3, true, 4);
  });
  test('adds new ship when placeShip is called', () => {
    playerGameboard.placeShip('F', 5, false, 2);
    expect(playerGameboard.ships.length).toBe(2);
  });
  test('sends hit function to the correct ship when receiveAttack is called', () => {
    playerGameboard.receiveAttack('A', 5);
    expect(playerGameboard.ships[0].hits).toEqual(['A5']);
    playerGameboard.receiveAttack('A', 6);
    expect(playerGameboard.ships[0].hits).toEqual(['A5', 'A6']);
    playerGameboard.placeShip('C', 3, false, 5);
    playerGameboard.receiveAttack('C', 3);
    expect(playerGameboard.ships[1].hits).toEqual(['C3']);
  });
  test('adds coordinate to missedAttacks if receiveAttack finds no matching ship coordinates', () => {
    playerGameboard.receiveAttack('G', 6);
    expect(playerGameboard.missedAttacks).toEqual(['G6']);
    playerGameboard.receiveAttack('A', 5);
    expect(playerGameboard.missedAttacks).toEqual(['G6']);
  });
  test('reports if all ships are sunk', () => {
    playerGameboard.placeShip('D', 5, false, 3);
    playerGameboard.receiveAttack('D', 5);
    playerGameboard.receiveAttack('A', 3);
    playerGameboard.receiveAttack('A', 4);
    expect(playerGameboard.areAllShipsSunk()).toBe(false);
    playerGameboard.receiveAttack('E', 5);
    playerGameboard.receiveAttack('F', 5);
    playerGameboard.receiveAttack('A', 5);
    playerGameboard.receiveAttack('A', 6);
    expect(playerGameboard.areAllShipsSunk()).toBe(true);
  })
})