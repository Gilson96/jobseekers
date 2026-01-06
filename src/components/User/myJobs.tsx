import { LoaderCircle } from "lucide-react";
import { useGetSavedJob, useGetUser } from "../../hooks/useGetQueries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { User } from "../../dataTypes";

const MyJobs = () => {
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
          <SavedJobs />
        </TabsContent>
        <TabsContent
          value="applied_jobs"
          className="flex flex-col gap-2 py-[2%]"
        >
          <AppliedJobs />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyJobs;

export const SavedJobs = () => {
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
      <div className="border-b pb-[3%] leading-7">
        <p className="font-medium">{saved.title}</p>
        <p>{saved.company_name}</p>
        <p>{saved.location}</p>
      </div>
    ));
  });
};

export const AppliedJobs = () => {
  const { isFetching, isLoading, userData } = useGetUser();

  if (isFetching || isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate size-10 animate-spin text-teal-600" />
      </div>
    );
  }

  const { user } = (userData as { user: User }) ?? {};

  return user?.jobs_applied?.map((job) => (
    <div className="border-b pb-[3%] leading-7">
      <p className="font-medium">{job.title}</p>
      <p>{job.company_name}</p>
      <p>{job.location}</p>
    </div>
  ));
};
