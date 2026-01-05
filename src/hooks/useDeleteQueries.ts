import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserLoginStore } from "./store";
import axios from "axios";
import type { Company } from "../dataTypes";

export const useDeleteSavedJobs = (saved_job_id: number) => {
    const userLogin = useUserLoginStore(s => s.user)
    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: () => {
                return axios
                    .delete(
                        `http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job/${saved_job_id}`,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { })
            },
        });
    return { isPending, isError, isSuccess, mutate };
};

export const useDeleteUserSkills = (skills_user_id: number) => {
    const queryClient = useQueryClient()
    const userLogin = useUserLoginStore(s => s.user)

    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: () => {
                return axios
                    .delete(
                        `http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/skills_user/${skills_user_id}`,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["user", userLogin?.id] })
            }
        });

    return { isPending, isError, isSuccess, mutate };
};

export const useDeleteJobSkills = (skills_job_id: number, job_id: number) => {
    const queryClient = useQueryClient()
    const userLogin = useUserLoginStore(s => s.user)

    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: () => {
                return axios
                    .delete(
                        `http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/skills_job/${skills_job_id}`,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["job", job_id] })
            }
        });

    return { isPending, isError, isSuccess, mutate };
};

export const useDeleteCompanyJob = (job_id: number, company_id: number) => {
    const queryClient = useQueryClient()
    const userLogin = useUserLoginStore(s => s.user)

    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: () => {
                return axios
                    .delete(
                        `http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/${job_id}`,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["user", company_id] })
            }
        });

    return { isPending, isError, isSuccess, mutate };
};