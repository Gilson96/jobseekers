import type { Company } from "../../dataTypes";
import CompanyJobDetails from "./companyJobDetails";
import CompanyUpdateJob from "./companyUpdateJob";
import CompanyRemoveJob from "./companyRemoveJob";
import CompanyJobAnalysis from "./companyJobAnalysis";
import CompanyManageJobSkills from "./companyManageJobSkills";
import { useState } from "react";

const CompanyJobs = ({
  company,
  isUserLoading,
  isUserFetching,
}: {
  company: Company;
  isUserLoading: boolean;
  isUserFetching: boolean;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <section className="w-full">
      <h2 className="pt-[2%] pb-[5%] text-lg lg:hidden">All jobs</h2>
      <ul className="flex w-full flex-col lg:mt-4">
        {isUserFetching || isUserLoading ? (
          <li className="flex h-full w-full items-center justify-between border-t border-b py-[10%] lg:border-t-0">
            <span className="animate h-8 w-auto animate-pulse bg-neutral-300 text-neutral-300">
              Loading
            </span>
            <span className="animate h-8 w-auto animate-pulse bg-neutral-300 text-neutral-300">
              Loading
            </span>
          </li>
        ) : (
          company.jobs_posted?.map((job) => (
            <li
              key={job.job_id}
              onClick={() => setIsClicked(true)}
              className="flex h-full w-full items-center justify-between border-t border-b py-[2%] lg:first:border-t-0"
            >
              <CompanyJobDetails
                job_id={job.job_id}
                location={job.location}
                title={job.title}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
              <div className="grid grid-cols-2 gap-2">
                <CompanyManageJobSkills job_id={job.job_id} />
                <CompanyUpdateJob job_id={job.job_id} />
                <CompanyJobAnalysis job_id={job.job_id} />
                <CompanyRemoveJob
                  job_id={job.job_id}
                  company_id={company.company_id!}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default CompanyJobs;
