const fs = require("fs");
const { EOL } = require("os");
// const path = require("path");

/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const boardString = fs.readFileSync("./puzzles.txt", "utf-8").split(EOL)[0];

function solve(boardString) {
  const arrBoard = boardString.split("");
  const arraysize = 9;
  const slicedArray = [];
  for (let i = 0; i < arrBoard.length; i += arraysize) {
    slicedArray.push(arrBoard.slice(i, i + arraysize));
  }
  return slicedArray;
}
console.log(solve(boardString));

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
const board = [
  ["1", "-", "5", "8", "-", "2", "-", "-", "-"],
  ["-", "9", "-", "-", "7", "6", "4", "-", "5"],
  ["2", "-", "-", "4", "-", "-", "8", "1", "9"],
  ["-", "1", "9", "-", "-", "7", "3", "-", "6"],
  ["7", "6", "2", "-", "8", "3", "-", "9", "-"],
  ["-", "-", "-", "-", "6", "1", "-", "5", "-"],
  ["-", "-", "7", "6", "-", "-", "-", "3", "-"],
  ["4", "3", "-", "-", "2", "-", "5", "-", "1"],
  ["6", "-", "-", "3", "-", "8", "9", "-", "-"],
];

function isSolved(board) {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (board[i][j] === 0) {
        return false; // определяет есть ли пустая ячейка
      }

      const num = board[i][j];
      if (
        board[i].filter((el) => el === num).length > 1 || //  провекрка срок
        board.map((row) => row[j]).filter((el) => el === num).length > 1
      ) {
        // проверка столюцов
        return false;
      }
    }
  }
  return true;
}

function square(board, x, y) {
  let result = [];
  let row = Math.round(x / 3) * 3;
  let column = Math.round(y / 3) * 3;

  for (let i = row; i < row + 3; i += 1) {
    for (let j = column; j < column + 3; j += 1) {
      result.push(board[i][j]);
    }
    return result;
  }
}
square();

function prettyBoard(board) {}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  // prettyBoard,
};
