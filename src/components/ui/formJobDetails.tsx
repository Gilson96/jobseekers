import { Label } from "./label";
import { Input } from "./input";
import type { Job } from "../../dataTypes";

const FormJobDetails = ({ action, job }: { action: string; job?: Job }) => {
  return (
    <>
      <section className="flex w-full justify-between">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
              name="title"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              type="location"
              name="location"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.location}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pay">Pay</Label>
            <Input
              type="pay"
              name="pay"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.pay}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">type</Label>
            <Input
              type="type"
              name="type"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.type}
            />
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="about_us">About Us</Label>
            <Input
              type="about_us"
              name="about_us"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.about_us}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="job_details">Job details</Label>
            <Input
              type="job_details"
              name="job_details"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.job_details}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Input
              type="requirements"
              name="requirements"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.requirements}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="shift_pattern">Shift pattern</Label>
            <Input
              type="shift_pattern"
              name="shift_pattern"
              className={`italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.shift_pattern}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default FormJobDetails;
