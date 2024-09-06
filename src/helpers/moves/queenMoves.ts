import { Piece } from "../boardSetup";
import { handleBishopMoves } from "./bishopMoves";
import { Move } from "./getValidMoves";
import { isInsideBoard } from "./pawnMove";
import { handleRookMoves, moveIndirection } from "./rookMoves";

export function handleQueenMoves(
  piece: Piece | null,
  row: number,
  col: number,
  board: (Piece | null)[][],
  color: "white" | "black"
): Move[] {
  if (!piece) return [];
  const moves: Move[] = [];

  if (!isInsideBoard(row, col)) return [];
  //Rook moves Directional
  moveIndirection(moves, row, col, 1, 0, color, board); // Move down
  moveIndirection(moves, row, col, -1, 0, color, board); // Move up
  moveIndirection(moves, row, col, 0, 1, color, board); // Move right
  moveIndirection(moves, row, col, 0, -1, color, board); // Move

  //Bishop moves Directional
  moveIndirection(moves, row, col, 1, 1, color, board); // Down-right
  moveIndirection(moves, row, col, 1, -1, color, board); // Down-left
  moveIndirection(moves, row, col, -1, 1, color, board); // Up-right
  moveIndirection(moves, row, col, -1, -1, color, board);

  handleRookMoves(piece, row, col, board, color);
  handleBishopMoves(piece, row, col, board, color);
  return moves;
}
