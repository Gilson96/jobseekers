import { Button } from "../ui/button";
import type { ApplicationProps } from "./application";

const ApplicationStep3 = ({
  step,
  setUserDetails,
  userDetails,
  setStep,
}: ApplicationProps) => {
  return (
    <>
      {step === 3 && (
        <section>
          <h2 className="pb-[2%] text-lg font-medium">
            Review your application
          </h2>
          <section className="my-[3%] rounded border p-[2%]">
            <div className="border-b py-[3%]">
              <p className="font-medium">Email address</p>
              <p>{userDetails.email}</p>
            </div>
            <div className="border-b py-[3%]">
              <p className="font-medium">Phone number</p>
              <p>{userDetails.number}</p>
            </div>
            <div className="border-b py-[3%]">
              <p className="font-medium">Home address</p>
              <p>{userDetails.address}</p>
            </div>
            <div className="border-b py-[3%]">
              <p className="font-medium">CV</p>
              <p>{userDetails.cv?.name}</p>
            </div>
          </section>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              className="w-full"
            >
              Send
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
      {step === 4 && <p>Send</p>}
    </>
  );
};

export default ApplicationStep3;
