import { Piece } from "@/helpers/boardSetup";
import { pieceImages } from "@/assets/pieces/staunty";

interface BoxProps {
  isBlack: boolean;
  col: string;
  row: number;
  showColumnLabel: boolean;
  showRowLabel: boolean;
  className?: string;
  piece?: Piece | null;
  onClick: () => void;
  isValidMove: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

function Box({
  isBlack,
  col,
  row,
  showColumnLabel,
  showRowLabel,
  className = "",
  piece,
  onClick,
  isValidMove,
}: /* onDragStart,
  onDragOver,
  onDrop, */
BoxProps) {
  return (
    <div
      className={`relative flex justify-center items-center aspect-square border-none  ${
        isBlack
          ? "bg-[oklch(66.91%_0.072_225.11)]"
          : "bg-[oklch(93.82%_0.0777439208785937_89.69720269349494)]"
      } ${isValidMove ? "cursor-pointer" : ""} ${className}`} // Highlight valid moves
      onClick={onClick}
      /* onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={!!piece} */
    >
      {/* Show a small circle in the middle if it's a valid move */}
      {isValidMove && (
        <div className="absolute w-4 h-4 bg-white/70 z-10 rounded-full"></div>
      )}

      {/* Show a ring around the piece if it's a valid move and a piece is present */}
      {isValidMove && piece && (
        <div className="absolute w-[86%] h-[86%] ring-8 ring-white/70 rounded-full z-50"></div>
      )}

      {/* Render the piece image */}
      {piece && (
        <img
          src={pieceImages[piece.icon]}
          alt={`${piece.color} ${piece.type}`}
          className="z-30 w-[90%] h-[90%]  "
        />
      )}

      {/* Row label */}
      {showRowLabel && (
        <span
          className={`absolute top-[2px] left-[5px] text-[18px] font-bold ${
            isBlack ? "text-white" : "text-[#abdbd3]"
          } select-none`}
        >
          {row}
        </span>
      )}

      {/* Column label */}
      {showColumnLabel && (
        <span
          className={`absolute bottom-[2px] right-[5px] text-[18px] font-bold ${
            isBlack ? "text-white" : "text-[#abdbd3]"
          } select-none`}
        >
          {col}
        </span>
      )}
    </div>
  );
}

export default Box;
