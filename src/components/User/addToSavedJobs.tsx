import { toast } from "sonner";
import type { Job } from "../../dataTypes";
import { useUserLoginStore } from "../../hooks/store";
import { useGetSavedJob } from "../../hooks/useGetQueries";
import { usePostSavedJobs } from "../../hooks/usePostQueries";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { BookMarkedIcon, Loader2Icon } from "lucide-react";

const AddToSavedJobs = ({ job }: { job: Job }) => {
  const user = useUserLoginStore((s) => s.user);
  const saved_job = { user_id: user.id!, job_id: job.job_id as number };
  const {
    savedJobs,
    isFetching: savedJobsFetching,
    isLoading: savedJobsLoading,
  } = useGetSavedJob();
  const { isError, isPending, isSuccess, mutate } = usePostSavedJobs(saved_job);
console.log(user.id)
  const flatSavedJobs = savedJobs
    ?.map((job) => {
      return job.saved_jobs?.flat(Infinity);
    })
    .flat(Infinity) as Job[];

  const existsInSavedJobs = () => {
    return flatSavedJobs?.some((saved) => saved.job_id === job.job_id);
  };

  if (isSuccess) {
    return toast.success("This job was successfully saved", {
      style: { backgroundColor: "oklch(60% 0.118 184.704)", color: "white" },
    });
  }

  if (isError) {
    return toast.error("Somenthins is wrong, try again later", {
      style: { backgroundColor: "oklch(70.4% 0.191 22.216)", color: "white" },
    });
  }

  if (user === undefined) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex w-10 items-center justify-center rounded border p-1.25">
            <BookMarkedIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>You must sign in before saving a job</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (savedJobsFetching || savedJobsLoading || isPending) {
    return (
      <button className="flex w-10 items-center justify-center rounded border p-1.25">
        <Loader2Icon className="animate animate-spin text-teal-500" />
      </button>
    );
  }

  if (existsInSavedJobs()) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex w-10 items-center justify-center rounded border bg-teal-500 p-1.25">
            <BookMarkedIcon className="text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>You must sign in before saving a job</p>
        </TooltipContent>
      </Tooltip>
    );
  } else {
    return (
      <button
        onClick={() => mutate()}
        className="flex w-10 items-center justify-center rounded border p-1.25"
      >
        <BookMarkedIcon />
      </button>
    );
  }
};

export default AddToSavedJobs;
