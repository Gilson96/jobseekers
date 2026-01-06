import { CircleCheck } from "lucide-react";
import { useGetOneJob } from "../../hooks/useGetQueries";
import type { JobCardProps } from "../../dataTypes";
import { Button } from "../ui/button";
import { Link } from "react-router";
import AddToSavedJobs from "../User/savedJobsToggle";

const JobBigCard = ({ job_id, guestUser, user }: JobCardProps) => {
  const { job, isFetching: jobFetching } = useGetOneJob(job_id!);

  const isJobApplied =
    guestUser?.jobs_applied?.some(
      (applied) => applied.job_id === job?.job_id,
    ) ||
    user?.user?.jobs_applied?.some((applied) => applied.job_id === job?.job_id);

  return (
    <article className="sticky top-1 right-0 flex cursor-pointer flex-col p-[3%] transition-all transition-discrete hover:shadow max-lg:h-100 max-lg:overflow-y-auto lg:h-140 lg:w-[80%] lg:rounded lg:border hover:[&>h2]:underline">
      <h2
        className={`${jobFetching ? "animante my-[2%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "py-[2%] text-xl font-bold"}`}
      >
        {job?.title}
      </h2>
      <p
        className={`${jobFetching ? "animante my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "py-[2%]"} `}
      >
        {job?.company_name}
      </p>
      <p
        className={`${jobFetching ? "animante my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "py-[2%]"} `}
      >
        {job?.location}
      </p>
      <p
        className={`${jobFetching ? "animante my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "py-[2%]"} `}
      >
        {job?.type}
      </p>
      <div className="flex items-center gap-2 border-b pb-4">
        {isJobApplied ? (
          <span className="flex items-center gap-1">
            {jobFetching ? (
              <span className="animate animate-pulse bg-neutral-300 text-neutral-300">
                Loading
              </span>
            ) : (
              <>
                <CircleCheck className="text-green-500" />
                <span className="font-medium italic">Applied</span>
              </>
            )}
          </span>
        ) : (
          <>
            <Button>
              <Link to={"/application"} state={job}>
                Apply for this job
              </Link>
            </Button>
            <AddToSavedJobs job={job!} />
          </>
        )}
      </div>
      <div className="lg:overflow-y-auto">
        <h3 className="py-[6%] text-lg font-medium">Job details</h3>
        <div className="flex w-full flex-wrap items-center gap-3 border-b pb-[7%]">
          <span
            className={`${jobFetching ? "animante mx-[2%] my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600"} `}
          >
            {job?.type}
          </span>
          <span
            className={`${jobFetching ? "animante mx-[2%] my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600"} `}
          >
            {job?.pay}
          </span>
          <span
            className={`${jobFetching ? "animante mx-[2%] my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600"} `}
          >
            {job?.description?.shift_pattern}
          </span>
        </div>

        <h3
          className={`${jobFetching ? "animante my-[4%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "py-[6%] text-lg font-medium"}`}
        >
          Job description
        </h3>
        <h4 className="pb-[5%] font-medium uppercase">About us</h4>
        <p
          className={`font-light ${jobFetching && "animante my-[4%] w-40 animate-pulse bg-neutral-300 text-neutral-300"}`}
        >
          {job?.description?.about_us}
        </p>
        <h4 className="py-[5%] font-medium uppercase">What you going to do</h4>
        <p
          className={`font-light ${jobFetching && "animante my-[4%] w-40 animate-pulse bg-neutral-300 text-neutral-300"}`}
        >
          {job?.description?.job_details}
        </p>
        <h4 className="py-[5%] font-medium uppercase">Requirements</h4>
        <p
          className={`font-light ${jobFetching && "animante my-[4%] w-40 animate-pulse bg-neutral-300 text-neutral-300"}`}
        >
          {job?.description?.requirements}
        </p>
        <ul className="flex w-full flex-wrap gap-3 py-[5%]">
          {job?.skills?.map((skill) => (
            <li
              className={`${jobFetching ? "animante mx-[2%] my-[1%] w-40 animate-pulse bg-neutral-300 text-neutral-300" : "w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600"}`}
            >
              {skill.skills_name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default JobBigCard;
