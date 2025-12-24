import { EarthIcon, UserCircle2 } from "lucide-react";
import { Link } from "react-router";
import { useUserLoginStore } from "../../hooks/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Navigator = () => {
  const user = useUserLoginStore((s) => s.user);
  const logout = useUserLoginStore((s) => s.logout);

  return (
    <nav className="flex h-20 w-full items-center justify-between border-b">
      <Link to={"/"} className="flex items-center gap-1">
        <span>
          <EarthIcon color="oklch(70.4% 0.14 182.503)" />
        </span>
        <p className="font-bold text-teal-500">Jobseekers</p>
      </Link>
      <div className="flex items-center gap-2">
        {user.role === undefined ? (
          <Link to={"/login"} className="font-bold text-teal-500">
            Sign in
          </Link>
        ) : (
          <>
            <Button onClick={() => logout()}>Logout</Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserCircle2
                  className="size-8 cursor-pointer"
                  color="oklch(70.4% 0.14 182.503)"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative right-[20%] w-20 min-w-0 bg-white md:right-[30%]">
                <DropdownMenuItem>
                  <Link to={"/user"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/myJobs"}>My jobs</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigator;
