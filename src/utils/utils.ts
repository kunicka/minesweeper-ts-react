import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from "../constants/constants";
import { CellValue, CellState, Cell } from "../components/types/types";


export const generateCells = ():Cell[][] => {
  let cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let cols = 0; cols < MAX_COLS; cols++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.visible //TODO: make this open later
      });
    }
  }

  //randomly put 10 bombs
  let bombPlaced = 0;
  while (bombPlaced < NO_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }
          return cell;
        })
      );
      bombPlaced++;
    }
  }
  //calculate the numbers for each cell
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++){
  for (let colIndex = 0; colIndex < MAX_COLS; colIndex++){
const currentCell = cells[rowIndex][colIndex];
if(currentCell.value === CellValue.bomb) {
  continue;
}
let numberOfBombs = 0;
const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex-1][colIndex-1] : null;
const topBomb = rowIndex > 0 ? cells[rowIndex-1][colIndex] : null;
const topRightBomb = rowIndex > 0 && colIndex < MAX_COLS - 1 ? cells[rowIndex-1][colIndex+1] : null;
const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex-1] : null;
const rightBomb = colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex+1] : null;
const bottomLeftBomb = rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex-1] : null;
const bottomBomb = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
const bottomRightBomb = rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1 ? cells[rowIndex + 1][colIndex + 1] : null;

if(topLeftBomb && topLeftBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(topBomb && topBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(topRightBomb && topRightBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(leftBomb && leftBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(rightBomb && rightBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(bottomLeftBomb && bottomLeftBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(bottomBomb && bottomBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if(bottomRightBomb && bottomRightBomb.value === CellValue.bomb) {
  numberOfBombs++;
}
if (numberOfBombs > 0) {
  cells[rowIndex][colIndex] = {
    ...currentCell,
    value: numberOfBombs
  }
}
  }
}
  return cells;
};
