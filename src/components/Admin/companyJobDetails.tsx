import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useGetOneJob } from "../../hooks/useGetQueries";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Loader2Icon } from "lucide-react";

const CompanyJobDetails = ({
  job_id,
  title,
  location,
  setIsClicked,
}: {
  job_id: number;
  title: string;
  location: string;
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const {
    isFetching: isJobFetching,
    isLoading: isJobLoading,
    job,
  } = useGetOneJob(job_id);

  useEffect(() => {
    setIsClicked(false);
  }, [!open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p className="flex w-full cursor-pointer flex-col items-start justify-start hover:underline">
          <span className="min-w-36 text-left">{title}</span>
          <span className="w-[80%] text-left text-sm font-light text-neutral-600">
            {location}
          </span>
        </p>
      </DialogTrigger>
      <DialogContent className="flex h-[70%] w-full flex-col items-start justify-around overflow-y-auto p-[3%]">
        {isJobFetching || isJobLoading ? (
          <section className="mt-20 h-full w-full place-items-center items-center justify-center">
            <Loader2Icon className="animate animate-spin text-teal-500" />
          </section>
        ) : (
          <>
            <h2 className="py-[2%] font-bold">{job?.title}</h2>
            <p className="py-[1%]">{job?.company_name}</p>
            <p className="py-[1%]">{job?.location}</p>
            <p className="py-[1%]">{job?.type}</p>
            <div className="lg:overflow-y-auto">
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompanyJobDetails;
