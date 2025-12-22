import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, type FormEvent } from "react";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";
import type { ApplicationProps } from "./application";

const ApplicationStep1 = ({
  step,
  setUserDetails,
  userDetails,
  setStep,
}: ApplicationProps) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserDetails({
      ...userDetails,
      email: inputEmail,
      number: inputNumber,
      address: inputAddress,
    });

    return setStep((prev) => prev + 1);
  };

  return (
    <>
      {step === 1 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              required
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="number">Number</Label>
            <ButtonGroup className="w-full">
              <ButtonGroupText asChild>
                <Label htmlFor="gb">+44</Label>
              </ButtonGroupText>
              <Input
                type="tel"
                name="number"
                minLength={10}
                maxLength={10}
                pattern="^7.*"
                title="Number must start with 7"
                required
                onChange={(e) => setInputNumber(e.target.value)}
              />
            </ButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              name="address"
              pattern=".{10,}"
              title="Address must be at least 10 characters"
              required
              onChange={(e) => setInputAddress(e.target.value)}
            />
          </div>
          <Button>Continue</Button>
        </form>
      )}
    </>
  );
};

export default ApplicationStep1;
