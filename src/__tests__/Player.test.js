import { Player, Gameboard } from '../app-logic';

describe('Player factory function', () => {
  let humanGameboard;
  let computerGameboard;
  let playerHuman;
  let playerComputer;
  beforeEach(() => {
    humanGameboard = Gameboard();
    computerGameboard = Gameboard();
    playerHuman = Player('Pancake');
    playerComputer = Player('Computer', true);
  })
  
  test("calls the enemy's gameboard when attack is launched", () => {
    playerHuman.launchAttack(computerGameboard, 'B', 3);
    expect(computerGameboard.missedAttacks).toEqual(['B3']);
  });
  test('generates random coordinates when playerComputer launches an attack', () => {
    playerComputer.launchAttack(humanGameboard);
    expect(humanGameboard.missedAttacks.length).toBe(1);
  });
  test('records launched attack coordinates', () => {
    playerComputer.launchAttack(humanGameboard);
    playerComputer.launchAttack(humanGameboard);
    expect(playerComputer.hasHitCoordi.length).toBe(2);
  })
  test('knows not to attack the same coordinate twice', () => {
    let times = 100;
    // launches random attack 100 times
    while (times--) {
      playerComputer.launchAttack(humanGameboard);
    }
    function hasDuplicates(array) {
      // multi-dimensional array is converted into string first before it's filtered into our unique array
      let uniqueArray = array.map(arr=>JSON.stringify(arr))
      .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
      .map(str=>JSON.parse(str));
      // the length of unique array is compared to the length of original array
      return uniqueArray.length !== array.length;
    }
    expect(hasDuplicates(playerComputer.hasHitCoordi)).toBe(false);
  })
});