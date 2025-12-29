import type { Job } from "../../dataTypes";
import { useGetApplicationJob, useGetOneJob } from "../../hooks/useGetQueries";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type React from "react";
import { Loader2Icon } from "lucide-react";

const CompanyJobDetails = ({
  job_id,
  children,
}: {
  job_id: number;
  children: React.ReactNode;
}) => {
  const {
    isFetching: isApplicationFetching,
    isLoading: isApplicationLoading,
    jobApplications,
  } = useGetApplicationJob(job_id as number);
  const {
    isFetching: isJobFetching,
    isLoading: isJobLoading,
    job,
  } = useGetOneJob(job_id);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex h-[70%] w-full flex-col items-start justify-around overflow-y-auto p-[2%]">
        <Accordion
          className="w-full border-b pt-[2rem]"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <AccordionItem value="item-1" className="h-full w-full">
            <AccordionTrigger className="w-full">
              <h3 className="w-full text-lg">Appliers:</h3>
            </AccordionTrigger>
            <AccordionContent className="h-full w-full">
              <Table className="w-full">
                <TableCaption>
                  A list of users that applied for this job.
                </TableCaption>
                <TableHeader className="w-full">
                  <TableRow className="w-full">
                    <TableHead>App n.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cv</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                  {isApplicationFetching || isApplicationLoading ? (
                    <section className="w-full h-full justify-center items-center">
                      <Loader2Icon className="animate animate-spin text-teal-500" />
                    </section>
                  ) : (
                    jobApplications?.map((applier) => (
                      <TableRow key={applier.application_job_id}>
                        <TableCell className="border-r">
                          #{applier.application_id}
                        </TableCell>
                        <TableCell className="border-r">
                          {applier.name}
                        </TableCell>
                        <TableCell className="border-r">
                          {applier.email}
                        </TableCell>
                        <TableCell>cv</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {isJobFetching || isJobLoading ? (
          <section className="w-full h-full justify-center items-center">
            <Loader2Icon className="animate animate-spin text-teal-500" />
          </section>
        ) : (
          <>
            <h2 className="py-[2%] font-bold">{job?.title}</h2>
            <p className="py-[1%]">{job?.company_name}</p>
            <p className="py-[1%]">{job?.location}</p>
            <p className="py-[1%]">{job?.type}</p>
            <div className="lg:overflow-y-auto">
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
              <h4 className="py-[2%] font-medium uppercase">
                What you going to do
              </h4>
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompanyJobDetails;
