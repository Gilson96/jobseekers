import { LoaderCircle } from "lucide-react";
import { useGetUser } from "../../hooks/useGetQueries";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import UpdateUser from "./updateUser";
import UpdateSkills from "./updateSkills";

const User = () => {
  const { isFetching, isLoading, userData } = useGetUser();

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-300/40">
        <LoaderCircle className="animate size-10 animate-spin text-teal-600" />
      </div>
    );
  }
  console.log(userData);
  return (
    <section className="flex h-full w-full flex-col">
      <section className="border-b pt-[2%] pb-[5%] hover:bg-neutral-400/4 lg:pb-[3%]">
        <h2 className="pb-[2%] text-lg font-medium">{userData?.user.name}</h2>
        <Dialog>
          <DialogTrigger className="hover:bg-n flex w-full cursor-pointer items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="flex h-full items-center gap-2">
                <Mail color="oklch(70.4% 0.14 182.503)" />
                <span>{userData?.user.email}</span>
              </p>
              <p className="flex h-full items-center gap-2">
                <Phone color="oklch(70.4% 0.14 182.503)" />
                <span>{userData?.user.number}</span>
              </p>
              <p className="flex h-full items-center gap-2">
                <MapPin color="oklch(70.4% 0.14 182.503)" />
                <span>{userData?.user.address}</span>
              </p>
            </div>
            <ChevronRight />
          </DialogTrigger>
          <DialogContent>
            <UpdateUser user={userData?.user!} />
          </DialogContent>
        </Dialog>
      </section>
      <section className="cursor-pointer border-b pt-[2%] pb-[5%] hover:bg-neutral-400/4 lg:pb-[3%]">
        <h3 className="py-[2%] text-lg font-medium lg:pb-0">Skills</h3>
        <Dialog>
          <DialogTrigger className="flex w-full items-center justify-between">
            <div className="flex flex-col pt-[3%] lg:pt-[2%]">
              <ul className="flex w-full flex-wrap gap-3 py-[2%] lg:py-0 lg:pb-[5%]">
                {userData?.user.skills?.map((skill) => (
                  <li className="w-auto rounded bg-neutral-200 px-[2%] py-[1%] text-center font-medium text-neutral-600">
                    {skill.skills_name}
                  </li>
                ))}
              </ul>
            </div>
            <ChevronRight />
          </DialogTrigger>
          <DialogContent className="h-[70%] overflow-hidden lg:h-full">
            <UpdateSkills user={userData?.user!} />
          </DialogContent>
        </Dialog>
      </section>
      <section>
        <p>CV</p>
      </section>
    </section>
  );
};

export default User;
