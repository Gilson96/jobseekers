import { EarthIcon } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

const Navigator = () => {
  return (
    <nav className="flex h-20 w-full items-center justify-between border-b">
      <p className="flex items-center gap-1">
        <span>
          <EarthIcon color="oklch(70.4% 0.14 182.503)" />
        </span>
        <p className="font-bold text-teal-500">Jobseekers</p>
      </p>
      <div className="flex items-center gap-2">
        <button className="flex w-[2.5rem] items-center justify-center rounded border p-[5px] dark:bg-teal-500">
          <ThemeToggle />
        </button>
        <p className="font-bold text-teal-500">Sign in</p>
      </div>
    </nav>
  );
};

export default Navigator;
