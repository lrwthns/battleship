import createNewElement from "./dom-manipulation-helper";

const changeGridCellClass = () => {
  
}

const createGridCells = (container, className, cellClassName) => {
  let times = 100;
  let grid = createNewElement(container, className);
  const createSingleCell = () => {
    const singleCell = createNewElement(grid, cellClassName);
    return singleCell;
  }
  while (times--) {
    createSingleCell();
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
  messageBoard.textContent = "You fired a shot to enemy's waters and.. it's a miss!";
  const gridContainer = createNewElement(contentBody, 'grid-container');
  const gridOne = createGridCells(gridContainer, 'grid-one', 'grid-one-cells');
  const gridTwo = createGridCells(gridContainer, 'grid-two', 'grid-two-cells');
};

export {
  displayInitialElements,
};

