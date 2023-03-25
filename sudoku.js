const fs = require('fs');
const { EOL } = require('os');
/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const boardString = fs.readFileSync('./puzzles.txt', 'utf-8').split(EOL)[0];

function solve(boardString) {
  const arrBoard = boardString.split('');
  const arraysize = 9;
  const slicedarray = [];
  for (let i = 0; i < arrBoard.length; i += arraysize) {
    slicedarray.push(arrBoard.slice(i, i + arraysize));
  }
  return slicedarray;
}
console.log(solve(boardString));

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

const board = solve(boardString);

function prettyBoard(board) {
  let counter = -1;
  let resArr = [];

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board.length; j++) {
      counter++;
      if (counter === 3) {
        counter = 0;
        resArr.push('|');
      }
      resArr.push(board[i]);
    }
  }
  console.log(resArr);
  const gameBoard = board.join('\n').replaceAll(',', ' ');

  return gameBoard;
}
console.table(prettyBoard(board));

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
