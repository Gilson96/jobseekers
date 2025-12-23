import { Route, Routes } from "react-router";
import "./App.css";
import Navigator from "./components/Navigator/navigator";
import Home from "./components/Home/home";
import Application from "./components/Application/application";
import Login from "./components/Login/login";
import User from "./components/User/user";
import MyJobs from "./components/User/myJobs";

const App = () => {
  return (
    <main className="w-full px-[3%] py-[1%]">
      <Navigator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/application" element={<Application />} />
        <Route path="/user" element={<User />} />
        <Route path="/myJobs" element={<MyJobs />} />
      </Routes>
    </main>
  );
};

export default App;
