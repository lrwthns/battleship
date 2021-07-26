import { gameboard } from '../app-logic';

describe('gameboard factory function', () => {
  test('add new ship when placeShip is called', () => {
    gameboard.placeShip('A', 3, true, 4);
    expect(gameboard.ships.length).toBe(1);
    gameboard.placeShip('F', 5, false, 2);
    expect(gameboard.ships.length).toBe(2);
  });
  test('send hit function to the correct ship when receiveAttack is called', () => {
    gameboard.receiveAttack('A', 5);
    expect(gameboard.ships[0].hits).toEqual(['A5']);
    gameboard.receiveAttack('A', 6);
    expect(gameboard.ships[0].hits).toEqual(['A5', 'A6']);
    gameboard.placeShip('C', 3, false, 5);
    gameboard.receiveAttack('C', 3);
    expect(gameboard.ships[2].hits).toEqual(['C3']);
  });
  test('add coordinate to missedAttacks if receiveAttack finds no matching ship coordinates', () => {
    gameboard.receiveAttack('G', 6);
    expect(gameboard.missedAttacks).toEqual(['G6']);
    gameboard.receiveAttack('G', 5);
    expect(gameboard.missedAttacks).toEqual(['G6']);
  })
  
})