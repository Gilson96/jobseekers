import { useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import SideBarMenu from "./sideBarMenu";
import TopMenu from "./topMenu";
import CompanyAllJobs from "./companyAllJobs";
import { useGetUser } from "../../hooks/useGetQueries";
import type { Company } from "../../dataTypes";
import CompanyPostJob from "./companyPostJob";
import CompanyProfile from "./companyProfile";

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
      <SideBarMenu />
    </section>
  );
};

export default CompanyDashboard;
