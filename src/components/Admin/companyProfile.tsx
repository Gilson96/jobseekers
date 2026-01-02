import { Loader2Icon, Mail, MapPin, Phone } from "lucide-react";
import type { Company } from "../../dataTypes";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { FormEvent } from "react";
import { useUpdateCompany } from "../../hooks/usePatchQueries";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";

const CompanyProfile = ({ company }: { company: Company }) => {
  const { isError, isPending, isSuccess, mutate } = useUpdateCompany();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(formData.entries()) as {
      [k: string]: string;
    };

    const formattedData = {
      company_name:
        dataFromForm.company_name !== undefined &&
        dataFromForm.company_name.length !== 0
          ? dataFromForm.company_name
          : company?.company_name,
      address:
        dataFromForm.address !== undefined && dataFromForm.address.length !== 0
          ? dataFromForm.address
          : company?.address,
      email:
        dataFromForm.email !== undefined && dataFromForm.email.length !== 0
          ? dataFromForm.email
          : company?.email,
      number:
        dataFromForm.number !== undefined && dataFromForm.number.length !== 0
          ? dataFromForm.number
          : company?.number,
    } as Company;

    console.log(formattedData);
    mutate(formattedData);
  };

  return (
    <section className="flex h-full w-full flex-col">
      <h2 className="py-3 text-xl font-medium">{company.company_name}</h2>
      <p className="flex items-center gap-1 py-2">
        <Mail />
        <span>{company.email}</span>
      </p>
      <p className="flex items-center gap-1 py-2">
        <MapPin />
        <span>{company.address}</span>
      </p>
      <p className="flex items-center gap-1 py-2">
        <Phone />
        <span>
          +44{" "}
          {company.number?.slice(0, 4) +
            " " +
            company.number?.slice(4, 7) +
            " " +
            company.number?.slice(7, 13)}
        </span>
      </p>
      <h2 className="border-b pt-4 pb-2 text-xl font-medium">Change details</h2>
      <p className="flex w-full flex-col pb-[3%] text-left italic">
        <span> *If no input it will keep the old value</span>
        <span className="text-red-500">
          {isError && "Somenthing went wrong. Try again later"}
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid h-full w-full grid-cols-2 gap-3 pt-4"
      >
        <div>
          <Label className="py-2">Company name</Label>
          <Input type="text" name="company_name" />
        </div>
        <div>
          <Label className="py-2">Company email</Label>
          <Input type="text" name="email" />
        </div>
        <div>
          <Label className="py-2">Company address</Label>
          <Input type="text" name="address" />
        </div>
        <div>
          <Label className="py-2">Company number</Label>
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
            />
          </ButtonGroup>
        </div>
        <Button type="submit" className="col-span-2 mb-3 w-full">
          {isPending ? (
            <Loader2Icon className="animate animate-pulse" />
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </section>
  );
};

export default CompanyProfile;
