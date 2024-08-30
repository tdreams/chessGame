import PlayerNAme from "./PlayerName";

function ChessBoard() {
  return (
    <div className="flex-1 bg-red-700 flex h-full">
      <div className="flex-col w-full p-4">
        <PlayerNAme />
        <div className="w-3/4 h-3/4">This is the board</div>
        <PlayerNAme />
      </div>
    </div>
  );
}
export default ChessBoard;
