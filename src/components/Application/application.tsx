import { Progress } from "../ui/progress";
import useScreenSize from "../../hooks/useScreenSize";
import {
  ApplicationJobDetailsDesktopView,
  ApplicationJobDetailsMobileView,
} from "./applicationJobDetails";
import { useState } from "react";
import ApplicationStep1 from "./applicationStep1";
import ApplicationStep2 from "./applicationStep2";
import ApplicationStep3 from "./applicationStep3";
import type { Job } from "../../dataTypes";
import { useLocation } from "react-router";
import ApplicationStep4 from "./applicationStep4";
import { useGetUser } from "../../hooks/useGetQueries";
import { Loader2Icon } from "lucide-react";

const Application = () => {
  const { state }: { state: Job } = useLocation();
  const screenSize = useScreenSize();
  const [step, setStep] = useState(1);
  const { userData: user, isFetching, isLoading } = useGetUser();
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

  const job: Job = state;
  const mobileView = screenSize.width < 1000;

  if (isFetching || isLoading) {
    return (
      <Loader2Icon className="animate flex h-[50vh] animate-spin items-center justify-center place-self-center text-teal-500" />
    );
  }

  if (mobileView) {
    return (
      <section>
        {step <= 3 && (
          <>
            <ApplicationJobDetailsMobileView job={job} />
            {user?.user.user_id !== undefined && (
              <h2 className="pt-[3%] font-medium">
                Do you want to change something for this application?
              </h2>
            )}
            <div className="flex items-center justify-between gap-8 py-[5%]">
              <Progress value={step * 30} max={100} className="text-teal-600" />
              <span className="text-xs">{step * 30}%</span>
            </div>
          </>
        )}

        <ApplicationStep1
          step={step}
          userDetails={userDetails}
          setStep={setStep}
          setUserDetails={setUserDetails}
          user={user}
          isFetching={isFetching}
          isLoading={isLoading}
        />
        <ApplicationStep2
          step={step}
          userDetails={userDetails}
          setStep={setStep}
          setUserDetails={setUserDetails}
          user={user}
          isFetching={isFetching}
          isLoading={isLoading}
        />
        <ApplicationStep3
          step={step}
          userDetails={userDetails}
          setStep={setStep}
          setUserDetails={setUserDetails}
          job={job}
          user={user}
          isFetching={isFetching}
          isLoading={isLoading}
        />
        <ApplicationStep4
          setUserDetails={() => {}}
          setStep={() => {}}
          step={step}
          user={user}
        />
      </section>
    );
  }

  return (
    <section className="flex h-[80vh] w-full justify-between overflow-hidden">
      <section className="flex w-full flex-col items-center justify-center overflow-hidden overflow-y-auto">
        {step <= 3 && (
          <div className="flex w-[80%] items-center justify-between gap-8">
            {step < 100 && <Progress value={step * 30} max={100} />}
            <span className="text-xs">{step * 30}%</span>
          </div>
        )}
        {step === 1 && (
          <span className="w-[80%] text-left text-lg font-medium">
            Fill this form to start your application
          </span>
        )}
        {step === 2 && (
          <span className="w-[80%] text-left text-lg font-medium">
            Send your CV
          </span>
        )}
        <div className="w-[80%] pt-[2%]">
          <ApplicationStep1
            step={step}
            userDetails={userDetails}
            setStep={setStep}
            setUserDetails={setUserDetails}
            user={user}
            isFetching={isFetching}
            isLoading={isLoading}
          />
          <ApplicationStep2
            step={step}
            userDetails={userDetails}
            setStep={setStep}
            setUserDetails={setUserDetails}
            user={user}
            isFetching={isFetching}
            isLoading={isLoading}
          />
          <ApplicationStep3
            step={step}
            userDetails={userDetails}
            setStep={setStep}
            setUserDetails={setUserDetails}
            job={job}
            user={user}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </div>
        <ApplicationStep4
          setUserDetails={() => {}}
          setStep={() => {}}
          step={step}
          user={user}
        />
      </section>
      {step < 4 && (
        <section className="h-full w-full overflow-hidden bg-neutral-200">
          {" "}
          <ApplicationJobDetailsDesktopView job={job} />
        </section>
      )}
    </section>
  );
};

export default Application;
