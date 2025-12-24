import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, type FormEvent } from "react";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";
import type { ApplicationProps } from "../../dataTypes";

const ApplicationStep1 = ({
  step,
  setUserDetails,
  userDetails,
  setStep,
  user,
}: ApplicationProps) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const shortedPhonerNumber = user?.user.number?.slice(3);

  const isInputEmailChanged =
    user?.user.user_id !== undefined && inputEmail.length > 0;
  const isInputNumberChanged =
    user?.user.user_id !== undefined && inputNumber.length > 0;
  const isInputAddressChanged =
    user?.user.user_id !== undefined && inputAddress.length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.user.user_id !== undefined) {
      setUserDetails({
        ...userDetails,
        email: inputEmail.length > 0 ? inputEmail : user.user.email,
        number: inputNumber.length > 0 ? inputNumber : user.user.number,
        address: inputAddress.length > 0 ? inputAddress : user.user.address,
      });
    } else {
      setUserDetails({
        ...userDetails,
        email: inputEmail,
        number: inputNumber,
        address: inputAddress,
      });
    }

    if (user?.user.user_id !== undefined) {
      return setStep((prev) => prev + 2);
    }

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
              placeholder={
                user?.user.user_id !== undefined ? user?.user.email : ""
              }
              required={isInputEmailChanged ? true : false}
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
                placeholder={
                  user?.user.user_id !== undefined ? shortedPhonerNumber : ""
                }
                title="Number must start with 7"
                required={isInputNumberChanged ? true : false}
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
              placeholder={
                user?.user.user_id !== undefined ? user?.user.address : "d"
              }
              required={isInputAddressChanged ? true : false}
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
