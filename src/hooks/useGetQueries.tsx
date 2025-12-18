import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Job } from "../dataTypes";

export const useGetAllJobs = () => {
  const { isLoading, isFetching, error, data } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () =>
      axios
        .get("http://jobseekers-api-c462d8f75521.herokuapp.com/api/job")
        .then((res) => {
          return res.data;
        }),
  });

  return { isLoading, isFetching, error, jobs: data };
};

export const useGetOneJob = (job_id: number) => {
  const { isLoading, isFetching, error, data } = useQuery<Job>({
    queryKey: [job_id],
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
