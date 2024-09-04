import { Piece, createBoard, initBoard } from "@/helpers/boardSetup";
import PlayerName from "./PlayerName";
import { useRef, useState, useEffect } from "react";
import { handleSelectPiece } from "@/helpers/selectectPiece";
import { handleMovePiece } from "@/helpers/moves/piecesMove";

export interface ChessBoardProps {
  rows: number;
  cols: number;
}

export interface LastMove {
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
  const [whiteCaptured, setWhiteCaptured] = useState<Piece[]>([]); // Captured pieces by white
  const [blackCaptured, setBlackCaptured] = useState<Piece[]>([]); // Captured pieces by black
  const [lastMove, setLastMove] = useState<LastMove | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
  const [whiteTime, setWhiteTime] = useState<number>(300); // 5 minutes in seconds
  const [blackTime, setBlackTime] = useState<number>(300); // 5 minutes in seconds
  const timerRef = useRef<number | null>(null); // Ref to hold the timer

  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);

  const moveSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    moveSoundRef.current = new Audio("/sounds/public_sound_sfx_Move.mp3");
    moveSoundRef.current.preload = "auto";
    moveSoundRef.current.volume = 0.4;

    return () => {
      if (moveSoundRef.current) {
        moveSoundRef.current.pause();
        moveSoundRef.current = null;
      }
    };
  }, []);

  //Handle the countdown for each player's timer

  useEffect(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current); // Clear any existing interval
    }

    timerRef.current = window.setInterval(() => {
      if (currentTurn === "white") {
        setWhiteTime((prev) => Math.max(prev - 1, 0));
      } else {
        setBlackTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000); // Countdown every second

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current); // Clear interval on cleanup
      }
    };
  }, [currentTurn]); // Run this effect whenever the turn changes

  const pieces2D: (Piece | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  pieces.forEach((piece) => {
    const row = 8 - parseInt(piece.position[1]);
    const col = piece.position.charCodeAt(0) - 97;
    pieces2D[row][col] = piece;
  });

  const handlePieceClick = (piece: Piece | null) => {
    if (!piece) return; // If no piece is clicked, do nothing

    if (piece.color === currentTurn) {
      // If the piece belongs to the current player, select it
      handleSelectPiece(
        piece,
        setSelectedPieces,
        setValidMoves,
        pieces2D,
        lastMove
      );
    } else if (selectedPieces && piece.color !== currentTurn) {
      // If an opponent's piece is clicked and the move is valid, capture it
      const isValidCapture = validMoves.some(
        (move) =>
          move.row === 8 - parseInt(piece.position[1]) &&
          move.col === piece.position.charCodeAt(0) - 97
      );

      if (isValidCapture) {
        handleMove(
          8 - parseInt(piece.position[1]),
          piece.position.charCodeAt(0) - 97
        );
      }
    }
  };

  const handleMove = (row: number, col: number) => {
    handleMovePiece({
      row,
      col,
      selectedPieces,
      pieces,
      setPieces,
      setLastMove,
      setSelectedPieces,
      setValidMoves,
      moveSoundRef,
      piecesCaptured: { setWhiteCaptured, setBlackCaptured },
    });

    setCurrentTurn(currentTurn === "white" ? "black" : "white");
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    piece: Piece
  ) => {
    setDraggedPiece(piece);
    handleSelectPiece(
      piece,
      setSelectedPieces,
      setValidMoves,
      pieces2D,
      lastMove
    );
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", piece.position);
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    e.preventDefault();
    if (
      draggedPiece &&
      validMoves.some((move) => move.row === row && move.col === col)
    ) {
      handleMove(row, col);
    }
    setDraggedPiece(null);
  };

  return (
    <div className="flex-1 flex h-full">
      <div className="flex-col w-full p-0 bg-transparent relative mr-10">
        <PlayerName
          label="Bot AI"
          time={blackTime}
          piecesCaptured={whiteCaptured} // Display pieces captured by black (white pieces)
        />
        <div className="flex relative justify-end">
          <div className="grid grid-cols-8 grid-rows-8 w-[80vmin] h-[80vmin] bg-transparent overflow-hidden rounded-[0.4rem]">
            {createBoard(
              0,
              0,
              rows,
              cols,
              pieces,
              handlePieceClick,
              validMoves,
              handleMove,
              handleDragStart,
              handleDragOver,
              handleDrop
            )}
          </div>
        </div>
        <PlayerName
          label="ME"
          isMe
          time={whiteTime}
          piecesCaptured={blackCaptured} // Display pieces captured by white (black pieces)
        />
      </div>
    </div>
  );
}

export default ChessBoard;
