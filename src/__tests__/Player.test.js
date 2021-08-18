import { Player } from '../app-logic';

describe('Player factory function', () => {
  let playerHuman;
  let playerComputer;
  beforeEach(() => {
    playerHuman = Player('Pancake');
    playerComputer = Player('Computer', true);
  })
  test("calls the enemy's gameboard when attack is launched", () => {
    playerHuman.launchAttack(playerComputer.board, 'B', 3);
    expect(playerComputer.board.missedAttacks).toEqual(['B3']);
  });
  test('generates random coordinates when playerComputer launches an attack', () => {
    playerComputer.launchAttack(playerHuman.board);
    expect(playerHuman.board.missedAttacks.length).toBe(1);
  });
  test('records launched attack coordinates', () => {
    playerComputer.launchAttack(playerHuman.board);
    playerComputer.launchAttack(playerHuman.board);
    expect(playerComputer.hasAttacked.length).toBe(2);
  });
  test('knows not to attack the same coordinate twice', () => {
    let times = 100;
    // launches random attack 100 times
    while (times--) {
      playerComputer.launchAttack(playerHuman.board);
    }
    function hasDuplicates(array) {
      // multi-dimensional array is converted into string first before it's filtered into our unique array
      let uniqueArray = array.map(arr=>JSON.stringify(arr))
      .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
      .map(str=>JSON.parse(str));
      // the length of unique array is compared to the length of original array
      return uniqueArray.length !== array.length;
    }
    expect(hasDuplicates(playerComputer.hasAttacked)).toBe(false);
  });
  test('attacks adjacent slots if the previous attack was a hit', () => {
    let times = 4;
    playerHuman.board.placeShip('D', 3, true, 4);
    playerComputer.hasAttacked.push(['D', 3]);
    playerComputer.hasHit.push(['D', 3]);
    playerHuman.board.receiveAttack('D', 3);
    while (times--) {
      playerComputer.launchAttack(playerHuman.board);
    }
    expect(playerComputer.hasHit.some(hit => hit[0] === 'D' && hit[1] === 4)).toBe(true);
  });
  test('does not attack coordinates that are outside the grid', () => {
    let times = 4;
    playerHuman.board.placeShip('G', 10, false, 4);
    playerComputer.hasAttacked.push(['J', 10]);
    playerComputer.hasHit.push(['J', 10]);
    playerHuman.board.receiveAttack('J', 10);
    while (times--) {
      playerComputer.launchAttack(playerHuman.board);
    }
    expect(playerComputer.hasAttacked.some(attack => attack[0] == undefined || attack[1] === 11)).toBe(false);
  })
});