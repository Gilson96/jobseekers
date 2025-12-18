import { useGetAllJobs } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";
import useScreenSize from "../../hooks/useScreenSize";
import JobCard from "./jobCard";
import { useState, type Dispatch, type SetStateAction } from "react";
import JobBigCard from "./jobBigCard";
import type { Job } from "../../dataTypes";

type JobsProps = {
  isSearchingJob: boolean;
  searchedJob?: Job[];
  searchFetching: boolean;
  searchLoading: boolean;
};

const Jobs = ({
  isSearchingJob,
  searchedJob,
  searchFetching,
  searchLoading,
}: JobsProps) => {
  const { jobs, error, isFetching, isLoading } = useGetAllJobs();
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 1000;
  const [jobId, setJobId] = useState(1);

  if (mobileView) {
    if (isLoading || searchLoading) {
      return (
        <section className="py-[2%]">
          <h2 className="font-medium">Jobs for you</h2>
          <Loader2Icon className="animate mt-[10%] w-full animate-spin place-self-center text-teal-600" />
        </section>
      );
    }

    if (isFetching || searchFetching) {
      return (
        <section className="py-[2%]">
          <h2 className="pb-[5%] font-medium">Jobs for you</h2>
          <JobCard
            setJobId={setJobId}
            job={undefined}
            isFetching={isFetching}
          />
        </section>
      );
    }

    return (
      <ul>
        <h2 className="pt-[2%] pb-[5%] font-medium">Jobs for you</h2>
        <li className="flex flex-col gap-3">
          {isSearchingJob
            ? searchedJob?.map((job) => (
                <JobCard
                  setJobId={setJobId}
                  job={job}
                  isFetching={searchFetching}
                />
              ))
            : jobs?.map((job) => (
                <JobCard setJobId={setJobId} job={job} isFetching={false} />
              ))}
        </li>
      </ul>
    );
  } else {
    if (isLoading || searchLoading) {
      return (
        <section className="w-[80%] place-self-center py-[2%]">
          <h2 className="text-lg font-medium">Jobs for you</h2>
          <Loader2Icon className="animate mt-[3%] animate-spin place-self-center text-teal-600" />
        </section>
      );
    }

    if (isFetching || searchFetching) {
      return (
        <section className="w-[80%] place-self-center">
          <h2 className="py-[2%] text-lg font-medium">Jobs for you</h2>
          <div className="flex h-60 w-full justify-between gap-10">
            <JobCard setJobId={setJobId} job={undefined} isFetching={true} />
            <JobCard setJobId={setJobId} job={undefined} isFetching={true} />
          </div>
        </section>
      );
    }

    return (
      <ul className="w-[80%] place-self-center">
        <h2 className="pt-[2%] pb-[3%] text-lg font-medium">Jobs for you</h2>
        <div className="flex gap-4">
          <li className="flex w-[50%] flex-col gap-3">
            {isSearchingJob
              ? searchedJob?.map((job) => (
                  <JobCard setJobId={setJobId} job={job} isFetching={false} />
                ))
              : jobs?.map((job) => (
                  <JobCard setJobId={setJobId} job={job} isFetching={false} />
                ))}
          </li>
          <JobBigCard jobId={jobId} />
        </div>
      </ul>
    );
  }
};

export default Jobs;
