import Clock from "./Clock";

// Define the PlayerNameProps interface
interface PlayerNameProps {
  label: string; // Label for the player ("Me" or "Bot AI")
  isMe?: boolean; // Optional prop to indicate if the player is "Me"
}

function PlayerName({ label, isMe }: PlayerNameProps) {
  return (
    <div className={`relative mb-14 ${isMe ? "mt-4" : ""}`}>
      {/* Apply margin-top if "Me" */}
      <div className="flex justify-between absolute ml-24  w-[80vmin]  right-0">
        <p className="font-semibold">{label}</p>{" "}
        {/* Display the player's label */}
        <Clock isMe={isMe} /> {/* Use the Clock component */}
      </div>
    </div>
  );
}

export default PlayerName;
