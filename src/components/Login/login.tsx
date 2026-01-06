import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { usePostLogin } from "../../hooks/usePostQueries";
import { useState, type FormEvent } from "react";
import { Loader2Icon } from "lucide-react";
import { Navigate } from "react-router";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const { isError, isPending, isSuccess, mutate } = usePostLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userEmail === "user@user.com") {
      mutate({
        email: userEmail,
        password: "user123",
      });
    } else {
      mutate({
        email: userEmail,
        password: "company123",
      });
    }
  };

  if (isSuccess) {
    return <Navigate to="/home" replace />;
  }
  return (
    <section className="flex h-[80vh] flex-col place-items-center items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-[80%] flex-col justify-center gap-3 rounded border p-[3%] lg:h-screen lg:w-[40%]"
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="text-xs">
                {" "}
                A sample account is provided — just copy and paste the email to
                log in.
              </p>
            </AccordionTrigger>
            <AccordionContent>
              user@user.com, talentbridge@company.com
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          required
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Button>
          {isPending ? (
            <Loader2Icon className="animate animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
        {isError && (
          <p className="text-xs text-red-500">
            {"Something went wrong. Try again."}
          </p>
        )}
      </form>
    </section>
  );
};

export default Login;
