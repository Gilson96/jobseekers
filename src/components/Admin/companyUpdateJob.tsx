import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useGetOneJob } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useState, type FormEvent } from "react";
import type { Job } from "../../dataTypes";
import { useUpdateJob } from "../../hooks/usePatchQueries";

const CompanyUpdateJob = ({ job_id }: { job_id: number }) => {
  const {
    isFetching: isJobFetching,
    isLoading: isJobLoading,
    job,
  } = useGetOneJob(job_id);
  const { isError, isPending, isSuccess, mutate } = useUpdateJob(job_id);

  const [updatedJob, setUpdateJob] = useState<Job>({
    title: job?.title,
    location: job?.location,
    pay: job?.pay,
    type: job?.type,
    description: {
      about_us: job?.description?.about_us!,
      job_details: job?.description?.job_details!,
      requirements: job?.description?.requirements!,
      shift_pattern: job?.description?.shift_pattern!,
    },
  });

  if (isJobFetching || isJobLoading) {
    return (
      <Loader2Icon className="animate flex w-full animate-spin items-center justify-center text-teal-500" />
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(formData.entries());

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

    mutate(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col pt-2">
      <p className="flex w-full py-[3%] text-left italic">
        *If no input it will keep the old value
      </p>
      <section className="flex w-full justify-between">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
              name="title"
              className="italic placeholder:text-black"
              placeholder={job?.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              type="location"
              name="location"
              className="italic placeholder:text-black"
              placeholder={job?.location}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pay">Pay</Label>
            <Input
              type="pay"
              name="pay"
              className="italic placeholder:text-black"
              placeholder={job?.pay}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">type</Label>
            <Input
              type="type"
              name="type"
              className="italic placeholder:text-black"
              placeholder={job?.type}
            />
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="about_us">About Us</Label>
            <Input
              type="about_us"
              name="about_us"
              className="italic placeholder:text-black"
              placeholder={job?.description?.about_us}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="job_details">Job details</Label>
            <Input
              type="job_details"
              name="job_details"
              className="italic placeholder:text-black"
              placeholder={job?.description?.job_details}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Input
              type="requirements"
              name="requirements"
              className="italic placeholder:text-black"
              placeholder={job?.description?.requirements}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="shift_pattern">Shift pattern</Label>
            <Input
              type="shift_pattern"
              name="shift_pattern"
              className="italic placeholder:text-black"
              placeholder={job?.description?.shift_pattern}
            />
          </div>
        </section>
      </section>
      <section className="flex w-full flex-col gap-2">
        <Button className="mt-8">Continue</Button>
        <DialogClose>
          {" "}
          <Button variant={"outline"} className="w-full">
            Close
          </Button>
        </DialogClose>
      </section>
    </form>
  );
};

export default CompanyUpdateJob;
