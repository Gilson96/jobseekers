import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useGetAllJobs } from "../../hooks/useGetQueries";
import JobCard from "./jobCard";
import type { JobSearch } from "../../dataTypes";
import { useState } from "react";
import JobBigCard from "./jobBigCard";

const JobsMobiileView = ({
  isSearchingJob,
  searchedJob,
  searchFetching,
  searchLoading,
  user,
  guestUser,
  userIsFetching,
}: JobSearch) => {
  const { jobs, isFetching, isLoading } = useGetAllJobs();
  const [job_id, setJob_id] = useState(1);

  if (!isLoading || !searchLoading) {
    return (
      <section className="py-[2%]">
        <h2 className="text-xl">Jobs for you</h2>
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
      </section>
    );
  }

  if (isFetching || searchFetching) {
    return (
      <section className="py-[2%]">
        <h2 className="pb-[5%] text-xl">Jobs for you</h2>
        <JobCard
          guestUser={guestUser}
          user={user!}
          userIsFetching={userIsFetching}
          setJob_id={setJob_id}
          job={undefined}
          isFetching={isFetching}
        />
      </section>
    );
  }
  return (
    <ul>
      <h2 className="pt-[2%] pb-[5%] text-xl">Jobs for you</h2>
      <Dialog>
        <DialogTrigger>
          <li className="flex flex-col gap-3">
            {isSearchingJob
              ? searchedJob?.map((job) => (
                  <JobCard
                    guestUser={guestUser}
                    user={user!}
                    userIsFetching={userIsFetching}
                    setJob_id={setJob_id}
                    job={job}
                    isFetching={isFetching}
                  />
                ))
              : jobs?.map((job) => (
                  <JobCard
                    guestUser={guestUser}
                    user={user!}
                    userIsFetching={userIsFetching}
                    setJob_id={setJob_id}
                    job={job}
                    isFetching={isFetching}
                  />
                ))}
          </li>
        </DialogTrigger>
        <DialogContent>
          <JobBigCard
            setJob_id={() => {}}
            job_id={job_id}
            guestUser={guestUser}
            user={user!}
            userIsFetching={userIsFetching}
          />
        </DialogContent>
      </Dialog>
    </ul>
  );
};

export default JobsMobiileView;
