import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const usePrefetchAllJobs = async () => {
    const queryClient = useQueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['job'],
        queryFn: () =>
            axios
                .get("https://jobseekers-api.vercel.app/api/job",
                )
                .then((res) => {
                    return res.data;
                }),
    });
}
