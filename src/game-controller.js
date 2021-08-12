import { Gameboard, Player } from "./app-logic";
import { displayInitialElements } from "./dom-manipulation";
import { changeGridCellClass } from "./dom-manipulation";

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
  for (let i = 0; i < human.board.ships.length; i++) {
    for (let j = 0; j < human.board.ships[i].coordi.length; j++) {
      let id = `grid-one-${human.board.ships[i].coordi[j]}`;
      changeGridCellClass(id, false, false, true);
    }
  }
  return {
    human,
    computer,
  }
}

export default gameController;