import { useState } from "react";
import type { Skills_user, User } from "../../dataTypes";
import { PlusCircle, XCircle } from "lucide-react";
import { useGetAllSkills } from "../../hooks/useGetQueries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useDeleteUserSkills } from "../../hooks/useDeleteQueries";
import { usePostSkillsUser } from "../../hooks/usePostQueries";

const UpdateSkills = ({
  user,
  isUserFetching,
  isUserLoading,
}: {
  user: User;
  isUserFetching: boolean;
  isUserLoading: boolean;
}) => {
  const [choseSkill, setChoseSkill] = useState<Skills_user>();

  const {
    isLoading: isSkillsLoading,
    isFetching: isSkillsFetching,
    skills,
  } = useGetAllSkills();
  const {
    isError: isErrorDeleting,
    isPending: isPendingDeleting,
    mutate: removeSkills,
  } = useDeleteUserSkills(choseSkill?.skills_user_id!);
  const {
    isError: isErrorPosting,
    isPending: isPendingPosting,
    mutate: addSkills,
  } = usePostSkillsUser();

  return (
    <section className="flex flex-col justify-between p-[2%]">
      <section>
        <h2 className="border-b py-[2%] text-lg font-medium">My skills</h2>
        <ul className="flex max-h-40 flex-wrap gap-4 overflow-y-auto py-[4%]">
          {isPendingDeleting ||
          isPendingPosting ||
          isUserFetching ||
          isUserLoading ? (
            <li
              className={`flex h-10 w-28 items-center justify-center gap-2 rounded-full border`}
            >
              <p className="animate animate-pulse bg-neutral-300 text-neutral-300">
                Loading
              </p>
            </li>
          ) : (
            user?.skills?.map((skill) => (
              <li
                className={`flex h-10 w-auto items-center gap-2 rounded-full border p-[2%]`}
              >
                <XCircle
                  className="cursor-pointer text-neutral-300 hover:text-red-600"
                  onClick={() => {
                    setChoseSkill({ skills_user_id: skill.skills_user_id });
                    removeSkills();
                  }}
                />
                <p>{skill.skills_name as string}</p>
              </li>
            ))
          )}
        </ul>
        {(isErrorDeleting || isErrorPosting) && (
          <p className="text-xs text-red-500">Something went wrong</p>
        )}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="border-b p-[2%] text-lg font-medium">
              Choose one from the list:
            </AccordionTrigger>
            <AccordionContent className="flex h-52 flex-wrap gap-4 overflow-y-auto py-[5%] lg:h-40">
              {isSkillsFetching || isSkillsLoading}
              {skills?.map((skill) => (
                <li
                  onClick={() => {
                    setChoseSkill({
                      skills_id: skill.skills_id,
                      skills_name: skill.skills_name,
                    });
                  }}
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
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  );
};

export default UpdateSkills;
