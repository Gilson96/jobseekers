import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import type { Job } from "../../dataTypes";

export const ApplicationJobDetailsMobileView = ({ job }: { job: Job }) => {
  return (
    <section className="flex h-full w-full flex-col">
      <div className="py-[2%]">
        <p className="font-medium">{job.title}</p>
        <p className="text-neutral-500">{job.company_name}</p>
      </div>
      <Drawer>
        <DrawerTrigger>
          <p className="border-b pb-[2%] text-left text-teal-600">
            See more details
          </p>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col p-[2%]">
          <div className="h-full w-full overflow-y-auto">
            <h3 className="py-[4%] text-lg font-medium">{job.title}</h3>
            <div className="flex w-full flex-wrap items-center gap-3 border-b pb-[5%]">
              <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
                {job?.type}
              </span>
              <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
                {job?.pay}
              </span>
              <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
                {job?.description?.shift_pattern}
              </span>
            </div>

            <h3 className="py-[4%] text-lg font-medium">Job description</h3>
            <h4 className="pb-[2%] font-medium uppercase">About us</h4>
            <p className="font-light">{job?.description?.about_us}</p>
            <h4 className="py-[2%] font-medium uppercase">
              What you going to do
            </h4>
            <p className="font-light">{job?.description?.job_details}</p>
            <h4 className="py-[2%] font-medium uppercase">Requirements</h4>
            <p className="font-light">{job?.description?.requirements}</p>
            <ul className="flex w-full flex-wrap gap-3 py-[5%]">
              {job?.skills?.map((skill) => (
                <li className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
                  {skill.skills_name}
                </li>
              ))}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export const ApplicationJobDetailsDesktopView = ({ job }: { job: Job }) => {
  return (
    <section className="flex h-full items-center justify-center">
      <div className="flex h-[80%] w-[80%] flex-col rounded border bg-white p-[3%]">
        <h2 className="text-lg font-medium">{job.title}</h2>
        <p className="border-b pb-6 text-neutral-500">{job.company_name}</p>
        <div className="h-full overflow-y-auto">
          <h3 className="py-[4%] text-lg font-medium">Job details</h3>
          <div className="flex w-full flex-wrap items-center gap-3 border-b pb-[5%]">
            <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
              {job?.type}
            </span>
            <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
              {job?.pay}
            </span>
            <span className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
              {job?.description?.shift_pattern}
            </span>
          </div>

          <h3 className="py-[4%] text-lg font-medium">Job description</h3>
          <h4 className="pb-[2%] font-medium uppercase">About us</h4>
          <p>{job?.description?.about_us}</p>
          <h4 className="py-[2%] font-medium uppercase">
            What you going to do
          </h4>
          <p>{job?.description?.job_details}</p>
          <h4 className="py-[2%] font-medium uppercase">Requirements</h4>
          <p>{job?.description?.requirements}</p>
          <ul className="flex w-full flex-wrap gap-3 py-[2%]">
            {job?.skills?.map((skill) => (
              <li className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
                {skill.skills_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
