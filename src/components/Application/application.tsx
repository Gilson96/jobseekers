import { Progress } from "../ui/progress";
import useScreenSize from "../../hooks/useScreenSize";
import {
  ApplicationJobDetailsDesktopView,
  ApplicationJobDetailsMobileView,
} from "./applicationJobDetails";
import { useState, type Dispatch, type SetStateAction } from "react";
import ApplicationStep1 from "./applicationStep1";
import ApplicationStep2 from "./applicationStep2";
import ApplicationStep3 from "./applicationStep3";

export type ApplicationProps = {
  step: number;
  setUserDetails: Dispatch<
    SetStateAction<{
      email?: string;
      number?: string;
      address?: string;
      cv?: File;
    }>
  >;
  userDetails: {
    email?: string | undefined;
    number?: string | undefined;
    address?: string | undefined;
    cv?: File | undefined;
  };
  setStep: Dispatch<SetStateAction<number>>;
};

const Application = () => {
  const screenSize = useScreenSize();
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState<{
    email?: string;
    number?: string;
    address?: string;
    cv?: File;
  }>({
    email: "",
    number: "",
    address: "",
  });

  const mobileView = screenSize.width < 1000;

  if (mobileView) {
    return (
      <section>
        <ApplicationJobDetailsMobileView />
        <div className="flex items-center justify-between gap-8 py-[5%]">
          <Progress value={step * 30} max={100} className="text-teal-600" />
          <span className="text-xs">{step * 30}%</span>
        </div>
        <ApplicationStep1
          step={step}
          userDetails={userDetails}
          setStep={setStep}
          setUserDetails={setUserDetails}
        />
        <ApplicationStep2
          step={step}
          userDetails={userDetails}
          setStep={setStep}
          setUserDetails={setUserDetails}
        />
        <ApplicationStep3
          step={step}
          userDetails={userDetails}
          setStep={setStep}
          setUserDetails={setUserDetails}
        />
      </section>
    );
  }

  return (
    <section className="flex h-screen w-full justify-between overflow-hidden">
      <section className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
        <div className="flex w-[80%] items-center justify-between gap-8">
          <Progress value={step * 30} max={100} />
          <span className="text-xs">{step * 30}%</span>
        </div>
        {step === 1 && (
          <span className="w-[80%] py-[3%] text-left text-lg font-medium">
            Fill this form to start your application
          </span>
        )}
        {step === 2 && (
          <span className="w-[80%] py-[3%] text-left text-lg font-medium">
            Send your CV
          </span>
        )}
        {step === 3 && (
          <span className="w-[80%] py-[3%] text-left text-lg font-medium">
            Finish your application
          </span>
        )}
        <div className="w-[80%] pt-[5%]">
          <ApplicationStep1
            step={step}
            userDetails={userDetails}
            setStep={setStep}
            setUserDetails={setUserDetails}
          />
          <ApplicationStep2
            step={step}
            userDetails={userDetails}
            setStep={setStep}
            setUserDetails={setUserDetails}
          />
          <ApplicationStep3
            step={step}
            userDetails={userDetails}
            setStep={setStep}
            setUserDetails={setUserDetails}
          />
        </div>
      </section>
      <section className="h-full w-full overflow-hidden bg-neutral-200">
        <ApplicationJobDetailsDesktopView />
      </section>
    </section>
  );
};

export default Application;
