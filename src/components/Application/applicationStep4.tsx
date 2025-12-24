import { Send } from "lucide-react";
import type { ApplicationProps } from "./application";
import { Link } from "react-router";
import { Button } from "../ui/button";

const ApplicationStep4 = ({ step }: ApplicationProps) => {
  console.log(step);

  return (
    <>
      {step === 4 && (
        <section className="flex h-[70vh] flex-col items-center justify-center ">
          <Send className="size-20 text-teal-500" />
          <h2 className="py-[2%] text-xl font-bold">
            Application submitted successfully!
          </h2>
          <p>Guest users can’t view or track applications.</p>
          <p>Sign in to access these features.</p>
          <Link to={"/home"} className="pt-[4%]"><Button>Go Back to Homepage</Button></Link>
        </section>
      )}
    </>
  );
};

export default ApplicationStep4;
