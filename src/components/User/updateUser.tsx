import {
  useEffect,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { User } from "../../dataTypes";
import { useUpdateUser } from "../../hooks/usePatchQueries";
import { toast } from "sonner";
import FormUserDetails from "../ui/formUserDetails";

const UpdateUser = ({
  user,
  setOpen,
}: {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isError, isPending, isSuccess, mutate } = useUpdateUser();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success!", { style: { backgroundColor: "#b9f8cf" } });
      return setOpen(false);
    }
    if (isError) {
      toast.error("Something went wrong, Try agan later.", {
        style: { backgroundColor: "oklch(88.5% 0.062 18.334)" },
      });
    }
  }, [isSuccess, isError]);

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
