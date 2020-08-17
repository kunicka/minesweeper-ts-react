import { MAX_COLS, MAX_ROWS } from "../constants/constants";
import { CellValue, CellState, Cell } from "../components/types/types";

export const generateCells = (): Cell[][] => {
  const cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let cols = 0; cols < MAX_COLS; cols++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.open
      });
    }
  }
  return cells
};
