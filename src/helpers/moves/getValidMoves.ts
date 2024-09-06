import { Piece } from "../boardSetup";
import { handleBishopMoves } from "./bishopMoves";
import { handleKingMoves } from "./kingMoves";
import { handleKnightMoves } from "./knigthMoves";
import handlePawnMoves from "./pawnMove";
import { handleQueenMoves } from "./queenMoves";
import { handleRookMoves } from "./rookMoves";

export interface Move {
  row: number;
  col: number;
}

export function getValidMove(
  piece: Piece | undefined,
  row: number,
  col: number,
  lastMove: {
    piece: Piece;
    start: [number, number];
    end: [number, number];
  } | null,
  board: (Piece | null)[][] // Use (Piece | null)[][] to represent the board properly
): Move[] {
  if (!piece) return []; // If there's no piece, return an empty array of moves

  let moves: Move[] = [];
  const { type, color } = piece;

  switch (type) {
    case "pawn":
      // Push the pawn's valid moves to the moves array
      moves = handlePawnMoves(piece, row, col, board, lastMove, color);
      break;

    //handle Rook moves
    case "rook":
      moves = handleRookMoves(piece, row, col, board, color);
      break;

    //handle knight moves
    case "knight":
      moves = handleKnightMoves(piece, row, col, board, color);
      break;

    //handle knight moves
    case "bishop":
      moves = handleBishopMoves(piece, row, col, board, color);
      break;
    //handle queen moves
    case "queen":
      moves = handleQueenMoves(piece, row, col, board, color);
      break;
    //handle queen moves
    case "king":
      moves = handleKingMoves(piece, row, col, board, color);
      break;

    default:
      break; // Return an empty array for undefined types
  }
  return moves;
}
