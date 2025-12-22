import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../dataTypes";
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
          }).catch(err => console.log(err));
      },
    });

  return { error, isPending, user: data, isError, isSuccess, mutate };
};
