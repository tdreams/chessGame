import { Piece } from "@/helpers/boardSetup";
import Clock from "./Clock";

// Define the PlayerNameProps interface
interface PlayerNameProps {
  label: string; // Label for the player ("Me" or "Bot AI")
  isMe?: boolean; // Optional prop to indicate if the player is "Me"
  time: number;
  piecesCaptured: Piece[]; // Captured pieces
}

function PlayerName({ label, isMe, time, piecesCaptured }: PlayerNameProps) {
  return (
    <div className="flex flex-col ">
      <div className={`relative mb-14 ${isMe ? "mt-4" : ""}`}>
        {/* Apply margin-top if "Me" */}
        <div className="flex justify-between absolute ml-24 w-[80vmin] right-0">
          <p className="font-semibold">{label}</p>
          {/* Display the player's label */}
          <Clock isMe={isMe} time={time} /> {/* Use the Clock component */}
        </div>
      </div>
      <div
        className={` flex flex-wrap  ml-24 w-[80vmin] bg-red-700 ${
          isMe ? "-mt-8" : "mb-4"
        } z-0`}
      >
        {/* Render captured pieces */}
        {piecesCaptured.map((piece, index) => (
          <img
            key={index}
            src={`/src/assets/pieces/staunty/${piece.icon}.svg`} // Correct path to piece images
            alt={`${piece.color} ${piece.type}`}
            className="w-6 h-6"
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerName;
