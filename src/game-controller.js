import { Player } from "./app-logic";
import { displayInitialElements } from "./dom-manipulation";
import { changeGridCellClass } from "./dom-manipulation";
import attachEventListeners from "./event-listeners";

const gameController = () => {
  const human = Player('Player');
  const computer = Player('Computer', true);
  displayInitialElements();
  human.board.placeShip('A', 1, true, 5);
  human.board.placeShip('D', 4, true, 4);
  human.board.placeShip('C', 2, false, 5);
  computer.board.placeShip('A', 1, true, 5, true);
  computer.board.placeShip('E', 4, true, 4, true);
  computer.board.placeShip('B', 3, false, 5, true);
  changeGridCellClass(human, computer);
  attachEventListeners(human, computer);
  return {
    human,
    computer,
  }
}

export default gameController;