import createNewElement from "./dom-manipulation-helper";

const changeGridCellClass = (playerOne, playerTwo) => {
  const changeCell = (playerNum, coordinate, newClass) => {
    let id = `grid-${playerNum}-${coordinate}`;
    let cell = document.querySelector('#' + id);
    cell.classList.add(newClass);
  };
  // shows playerOne's occupied cells
  playerOne.board.ships.forEach(ship => {
    ship.coordi.forEach(coor => {
      changeCell('one', coor, 'occupied');
    })
  });
  const showsMissesAndHits = (player, playerNum) => {
    player.board.missedAttacks.forEach(miss => {
      changeCell(playerNum, miss, 'missed');
    });
    player.board.ships.forEach(ship => {
      ship.hits.forEach(hit => {
        changeCell(playerNum, hit, 'hit');
      });
    });
  }
  showsMissesAndHits(playerOne, 'one');
  showsMissesAndHits(playerTwo, 'two');  
};

const createGridCells = (container, className) => {
  let grid = createNewElement(container, className);
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let cellClassName = className + '-cells';
  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      let id = `${className}-${alphabet[j]}${i}`;
      createNewElement(grid, cellClassName, 'div', id);
    }
  }
  return grid;
}

const displayInitialElements = () => {
  const content = createNewElement(document.body, 'content');
  const contentHeader = createNewElement(content, 'content-header');
  contentHeader.textContent = 'Battleship';
  const contentBody = createNewElement(content, 'content-body');
  const messageBoardContainer = createNewElement(contentBody, 'message-board-container');
  const messageBoard = createNewElement(messageBoardContainer, 'message-board');
  messageBoard.textContent = "Player's turn!";
  const gridContainer = createNewElement(contentBody, 'grid-container');
  const gridOne = createGridCells(gridContainer, 'grid-one');
  const gridTwo = createGridCells(gridContainer, 'grid-two');
};

export {
  displayInitialElements,
  changeGridCellClass,
};

