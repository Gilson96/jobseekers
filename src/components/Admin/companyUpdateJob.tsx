import { useGetOneJob } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { Job } from "../../dataTypes";
import { useUpdateJob } from "../../hooks/usePatchQueries";
import FormJobDetails from "../ui/formJobDetails";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CompanyUpdateJob = ({ job_id }: { job_id: number }) => {
  const [open, setOpen] = useState(false);
  const {
    isFetching: isJobFetching,
    isLoading: isJobLoading,
    job,
  } = useGetOneJob(job_id);
  const {
    isError: isErrorUpdating,
    isPending: isPendingUpdating,
    isSuccess: isSuccessUpdating,
    mutate: updateJob,
  } = useUpdateJob(job_id);

  useEffect(() => {
    if (isSuccessUpdating) {
      toast.success("Success!", { style: { backgroundColor: "#b9f8cf" } });
      return setOpen(false);
    }
  }, [isSuccessUpdating]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(formData.entries()) as {
      [k: string]: string;
    };

    const formattedData = {
      title:
        dataFromForm.title !== undefined && dataFromForm.title.length !== 0
          ? dataFromForm.title
          : job?.title,
      location:
        dataFromForm.location !== undefined &&
        dataFromForm.location.length !== 0
          ? dataFromForm.location
          : job?.location,
      pay:
        dataFromForm.pay !== undefined && dataFromForm.pay.length !== 0
          ? dataFromForm.pay
          : job?.pay,
      type:
        dataFromForm.type !== undefined && dataFromForm.type.length !== 0
          ? dataFromForm.type
          : job?.type,
      description: {
        about_us:
          dataFromForm.about_us !== undefined &&
          dataFromForm.about_us.length !== 0
            ? dataFromForm.about_us
            : job?.description?.about_us,
        job_details:
          dataFromForm.job_details !== undefined &&
          dataFromForm.job_details.length !== 0
            ? dataFromForm.job_details
            : job?.description?.job_details,
        shift_pattern:
          dataFromForm.shift_pattern !== undefined &&
          dataFromForm.shift_pattern.length !== 0
            ? dataFromForm.shift_pattern
            : job?.description?.shift_pattern,
        requirements:
          dataFromForm.requirements !== undefined &&
          dataFromForm.requirements.length !== 0
            ? dataFromForm.requirements
            : job?.description?.requirements,
      },
    } as Job;

    updateJob(formattedData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"outline"} className="w-full px-8 font-normal">
          Update details
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80%] overflow-hidden overflow-y-auto">
        <DialogTitle className="w-full border-b pb-[3%]">
          Update job details
        </DialogTitle>
        {isJobLoading || isJobFetching ? (
          <Loader2Icon className="animate animate-spin place-self-center text-teal-500" />
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col">
            <p className="flex w-full pb-[3%] text-left italic">
              *If no input it will keep the old value
            </p>
            <FormJobDetails action="update" job={job!} />
            {isErrorUpdating && (
              <p className="my-[2%] text-xs text-red-500">
                Something went wrong. Try again later
              </p>
            )}
            <Button className="mt-[3%]">
              {isPendingUpdating ? <Loader2Icon /> : "Update"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompanyUpdateJob;
