import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessPawn, faChessKnight } from "@fortawesome/free-solid-svg-icons"; // Import additional icons as needed
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Define the Move data structure
export interface Move {
  icon: IconDefinition; // FontAwesome icon type
  color: "white" | "black"; // Color of the piece
  coordinate: string; // Coordinate of the move
}

// Define the HistoryMovesProps interface
interface HistoryMovesProps {
  moves: {
    white: Move; // White player's move
    black: Move; // Black player's move
  }[];
}

function HistoryMoves({ moves }: HistoryMovesProps) {
  return (
    <div className="p-4 ">
      <Table className="w-full border-separate border-spacing-0 ">
        <TableHeader className="bg-[#21201e]">
          <TableRow className=" text-white">
            <TableCell className="text-center">#</TableCell>{" "}
            {/* Move Number Column */}
            <TableCell className="text-center">White</TableCell>
            <TableCell className="text-center">Black</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moves.map((move, index) => (
            <TableRow
              key={index}
              className={`${index % 2 === 0 ? "!bg-[#2b2927]" : ""} `}
            >
              {/* Move Number */}
              <TableCell className="text-center text-gray-400">
                {index + 1}.
              </TableCell>

              {/* White Move */}
              <TableCell className="text-center border-none ">
                <FontAwesomeIcon
                  icon={move.white.icon}
                  className={`mr-2 ${
                    move.white.color === "white" ? "text-white" : "text-black"
                  }`}
                />
                {move.white.coordinate}
              </TableCell>

              {/* Black Move */}
              <TableCell className="text-center">
                <FontAwesomeIcon
                  icon={move.black.icon}
                  className={`mr-2 ${
                    move.black.color === "black" ? "text-black" : "text-white"
                  }`}
                />
                {move.black.coordinate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryMoves;
