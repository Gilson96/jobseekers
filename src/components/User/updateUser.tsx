import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Company, User } from "../../dataTypes";
import { useUpdateUser } from "../../hooks/usePatchQueries";
import { toast } from "sonner";
import FormUserDetails from "../ui/formUserDetails";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

const UpdateUser = ({
  user,
  setOpen,
  refetch,
}: {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<{ user: User } | { company: Company }, Error>
  >;
}) => {
  const { isError, isPending, isSuccess, mutate } = useUpdateUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      address: string;
      number: string;
    };

    const updatedUser = {
      name: newUser.name.length === 0 ? user.name : newUser.name,
      email: newUser.email.length === 0 ? user.email : newUser.email,
      address: newUser.address.length === 0 ? user.address : newUser.address,
      number: newUser.number.length === 0 ? user.number : newUser.number,
    };
    mutate(updatedUser);
  };

  if (isSuccess) {
    setOpen(false);
    refetch();
  }

  if (isError) {
    return toast.error("Something went wrong, Try agan later.");
  }
  return (
    <FormUserDetails
      buttonText="Update"
      handleSubmit={handleSubmit}
      user={user}
      isPending={isPending}
    />
  );
};

export default UpdateUser;
