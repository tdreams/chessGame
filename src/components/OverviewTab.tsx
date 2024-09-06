import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "@/components/ui/separator";
import NewGame from "./NewGame";

import { Piece } from "@/helpers/boardSetup";
import HistoryMoves from "./HistoryMoves";
import React from "react";

interface MenuItem {
  icon: React.ElementType;
  label: string;
}

// Define the interface for the props
interface OverviewProps {
  menuItem: MenuItem[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  moves: { white?: Piece; black?: Piece }[]; // Update to receive moves with pieces
}

function OverviewTab({ menuItem, setSelectedItem, moves }: OverviewProps) {
  return (
    <Tabs
      defaultValue="0"
      className="w-full"
      onValueChange={(value) => setSelectedItem(Number(value))}
    >
      <TabsList className="flex justify-around items-center w-full p-0 m-0 bg-transparent ">
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
          <div className="max-h-[20rem] overflow-y-auto scrollbar-hide">
            {label === "Review" && <HistoryMoves moves={moves} />}
          </div>

          {label === "New Game" && <NewGame />}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default OverviewTab;
