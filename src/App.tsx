import ChessBoard from "./components/ChessBoard";
import "./index.css";
import Overview from "./components/Overview";

function App() {
  return (
    <div className="flex gap-6 h-screen overflow-hidden">
      <ChessBoard />
      <Overview />
    </div>
  );
}

export default App;
