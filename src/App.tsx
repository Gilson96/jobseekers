import { Route, Routes } from "react-router";
import "./App.css";
import Navigator from "./components/Navigator/navigator";
import Home from "./components/Home/home";
import Application from "./components/Application/application";
import Login from "./components/Login/login";
import User from "./components/User/user";
import MyJobs from "./components/User/myJobs";
import StartPage from "./components/Home/startPage";
import { useUserLoginStore } from "./hooks/store";
import CompanyDashboard from "./components/Admin/companyDashboard";

const App = () => {
  const user = useUserLoginStore((s) => s.user);
  return (
    <main className="w-full px-[3%] py-[1%]">
      <Navigator />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />

        {user.role === "admin" ? (
          <>
            <Route path="/home" element={<CompanyDashboard />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/user" element={<User />} />
            <Route path="/myJobs" element={<MyJobs />} />
          </>
        )}
      </Routes>
    </main>
  );
};

export default App;
