import {
  useEffect,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import FormJobDetails from "../ui/formJobDetails";
import { usePostJob } from "../../hooks/usePostQueries";
import type { Company, Job } from "../../dataTypes";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const CompanyPostJob = ({
  company,
  setActiveTab,
}: {
  company: Company;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const { isError, isPending, isSuccess, mutate } = usePostJob(
    company?.company_id as number,
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success!", { style: { backgroundColor: "#b9f8cf" } });
      setActiveTab("allJobs");
    }
  }, [isSuccess, isError]);

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
    <section>
      <h2 className="border-b pt-[2%] pb-[5%] text-lg lg:pt-4 lg:pb-2 lg:text-xl lg:font-medium">
        Add a job
      </h2>
      <p className="flex w-full flex-col text-left italic max-lg:hidden">
        <span>*All values required</span>
        <span className="text-red-500">
          {isError && "Somenthing went wrong. Try again later"}
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col justify-around py-[5%]"
      >
        <FormJobDetails action="post" />
        {isError && (
          <p className="py-[2%] text-xs text-red-500">
            * Something went wrong. Try again later
          </p>
        )}
        <Button className="mt-[4%]">
          {isPending ? (
            <Loader2Icon className="animate animate-spin text-teal-500" />
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </section>
  );
};

export default CompanyPostJob;
