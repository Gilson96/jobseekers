import { CircleCheck } from "lucide-react";
import type { JobCardProps } from "../../dataTypes";

const JobCard = ({
  job,
  isFetching,
  setJob_id,
  guestUser,
  user,
  userIsFetching,
}: JobCardProps) => {
  const isJobApplied =
    guestUser?.jobs_applied?.some(
      (applied) => applied.job_id === job?.job_id,
    ) ||
    user?.user?.jobs_applied?.some((applied) => applied.job_id === job?.job_id);

  return (
    <article
      onClick={() => setJob_id(job?.job_id as number)}
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
            {userIsFetching ? (
              <span className="animate animate-pulse bg-neutral-300 text-neutral-300">
                Loading
              </span>
            ) : (
              <CircleCheck className="text-green-500" />
            )}
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
