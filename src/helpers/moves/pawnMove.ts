import { Piece } from "../boardSetup";
import { Move } from "./getValidMoves";

function handlePawnMoves(
  piece: Piece | undefined,
  row: number,
  col: number,
  board: (Piece | null)[][],
  lastMove: {
    piece: Piece;
    start: [number, number];
    end: [number, number];
  } | null,
  color: "white" | "black"
): Move[] {
  if (!piece) return [];

  /* console.log(`Calculating moves for ${color} pawn at row ${row}, col ${col}`); */

  const moves: Move[] = [];
  const direction = color === "white" ? -1 : 1; // -1 for white (moving up), 1 for black (moving down)
  const startRow = color === "white" ? 6 : 1; // 6 for white, 1 for black

  // Standard single square move
  const nextRow = row + direction;
  if (isInsideBoard(nextRow, col) && !board[nextRow][col]) {
    moves.push({ row: nextRow, col });
    /*  console.log(`Single square move added: row ${nextRow}, col ${col}`); */

    // Double square move from starting position
    if (row === startRow) {
      const doubleNextRow = row + direction * 2;
      if (isInsideBoard(doubleNextRow, col) && !board[doubleNextRow][col]) {
        moves.push({ row: doubleNextRow, col });
        /*   console.log(
          `Double square move added: row ${doubleNextRow}, col ${col}`
        ); */
      }
    }
  }

  // Capture diagonally (left and right)
  [-1, 1].forEach((offset) => {
    const captureCol = col + offset;
    if (
      isInsideBoard(nextRow, captureCol) &&
      board[nextRow][captureCol]?.color !== color &&
      board[nextRow][captureCol]
    ) {
      moves.push({ row: nextRow, col: captureCol });
      console.log(`Capture move added: row ${nextRow}, col ${captureCol}`);
    }
  });

  // En Passant move
  console.log("Checking for en passant possibility:");
  console.log("Last move:", lastMove);
  if (lastMove) {
    /*  console.log("Last move piece type:", lastMove.piece.type);
    console.log("Last move start:", lastMove.start);
    console.log("Last move end:", lastMove.end);
    console.log("Current pawn position:", [row, col]); */

    const lastMoveWasPawn = lastMove.piece.type === "pawn";
    const lastMoveWasDoublePawnPush =
      Math.abs(lastMove.start[0] - lastMove.end[0]) === 2;
    const lastMoveEndedAdjacentToThisPawn =
      Math.abs(lastMove.end[1] - col) === 1;
    const thisRowIsEnPassantCapture =
      (color === "white" && row === 3) || (color === "black" && row === 4);
    const lastMoveEndedOnSameRow = lastMove.end[0] === row;

    /* console.log("Last move was pawn:", lastMoveWasPawn);
    console.log("Last move was double push:", lastMoveWasDoublePawnPush);
    console.log("Last move ended adjacent:", lastMoveEndedAdjacentToThisPawn);
    console.log("This row is en passant capture:", thisRowIsEnPassantCapture);
    console.log("Last move ended on same row:", lastMoveEndedOnSameRow); */

    if (
      lastMoveWasPawn &&
      lastMoveWasDoublePawnPush &&
      lastMoveEndedAdjacentToThisPawn &&
      thisRowIsEnPassantCapture &&
      lastMoveEndedOnSameRow
    ) {
      const enPassantRow = row + direction;
      const enPassantCol = lastMove.end[1];
      if (isInsideBoard(enPassantRow, enPassantCol)) {
        moves.push({ row: enPassantRow, col: enPassantCol });
        /*   console.log(
          `En passant move added: row ${enPassantRow}, col ${enPassantCol}`
        ); */
      }
    } else {
      /*  console.log("En passant conditions not met"); */
    }
  } else {
    /*   console.log("No last move available, en passant not possible"); */
  }

  /* console.log(`Total valid moves for pawn: ${moves.length}`); */
  return moves;
}

// Helper function to check if the position is within the board boundaries
function isInsideBoard(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export default handlePawnMoves;
