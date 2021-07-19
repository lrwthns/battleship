const ship = (shipCells) => {
  let hits = [];
  const hit = (num) => {
    if (shipCells.includes(num)) {
      hits.push(num);
    }
  };
  const isSunk = () => {
    if (hits.length == shipCells.length) {
      return true;
    } else {
      return false;
    }
  };
  return {
    shipCells,
    hits,
    hit,
    isSunk,
  }
}

const gameboard= () => {
  return {
    y: 'y',
  }
}

export {
  ship,
  gameboard,
}