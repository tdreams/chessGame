import { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import Overview from "./components/Overview";
import { Piece } from "@/helpers/boardSetup"; // Assuming you have a Piece interface defined

function App() {
  // State to track moves
  const [moves, setMoves] = useState<
    {
      white?: Piece;
      black?: Piece;
    }[]
  >([]);

  // Function to add new move
  const handleNewMove = (whiteMove?: Piece, blackMove?: Piece) => {
    setMoves((prevMoves) => [
      ...prevMoves,
      { white: whiteMove, black: blackMove },
    ]);
  };

  return (
    <div className="flex gap-6 h-screen overflow-hidden">
      {/* Pass the handleNewMove function to ChessBoard */}
      <ChessBoard rows={8} cols={8} onMove={handleNewMove} />
      {/* Pass moves to Overview */}
      <Overview moves={moves} />
    </div>
  );
}

export default App;
