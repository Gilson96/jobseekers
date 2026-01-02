import type { Company } from "../../dataTypes";
import { useState } from "react";
import CompanyJobDetails from "./companyJobDetails";
import CompanyUpdateJob from "./companyUpdateJob";
import CompanyRemoveJob from "./companyRemoveJob";
import CompanyAddSkills from "./companyManageJobSkills";
import CompanyManageJobSkills from "./companyManageJobSkills";
import { Button } from "../ui/button";
import CompanyJobAnalysis from "./companyJobAnalysis";
import { useGetOneJob } from "../../hooks/useGetQueries";

const CompanyJobs = ({ company }: { company: Company }) => {
  const [job_id, setJob_id] = useState<number>(1);
  const {
    isFetching: isJobFetching,
    isLoading: isJobLoading,
    job,
  } = useGetOneJob(job_id);

  return (
    <section className="w-full">
      <h2 className="pb-[2%] text-lg font-medium">All jobs</h2>
      <ul className="flex w-full flex-col">
        {company.jobs_posted?.map((posted) => (
          <li
            key={posted.job_id}
            onClick={() => setJob_id(posted.job_id)}
            className="flex h-full w-full items-center justify-between border-t border-b py-[2%]"
          >
            <CompanyJobDetails
              job={job!}
              title={posted?.title}
              isJobFetching={isJobFetching}
              isJobLoading={isJobLoading}
              location={posted?.location}
            />
            <div className="grid grid-cols-2 gap-2">
              <CompanyManageJobSkills job={job!} />
              <CompanyUpdateJob job_id={posted.job_id} />
              <CompanyJobAnalysis job_id={posted.job_id} />
              <CompanyRemoveJob job_id={posted.job_id} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CompanyJobs;
