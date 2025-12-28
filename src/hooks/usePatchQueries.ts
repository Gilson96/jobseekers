import { useMutation } from "@tanstack/react-query";
import { useUserLoginStore } from "./store";
import axios from "axios";
import type { User } from "../dataTypes";

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