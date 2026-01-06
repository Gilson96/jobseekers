import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useGetAllJobs } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";
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
      <h2 className="pt-[2%] pb-[5%] font-medium">Jobs for you</h2>
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
