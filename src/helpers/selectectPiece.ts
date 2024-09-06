import React from "react";
import { Piece } from "./boardSetup";
import { Move, getValidMove } from "./moves/getValidMoves";

// Define the function type for setting selected piece and valid moves
type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export const handleSelectPiece = (
  piece: Piece | null,
  setSelectedPiece: SetStateFunction<Piece | null>,
  setValidMoves: SetStateFunction<Move[]>,
  pieces: (Piece | null)[][],
  lastMove: {
    piece: Piece;
    start: [number, number];
    end: [number, number];
  } | null
) => {
  setSelectedPiece(piece); // Set the selected piece

  // If there's no piece selected, clear valid moves
  if (!piece) {
    setValidMoves([]);
    return;
  }

  // Get row and column indices from the piece's position
  const { row, col } = getRowAndColFromPosition(piece.position);

  // Get the valid moves using the centralized getValidMove function
  const validMoves: Move[] = getValidMove(piece, row, col, lastMove, pieces);

  console.log("Valid moves for the selected piece:", validMoves);
  setValidMoves(validMoves); // Set the valid moves
};

// Helper function to convert chess notation position (like 'e4') to row and column indices
function getRowAndColFromPosition(position: string) {
  const row = 8 - parseInt(position[1]); // Convert rank to row
  const col = position.charCodeAt(0) - 97; // Convert file to column
  return { row, col };
}
