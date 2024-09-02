import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  //SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function NewGame() {
  const minutes = [5, 10, 20, 30];
  return (
    <>
      <div className=" flex flex-col w-2/3 justify-center  m-auto gap-6 p-6">
        <Select defaultValue={minutes[1].toString()}>
          <SelectTrigger className="rounded-[0.5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black">
            <SelectGroup>
              {minutes.map((minute, index) => {
                return (
                  <SelectItem
                    value={minute.toString()}
                    key={index}
                    className="hover:!bg-green-500 aria-selected:bg-green-500 aria-selected:text-black"
                  >
                    {minute} min
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="destructive"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-4 shadow-[0px_4px_0px_0px_rgba(34,139,34,0.5)] hover:shadow-[0_6px_0px_0px_rgba(34,139,34,0.3)] focus:outline-none focus:ring-2 focus:ring-green-300 rounded-[0.5rem]"
        >
          Play
        </Button>
      </div>
    </>
  );
}

export default NewGame;
