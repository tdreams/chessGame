import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface MenuItem {
  icon: React.ElementType;
  label: string;
}

// Define the interface for the props
interface OverviewProps {
  menuItem: MenuItem[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
}

function OverviewTab({ menuItem, setSelectedItem }: OverviewProps) {
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
              className={`w-full p-2 hover:text-gray-500 data-[state=active]:bg-black data-[state=active]:text-white !bg-opacity-100 transition-colors duration-200`}
            >
              <IconComponent className="w-6 h-6" />
            </TabsTrigger>
            {index < menuItem.length - 1 && (
              <Separator
                orientation="vertical"
                className="border-l border-gray-400 h-full"
              />
            )}
          </React.Fragment>
        ))}
      </TabsList>

      {menuItem.map(({ icon: IconComponent }, index) => (
        <TabsContent key={index} value={index.toString()}>
          <IconComponent className="w-6 h-6" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default OverviewTab;
