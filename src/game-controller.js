import { Player } from "./app-logic";
import { displayInitialElements } from "./dom-manipulation";
import { changeGridCellClass, freezeGrid } from "./dom-manipulation";
import attachEventListeners from "./event-listeners";

const gameController = () => {
  const loop = (player, enemy, x, y) => {
    const messageBoard = document.querySelector('.message-board');
    const freezeBoard = (isPlayerTurn, isEnemyTurn) => {
      enemy.board.isFrozen = isEnemyTurn;
      player.board.isFrozen = isPlayerTurn;
      freezeGrid(player, enemy);
    }
    player.launchAttack(enemy.board, x, y);
    changeGridCellClass(player, enemy);
    freezeBoard(false, true);
    messageBoard.textContent = "Computer's turn!";
    if (enemy.board.areAllShipsSunk()) {
      freezeBoard(true, true);
      messageBoard.textContent = 'Player wins!';
    } else {
      setTimeout(() => {
        enemy.launchAttack(player.board);
        changeGridCellClass(player, enemy);
        freezeBoard(true, false);
        messageBoard.textContent = "Player's turn!";
        if (player.board.areAllShipsSunk()) {
          freezeBoard(true, true);
          messageBoard.textContent = 'Computer wins!';
        }
      }, 1500);
    }
  }
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
  attachEventListeners(human, computer, loop);

  return {
    human,
    computer
  }
}

export default gameController;