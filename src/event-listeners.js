import { changeGridCellClass } from "./dom-manipulation";

const attachEventListeners = (player, enemy) => {
  const computerGridContainer = document.querySelector('.grid-two');
  const messageBoard = document.querySelector('.message-board');
  computerGridContainer.addEventListener('click', (e) => {
    if (e.target.className === 'grid-two-cells') {
      let coordi = e.target.id.slice(9);
      const xCoor = coordi.charAt(0);
      const yCoor = coordi.slice(1);
      player.launchAttack(enemy.board, xCoor, yCoor);
      changeGridCellClass(player, enemy);
      messageBoard.textContent = "Computer's turn!";
      if (enemy.board.areAllShipsSunk()) {
        messageBoard.textContent = 'Player wins!';
        //stop the game
      } else {
        setTimeout(() => {
          enemy.launchAttack(player.board);
          changeGridCellClass(player, enemy);
          messageBoard.textContent = "Player's turn!";
          if (player.board.areAllShipsSunk()) {
            messageBoard.textContent = 'Computer wins!';
            //stop the game
          }
        }, 1000);
      }
      // add delay and freeze the grid
      

    }
  })
};

export default attachEventListeners;