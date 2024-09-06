import { Piece } from "../boardSetup";
import { Move } from "./getValidMoves";

export function handleRookMoves(
  piece: Piece | undefined,
  row: number,
  col: number,
  board: (Piece | null)[][],
  color: "white" | "black"
): Move[] {
  if (!piece) return [];

  const moves: Move[] = [];

  // Move in all four directions
  moveIndirection(moves, row, col, 1, 0, color, board); // Move down
  moveIndirection(moves, row, col, -1, 0, color, board); // Move up
  moveIndirection(moves, row, col, 0, 1, color, board); // Move right
  moveIndirection(moves, row, col, 0, -1, color, board); // Move left

  return moves;
}

// Helper function to check if the position is within the board boundaries
function isInsideBoard(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}
export function moveIndirection(
  moves: Move[],
  currentRow: number,
  currentCol: number,
  rowIncrement: number,
  colIncrement: number,
  color: "white" | "black",
  board: (Piece | null)[][]
) {
  const newRow = currentRow + rowIncrement;
  const newCol = currentCol + colIncrement;

  // Check if the new position is within the board boundaries
  if (!isInsideBoard(newRow, newCol)) return;

  // If the position is empty, add it as a valid move and continue moving in the same direction
  if (!board[newRow][newCol]) {
    moves.push({ row: newRow, col: newCol });
    moveIndirection(
      moves,
      newRow,
      newCol,
      rowIncrement,
      colIncrement,
      color,
      board
    );
  }
  // If the position has an opponent's piece, add it as a valid capture move and stop
  else if (board[newRow][newCol]?.color !== color) {
    moves.push({ row: newRow, col: newCol });
  }
  // If the position has a piece of the same color, stop
  else {
    return;
  }
}
