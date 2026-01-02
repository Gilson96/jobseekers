import { useState, type FormEvent } from "react";
import FormJobDetails from "../ui/formJobDetails";
import { usePostJob } from "../../hooks/usePostQueries";
import type { Company, Job } from "../../dataTypes";
import { Button } from "../ui/button";
import { useGetOneJob } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";

const CompanyPostJob = ({ company }: { company: Company }) => {
  const { isError, isPending, isSuccess, mutate } = usePostJob();
  const { isFetching, isLoading, job } = useGetOneJob(1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(formData.entries()) as {
      [k: string]: string;
    };

    const newJob: Job = {
      title: dataFromForm.title,
      location: dataFromForm.location,
      pay: dataFromForm.pay,
      type: dataFromForm.type,
      company_id: company.company_id,
      description: {
        about_us: dataFromForm.about_us,
        job_details: dataFromForm.job_details,
        requirements: dataFromForm.requirements,
        shift_pattern: dataFromForm.shift_pattern,
      },
    };

    mutate(newJob);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col justify-around pt-2"
    >
      <FormJobDetails action="post" job={job} />
      <Button>
        {isPending ? (
          <Loader2Icon className="animate animate-spin text-teal-500" />
        ) : (
          "Post"
        )}
      </Button>
    </form>
  );
};

export default CompanyPostJob;
