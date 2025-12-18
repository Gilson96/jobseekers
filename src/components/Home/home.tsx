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
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 1000;

  if (mobileView) {
    return (
      <>
        <section className="flex flex-col items-start justify-center gap-2 border-b py-[8%]">
          <InputGroup className="h-14">
            <InputGroupInput
              className="italic"
              placeholder="Job title, skill or company"
            />
            <InputGroupAddon>
              <SearchIcon color="black" />
            </InputGroupAddon>
          </InputGroup>
          <Button className="w-full font-bold">Find Jobs</Button>
        </section>
        <Jobs />
      </>
    );
  } else {
    return (
      <>
        <section className="flex w-[80%] flex-col items-center justify-center gap-2 place-self-center border-b py-[3%]">
          <InputGroup className="h-14 pr-[2%]">
            <InputGroupInput
              className="italic"
              placeholder="Job title, skill or company"
            />
            <InputGroupAddon>
              <SearchIcon color="black" />
            </InputGroupAddon>
            <Button className="font-bold">Find Jobs</Button>
          </InputGroup>
        </section>
        <Jobs />
      </>
    );
  }
};

export default Home;
