import { ArrowRight, EarthIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUserLoginStore } from "../../hooks/store";
import { Link } from "react-router";

const StartPage = () => {
  const setUserDetails = useUserLoginStore((s) => s.setUserDetails);

  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <h2 className="flex items-center gap-1 pt-20">
        <EarthIcon
          color="oklch(70.4% 0.14 182.503)"
          className="size-15 max-[375px]:size-10"
        />
        <span className="text-3xl font-bold text-teal-500">Jobseekers</span>
      </h2>
      <p className="pt-[2%] text-xl font-medium max-[375px]:text-lg">
        An app that helps you find a job.
      </p>
      <p className="pb-[4%] text-center font-light">
        See the app as a guest or sign in and see all the features of this app
      </p>
      <Link to={"/home"}>
        <Button
          onClick={() =>
            setUserDetails({ id: 1, name: "guest", jobs_applied: [] })
          }
          className="flex items-center gap-2"
        >
          <span>Continue as guest</span>
          <ArrowRight />
        </Button>
      </Link>
    </section>
  );
};

export default StartPage;
