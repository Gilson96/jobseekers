import { useGetAllJobs } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";
import useScreenSize from "../../hooks/useScreenSize";
import JobCard from "./jobCard";
import { useEffect, useState } from "react";
import JobBigCard from "./jobBigCard";
import type { JobSearch } from "../../dataTypes";

const Jobs = ({
  isSearchingJob,
  searchedJob,
  searchFetching,
  searchLoading,
  user,
  guestUser,
  userIsFetching,
}: JobSearch) => {
  const { jobs, isFetching, isLoading } = useGetAllJobs();
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 1000;
  const [job_id, setJob_id] = useState<number>(1);

  useEffect(() => {
    if (isSearchingJob) {
      setJob_id(searchedJob?.[0].job_id as number);
    } else {
      setJob_id(jobs?.[0]?.job_id as number);
    }
  }, [searchedJob]);

  if (isLoading || searchLoading) {
    return (
      <section className="py-[2%]">
        <h2 className="text-xl">Jobs for you</h2>
        <div className="flex items-center justify-center gap-40">
          <div className="mt-3 flex w-full cursor-pointer flex-col items-start rounded border p-[3%] hover:shadow hover:[&>h2]:underline">
            <span className="animate animate-pulse bg-neutral-300 text-neutral-300">
              loading
            </span>
            <span className="animate mt-4 w-40 animate-pulse bg-neutral-300 text-neutral-300">
              loading
            </span>
            <div className="flex items-center justify-between gap-10">
              <span className="animate mt-4 animate-pulse bg-neutral-300 text-neutral-300">
                loading
              </span>
              <span className="animate mt-4 animate-pulse bg-neutral-300 text-neutral-300">
                loading
              </span>
            </div>
          </div>
          <div className="mt-3 flex w-full cursor-pointer flex-col items-start rounded border p-[3%] hover:shadow hover:[&>h2]:underline">
            <span className="animate animate-pulse bg-neutral-300 text-neutral-300">
              loading
            </span>
            <span className="animate mt-4 w-40 animate-pulse bg-neutral-300 text-neutral-300">
              loading
            </span>
            <div className="flex items-center justify-between gap-10">
              <span className="animate mt-4 animate-pulse bg-neutral-300 text-neutral-300">
                loading
              </span>
              <span className="animate mt-4 animate-pulse bg-neutral-300 text-neutral-300">
                loading
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mobileView) {
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
            <JobCard
              user={user}
              setJob_id={setJob_id}
              job={undefined}
              isFetching={true}
              guestUser={guestUser}
            />
            <JobCard
              guestUser={guestUser}
              user={user!}
              userIsFetching={userIsFetching}
              setJob_id={setJob_id}
              job={undefined}
              isFetching={isFetching}
            />
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
                  <JobCard
                    user={user}
                    setJob_id={setJob_id}
                    job={job}
                    isFetching={false}
                    guestUser={guestUser}
                  />
                ))
              : jobs?.map((job) => (
                  <JobCard
                    user={user}
                    setJob_id={setJob_id}
                    job={job}
                    isFetching={false}
                    guestUser={guestUser}
                  />
                ))}
          </li>
          <JobBigCard
            setJob_id={() => {}}
            job_id={job_id}
            guestUser={guestUser}
            user={user!}
            userIsFetching={userIsFetching}
          />
        </div>
      </ul>
    );
  }
};

export default Jobs;
