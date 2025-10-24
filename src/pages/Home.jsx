import React from "react";
import { Link } from "react-router-dom";
import HeaderHomePage from "../components/HeaderHomePage";

const Home = () => {
  return (
    <div className="bg-black h-screen">
      <HeaderHomePage />
      <div className="bg-gradient-to-r from-[#1a5a73] to-[#4fb6ff] w-full h-[400px] mt-5 text-white">
        <div className="w-[60%] p-12">
          <h1 className="text-4xl">Get the job done or find work in minutes</h1>
        </div>
        <div className="bg-blue-400 w-fit px-4 py-2 rounded-lg flex mx-auto mt-10">
          <Link to="/process" className="text-2xl font-sans">
            Lets make a deal!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
