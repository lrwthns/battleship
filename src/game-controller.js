import { Gameboard, Player } from "./app-logic";
import { displayInitialElements } from "./dom-manipulation";

const gameController = () => {
  const player = Player('Player');
  const computer = Player('Computer', true);
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();
  playerBoard.placeShip('A', 1, true, 5);
  playerBoard.placeShip('D', 3, true, 4);
  playerBoard.placeShip('C', 2, false, 5);
  computerBoard.placeShip('A', 1, true, 5);
  computerBoard.placeShip('E', 4, true, 4);
  computerBoard.placeShip('B', 3, false, 5);
  displayInitialElements();
}

export default gameController;