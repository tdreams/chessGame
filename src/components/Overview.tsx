import { useState } from "react";
import OverviewTab from "./OverviewTab";
import { ScanEye, Swords, SquarePlus } from "lucide-react";
import TabsTitle from "./TabsTitle";

import { Piece } from "@/helpers/boardSetup";

interface OverviewProps {
  moves: { white?: Piece; black?: Piece }[]; // Add moves prop
}

function Overview({ moves }: OverviewProps) {
  // Array of icons to pass to OverviewTab
  const menuItem = [
    { icon: ScanEye, label: "Review" },
    { icon: SquarePlus, label: "New Game" },
    { icon: Swords, label: "Battle" },
  ];

  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className="w-1/5 h-[96%] overflow-hidden rounded ">
      <div className="overview-title w-full h-[3.5rem] flex justify-center rounded-t items-center">
        {/*         import TabsTitle here
         */}{" "}
        <TabsTitle item={menuItem[selectedItem].label} />
      </div>
      <OverviewTab
        moves={moves}
        menuItem={menuItem}
        setSelectedItem={setSelectedItem}
      />
      <div className="content p-4">This is the Menu overview</div>
    </div>
  );
}

export default Overview;
