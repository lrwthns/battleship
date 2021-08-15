import { changeGridCellClass, freezeGrid } from "./dom-manipulation";

const attachEventListeners = (player, enemy) => {
  const computerGridContainer = document.querySelector('.grid-two');
  const messageBoard = document.querySelector('.message-board');
  computerGridContainer.addEventListener('click', (e) => {
    if (e.target.className === 'grid-two-cells') {
      let coordi = e.target.id.slice(9);
      const xCoor = coordi.charAt(0);
      const yCoor = coordi.slice(1);
      const freezeBoard = (isPlayerTurn, isEnemyTurn) => {
        enemy.board.isFrozen = isEnemyTurn;
        player.board.isFrozen = isPlayerTurn;
        freezeGrid(player, enemy);
      }
      player.launchAttack(enemy.board, xCoor, yCoor);
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
  })
};

export default attachEventListeners;