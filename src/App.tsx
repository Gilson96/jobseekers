import { Route, Routes } from "react-router";
import "./App.css";
import Navigator from "./components/Navigator/navigator";
import Home from "./components/Home/home";

const App = () => {
  return (
    <main className="h-full w-full px-[3%] py-[1%]">
      <Navigator />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
