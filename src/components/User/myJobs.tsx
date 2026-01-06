import { Loader2Icon, LoaderCircle } from "lucide-react";
import { useGetSavedJob, useGetUser } from "../../hooks/useGetQueries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { User } from "../../dataTypes";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import JobBigCard from "../Jobs/jobBigCard";

const MyJobs = () => {
  const { isFetching, isLoading, userData: user } = useGetUser();

  return (
    <section>
      <h2 className="py-[3%] text-lg font-medium">My jobs</h2>
      <Tabs defaultValue="applied_jobs" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="cursor-pointer" value="saved_jobs">
            Saved Jobs
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="applied_jobs">
            Applied Jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col gap-2 py-[2%]" value="saved_jobs">
          {(isFetching || isLoading) && (
            <Loader2Icon className="animate animate-spin place-self-center text-teal-500" />
          )}
          <SavedJobs
            user={user as { user: User }}
            userIsFetching={isFetching}
          />
        </TabsContent>
        <TabsContent
          value="applied_jobs"
          className="flex flex-col gap-2 py-[2%]"
        >
          {(isFetching || isLoading) && (
            <Loader2Icon className="animate animate-spin place-self-center text-teal-500" />
          )}
          <AppliedJobs
            user={user as { user: User }}
            userIsFetching={isFetching}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyJobs;

export const SavedJobs = ({
  user,
  userIsFetching,
}: {
  user: { user: User };
  userIsFetching: boolean;
}) => {
  const {
    isFetching: savedJobFetching,
    isLoading: savedJobLoading,
    savedJobs,
  } = useGetSavedJob();

  if (savedJobFetching || savedJobLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate size-10 animate-spin text-teal-600" />
      </div>
    );
  }

  return savedJobs?.map((job) => {
    return job.saved_jobs?.map((saved) => (
      <Dialog>
        <DialogTrigger>
          <div className="border-b pb-[3%] text-left leading-7">
            <p className="font-medium">{saved.title}</p>
            <p>{saved.company_name}</p>
            <p>{saved.location}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <JobBigCard
            setJob_id={() => {}}
            job_id={saved.job_id as number}
            guestUser={undefined}
            user={user}
            userIsFetching={userIsFetching}
          />
        </DialogContent>
      </Dialog>
    ));
  });
};

export const AppliedJobs = ({
  user,
  userIsFetching,
}: {
  user: { user: User };
  userIsFetching: boolean;
}) => {
  return user?.user?.jobs_applied?.map((job) => (
    <Dialog>
      <DialogTrigger>
        <div className="border-b pb-[3%] text-left leading-7">
          <p className="font-medium">{job.title}</p>
          <p>{job.company_name}</p>
          <p>{job.location}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <JobBigCard
          setJob_id={() => {}}
          job_id={job.job_id as number}
          guestUser={undefined}
          user={user}
          userIsFetching={userIsFetching}
        />
      </DialogContent>
    </Dialog>
  ));
};
