import { useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import SideBarMenu from "./sideBarMenu";
import TopMenu from "./topMenu";
import CompanyAllJobs from "./companyAllJobs";
import { useGetUser } from "../../hooks/useGetQueries";
import type { Company } from "../../dataTypes";
import { Loader2Icon } from "lucide-react";

const CompanyDashboard = () => {
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 750;
  const [activeTab, setActiveTab] = useState<string>("allJobs");
  const { isFetching, isLoading, userData } = useGetUser();

  if (isFetching || isLoading) {
    return (
      <section className="flex h-[60vh] w-full items-center justify-center">
        <Loader2Icon className="text-teal-500" />
      </section>
    );
  }
  
  const { company } = userData as { company: Company };
  if (mobileView) {
    return (
      <section className="">
        <TopMenu setActiveTab={setActiveTab} />
        {activeTab === "allJobs" && <CompanyAllJobs company={company} />}
        {/* {activeTab === "postJob" && <CompanyPostJob />}
        {activeTab === "updateJob" && <CompanyUpdateJob />}
        {activeTab === "removeJob" && <CompanyRemoveJobs />} */}
      </section>
    );
  }

  return (
    <section className="flex h-full w-full justify-between">
      <SideBarMenu />
    </section>
  );
};

export default CompanyDashboard;
