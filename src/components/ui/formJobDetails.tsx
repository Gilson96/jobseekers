import { Label } from "./label";
import { Input } from "./input";
import type { Job } from "../../dataTypes";

const FormJobDetails = ({ action, job }: { action: string; job?: Job }) => {
  return (
    <>
      <section className="flex w-full justify-between gap-3">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="title">
              Title
            </Label>
            <Input
              type="text"
              name="title"
              className={`placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="location">
              Location
            </Label>
            <Input
              type="text"
              name="location"
              className={`placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.location}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="pay">
              Pay
            </Label>
            <Input
              type="text"
              name="pay"
              className={`placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.pay}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="type">
              type
            </Label>
            <Input
              type="text"
              name="type"
              className={`placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.type}
            />
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="about_us">
              About Us
            </Label>
            <textarea
              name="about_us"
              className={`min-h-9 rounded border p-[2%] shadow placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.about_us}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="job_details">
              Job details
            </Label>
            <textarea
              name="job_details"
              className={`min-h-9 rounded border p-[2%] shadow placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.job_details}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="requirements">
              Requirements
            </Label>
            <textarea
              name="requirements"
              className={`min-h-9 rounded border p-[2%] shadow placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
              required={action === "post" && true}
              placeholder={job?.description?.requirements}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="shift_pattern">
              Shift pattern
            </Label>
            <textarea
              name="shift_pattern"
              className={`min-h-9 rounded border p-[2%] shadow placeholder:italic ${action === "update" ? "placeholder:text-black" : "placeholder:text-neutral-400"} `}
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
