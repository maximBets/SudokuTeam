/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const fs = require('fs')
const path = require('path')


function solve() {

const indexArgv = Number(process.argv[2]) || 0
const stringSudoku = fs.readFileSync(path.join(__dirname, 'puzzles.txt'), 'utf-8').split('\n')[indexArgv]

const arrSudoku = []
const arrSudoku2 = []

for (let i = 0; i < stringSudoku.length; i += 9) {
  arrSudoku.push(stringSudoku.slice(i, i + 9).split(''))
  arrSudoku2.push(stringSudoku.slice(i, i + 9).split(''))
}

const fillNumArrSudoku = arrSudoku.map((el) => {
   const existingDigits = el.filter(val => val !== '-').map(val => Number(val))
   const missingDigits = Array.from({length: 9}, (_, i) => i + 1).filter(num => !existingDigits.includes(num))
    for (let i = 0; i < el.length; i++) {
     if (el[i] === '-') {
       const randomNumber = Math.floor(Math.random() * missingDigits.length)
       el[i] = missingDigits[randomNumber].toString()
      //  missingDigits.splice(randomNumber, 1)
     }
   }
   return el
})

const transposedMatrix = arrSudoku2[0].map((col, c) => arrSudoku2.map((row, r) => arrSudoku2[r][c]))

const fillNumTransposedArrSudoku = transposedMatrix.map((el) => {
      const existingDigits = el.filter(val => val !== '-').map(val => Number(val))
      const missingDigits = Array.from({length: 9}, (_, i) => i + 1).filter(num => !existingDigits.includes(num))
       for (let i = 0; i < el.length; i++) {
        if (el[i] === '-') {
          const randomNumber = Math.floor(Math.random() * missingDigits.length)
          el[i] = missingDigits[randomNumber].toString()
         //  missingDigits.splice(randomNumber, 1)
        }
      }
      return el
   })

let final = fillNumArrSudoku.join('\n').replaceAll(',', ' ')
let finalTranspose = fillNumTransposedArrSudoku.join('\n').replaceAll(',', ' ')

console.log(final);
}

solve()

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {

}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {

}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};