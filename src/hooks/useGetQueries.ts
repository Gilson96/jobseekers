import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Job, Saved_job, User } from "../dataTypes";
import { useUserLoginStore } from "./store";

export const useGetAllJobs = () => {
  const { isLoading, isFetching, error, data } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () =>
      axios
        .get("http://jobseekers-api-c462d8f75521.herokuapp.com/api/job",
        )
        .then((res) => {
          return res.data;
        }),
  });

  return { isLoading, isFetching, error, jobs: data };
};

export const useGetOneJob = (job_id: number) => {
  const { isLoading, isFetching, error, data } = useQuery<Job>({
    queryKey: ["job", job_id],
    queryFn: () =>
      axios
        .get(
          `http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/${job_id}`,
        )
        .then((res) => {
          return res.data.job;
        }),
  });

  return { isLoading, isFetching, error, job: data };
};

export const useGetUser = () => {
  const userLogin = useUserLoginStore(s => s.user)
  console.log(userLogin)
  const { isLoading, isFetching, data } = useQuery<{ user: User }>({
    queryKey: ["user", userLogin?.id],
    queryFn: () =>
      axios
        .get(
          `http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/${userLogin?.id}`,
          { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
        )
        .then((res) => {
          return res.data;
        })
  });

  return { isLoading, isFetching, userData: data };
};

export const useGetSavedJob = () => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isLoading, isFetching, data } = useQuery<Saved_job[]>({
    queryKey: ["saved_jobs"],
    queryFn: () =>
      axios
        .get(
          `http://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job/1`,
          { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
        )
        .then((res) => {
          return res.data;
        })
  });

  return { isLoading, isFetching, savedJobs: data };
};

export const useSearchJob = (searchInput: string, isSearchingJob: boolean) => {
  const { isLoading, isFetching, error, data } = useQuery<Job[]>({
    queryKey: [isSearchingJob],
    queryFn: () =>
      axios
        .get(
          `http://jobseekers-api-c462d8f75521.herokuapp.com/api/job/search?job_title=${searchInput}&company_name=${searchInput}&skills_name=${searchInput}`,
        )
        .then((res) => {
          return res.data;
        }),
  });

  return { isLoading, isFetching, error, searchedJob: data };
};

