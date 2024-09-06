import { LastMove } from "@/components/ChessBoard";
import { Piece } from "@/helpers/boardSetup";

export interface PiecesCaptured {
  setWhiteCaptured: React.Dispatch<React.SetStateAction<Piece[]>>; // Captured pieces by white
  setBlackCaptured: React.Dispatch<React.SetStateAction<Piece[]>>; // Captured pieces by black
}

interface HandleMovePieceParams {
  row: number;
  col: number;
  selectedPieces: Piece | null;
  pieces: Piece[];
  setPieces: React.Dispatch<React.SetStateAction<Piece[]>>;
  setLastMove: React.Dispatch<React.SetStateAction<LastMove | null>>;
  setSelectedPieces: React.Dispatch<React.SetStateAction<Piece | null>>;
  setValidMoves: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }[]>
  >;
  moveSoundRef: React.RefObject<HTMLAudioElement>;
  piecesCaptured: PiecesCaptured;
}

export function handleMovePiece({
  row,
  col,
  selectedPieces,
  pieces,
  setPieces,
  setLastMove,
  setSelectedPieces,
  setValidMoves,
  moveSoundRef,
  piecesCaptured: { setBlackCaptured, setWhiteCaptured },
}: HandleMovePieceParams) {
  if (!selectedPieces) return;

  const startRow = 8 - parseInt(selectedPieces.position[1]);
  const startCol = selectedPieces.position.charCodeAt(0) - 97;
  const newPosition = `${String.fromCharCode(97 + col)}${8 - row}`;

  // Check if there's a piece at the destination and if it's an opponent's piece
  const targetPiece = pieces.find(
    (piece) =>
      piece.position === newPosition && piece.color !== selectedPieces.color
  );

  // Determine if this is an "en passant" move
  const isEnPassantMove =
    selectedPieces.type === "pawn" &&
    !targetPiece && // No piece directly in the target square
    Math.abs(col - startCol) === 1 && // Move is diagonal
    Math.abs(row - startRow) === 1; // Only one row difference

  // Create a new array for pieces to update
  let updatedPieces = [...pieces];

  if (isEnPassantMove) {
    // Calculate the position of the captured en passant piece
    const enPassantRow = selectedPieces.color === "white" ? row + 1 : row - 1;
    const enPassantCapturePos = `${String.fromCharCode(97 + col)}${
      8 - enPassantRow
    }`;

    const enPassantTargetPiece = pieces.find(
      (piece) =>
        piece.position === enPassantCapturePos &&
        piece.color !== selectedPieces.color &&
        piece.type === "pawn"
    );

    if (enPassantTargetPiece) {
      console.log(
        `En passant capture at: Position: ${enPassantTargetPiece.position}, Type: ${enPassantTargetPiece.type}, Color: ${enPassantTargetPiece.color}`
      );

      // Capture the en passant target piece
      if (selectedPieces.color === "white") {
        setBlackCaptured((prev: Piece[]) => [...prev, enPassantTargetPiece]);
      } else {
        setWhiteCaptured((prev: Piece[]) => [...prev, enPassantTargetPiece]);
      }

      // Remove the captured en passant pawn from the board
      updatedPieces = updatedPieces.filter(
        (p) => p.position !== enPassantCapturePos
      );
    }
  } else if (targetPiece) {
    // Regular capture logic
    console.log(`Capturing piece at ${newPosition}:`, targetPiece);
    if (selectedPieces.color === "white") {
      setBlackCaptured((prev: Piece[]) => [...prev, targetPiece]);
    } else {
      setWhiteCaptured((prev: Piece[]) => [...prev, targetPiece]);
    }

    // Remove the captured piece from the board
    updatedPieces = updatedPieces.filter(
      (p) => p.position !== targetPiece.position
    );
  }

  // Update the position of the selected piece
  updatedPieces = updatedPieces.map((piece) =>
    piece === selectedPieces
      ? {
          ...piece,
          position: newPosition,
        }
      : piece
  );

  // Set the updated pieces state
  setPieces(updatedPieces);

  // Update the last move state
  setLastMove({
    piece: selectedPieces,
    start: [startRow, startCol],
    end: [row, col],
  });

  // Clear selected piece and valid moves
  setSelectedPieces(null);
  setValidMoves([]);

  // Play the move sound
  if (moveSoundRef.current) {
    moveSoundRef.current.currentTime = 0;
    moveSoundRef.current.play().catch((err) => {
      console.error("Error playing sound", err);
    });
  }
}
