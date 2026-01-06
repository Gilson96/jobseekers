import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { Application, Job, Saved_job, User } from "../dataTypes";
import { useUserLoginStore } from "./store";

export const usePostLogin = () => {
  const { setUserDetails } = useUserLoginStore()
  const { error, isPending, data, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: (login: User) => {
        return axios
          .post(
            "https://jobseekers-api-c462d8f75521.herokuapp.com/api/login",
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
  const queryClient = useQueryClient()
  const userLogin = useUserLoginStore(s => s.user)

  const { isPending, data, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: () => {
        return axios
          .post(
            "https://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job",
            { user_id: save_job.user_id, job_id: save_job.job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then(() => { })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["saved_jobs"] })
      }
    });

  return { isPending, user: data, isError, isSuccess, mutate };
};

export const usePostApplication = (guest_name: string, guest_email: string, guest_cv: string) => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, data, isError, isSuccess, mutate } =
    useMutation<Application, AxiosError, { user_id: number, job_id: number }>({
      mutationFn: ({ user_id, job_id }) => {
        return axios
          .post(
            "https://jobseekers-api-c462d8f75521.herokuapp.com/api/application",
            { user_id: user_id, job_id: job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => { return res.data }).then((data) => {
            const { application } = data

            if (userLogin.name === 'guest') {
              return axios
                .post(
                  "http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/application_job",
                  { application_id: application.application_id, job_id: application.job_id, guest_name, guest_email, guest_cv },
                  { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                ).then((res) => { return res.data })
            } else {
              return Promise.all([axios
                .post(
                  "http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/application_user",
                  { application_id: application.application_id, user_id: application.user_id },
                  { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                ),
              axios
                .post(
                  "http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/application_job",
                  { application_id: application.application_id, job_id: application.job_id },
                  { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
                )]
              ).then(() => { })
            }
          })
      },
    });

  return { isPending, user: data, isError, isSuccess, mutate };
};

export const usePostSkillsUser = () => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: ({ skills_id, user_id }: { skills_id: number, user_id: number }) => {
        return axios
          .post(
            "https://jobseekers-api-c462d8f75521.herokuapp.com/api/user/skills_user",
            { skills_id: skills_id, user_id: user_id }, { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then(() => { })
      },
    });

  return { isPending, isError, isSuccess, mutate };
};

export const usePostSkillsJob = (job_id: number) => {
  const queryClient = useQueryClient()
  const userLogin = useUserLoginStore(s => s.user)

  const { isPending, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: ({ skills_id, job_id }: { skills_id: number, job_id: number }) => {
        return axios
          .post(
            "https://jobseekers-api-c462d8f75521.herokuapp.com/api/job/skills_job",
            { skills_id: skills_id, job_id: job_id },
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => {
            return res.data
          })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["job", job_id] })
      }

    });

  return { isPending, isError, isSuccess, mutate };
};

export const usePostJob = (company_id: number) => {
  const queryClient = useQueryClient()
  const userLogin = useUserLoginStore(s => s.user)

  const { isPending, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: (job: Job) => {
        return axios
          .post(
            `https://jobseekers-api-c462d8f75521.herokuapp.com/api/job`,
            job,
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => {
            return res.data
          })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user", company_id] })
      }
    });

  return { isPending, isError, isSuccess, mutate };
};

export const usePostUser = () => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isPending, isError, isSuccess, mutate } =
    useMutation({
      mutationFn: (user: User) => {
        return axios
          .post(
            `https://jobseekers-api-c462d8f75521.herokuapp.com/api/user`,
            user,
            { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
          )
          .then((res) => {
            return res.data
          })
      },
    });

  return { isPending, isError, isSuccess, mutate };
};