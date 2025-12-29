import { useMutation } from "@tanstack/react-query";
import { useUserLoginStore } from "./store";
import axios from "axios";
import type { Job, User } from "../dataTypes";

export const useUpdateUser = () => {
    const userLogin = useUserLoginStore(s => s.user)
    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: (user: User) => {
                return axios
                    .patch(
                        `http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/${userLogin.id}`,
                        user,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { })
            },
        });

    return { isPending, isError, isSuccess, mutate };
};

export const useUpdateJob = (job_id: number) => {
    const userLogin = useUserLoginStore(s => s.user)
    const { isPending, isError, isSuccess, mutate } =
        useMutation({
            mutationFn: (job: Job) => {
                return axios
                    .patch(
                        `http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/${job_id}`,
                        job,
                        { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                    )
                    .then(() => { }).catch(err => console.log(err))
            },
        });

    return { isPending, isError, isSuccess, mutate };
};