const fs = require('fs');
const { EOL } = require('os');
/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const path = require('path');

function solve() {
  const indexArgv = Number(process.argv[2]) || 0;
  const stringSudoku = fs
    .readFileSync(path.join(__dirname, 'puzzles.txt'), 'utf-8')
    .split('\n')[indexArgv];

  const arrSudoku = [];
  const arrSudoku2 = [];

  for (let i = 0; i < stringSudoku.length; i += 9) {
    arrSudoku.push(stringSudoku.slice(i, i + 9).split(''));
    arrSudoku2.push(stringSudoku.slice(i, i + 9).split(''));
  }
  const boardString = fs.readFileSync('./puzzles.txt', 'utf-8').split(EOL)[0];

  const fillNumArrSudoku = arrSudoku.map((el) => {
    const existingDigits = el
      .filter((val) => val !== '-')
      .map((val) => Number(val));
    const missingDigits = Array.from({ length: 9 }, (_, i) => i + 1).filter(
      (num) => !existingDigits.includes(num)
    );
    for (let i = 0; i < el.length; i++) {
      if (el[i] === '-') {
        const randomNumber = Math.floor(Math.random() * missingDigits.length);
        el[i] = missingDigits[randomNumber].toString();
        //  missingDigits.splice(randomNumber, 1)
      }
    }
    return el;
  });

  const transposedMatrix = arrSudoku2[0].map((col, c) =>
    arrSudoku2.map((row, r) => arrSudoku2[r][c])
  );

  const fillNumTransposedArrSudoku = transposedMatrix.map((el) => {
    const existingDigits = el
      .filter((val) => val !== '-')
      .map((val) => Number(val));
    const missingDigits = Array.from({ length: 9 }, (_, i) => i + 1).filter(
      (num) => !existingDigits.includes(num)
    );
    for (let i = 0; i < el.length; i++) {
      if (el[i] === '-') {
        const randomNumber = Math.floor(Math.random() * missingDigits.length);
        el[i] = missingDigits[randomNumber].toString();
        //  missingDigits.splice(randomNumber, 1)
      }
    }
    return el;
  });
  return fillNumTransposedArrSudoku;
  // let final = fillNumArrSudoku.join('\n').replaceAll(',', ' ');
  // let finalTranspose = fillNumTransposedArrSudoku
  //   .join('\n')
  //   .replaceAll(',', ' ');

  // console.log(final);
}

// console.log(solve());

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */

// const board = ['1', '2', '5', '8', '1', '2', '2', '4', '5']

// const board = solve(boardString);

function prettyBoard(board) {
  let newArr = [];

  for (let i = 0; i < board.length; i += 1) {
    let counter = -1;
    let resArr = [];
    newArr.push(resArr);
    for (let j = 0; j < board.length; j += 1) {
      counter++;
      if (counter === 3) {
        counter = 0;
        resArr.push('|');
      }
      resArr.push(board[j][i]);
    }
  }

  let resArrFinal = [];
  for (let i = 0; i < newArr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      resArrFinal.push(['---------------------']);
    }
    resArrFinal.push(newArr[i]);
  }
  // console.log(resArr);
  const gameBoard = resArrFinal.join('\n').replaceAll(',', ' ');
  return gameBoard;
}
console.log(prettyBoard(solve()));

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
