import React from "react";
import { Piece } from "./boardSetup";
import handlePawnMoves from "./moves/pawnMove";
import { Move } from "./moves/getValidMoves";
import { handleRookMoves } from "./moves/rookMoves";
import { handleKnightMoves } from "./moves/knigthMoves";

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
  /* console.log("Selected piece:", piece);
  console.log("Board state in handleSelectPiece:", pieces); */
  setSelectedPiece(piece); // Set the selected piece

  // If the selected piece is a pawn, calculate its valid moves
  if (piece?.type === "pawn") {
    const row = 8 - parseInt(piece.position[1]); // Convert rank to row
    const col = piece.position.charCodeAt(0) - 97; // Convert file to column
    /* console.log("Piece position:", piece.position, "Row:", row, "Col:", col); */
    // Call handlePawnMoves and get the result
    const validMoves: Move[] = handlePawnMoves(
      piece,
      row,
      col,
      pieces,
      lastMove,
      piece.color
    );
    console.log("Valid moves for the selected piece:", validMoves);
    setValidMoves(validMoves); // Set the valid moves
  } else if (piece?.type === "rook") {
    const row = 8 - parseInt(piece.position[1]); // Convert rank to row
    const col = piece.position.charCodeAt(0) - 97; // Convert file to column
    /* console.log("Piece position:", piece.position, "Row:", row, "Col:", col); */
    // Call handlePawnMoves and get the result
    const validMoves: Move[] = handleRookMoves(
      piece,
      row,
      col,
      pieces,
      piece.color
    );
    console.log("Valid moves for the selected piece:", validMoves);
    setValidMoves(validMoves); // Set the valid moves
  } else if (piece?.type === "knight") {
    const row = 8 - parseInt(piece.position[1]); // Convert rank to row
    const col = piece.position.charCodeAt(0) - 97; // Convert file to column
    /* console.log("Piece position:", piece.position, "Row:", row, "Col:", col); */
    // Call handlePawnMoves and get the result
    const validMoves: Move[] = handleKnightMoves(
      piece,
      row,
      col,
      pieces,
      piece.color
    );
    console.log("Valid moves for the selected piece:", validMoves);
    setValidMoves(validMoves); // Set the valid moves
  } else {
    setValidMoves([]); // Clear valid moves for non-pawn pieces (or handle other pieces)
  }
};
