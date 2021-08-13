const attachEventListeners = (player, enemy) => {
  const computerGridContainer = document.querySelector('.grid-two');
  computerGridContainer.addEventListener('click', (e) => {
    if (e.target.className === 'grid-two-cells') {
      let coordi = e.target.id.slice(9);
      const xCoor = coordi.charAt(0);
      const yCoor = coordi.slice(1);
      player.launchAttack(enemy.board, xCoor, yCoor);
    }
  })
};

export default attachEventListeners;