const ship = (coordiX, coordiY, isVertical, shipLength) => {
  // the array that contains the coordinates of the ship
  let coordi = [];
  // this if statement decides the coordinates of the ship and push them to the coordi array
  if (isVertical === true ) {
    for (let i = coordiY; i < (coordiY + shipLength); i++) {
      // increment coordiY (number) and push it to the array
      coordi.push(`${coordiX}${i}`);
    } 
  } else {
    for (let i = 0; i < shipLength; i++) {
      // increments coordiX (letter) and push it to the array
      coordi.push(`${String.fromCharCode(coordiX.charCodeAt() + i)}${coordiY}`);
    };
  }
  // the array that contains the coordinates that received a hit
  let hits = [];
  // this function pushes a hit coordinate to the hits array
  const hit = (coor) => {
    hits.push(coor);
  };
  // this function calculates whether the ship is sunk or not
  const isSunk = () => {
    if (hits.length == coordi.length) {
      return true;
    } else {
      return false;
    }
  };
  return {
    coordi,
    hits,
    hit,
    isSunk,
  }
}

const gameboard = (() => {
  let ships = [];
  let missedAttacks = [];

  const placeShip = (x, y, isVertical, shipLength) => {
    let newShip = ship(x, y, isVertical, shipLength)
    ships.push(newShip);
  };

  const receiveAttack = (x, y) => {
    let coor = `${x}${y}`;
    let isMissedHit = true;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].coordi.includes(coor)) {
        ships[i].hit(coor);
        isMissedHit = false;
      };
    }
    if (isMissedHit === true) {
      missedAttacks.push(coor);
    }
  }

  // gameboards should be able to report whether or not all of their ships have been sunk

  return {
    ships,
    placeShip,
    receiveAttack,
    missedAttacks,
  }
})();

export {
  ship,
  gameboard,
}