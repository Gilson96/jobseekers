import type { ApplicationProps } from "../../dataTypes";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ApplicationStep2 = ({
  step,
  setUserDetails,
  userDetails,
  setStep,
}: ApplicationProps) => {
  return (
    <>
      {step === 2 && (
        <>
          <section className="mb-[4%] rounded border p-[3%]">
            <h2 className="py-[2%] font-medium">Upload your cv</h2>
            <Label htmlFor="cv"></Label>
            <Input
              name="cv"
              type="file"
              className="my-[5%]"
              onChange={(e) =>
                setUserDetails({ ...userDetails, cv: e.target.files![0] })
              }
            />
          </section>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              className="w-full"
            >
              Countine
            </Button>
            <Button
              onClick={() => setStep((prev) => prev - 1)}
              className="w-full text-teal-600"
              variant={"outline"}
            >
              Back
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ApplicationStep2;
