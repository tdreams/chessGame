import { Piece } from "../boardSetup";
import { Move } from "./getValidMoves";
import { isInsideBoard } from "./pawnMove";
import { moveIndirection } from "./rookMoves";

export function handleBishopMoves(
  piece: Piece | null,
  row: number,
  col: number,
  board: (Piece | null)[][],
  color: "white" | "black"
): Move[] {
  if (!piece) return [];
  const moves: Move[] = [];

  if (!isInsideBoard(row, col)) return [];

  moveIndirection(moves, row, col, 1, 1, color, board); // Down-right
  moveIndirection(moves, row, col, 1, -1, color, board); // Down-left
  moveIndirection(moves, row, col, -1, 1, color, board); // Up-right
  moveIndirection(moves, row, col, -1, -1, color, board); // Up-left
  return moves;
}
