import { BriefcaseBusiness, UserRoundCog, UserRoundPlus } from "lucide-react";
import type { SetStateAction } from "react";

type TopMenuProps = {
  setActiveTab: React.Dispatch<SetStateAction<string>>;
};

const TopMenu = ({ setActiveTab }: TopMenuProps) => {
  return (
    <nav className="h-28 w-full bg-white py-[3%]">
      <ul className="flex h-full w-full items-center justify-around border-b px-[2%]">
        <li
          onClick={() => setActiveTab("allJobs")}
          className="flex cursor-pointer flex-col items-center px-[5%] py-[2%] duration-200 ease-in-out hover:bg-neutral-100 hover:[&>p]:underline"
        >
          <BriefcaseBusiness className="size-8" />
          <p className="">Jobs</p>
        </li>
        <li
          onClick={() => setActiveTab("postJob")}
          className="flex cursor-pointer flex-col items-center px-[5%] py-[2%] duration-200 ease-in-out hover:bg-neutral-100 hover:[&>p]:underline"
        >
          <UserRoundPlus className="size-8" />
          <p className="">Post a job</p>
        </li>
        <li
          onClick={() => setActiveTab("profile")}
          className="flex cursor-pointer flex-col items-center px-[5%] py-[2%] duration-200 ease-in-out hover:bg-neutral-100 hover:[&>p]:underline"
        >
          <UserRoundCog className="size-8" />
          <p className="">Profile</p>
        </li>
      </ul>
    </nav>
  );
};

export default TopMenu;
