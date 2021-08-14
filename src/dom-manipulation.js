import createNewElement from "./dom-manipulation-helper";

const changeGridCellClass = (playerOne, playerTwo) => {
  const changeCell = (playerNumber, coordinate, newClass) => {
    let id = `grid-${playerNumber}-${coordinate}`;
    let cell = document.querySelector('#' + id);
    cell.classList.add(newClass);
  };
  // shows playerOne's occupied cells
  playerOne.board.ships.forEach(ship => {
    ship.coordi.forEach(coor => {
      changeCell('one', coor, 'occupied');
    })
  });
  // shows playerTwo's misses on playerOne's board
  playerOne.board.missedAttacks.forEach(miss => {
    changeCell('one', miss, 'missed');
  });
  // shows playerOne's misses on playerTwo's board
  playerTwo.board.missedAttacks.forEach(miss => {
    changeCell('two', miss, 'missed');
  });
  // shows playerOne's hit coordinates on its board
  playerOne.board.ships.forEach(ship => {
    ship.hits.forEach(hit => {
      changeCell('one', hit, 'hit');
    });
  });
  // shows playerTwo's hit coordinates on its board
  playerTwo.board.ships.forEach(ship => {
    ship.hits.forEach(hit => {
      changeCell('two', hit, 'hit');
    });
  });
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
  messageBoard.textContent = "You fired a shot to playerTwo's waters and.. it's a miss!";
  const gridContainer = createNewElement(contentBody, 'grid-container');
  const gridOne = createGridCells(gridContainer, 'grid-one');
  const gridTwo = createGridCells(gridContainer, 'grid-two');
};

export {
  displayInitialElements,
  changeGridCellClass,
};

