import { useState } from "react";
import { useGetUser, useSearchJob } from "../../hooks/useGetQueries";
import useScreenSize from "../../hooks/useScreenSize";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";
import JobsMobiileView from "../Jobs/jobsMobileView";
import JobsDesktopView from "../Jobs/jobsDesktopView";
import { useUserLoginStore } from "../../hooks/store";
import type { User } from "../../dataTypes";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchingJob, setIsSearchingJob] = useState(false);
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 1000;
  const {
    isFetching: searchFetching,
    isLoading: searchLoading,
    searchedJob,
  } = useSearchJob(searchInput, isSearchingJob);
  const {
    isFetching: userIsFetching,
    isLoading: userIsLoading,
    userData: user,
  } = useGetUser();

  const guestUser = useUserLoginStore((s) => s.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchingJob(true);
  };

  if (mobileView) {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center gap-2 border-b py-[8%]"
        >
          <InputGroup className="h-14">
            <InputGroupInput
              className="italic"
              placeholder="Job title, skill or company"
              name="searchInput"
              onChange={(e) => {
                (setIsSearchingJob(false), setSearchInput(e.target.value));
              }}
            />
            <InputGroupAddon>
              <SearchIcon color="black" />
            </InputGroupAddon>
          </InputGroup>
          <Button className="w-full font-bold">Find Jobs</Button>
        </form>
        <JobsMobiileView
          searchLoading={searchLoading}
          searchFetching={searchFetching}
          isSearchingJob={isSearchingJob}
          userIsFetching={userIsFetching}
          userIsLoading={userIsLoading}
          searchedJob={searchedJob}
          guestUser={guestUser}
          user={user as { user: User }}
        />
      </>
    );
  } else {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex w-[80%] flex-col items-center justify-center gap-2 place-self-center border-b py-[3%]"
        >
          <InputGroup className="h-14 pr-[2%]">
            <InputGroupInput
              className="italic"
              placeholder="Job title, skill or company"
              onChange={(e) => {
                (setIsSearchingJob(false), setSearchInput(e.target.value));
              }}
            />
            <InputGroupAddon>
              <SearchIcon color="black" />
            </InputGroupAddon>
            <Button className="font-bold">Find Jobs</Button>
          </InputGroup>
        </form>
        <JobsDesktopView
          searchLoading={searchLoading}
          searchFetching={searchFetching}
          isSearchingJob={isSearchingJob}
          searchedJob={searchedJob}
          guestUser={guestUser}
          user={user as { user: User }}
          userIsFetching={userIsFetching}
          userIsLoading={userIsLoading}
        />
      </>
    );
  }
};

export default Home;
