import { Timer } from "lucide-react";

interface ClockProps {
  isMe?: boolean; // Optional prop to indicate if the clock is for "Me"
}

function Clock({ isMe }: ClockProps) {
  return (
    <div
      className={`w-32 h-12 flex justify-around items-center rounded ${
        isMe ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <Timer />
      9:57 {/* Timer placeholder */}
    </div>
  );
}

export default Clock;
