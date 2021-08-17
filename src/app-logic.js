const Ship = (coordiX, coordiY, isVertical, shipLength) => {
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

const Gameboard = () => {
  let ships = [];
  let missedAttacks = [];
  let isFrozen = false;

  const placeShip = (x, y, isVertical, shipLength) => {
    let newShip = Ship(x, y, isVertical, shipLength);
    ships.push(newShip);
  };

  // there should be a function to place ships randomly, gotta make some rules as to where ships can be placed

  const placeRandomShips = () => {
    const generateRandomCoordi = (shipLength, isVertical) => {
      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      let randomAlphabet = alphabet[Math.floor(Math.random() * 10)];
      if (isVertical) {
        randomNumber = Math.floor(Math.random() * (11 - shipLength)) + 1;
      } else {
        randomAlphabet = alphabet[Math.floor(Math.random() * (11 - shipLength))];
      }
      return [randomAlphabet, randomNumber];      
    }
    const checkForSameCoordi = (shipCoor) => {
      let shipsCoordi = [];
      ships.forEach(ship => {
        ship.coordi.forEach(coor => {
          shipsCoordi.push(coor);
        });
      });
      // check if any of the coordinates in shipCoor array already exists in shipsCoordi
      let sameCoordi = shipCoor.some(coor => shipsCoordi.indexOf(coor) >= 0);
      return sameCoordi;
    };
    const createNewShip = (shipLength) => {
      const createShip = () => {
        // generates random boolean
        const isVertical = Math.random() < 0.5;
        const randomCoordi = generateRandomCoordi(shipLength, isVertical);
        const ship = Ship(randomCoordi[0], randomCoordi[1], isVertical, shipLength);
        return ship;
      }
      let newShip = createShip();
      while(checkForSameCoordi(newShip.coordi)) {
        newShip = createShip();
      }
      return newShip;
    }
    ships.push(createNewShip(5));
    ships.push(createNewShip(4));
    ships.push(createNewShip(3));
    ships.push(createNewShip(3));
    ships.push(createNewShip(2));
  }

  const receiveAttack = (x, y) => {
    let coor = `${x}${y}`;
    let isAHit = false;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].coordi.includes(coor)) {
        ships[i].hit(coor);
        isAHit = true;
        return isAHit;
      };
    }
    if (isAHit === false) {
      missedAttacks.push(coor);
      return isAHit;
    }
  }

  // reports whether or not all of the ships have been sunk
  const areAllShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  }

  return {
    ships,
    placeShip,
    placeRandomShips,
    receiveAttack,
    missedAttacks,
    areAllShipsSunk,
    isFrozen
  }
};

const Player = (name, isComputer = false) => {
  let hasAttacked = [];
  let hasHit = [];
  let board = Gameboard(isComputer);
  const launchAttack = (enemyGameboard, x = '', y = '') => {
    if (isComputer === true) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const generateRandomCoor = () => {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const randomAlphabet = alphabet[Math.floor(Math.random() * 10)];
        const randomArr = [randomAlphabet, randomNumber];
        return randomArr;
      }
      
      const findShipCoor = () => {
        let lastHit = hasHit[hasHit.length-1];
        let increment = Math.random() < 0.5;
        let coordiX = Math.random() < 0.5;
        if (increment && coordiX) {
          let coorX = alphabet[alphabet.indexOf(lastHit[0]) + 1];
          return [coorX, lastHit[1]];
        } else if (!increment && coordiX) {
          let coorX = alphabet[alphabet.indexOf(lastHit[0]) - 1];
          return [coorX, lastHit[1]];
        } else if (increment && !coordiX) {
          let coorY = lastHit[1] + 1;
          return [lastHit[0], coorY];
        } else {
          let coorY = lastHit[1] - 1;
          return [lastHit[0], coorY];
        }
      }
      let attackCoor;
      if (hasHit.length === 0) {
        attackCoor = generateRandomCoor();
        // while hasAttacked contains the same element, generate a new one
        while (hasAttacked.some(item => item[0] === attackCoor[0] && item[1] === attackCoor[1])) {
          attackCoor = generateRandomCoor();
        }
      } else {
        attackCoor = findShipCoor();
        while (hasAttacked.some(item => item[0] === attackCoor[0] && item[1] === attackCoor[1])) {
          attackCoor = findShipCoor();
        }
      }
      const attack = enemyGameboard.receiveAttack(attackCoor[0], attackCoor[1]);
      if (attack === true) {
        hasHit.push(attackCoor);
      }
      hasAttacked.push(attackCoor);
    } else {
      const attack = enemyGameboard.receiveAttack(x, y);
      if (attack === true) {
        hasHit.push([x, y]);
      }
      hasAttacked.push([x, y]);
    }
  };

  return {
    name,
    board,
    hasAttacked,
    hasHit,
    launchAttack,
  }
};

export {
  Ship,
  Gameboard,
  Player,
}