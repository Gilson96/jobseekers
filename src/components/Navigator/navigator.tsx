import { EarthIcon, UserCircle2 } from "lucide-react";
import { Link } from "react-router";
import { useUserLoginStore } from "../../hooks/store";

const Navigator = () => {
  const user = useUserLoginStore((s) => s.user);

  return (
    <nav className="flex h-20 w-full items-center justify-between border-b">
      <Link to={"/"} className="flex items-center gap-1">
        <span>
          <EarthIcon color="oklch(70.4% 0.14 182.503)" />
        </span>
        <p className="font-bold text-teal-500">Jobseekers</p>
      </Link>
      <div className="flex items-center gap-2">
        {user === undefined ? (
          <Link to={"/login"} className="font-bold text-teal-500">
            Sign in
          </Link>
        ) : (
          <Link to={"/user"} className="font-bold text-teal-500">
            <UserCircle2 color="oklch(70.4% 0.14 182.503)" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigator;
