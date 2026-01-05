import { type FormEvent } from "react";
import type { ApplicationProps } from "../../dataTypes";
import FormUserDetails from "../ui/formUserDetails";

const ApplicationStep1 = ({
  step,
  setUserDetails,
  userDetails,
  setStep,
  user,
}: ApplicationProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(formData.entries()) as {
      [k: string]: string;
    };

    if (user?.user?.user_id !== undefined) {
      setUserDetails({
        ...userDetails,
        name: dataFromForm.name.length > 0 ? dataFromForm.name : user.user.name,
        email:
          dataFromForm.email.length > 0 ? dataFromForm.email : user.user.email,
        number:
          dataFromForm.number.length > 0
            ? dataFromForm.number
            : user.user.number,
        address:
          dataFromForm.address.length > 0
            ? dataFromForm.address
            : user.user.address,
      });
      return setStep((prev) => prev + 2);
    } else {
      setUserDetails({
        ...userDetails,
        name: dataFromForm.name,
        email: dataFromForm.email,
        number: dataFromForm.number,
        address: dataFromForm.address,
      });
      return setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      {step === 1 && (
        <FormUserDetails
          buttonText="Continue"
          handleSubmit={handleSubmit}
          isPending={false}
          user={user?.user!}
        />
      )}
    </>
  );
};

export default ApplicationStep1;
