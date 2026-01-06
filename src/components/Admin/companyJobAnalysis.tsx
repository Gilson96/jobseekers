import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Loader2Icon } from "lucide-react";
import { useGetApplicationJob } from "../../hooks/useGetQueries";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const CompanyJobAnalysis = ({ job_id }: { job_id: number }) => {
  const {
    isFetching: isApplicationFetching,
    isLoading: isApplicationLoading,
    jobApplications,
  } = useGetApplicationJob(job_id);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full font-normal" variant={"outline"}>
          See Analysis
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="w-full border-b pb-[3%]">Analysis</DialogTitle>
        <Table className="w-full">
          <TableCaption>
            A list of users that applied for this job.
          </TableCaption>
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead>App n.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isApplicationFetching || isApplicationLoading ? (
              <section className="h-full w-full items-center justify-center">
                <Loader2Icon className="animate animate-spin text-teal-500" />
              </section>
            ) : (
              jobApplications?.map((applier) => (
                <TableRow key={applier.application_job_id}>
                  <TableCell className="border-r">
                    #{applier.application_id}
                  </TableCell>
                  <TableCell className="border-r">
                    {applier.name?.length === 0
                      ? applier.guest_email
                      : applier.name}
                  </TableCell>
                  <TableCell className="border-r">
                    {applier.email?.length === 0
                      ? applier.guest_name
                      : applier.email}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyJobAnalysis;
