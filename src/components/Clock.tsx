import { Timer } from "lucide-react";

interface ClockProps {
  isMe?: boolean; // Optional prop to indicate if the clock is for "Me"
  time: number; // Time remaining in seconds
}

function Clock({ isMe, time }: ClockProps) {
  // Format time in MM:SS format
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <div
      className={`w-32 h-12 flex justify-around items-center rounded ${
        isMe ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <Timer />
      {formattedTime} {/* Display formatted time */}
    </div>
  );
}

export default Clock;
