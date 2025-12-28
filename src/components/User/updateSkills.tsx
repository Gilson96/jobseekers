import { useState, type FormEvent } from "react";
import type { Skills, Skills_user, User } from "../../dataTypes";
import { Button } from "../ui/button";
import { useUpdateUser } from "../../hooks/usePatchQueries";
import { Navigate } from "react-router";
import { toast } from "sonner";
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

const UpdateSkills = ({ user }: { user: User }) => {
  const { isFetching, isLoading, skills } = useGetAllSkills();
  const [choseSkill, setChoseSkill] = useState<Skills_user>();

  let optimisticToggleAction: User[] | Skills[] | undefined = [];

  const {
    isError: isErrorDeleting,
    isPending: isPendingDeleting,
    isSuccess: isSuccessDeleting,
    mutate: removeSkills,
  } = useDeleteUserSkills(choseSkill?.skills_user_id!);
  const {
    isError: isErrorPosting,
    isPending: isPendingPosting,
    isSuccess: isSuccessPosting,
    mutate: addSkills,
  } = usePostSkillsUser(choseSkill?.skills_id!, choseSkill?.user_id!);

  return (
    <section className="flex h-full flex-col justify-between p-[2%]">
      <section>
        <h2 className="border-b py-[2%] text-lg font-medium">My skills</h2>
        <ul className="flex flex-wrap gap-4 py-[4%]">
          {user?.skills?.map((skill) => (
            <li
              className={`flex w-auto items-center gap-2 rounded-full border border-red-500 p-[2%] font-medium`}
            >
              <XCircle
                className="cursor-pointer text-red-500"
                onClick={() => {
                  (setChoseSkill({
                    ...choseSkill,
                    skills_user_id: skill.skills_user_id,
                  }),
                    removeSkills());
                }}
              />
              <p>{skill.skills_name as string}</p>
            </li>
          ))}
        </ul>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger className="border-b p-[2%] text-lg font-medium">
              Choose one from the list:
            </AccordionTrigger>
            <AccordionContent className="flex h-[15rem] flex-wrap gap-4 overflow-y-auto py-[5%]">
              {skills?.map((skill) => (
                <li className="flex w-auto items-center gap-2 rounded-full border border-green-500 bg-white p-[2%] font-medium text-green-600">
                  <PlusCircle
                    className="cursor-pointer text-green-500"
                    onClick={() => {
                      (setChoseSkill({
                        ...choseSkill,
                        skills_id: skill.skills_id as number,
                        user_id: user.user_id,
                      }),
                        addSkills());
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
