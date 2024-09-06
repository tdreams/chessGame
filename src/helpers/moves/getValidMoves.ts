import { Piece } from "../boardSetup";
import { handleBishopMoves } from "./bishopMoves";
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
    /*  // Handle other pieces like rook, knight, bishop, queen, and king
      case "rook":
        // Call handleRookMoves and return its result
        return handleRookMoves(row, col, board, color);
  
      case "knight":
        // Call handleKnightMoves and return its result
        return handleKnightMoves(row, col, board, color);
  
      case "bishop":
        // Call handleBishopMoves and return its result
        return handleBishopMoves(row, col, board, color);
  
      case "queen":
        // Call handleQueenMoves and return its result
        return handleQueenMoves(row, col, board, color);
  
      case "king":
        // Call handleKingMoves and return its result
        return handleKingMoves(row, col, board, color); */

    default:
      break; // Return an empty array for undefined types
  }
  return moves;
}
