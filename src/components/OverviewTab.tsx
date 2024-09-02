import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useState } from "react";
import HistoryMoves, { Move } from "./HistoryMoves";
import NewGame from "./NewGame";

import { faChessPawn, faChessKnight } from "@fortawesome/free-solid-svg-icons"; // Import additional icons if needed placeholder for

interface MenuItem {
  icon: React.ElementType;
  label: string;
}

// Define the interface for the props
interface OverviewProps {
  menuItem: MenuItem[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
}

//placeholder for the moves

function OverviewTab({ menuItem, setSelectedItem }: OverviewProps) {
  const [moves, setMoves] = useState<
    {
      white: Move;
      black: Move;
    }[]
  >([
    {
      white: { icon: faChessPawn, color: "white", coordinate: "d5" },
      black: { icon: faChessKnight, color: "black", coordinate: "f6" },
    },
    {
      white: { icon: faChessPawn, color: "white", coordinate: "d5" },
      black: { icon: faChessKnight, color: "black", coordinate: "f6" },
    },
    {
      white: { icon: faChessPawn, color: "white", coordinate: "d5" },
      black: { icon: faChessKnight, color: "black", coordinate: "f6" },
    },
    {
      white: { icon: faChessPawn, color: "white", coordinate: "d5" },
      black: { icon: faChessKnight, color: "black", coordinate: "f6" },
    },
    {
      white: { icon: faChessPawn, color: "white", coordinate: "d5" },
      black: { icon: faChessKnight, color: "black", coordinate: "f6" },
    },
    {
      white: { icon: faChessPawn, color: "white", coordinate: "d5" },
      black: { icon: faChessKnight, color: "black", coordinate: "f6" },
    },
  ]);
  const handleNewMove = (whiteMove: Move, blackMove: Move) => {
    setMoves((prevMoves) => [
      ...prevMoves,
      { white: whiteMove, black: blackMove },
    ]);
  };
  return (
    <Tabs
      defaultValue="0"
      className="w-full"
      onValueChange={(value) => setSelectedItem(Number(value))}
    >
      <TabsList className="flex justify-around items-center w-full p-0 m-0 bg-transparent">
        {menuItem.map(({ icon: IconComponent }, index) => (
          <React.Fragment key={index}>
            <TabsTrigger
              value={index.toString()}
              className={`w-full p-2 hover:text-gray-500 data-[state=active]:bg-black data-[state=active]:text-white !bg-opacity-100 transition-colors duration-200 overflow-hidden`}
            >
              <IconComponent className="w-6 h-6" />
            </TabsTrigger>
            {index < menuItem.length - 1 && (
              <Separator
                orientation="vertical"
                className="border-l border-white h-full  "
              />
            )}
          </React.Fragment>
        ))}
      </TabsList>

      {menuItem.map(({ label }, index) => (
        <TabsContent key={index} value={index.toString()}>
          {label === "Review" && <HistoryMoves moves={moves} />}
          {label === "New Game" && <NewGame />}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default OverviewTab;
