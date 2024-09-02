import { Piece, createBoard, initBoard } from "@/helpers/boardSetup";
import PlayerName from "./PlayerName";
import { useState } from "react";
import { handleSelectPiece } from "@/helpers/selectectPiece";

// Define the ChessBoard component's props type
export interface ChessBoardProps {
  rows: number;
  cols: number;
}

interface LastMove {
  piece: Piece;
  start: [number, number];
  end: [number, number];
}

function ChessBoard({ rows, cols }: ChessBoardProps) {
  const [pieces, setPieces] = useState<Piece[]>(initBoard());
  const [selectedPieces, setSelectedPieces] = useState<Piece | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );
  const [lastMove, setLastMove] = useState<LastMove | null>(null);
  // Convert pieces to a 2D array representing the board state
  const pieces2D: (Piece | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  pieces.forEach((piece) => {
    const row = 8 - parseInt(piece.position[1]); // Convert rank to row
    const col = piece.position.charCodeAt(0) - 97; // Convert file to column
    pieces2D[row][col] = piece; // Place the piece in the correct position on the board
  });

  function handleMovePiece(row: number, col: number) {
    if (!selectedPieces) return;
    const startRow = 8 - parseInt(selectedPieces.position[1]);
    const startCol = selectedPieces.position.charCodeAt(0) - 97;
    const newPosition = `${String.fromCharCode(97 + col)}${8 - row}`;
    const updatedPieces = pieces.map((piece) =>
      piece === selectedPieces
        ? {
            ...piece,
            position: newPosition,
          }
        : piece
    );
    setPieces(updatedPieces);
    setLastMove({
      piece: selectedPieces,
      start: [startRow, startCol],
      end: [row, col],
    });
    setSelectedPieces(null);
    setValidMoves([]);
  }

  return (
    <div className="flex-1 flex h-full ">
      <div className="flex-col w-full p-0 bg-transparent relative mr-10">
        {/* PlayerName component for Bot AI */}
        <PlayerName label="Bot AI" />

        {/* Chessboard Grid Container */}
        <div className="flex relative justify-end">
          <div className="grid grid-cols-8 grid-rows-8 w-[80vmin] h-[80vmin] bg-transparent overflow-hidden rounded-[0.4rem]">
            {createBoard(
              0,
              0,
              rows,
              cols,
              pieces,
              (piece) =>
                handleSelectPiece(
                  piece,
                  setSelectedPieces,
                  setValidMoves,
                  pieces2D,
                  lastMove
                ),
              validMoves,
              handleMovePiece // Pass the move handler to createBoard
            )}
          </div>
        </div>

        {/* PlayerName component for the user */}
        <PlayerName label="ME" isMe />
      </div>
    </div>
  );
}

export default ChessBoard;
