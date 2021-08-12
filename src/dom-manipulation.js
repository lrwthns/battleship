import createNewElement from "./dom-manipulation-helper";

const changeGridCellClass = () => {
  
}

const createGridCells = (container, className) => {
  let grid = createNewElement(container, className);
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const createRow = (letter) => {
    let cellClassName = className + '-cells';
    for (let i = 1; i <= 10; i++) {
      let id = letter + i;
      createNewElement(grid, cellClassName, 'div', id);
    }
  }
  for (let i = 0; i < alphabet.length; i++) {
    createRow(alphabet[i]);
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
  const gridOne = createGridCells(gridContainer, 'grid-one');
  const gridTwo = createGridCells(gridContainer, 'grid-two');
};

export {
  displayInitialElements,
};

