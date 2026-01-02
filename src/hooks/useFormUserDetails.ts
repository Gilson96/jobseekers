import type { UseMutateFunction } from "@tanstack/react-query";
import type { FormEvent } from "react";
import type { Job } from "../dataTypes";

export const useJobDetailsSubmitForm = (e: FormEvent<HTMLFormElement>, mutate: UseMutateFunction<void, Error, Job, unknown>, job: Job) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(formData.entries()) as { [k: string]: string; }


    const verifiedData = {
        title:
            dataFromForm.title !== undefined && dataFromForm.title.length !== 0
                ? dataFromForm.title
                : job?.title,
        location:
            dataFromForm.location !== undefined &&
                dataFromForm.location.length !== 0
                ? dataFromForm.location
                : job?.location,
        pay:
            dataFromForm.pay !== undefined && dataFromForm.pay.length !== 0
                ? dataFromForm.pay
                : job?.pay,
        type:
            dataFromForm.type !== undefined && dataFromForm.type.length !== 0
                ? dataFromForm.type
                : job?.type,
        description: {
            about_us:
                dataFromForm.about_us !== undefined &&
                    dataFromForm.about_us.length !== 0
                    ? dataFromForm.about_us
                    : job?.description?.about_us,
            job_details:
                dataFromForm.job_details !== undefined &&
                    dataFromForm.job_details.length !== 0
                    ? dataFromForm.job_details
                    : job?.description?.job_details,
            shift_pattern:
                dataFromForm.shift_pattern !== undefined &&
                    dataFromForm.shift_pattern.length !== 0
                    ? dataFromForm.shift_pattern
                    : job?.description?.shift_pattern,
            requirements:
                dataFromForm.requirements !== undefined &&
                    dataFromForm.requirements.length !== 0
                    ? dataFromForm.requirements
                    : job?.description?.requirements,
        },
    } as Job;

    mutate(verifiedData);
};
