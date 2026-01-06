import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserLoginStore } from "./store";
import axios from "axios";
import type { Company, Job, User } from "../dataTypes";

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const userLogin = useUserLoginStore(s => s.user)

    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: (user: User) => {
                return axios
                    .patch(
                        `https://jobseekers-api-c462d8f75521.herokuapp.com/api/user/${userLogin.id}`,
                        user,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["user", userLogin.id] })
            }
        });

    return { isPending, isError, isSuccess, mutate };
};

export const useUpdateCompany = (company_id: number) => {
    const queryClient = useQueryClient()
    const userLogin = useUserLoginStore(s => s.user)

    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: (company: Company) => {
                return axios
                    .patch(
                        `https://jobseekers-api-c462d8f75521.herokuapp.com/api/company/${userLogin.id}`,
                        company,
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

export const useUpdateJob = (job_id: number) => {
    const queryClient = useQueryClient()
    const userLogin = useUserLoginStore(s => s.user)

    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: (job: Job) => {
                return axios
                    .patch(
                        `https://jobseekers-api-c462d8f75521.herokuapp.com/api/job/${job_id}`,
                        job,
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
