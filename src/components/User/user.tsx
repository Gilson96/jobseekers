import { useUserLoginStore } from "../../hooks/store";
import { useGetUser } from "../../hooks/useGetQueries";

const User = () => {
  const { user } = useUserLoginStore();
  const { error, isFetching, isLoading, userData } = useGetUser();
  console.log(userData);
  return <div>User</div>;
};

export default User;
