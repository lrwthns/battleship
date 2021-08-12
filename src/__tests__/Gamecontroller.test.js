/**
 * @jest-environment jsdom
 */

import gameController from "../game-controller";

describe('gameController', () => {
  let newGame;
  beforeEach(() => {
    newGame = gameController();
  });
  test('adds ship coordinates to gameboard.ships', () => {
    expect(newGame.human.board.ships.length).toBeGreaterThan(0);
    expect(newGame.computer.board.ships.length).toBeGreaterThan(0);
  });
})