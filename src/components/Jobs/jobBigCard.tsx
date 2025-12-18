import { BookMarkedIcon } from "lucide-react";
import { useGetOneJob } from "../../hooks/useGetQueries";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const JobBigCard = ({ jobId }: { jobId: number }) => {
  const { job } = useGetOneJob(jobId);

  return (
    <article className="sticky top-0 right-0 flex h-full cursor-pointer flex-col rounded border p-[3%] hover:shadow hover:[&>h2]:underline">
      <h2 className="py-[2%] text-xl font-bold">{job?.title}</h2>
      <p className="py-[1%]">{job?.company_name}</p>
      <p className="py-[1%]">{job?.location}</p>
      <p className="py-[1%]">{job?.type}</p>
      <div className="flex items-center gap-2 border-b pb-2">
        <Button>Apply for this job</Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex w-10 items-center justify-center rounded border p-1.25 dark:bg-teal-500">
              <BookMarkedIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>You must sign in before saving a job</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <h3 className="py-[4%] text-lg font-medium">Job details</h3>
      <div className="flex w-full flex-wrap items-center gap-3 border-b pb-[5%]">
        <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
          {job?.type}
        </span>
        <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
          {job?.pay}
        </span>
        <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
          {job?.description?.shift_pattern}
        </span>
      </div>

      <h3 className="py-[4%] text-lg font-medium">Job description</h3>
      <h4 className="pb-[2%] font-medium uppercase">About us</h4>
      <p>{job?.description?.about_us}</p>
      <h4 className="py-[2%] font-medium uppercase">What you going to do</h4>
      <p>{job?.description?.job_details}</p>
      <h4 className="py-[2%] font-medium uppercase">Requirements</h4>
      <p>{job?.description?.requirements}</p>
      <ul className="flex w-full flex-wrap gap-3 py-[2%]">
        {job?.skills?.map((skill) => (
          <li className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default JobBigCard;
