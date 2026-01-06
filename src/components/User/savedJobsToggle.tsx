import type { Job } from "../../dataTypes";
import { useUserLoginStore } from "../../hooks/store";
import { useGetSavedJob } from "../../hooks/useGetQueries";
import { usePostSavedJobs } from "../../hooks/usePostQueries";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { BookMarkedIcon, Loader2Icon } from "lucide-react";
import { useDeleteSavedJobs } from "../../hooks/useDeleteQueries";

const AddToSavedJobs = ({ job }: { job: Job }) => {
  const user = useUserLoginStore((s) => s.user);
  const saved_job = { user_id: user.id!, job_id: job?.job_id as number };
  const {
    savedJobs,
    isFetching: savedJobsFetching,
    isLoading: savedJobsLoading,
  } = useGetSavedJob();
  const {
    isError: isErrorPosting,
    isPending: isPendingPosting,
    isSuccess: isSuccessPosting,
    mutate: postSavedJob,
  } = usePostSavedJobs(saved_job);

  const flatSavedJobs = savedJobs
    ?.map((job) => {
      return job.saved_jobs?.flat(Infinity);
    })
    .flat(Infinity) as Job[];

  const existsInSavedJobs = () => {
    return flatSavedJobs?.some((saved) => saved.job_id === job?.job_id);
  };

  const findSavedJob = () => {
    return savedJobs?.find(
      (saved) => saved?.saved_jobs?.[0].job_id === job?.job_id,
    );
  };

  const {
    isError: isErrorDeleting,
    isPending: isPendingDeleting,
    isSuccess: isSuccessDeleting,
    mutate: deleteSavedJob,
  } = useDeleteSavedJobs(findSavedJob()?.saved_job_id!);

  if (user.name === "guest") {
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

  if (
    savedJobsFetching ||
    savedJobsLoading ||
    isPendingPosting ||
    isPendingDeleting
  ) {
    return (
      <button className="flex w-10 items-center justify-center rounded border p-1.25">
        <Loader2Icon className="animate animate-spin text-teal-500" />
      </button>
    );
  }

  if (existsInSavedJobs()) {
    return (
      <button
        onClick={() => deleteSavedJob()}
        className="flex w-10 items-center justify-center rounded border bg-teal-500 p-1.25 text-white"
      >
        <BookMarkedIcon />
      </button>
    );
  } else {
    return (
      <button
        onClick={() => postSavedJob()}
        className="flex w-10 items-center justify-center rounded border p-1.25"
      >
        <BookMarkedIcon />
      </button>
    );
  }
};

export default AddToSavedJobs;
