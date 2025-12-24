import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Job, Saved_job, User } from "../dataTypes";
import { useUserLoginStore } from "./store";

export const usePostLogin = (login: User) => {
  const { setUserDetails } = useUserLoginStore()
  const { error, isPending, data, isError, isSuccess, mutate } =
    useMutation<User>({
      mutationFn: () => {
        return axios
          .post(
            "http://jobseekers-api-c462d8f75521.herokuapp.com/api/login",
            login,
          )
          .then((res) => {
            setUserDetails(res.data)
            return res.data;
          })
      },
    });

  return { error, isPending, user: data, isError, isSuccess, mutate };
};

export const usePostSavedJobs = (save_job: Saved_job) => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, data, isError, isSuccess, mutate } =
    useMutation<User>({
      mutationFn: () => {
        return axios
          .post(
            "http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job",
            { user_id: save_job.user_id, job_id: save_job.job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => {
            return res.data;
          })
      },
    });

  return { isPending, user: data, isError, isSuccess, mutate };
};

export const usePostApplication = (save_job: Saved_job) => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, data, isError, isSuccess, mutate } =
    useMutation<User>({
      mutationFn: () => {
        return axios
          .post(
            "http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job",
            { user_id: save_job.user_id, job_id: save_job.job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => {
            return res.data;
          })
      },
    });

  return { isPending, user: data, isError, isSuccess, mutate };
};
