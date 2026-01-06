import { LoaderCircle } from "lucide-react";
import { useGetUser } from "../../hooks/useGetQueries";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import UpdateUser from "./updateUser";
import UpdateSkills from "./updateSkills";
import type { User as UserTypes } from "../../dataTypes";
import { useState } from "react";
import { Link } from "react-router";

const User = () => {
  const { isFetching, isLoading, userData } = useGetUser();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-300/40">
        <LoaderCircle className="animate size-10 animate-spin text-teal-600" />
      </div>
    );
  }

  const user = userData as { user: UserTypes };

  const convertedUserCvToBytes = new Uint8Array(user?.user?.cv?.data!);
  const convertedUserCvToBlob = new Blob([convertedUserCvToBytes], {
    type: "application/pdf",
  });
  const userCv = URL.createObjectURL(convertedUserCvToBlob);

  return (
    <section className="flex h-full w-full flex-col">
      <section className="cursor-pointer border-b pt-[5%] pb-[8%] hover:bg-neutral-400/4 lg:flex lg:w-full lg:items-center lg:pb-[3%]">
        <h2
          className={`${isFetching ? "animate my-[2%] animate-pulse bg-neutral-300 text-neutral-300" : "pb-[2%] text-lg font-medium lg:w-52 lg:p-0"} `}
        >
          {user.user.name}
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            onClick={() => setOpen(true)}
            className="flex w-full cursor-pointer items-center justify-between"
          >
            <div className="flex flex-col justify-around gap-2 lg:w-full lg:flex-row">
              <p className="flex h-full items-center gap-2">
                <Mail color="oklch(70.4% 0.14 182.503)" />
                <span
                  className={`${isFetching && "animate animate-pulse bg-neutral-300 text-neutral-300"}`}
                >
                  {user.user.email}
                </span>
              </p>
              <p className="flex h-full items-center gap-2">
                <Phone color="oklch(70.4% 0.14 182.503)" />
                <span
                  className={`${isFetching && "animate animate-pulse bg-neutral-300 text-neutral-300"}`}
                >
                  {user.user.number}
                </span>
              </p>
              <p className="flex h-full items-center gap-2">
                <MapPin color="oklch(70.4% 0.14 182.503)" />
                <span
                  className={`${isFetching && "animate animate-pulse bg-neutral-300 text-neutral-300"}`}
                >
                  {user.user.address}
                </span>
              </p>
            </div>
            <ChevronRight />
          </DialogTrigger>
          <DialogContent>
            <UpdateUser user={user.user!} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </section>
      <section className="cursor-pointer border-b pt-[2%] pb-[5%] hover:bg-neutral-400/4 lg:flex lg:w-full lg:items-center lg:pb-[3%]">
        <h3 className="py-[2%] text-lg font-medium lg:w-52 lg:p-0">Skills</h3>
        <Dialog>
          <DialogTrigger className="flex w-full items-center justify-between lg:w-full">
            <div className="flex flex-col pt-[3%] lg:w-full lg:pt-[2%]">
              <ul className="flex w-full flex-wrap gap-3 py-[2%] lg:p-0">
                {user.user.skills?.map((skill) => (
                  <li
                    className={` ${isFetching ? "animate mx-[2%] my-[1%] animate-pulse bg-neutral-300 text-neutral-300" : "w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600"}`}
                  >
                    {skill.skills_name}
                  </li>
                ))}
              </ul>
            </div>
            <ChevronRight />
          </DialogTrigger>
          <DialogContent className="h-[80%] overflow-hidden">
            <UpdateSkills user={user.user!} />
          </DialogContent>
        </Dialog>
      </section>
      <section>
        <Dialog>
          <DialogTrigger className="flex w-full items-center lg:w-full">
            <p className="pt-[5%] text-lg underline">User cv</p>
          </DialogTrigger>
          <DialogContent className="h-[80%] overflow-hidden">
            <embed
              src={userCv}
              className="mt-2 h-full w-full overflow-hidden"
              title="user CV"
            />
          </DialogContent>
        </Dialog>
      </section>
    </section>
  );
};

export default User;
