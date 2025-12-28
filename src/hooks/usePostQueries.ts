import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type { Application, Saved_job, User } from "../dataTypes";
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
    useMutation({
      mutationFn: () => {
        return axios
          .post(
            "http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job",
            { user_id: save_job.user_id, job_id: save_job.job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then(() => { })
      },
    });

  return { isPending, user: data, isError, isSuccess, mutate };
};

export const usePostApplication = (user_id: number, job_id: number) => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, data, isError, isSuccess, mutate } =
    useMutation<AxiosResponse[]>({
      mutationFn: () => {
        return axios
          .post(
            "http://jobseekers-api-c462d8f75521.herokuapp.com/api/application",
            { user_id: user_id, job_id: job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => {
            return res.data;
          }).then((res: { application: Application }) => {
            return Promise.all([axios
              .post(
                "http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/application_user",
                { application_id: res.application.application_id, user_id: res.application.user_id },
                { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
              ),
            axios
              .post(
                "http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/application_job",
                { application_id: res.application.application_id, job_id: res.application.job_id },
                { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
              )],
            ).then((res) => {
              return res
            })
          })

      },
    });

  return { isPending, user: data, isError, isSuccess, mutate };
};

export const usePostSkillsUser = (skills_id: number, user_id: number) => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: () => {
        return axios
          .post(
            "http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/skills_user",
            { skills_id: skills_id, user_id: user_id }, { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then(() => { })
      },
    });

  return { isPending, isError, isSuccess, mutate };
};
