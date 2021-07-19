import { ship } from '../app-logic';

describe('ship factory function', () => {
  let patrolShip;
  beforeEach(() => {
    patrolShip = ship([31, 32, 33]);
  });
  test('accepts a hit', () => {
    patrolShip.hit(33);
    expect(patrolShip.hits).toEqual([33]);
    patrolShip.hit(32);
    expect(patrolShip.hits).toEqual([33, 32]);
    patrolShip.hit(45);
    expect(patrolShip.hits).toEqual([33, 32]);
  });
  test('shows that the boat is sunk', () => {
    patrolShip.hit(32);
    expect(patrolShip.isSunk()).toBe(false);
    patrolShip.hit(31);
    patrolShip.hit(33);
    expect(patrolShip.isSunk()).toBe(true);
  })
})