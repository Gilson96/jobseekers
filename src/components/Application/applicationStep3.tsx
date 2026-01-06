import { toast } from "sonner";
import type { ApplicationProps, Job } from "../../dataTypes";
import { useUserLoginStore } from "../../hooks/store";
import { usePostApplication } from "../../hooks/usePostQueries";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { Navigate } from "react-router";

const ApplicationStep3 = ({
  step,
  userDetails,
  setStep,
  job,
  user,
}: ApplicationProps) => {
  const setUserDetails = useUserLoginStore((s) => s.setUserDetails);
  const userGuest = useUserLoginStore((s) => s.user);
  const userGuestId = 1;
  const userGuestCv = userDetails?.cv?.name!;
  const { isError, isPending, isSuccess, mutate } = usePostApplication(
    userDetails?.name!,
    userDetails?.email!,
    userGuestCv,
  );

  const handleApplication = () => {
    if (user?.user?.user_id === undefined) {
      mutate({ user_id: userGuestId, job_id: job?.job_id as number });
      setUserDetails({
        ...user,
        name: "guest",
        email: userDetails?.email,
        number: userDetails?.number,
        address: userDetails?.address,
        jobs_applied: [...userGuest.jobs_applied!, job] as Job[],
      });
      setStep((prev) => prev + 1);
    } else {
      mutate({ user_id: user.user.user_id, job_id: job?.job_id as number });
    }
  };

  if (user?.user.user_id !== undefined && isSuccess) {
    return <Navigate to={"/myJobs"} />;
  }
  if (isError) {
    return toast.error("Somenthing went wrong. Try again later");
  }
  return (
    <>
      {step === 3 && (
        <section>
          <h2 className="pb-[2%] text-lg font-medium lg:pt-[2%]">
            Review your application
          </h2>
          <section className="my-[3%] rounded border p-[2%]">
            <div className="border-b py-[3%]">
              <p className="font-medium">Email address</p>
              <p>{userDetails?.email}</p>
            </div>
            <div className="border-b py-[3%]">
              <p className="font-medium">Phone number</p>
              <p>{userDetails?.number}</p>
            </div>
            <div className="border-b py-[3%]">
              <p className="font-medium">Home address</p>
              <p>{userDetails?.address}</p>
            </div>
            <div className="border-b py-[3%]">
              <p className="font-medium">CV</p>
              <p>{userDetails?.cv?.name}</p>
            </div>
          </section>
          <div className="flex flex-col gap-2">
            <Button onClick={handleApplication} className="w-full">
              {isPending ? (
                <Loader2Icon className="animate animate-spin text-teal-500" />
              ) : (
                "Send"
              )}
            </Button>
            <Button
              onClick={() => setStep((prev) => prev - 1)}
              className="w-full text-teal-600"
              variant={"outline"}
            >
              Back
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default ApplicationStep3;
