import { useState } from "react";
import type { Company, Skills_user, User } from "../../dataTypes";
import { Loader2Icon, PlusCircle, XCircle } from "lucide-react";
import { useGetAllSkills } from "../../hooks/useGetQueries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useDeleteUserSkills } from "../../hooks/useDeleteQueries";
import { usePostSkillsUser } from "../../hooks/usePostQueries";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

const UpdateSkills = ({
  user,
  refetch,
}: {
  user: User;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<{ user: User } | { company: Company }, Error>
  >;
}) => {
  const { isFetching, isLoading, skills } = useGetAllSkills();
  const [choseSkill, setChoseSkill] = useState<Skills_user>();

  const {
    isError: isErrorDeleting,
    // isPending: isPendingDeleting,
    isSuccess: isSuccessDeleting,
    mutate: removeSkills,
  } = useDeleteUserSkills(choseSkill?.skills_user_id!);
  const {
    isError: isErrorPosting,
    isPending: isPendingPosting,
    isSuccess: isSuccessPosting,
    mutate: addSkills,
  } = usePostSkillsUser();

  if (isLoading || isFetching) {
    return <Loader2Icon className="animate animate-spin text-teal-500" />;
  }

  if (isSuccessPosting || isSuccessDeleting) {
    refetch();
  }


  return (
    <section className="flex flex-col justify-between p-[2%]">
      <section>
        <h2 className="border-b py-[2%] text-lg font-medium">My skills</h2>
        <ul className="flex flex-wrap gap-4 py-[4%]">
          
          {user?.skills?.map((skill) => (
            <li
              className={`flex w-auto items-center gap-2 rounded-full border p-[2%]`}
            >
              <XCircle
                className="cursor-pointer text-neutral-300 hover:text-red-600"
                onClick={() => {
                  setChoseSkill({
                    skills_user_id: skill.skills_user_id,
                  });
                  removeSkills();
                }}
              />
              <p>{skill.skills_name as string}</p>
            </li>
          ))}
        </ul>
        {(isErrorDeleting || isErrorPosting) && (
          <p className="text-xs text-red-500">Something went wrong</p>
        )}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger className="border-b p-[2%] text-lg font-medium">
              Choose one from the list:
            </AccordionTrigger>
            <AccordionContent className="flex h-[15rem] flex-wrap gap-4 overflow-y-auto py-[5%] lg:h-[10rem]">
              {isPendingPosting ? (
                <Loader2Icon className="animate animate-spin text-teal-500" />
              ) : (
                skills?.map((skill) => (
                  <li
                    onClick={() =>
                      setChoseSkill({
                        skills_id: skill.skills_id,
                        skills_name: skill.skills_name,
                      })
                    }
                    className="flex w-auto items-center gap-2 rounded-full border border-green-500 bg-white p-[2%] font-medium text-green-600"
                  >
                    <PlusCircle
                      className="cursor-pointer text-green-500"
                      onClick={() => {
                        addSkills({
                          skills_id: skill.skills_id!,
                          user_id: user.user_id!,
                        });
                      }}
                    />
                    <p>{skill.skills_name as string}</p>
                  </li>
                ))
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  );
};

export default UpdateSkills;
