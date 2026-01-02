import { PlusCircle, XCircle } from "lucide-react";
import type { Job, Skills_job } from "../../dataTypes";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { usePostSkillsJob } from "../../hooks/usePostQueries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import user from "../User/user";
import { useDeleteJobSkills } from "../../hooks/useDeleteQueries";
import { Button } from "../ui/button";
import { useGetAllSkills } from "../../hooks/useGetQueries";

const CompanyManageJobSkills = ({ job }: { job: Job }) => {
  const [choseSkill, setChoseSkill] = useState<Skills_job>({
    job_id: 0,
    skills_id: 0,
    skills_job_id: 0,
  });
  const {
    isFetching: isSkillsFetching,
    isLoading: isSkillsLoading,
    skills,
  } = useGetAllSkills();
  const {
    isError: isPostingError,
    isPending: isPostingPending,
    isSuccess: isPostingSuccess,
    mutate: addSkills,
  } = usePostSkillsJob();
  const {
    isError: isRemovingError,
    isPending: isPendingError,
    isSuccess: isSuccessError,
    mutate: removeSkills,
  } = useDeleteJobSkills(choseSkill.skills_job_id!);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="w-full">
          Update skills
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <section className="flex h-[30rem] flex-col justify-between p-[2%] lg:h-full">
          <section className="">
            <h2 className="border-b py-[2%] text-lg font-medium">Job skills</h2>
            <ul className="flex h-[12rem] flex-wrap gap-4 overflow-y-auto py-[4%]">
              {job?.skills?.map((skill) => (
                <li
                  className={`flex w-auto items-center gap-2 rounded-full border border-red-500 p-[2%] font-medium`}
                >
                  <XCircle
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      (setChoseSkill({
                        ...choseSkill,
                        skills_job_id: skill.skills_job_id,
                      }),
                        removeSkills());
                    }}
                  />
                  <p>{skill.skills_name}</p>
                </li>
              ))}
            </ul>
          </section>
          <Accordion defaultValue="item-1" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="border-b p-[2%] text-lg font-medium">
                Choose one from the list:
              </AccordionTrigger>
              <AccordionContent className="flex h-[15rem] flex-wrap gap-4 overflow-y-auto py-[5%]">
                {skills?.map((skill) => (
                  <li className="flex w-auto items-center gap-2 rounded-full border border-green-500 bg-white p-[2%] font-medium text-green-600">
                    <PlusCircle
                      className="cursor-pointer text-green-500"
                      onClick={() =>
                        addSkills({
                          job_id: job.job_id as number,
                          skills_id: skill.skills_id as number,
                        })
                      }
                    />
                    <p>{skill.skills_name as string}</p>
                  </li>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyManageJobSkills;
