import { useState, type FormEvent } from "react";
import type { User } from "../../dataTypes";
import { Label } from "./label";
import { Input } from "./input";
import { ButtonGroup, ButtonGroupText } from "./button-group";
import { Button } from "./button";
import { Loader2Icon } from "lucide-react";

type FormUserDetailsProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  user: User;
  buttonText: string;
  isPending: boolean;
};

const FormUserDetails = ({
  user,
  handleSubmit,
  isPending,
  buttonText,
}: FormUserDetailsProps) => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const isInputNameChanged = inputName.length > 0;
  const isInputEmailChanged = inputEmail.length > 0;
  const isInputNumberChanged = inputNumber.length > 0;
  const isInputAddressChanged = inputAddress.length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder={user?.name}
          required={isInputNameChanged ? true : false}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder={user?.email}
          required={isInputEmailChanged || user === undefined ? true : false}
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
            placeholder={user?.number}
            title="Number must start with 7"
            required={isInputNumberChanged || user === undefined ? true : false}
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
          placeholder={user?.address}
          required={isInputAddressChanged || user === undefined ? true : false}
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </div>
      <Button>
        {isPending ? (
          <Loader2Icon className="animate animate-spin text-teal-500" />
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
};

export default FormUserDetails;
