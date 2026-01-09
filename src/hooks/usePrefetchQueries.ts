import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const usePrefetchAllJobs = async () => {
    const queryClient = useQueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['job'],
        queryFn: () =>
            axios
                .get("https://jobseekers-api-c462d8f75521.herokuapp.com/api/job",
                )
                .then((res) => {
                    return res.data;
                }),
    });
}
