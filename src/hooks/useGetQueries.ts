import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Application_job, Company, Job, Saved_job, Skills, User } from "../dataTypes";
import { useUserLoginStore } from "./store";

export const useGetAllJobs = () => {
  const { isLoading, isFetching, error, data } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () =>
      axios
        .get("https://jobseekers-api-c462d8f75521.herokuapp.com/api/job",
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
          `https://jobseekers-api-c462d8f75521.herokuapp.com/api/job/${job_id}`,
        )
        .then((res) => {
          return res.data.job;
        })


  });

  return { isLoading, isFetching, error, job: data };
};

export const useGetUser = () => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isLoading, isFetching, data, refetch } = useQuery<{ user: User } | { company: Company }>({
    queryKey: ["user", userLogin?.id],
    queryFn: () =>
      axios
        .get(
          `https://jobseekers-api-c462d8f75521.herokuapp.com/api/${userLogin.role === 'user' ? 'user' : 'company'}/${userLogin?.id}`,
          { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
        )
        .then((res) => {
          return res.data;
        })
  });

  return { isLoading, isFetching, userData: data, refetch };
};

export const useGetSavedJob = () => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isLoading, isFetching, data, refetch } = useQuery<Saved_job[]>({
    queryKey: ["saved_jobs"],
    queryFn: () =>
      axios
        .get(
          `https://jobseekers-api-c462d8f75521.herokuapp.com/api/user/saved_job/${userLogin.id}`,
          { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
        )
        .then((res) => {
          return res.data;
        })
  });

  return { isLoading, isFetching, savedJobs: data, refetch };
};

export const useSearchJob = (searchInput: string, isSearchingJob: boolean) => {
  const { isLoading, isFetching, error, data } = useQuery<Job[]>({
    queryKey: [isSearchingJob],
    queryFn: () =>
      axios
        .get(
          `https://jobseekers-api-c462d8f75521.herokuapp.com/api/job/search?job_title=${searchInput}&company_name=${searchInput}&skills_name=${searchInput}`,
        )
        .then((res) => {
          return res.data;
        }),
  });

  return { isLoading, isFetching, error, searchedJob: data };
};

export const useGetAllSkills = () => {
  const { isLoading, isFetching, data } = useQuery<Skills[]>({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get(
          `https://jobseekers-api-c462d8f75521.herokuapp.com/api/skills`,
        )
        .then((res) => {
          return res.data;
        })
  });

  return { isLoading, isFetching, skills: data };
};

export const useGetApplicationJob = (job_id: number) => {
  const userLogin = useUserLoginStore(s => s.user)
  const { isLoading, isFetching, data } = useQuery<Application_job[]>({
    queryKey: ["application_jobs", job_id],
    queryFn: () =>
      axios
        .get(
          `https://jobseekers-api-c462d8f75521.herokuapp.com/api/job/application_job/${job_id}`,
          { headers: { "Authorization": `Bearer ${userLogin?.token}` } }
        )
        .then((res) => {
          return res.data;
        })
  });

  return { isLoading, isFetching, jobApplications: data };
};


