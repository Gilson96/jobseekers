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
import { Trash2, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteCompanyJob } from "../../hooks/useDeleteQueries";

const CompanyRemoveJob = ({ job_id }: { job_id: number }) => {
  const {
    isError,
    isPending,
    isSuccess,
    mutate: removeJob,
  } = useDeleteCompanyJob(job_id);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full" variant={"destructive"}>Remove job</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will remove this job from the job board
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full flex-col">
          {isError && (
            <p className="text-xs text-red-500">
              * Somenthing went wrong. Try again later
            </p>
          )}
          <Button
            className="w-full bg-red-500 text-white hover:bg-red-500/80"
            onClick={() => removeJob()}
          >
            {isPending ? (
              <Loader2Icon className="animate animate-spin text-white" />
            ) : (
              "Remove"
            )}
          </Button>
          <DialogClose className="w-full">
            <Button className="w-full text-teal-500" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyRemoveJob;
