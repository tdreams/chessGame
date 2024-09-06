import { Piece } from "../boardSetup";
import { Move } from "./getValidMoves";
import { isInsideBoard } from "./pawnMove";

export function handleKingMoves(
  piece: Piece | null,
  row: number,
  col: number,
  board: (Piece | null)[][],
  color: "white" | "black"
): Move[] {
  if (!piece) return [];
  const moves: Move[] = [];
  const kingMoves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  kingMoves.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (!isInsideBoard(newRow, newCol)) return;

    if (!board[newRow][newCol]) {
      moves.push({ row: newRow, col: newCol });
    } else if (board[newRow][newCol]?.color !== color) {
      moves.push({ row: newRow, col: newCol });
    } else {
      return;
    }
  });

  return moves;
}
