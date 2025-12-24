import { CircleCheck } from "lucide-react";
import type { Job, User } from "../../dataTypes";
import type { Dispatch, SetStateAction } from "react";

type JobCardProps = {
  job?: Job;
  isFetching: boolean;
  setJobId: Dispatch<SetStateAction<number>>;
  user: User;
};

const JobCard = ({ job, isFetching, setJobId, user }: JobCardProps) => {
  const isJobApplied = user?.jobs_applied?.some(
    (applied) => applied.job_id === job?.job_id,
  );

  return (
    <article
      onClick={() => setJobId(job?.job_id as number)}
      className={`flex w-full cursor-pointer flex-col items-start rounded border p-[3%] hover:shadow hover:[&>h2]:underline`}
    >
      <h2 className="flex w-full items-center justify-between py-[2%]">
        <span
          className={
            isFetching
              ? "animate animate-pulse bg-neutral-300 text-neutral-300"
              : "text-xl font-bold"
          }
        >
          {isFetching ? "fetching" : job?.title}
        </span>
        {isJobApplied && (
          <span className="flex items-center gap-1">
            <CircleCheck className="text-green-500" />
            <span className="font-medium italic">Applied</span>
          </span>
        )}
      </h2>
      <p
        className={
          isFetching
            ? "animate my-[2%] animate-pulse bg-neutral-300 text-neutral-300"
            : "py-[2%] text-neutral-600"
        }
      >
        {isFetching ? "fetching" : job?.company_name}
      </p>
      <ul className="flex w-full flex-wrap gap-1">
        <li
          className={
            isFetching
              ? "animate animate-pulse bg-neutral-400 text-neutral-400"
              : "rounded bg-neutral-200 px-[2%] py-[1%] font-medium text-neutral-600"
          }
        >
          {isFetching ? "fetching" : job?.pay}
        </li>
        <li
          className={
            isFetching
              ? "animate animate-pulse bg-neutral-400 text-neutral-400"
              : "rounded bg-neutral-200 px-[2%] py-[1%] font-medium text-neutral-600"
          }
        >
          {isFetching ? "fetching" : job?.type}
        </li>
        <li
          className={
            isFetching
              ? "animate animate-pulse bg-neutral-400 text-neutral-400"
              : "rounded bg-neutral-200 px-[2%] py-[1%] font-medium text-neutral-600"
          }
        >
          {isFetching ? "fetching" : job?.description?.shift_pattern}
        </li>
      </ul>
    </article>
  );
};

export default JobCard;
