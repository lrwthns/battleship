import { Gameboard, Player } from "./app-logic";
import { displayInitialElements } from "./dom-manipulation";

const gameController = () => {
  const player = Player('Player');
  const computer = Player('Computer', true);
  displayInitialElements();
  player.board.placeShip('A', 1, true, 5);
  player.board.placeShip('D', 4, true, 4);
  player.board.placeShip('C', 2, false, 5);
  computer.board.placeShip('A', 1, true, 5, true);
  computer.board.placeShip('E', 4, true, 4, true);
  computer.board.placeShip('B', 3, false, 5, true);

  return {
    player,
    computer,
  }
}

export default gameController;