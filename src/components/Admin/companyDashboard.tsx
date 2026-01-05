import { useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import TopMenu from "./topMenu";
import CompanyAllJobs from "./companyAllJobs";
import { useGetUser } from "../../hooks/useGetQueries";
import type { Company } from "../../dataTypes";
import CompanyPostJob from "./companyPostJob";
import CompanyProfile from "./companyProfile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { PlusCircleIcon, UserCircle2Icon } from "lucide-react";

const CompanyDashboard = () => {
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 750;
  const [activeTab, setActiveTab] = useState<string>("allJobs");
  const {
    isFetching: isUserFetching,
    isLoading: isUserLoading,
    userData: user,
  } = useGetUser();

  const { company } = (user as { company: Company }) ?? {};

  if (mobileView) {
    return (
      <section className="h-full w-full">
        <TopMenu setActiveTab={setActiveTab} />
        {activeTab === "allJobs" && (
          <CompanyAllJobs
            isUserFetching={isUserFetching}
            isUserLoading={isUserLoading}
            company={company}
          />
        )}
        {activeTab === "postJob" && (
          <CompanyPostJob setActiveTab={setActiveTab} company={company} />
        )}
        {activeTab === "profile" && (
          <CompanyProfile
            isUserFetching={isUserFetching}
            isUserLoading={isUserLoading}
            company={company}
          />
        )}
      </section>
    );
  }

  return (
    <section className="flex h-full w-full justify-between">
      <section>
        <CompanyAllJobs
          isUserFetching={isUserFetching}
          isUserLoading={isUserLoading}
          company={company}
        />
      </section>
      <section className="sticky top-1 mt-4 h-full w-[50%]">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex">
              <section className="flex items-center gap-3">
                <PlusCircleIcon size={30} />
                <span className="text-lg font-normal">Add new job</span>
              </section>
            </AccordionTrigger>
            <AccordionContent>
              <CompanyPostJob setActiveTab={setActiveTab} company={company} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex items-center gap-3">
              <section className="flex items-center gap-3">
                <UserCircle2Icon size={30} />
                <span className="text-lg font-normal">Update details</span>
              </section>
            </AccordionTrigger>
            <AccordionContent>
              <CompanyProfile
                isUserFetching={isUserFetching}
                isUserLoading={isUserLoading}
                company={company}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  );
};

export default CompanyDashboard;
