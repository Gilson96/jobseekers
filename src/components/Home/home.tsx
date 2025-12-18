import { useState } from "react";
import { useSearchJob } from "../../hooks/useGetQueries";
import useScreenSize from "../../hooks/useScreenSize";
import Jobs from "../Jobs/jobs";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchingJob, setIsSearchingJob] = useState(false);
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 1000;
  const {
    error,
    isFetching: searchFetching,
    isLoading: searchLoading,
    searchedJob,
  } = useSearchJob(searchInput, isSearchingJob);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchingJob(true);
  };

  if (mobileView) {
    return (
      <>
        <section className="flex flex-col items-start justify-center gap-2 border-b py-[8%]">
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
          <Button
            onClick={() => setIsSearchingJob(true)}
            className="w-full font-bold"
          >
            Find Jobs
          </Button>
        </section>
        <Jobs
          searchLoading={searchLoading}
          searchFetching={searchFetching}
          isSearchingJob={isSearchingJob}
          searchedJob={searchedJob}
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
        <Jobs
          searchLoading={searchLoading}
          searchFetching={searchFetching}
          isSearchingJob={isSearchingJob}
          searchedJob={searchedJob}
        />
      </>
    );
  }
};

export default Home;
