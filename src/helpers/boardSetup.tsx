import Box from "@/components/Box";
import { pieceImages } from "@/assets/pieces/staunty";

// Recursive function to create the chessboard
export function createBoard(
  row: number,
  col: number,
  rows: number,
  cols: number,
  pieces: Piece[],
  handleClick: (piece: Piece | null) => void,
  validMoves: { row: number; col: number }[],
  handleMovePiece: (row: number, col: number) => void,
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, piece: Piece) => void,
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void,
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => void
): JSX.Element | null {
  if (row >= rows) return null;

  const isBlack = (row + col) % 2 === 1;
  const isEdge = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
  let cornerClasses = "";
  const position = `${String.fromCharCode(97 + col)}${rows - row}`;
  const piece = pieces.find((p) => p.position === position);

  if (isEdge) {
    cornerClasses = `${row === 0 && col === 0 ? "rounded-tl-lg" : ""} ${
      row === 0 && col === cols - 1 ? "rounded-tr-lg" : ""
    } ${row === rows - 1 && col === 0 ? "rounded-bl-lg" : ""} ${
      row === rows - 1 && col === cols - 1 ? "rounded-br-lg" : ""
    }`;
  }

  const isValidMove = validMoves.some(
    (move) => move.row === row && move.col === col
  );

  const currentBox = (
    <Box
      key={`${row}-${col}`}
      isBlack={isBlack}
      col={String.fromCharCode(97 + col)}
      row={rows - row}
      showColumnLabel={row === rows - 1}
      showRowLabel={col === 0}
      className={cornerClasses.trim()}
      piece={piece}
      onClick={() => {
        if (piece) {
          // Select the piece if it exists
          handleClick(piece);
        } else if (isValidMove) {
          // Move the selected piece to the target square
          handleMovePiece(row, col);
        }
      }}
      isValidMove={isValidMove}
      onDragStart={(e) => piece && handleDragStart(e, piece)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, row, col)}
    />
  );

  const nextInRow =
    col < cols - 1
      ? createBoard(
          row,
          col + 1,
          rows,
          cols,
          pieces,
          handleClick,
          validMoves,
          handleMovePiece,
          handleDragStart,
          handleDragOver,
          handleDrop
        )
      : null;
  const nextRow =
    col === cols - 1
      ? createBoard(
          row + 1,
          0,
          rows,
          cols,
          pieces,
          handleClick,
          validMoves,
          handleMovePiece,
          handleDragStart,
          handleDragOver,
          handleDrop
        )
      : null;

  return (
    <>
      {currentBox}
      {nextInRow}
      {nextRow}
    </>
  );
}
// Define the Piece interface export
export interface Piece {
  type: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";
  color: "white" | "black";
  icon: keyof typeof pieceImages;
  position: string;
  hasMoved?: boolean;
}

export function initBoard(): Piece[] {
  return [
    {
      type: "rook",
      color: "black",
      icon: "bR",
      position: "a8",
      hasMoved: false,
    },
    { type: "knight", color: "black", icon: "bN", position: "b8" },
    { type: "bishop", color: "black", icon: "bB", position: "c8" },
    { type: "queen", color: "black", icon: "bQ", position: "d8" },
    {
      type: "king",
      color: "black",
      icon: "bK",
      position: "e8",
      hasMoved: false,
    },
    { type: "bishop", color: "black", icon: "bB", position: "f8" },
    { type: "knight", color: "black", icon: "bN", position: "g8" },
    {
      type: "rook",
      color: "black",
      icon: "bR",
      position: "h8",
      hasMoved: false,
    },
    { type: "pawn", color: "black", icon: "bP", position: "a7" },
    { type: "pawn", color: "black", icon: "bP", position: "b7" },
    { type: "pawn", color: "black", icon: "bP", position: "c7" },
    { type: "pawn", color: "black", icon: "bP", position: "d7" },
    { type: "pawn", color: "black", icon: "bP", position: "e7" },
    { type: "pawn", color: "black", icon: "bP", position: "f7" },
    { type: "pawn", color: "black", icon: "bP", position: "g7" },
    { type: "pawn", color: "black", icon: "bP", position: "h7" },

    {
      type: "rook",
      color: "white",
      icon: "wR",
      position: "a1",
      hasMoved: false,
    },
    { type: "knight", color: "white", icon: "wN", position: "b1" },
    { type: "bishop", color: "white", icon: "wB", position: "c1" },
    { type: "queen", color: "white", icon: "wQ", position: "d1" },
    {
      type: "king",
      color: "white",
      icon: "wK",
      position: "e1",
      hasMoved: false,
    },
    { type: "bishop", color: "white", icon: "wB", position: "f1" },
    { type: "knight", color: "white", icon: "wN", position: "g1" },
    {
      type: "rook",
      color: "white",
      icon: "wR",
      position: "h1",
      hasMoved: false,
    },
    { type: "pawn", color: "white", icon: "wP", position: "a2" },
    { type: "pawn", color: "white", icon: "wP", position: "b2" },
    { type: "pawn", color: "white", icon: "wP", position: "c2" },
    { type: "pawn", color: "white", icon: "wP", position: "d2" },
    { type: "pawn", color: "white", icon: "wP", position: "e2" },
    { type: "pawn", color: "white", icon: "wP", position: "f2" },
    { type: "pawn", color: "white", icon: "wP", position: "g2" },
    { type: "pawn", color: "white", icon: "wP", position: "h2" },
  ];
}
