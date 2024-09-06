import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Piece } from "@/helpers/boardSetup";

interface HistoryMovesProps {
  moves: {
    white?: Piece;
    black?: Piece;
  }[];
}

const HistoryMoves: React.FC<HistoryMovesProps> = ({ moves }) => {
  // Initialize pairedMoves array
  const pairedMoves: { white?: Piece; black?: Piece }[] = [];

  // Recursive function to pair white and black moves
  function addPairMoves(
    moves: HistoryMovesProps["moves"],
    i: number = 0,
    pairedMoves: { white?: Piece; black?: Piece }[] = []
  ) {
    if (i >= moves.length) return; // Base case for recursion
    pairedMoves.push({
      white: moves[i]?.white,
      black: moves[i + 1]?.black,
    });
    addPairMoves(moves, i + 2, pairedMoves); // Recursive call
  }

  // Call the recursive function
  addPairMoves(moves, 0, pairedMoves);

  // Determine the current move based on the number of moves played
  const currentMove = moves.length - 1;

  return (
    <div className="p-4 ">
      <Table className="w-full border-separate border-spacing-0 h-[1rem] ">
        <TableHeader className="bg-[#21201e] sticky top-0 z-10">
          <TableRow className="text-white ">
            <TableCell className="text-center w-1/6">#</TableCell>
            <TableCell className="text-center w-5/12">White</TableCell>
            <TableCell className="text-center w-5/12">Black</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="flex-col h-[20px] overflow-y-a">
          {pairedMoves.map((move, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-[#2b2927]" : ""}
            >
              <TableCell className="text-center text-gray-400 py-2">
                {index + 1}.
              </TableCell>
              <TableCell
                className={`text-center border-none py-2
                  ${currentMove === index * 2 ? "bg-white text-black" : ""}`}
              >
                {renderMove(move.white)}
              </TableCell>
              <TableCell
                className={`text-center py-2
                  ${
                    currentMove === index * 2 + 1 ? "bg-black text-white" : ""
                  }`}
              >
                {renderMove(move.black)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper function to render a move
const renderMove = (piece?: Piece) => {
  if (!piece) return "-";
  return (
    <div className="flex items-center justify-center">
      <img
        src={`/src/assets/pieces/staunty/${piece.icon}.svg`}
        alt={`${piece.type} ${piece.color}`}
        className="w-6 h-6 mr-2"
      />
      <span>{piece.position}</span>
    </div>
  );
};

export default HistoryMoves;
