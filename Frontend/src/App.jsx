import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "././main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Registation";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Jobs/Jobs";
import JobDetails from "./components/Jobs/Jobdetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplication";
import PostJob from "./components/Jobs/Postjob";
import NotFound from "./components/Notfound/Notfound";
import MyJobs from "./components/Jobs/Myjob";

const App = () => {
  const { isAuthorized, setisAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setisAuthorized(true);
      } catch (error) {
        setisAuthorized(false); 
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Registation" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/Postjob" element={<PostJob />} />
          <Route path="/Myjob" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;