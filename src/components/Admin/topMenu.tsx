import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { BriefcaseBusiness, Plus, PlusIcon, UserRoundCog, UserRoundPlus } from "lucide-react";
import type { SetStateAction } from "react";

type TopMenuProps = {
  setActiveTab: React.Dispatch<SetStateAction<string>>;
};

const TopMenu = ({ setActiveTab }: TopMenuProps) => {
  return (
    <nav className="h-[7rem] w-full bg-white py-[3%]">
      <ul className="flex h-full w-full justify-around items-center border-b px-[2%]">
        <li className="flex cursor-pointer hover:bg-neutral-100 flex-col px-[3%]">
          <BriefcaseBusiness
            className="size-8"
            onClick={() => setActiveTab("alljobs")}
          />
          <p className="font-medium">Jobs</p>
        </li>
        <li className="flex cursor-pointer items-center hover:bg-neutral-100 flex-col px-[3%]">
          <UserRoundPlus
            className="size-8"
            onClick={() => setActiveTab("postjobs")}
          />
          <p className="font-medium">Post a job</p>
        </li>
        <li className="flex cursor-pointer items-center hover:bg-neutral-100 flex-col px-[3%]">
          <UserRoundCog
            className="size-8"
            onClick={() => setActiveTab("postjobs")}
          />
          <p className="font-medium">Profile</p>
        </li>
        
      </ul>
    </nav>
  );
};

export default TopMenu;
