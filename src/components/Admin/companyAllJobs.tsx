import { Ellipsis, Loader2Icon, Trash2 } from "lucide-react";
import type { Company } from "../../dataTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useGetOneJob } from "../../hooks/useGetQueries";
import { useState } from "react";
import { Button } from "../ui/button";
import { useDeleteCompanyJob } from "../../hooks/useDeleteQueries";

import CompanyJobDetails from "./companyJobDetails";
import CompanyUpdateJob from "./companyUpdateJob";

const CompanyJobs = ({ company }: { company: Company }) => {
  const [job_id, setJob_id] = useState<number>(1);

  const {
    isError: isRemovingError,
    isPending: isRemovingPending,
    isSuccess: isRemovingSuccess,
    mutate: removeJob,
  } = useDeleteCompanyJob(job_id);

  return (
    <section className="w-full">
      <h2 className="pb-[2%] text-lg font-medium">All jobs</h2>
      <ul className="flex w-full flex-col">
        {company.jobs_posted?.map((job, index) => (
          <li
            key={job.job_id}
            onClick={() => setJob_id(job.job_id)}
            className="flex h-full w-full justify-between border-t border-b py-[2%] hover:bg-neutral-100"
          >
            <CompanyJobDetails job_id={job_id}>
              <p className="flex w-full cursor-pointer flex-col items-start justify-start hover:underline">
                <span className="text-lg font-medium">{job?.title}</span>
                <span className="text-sm text-neutral-600">
                  {job?.location}
                </span>
              </p>
            </CompanyJobDetails>
            <p className="flex flex-col items-center justify-around">
              <Dialog>
                <DialogTrigger>
                  <Trash2 className="size-5 cursor-pointer text-red-500 hover:text-red-500/60" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This will remove this job from the job board
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex w-full flex-col">
                    {isRemovingError && (
                      <p className="text-xs text-red-500">
                        * Somenthing went wrong. Try again later
                      </p>
                    )}
                    <Button
                      className="w-full bg-red-500 text-white hover:bg-red-500/80"
                      onClick={() => {
                        (setJob_id(job.job_id), removeJob());
                      }}
                    >
                      {isRemovingPending ? (
                        <Loader2Icon className="animate animate-spin text-white" />
                      ) : (
                        "Remove"
                      )}
                    </Button>
                    <DialogClose className="w-full">
                      <Button
                        className="w-full text-teal-500"
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <Ellipsis className="size-5 cursor-pointer text-neutral-600 hover:text-neutral-600/60" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <CompanyUpdateJob job_id={job_id} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CompanyJobs;
