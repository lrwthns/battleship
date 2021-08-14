import { changeGridCellClass } from "./dom-manipulation";

const attachEventListeners = (player, enemy) => {
  const computerGridContainer = document.querySelector('.grid-two');
  computerGridContainer.addEventListener('click', (e) => {
    if (e.target.className === 'grid-two-cells') {
      let coordi = e.target.id.slice(9);
      const xCoor = coordi.charAt(0);
      const yCoor = coordi.slice(1);
      player.launchAttack(enemy.board, xCoor, yCoor);
      enemy.launchAttack(player.board);
      //call changegridcellcalls here?
      changeGridCellClass(player, enemy);
      console.log(player.board.ships);
      
    }
  })
};

export default attachEventListeners;