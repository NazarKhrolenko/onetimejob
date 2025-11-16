import React from "react";
import { Link } from "react-router-dom";
import HeaderHomePage from "../components/Headers/HeaderHomePage";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderHomePage />

      <div className="w-full bg-gradient-to-r from-[#1a5a73] to-[#4fb6ff] py-20 mt-8 shadow-xl">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <h1 className="text-4xl  font-extrabold leading-tight drop-shadow-md">
            Get the job done or find work in minutes
          </h1>

          <p className="text-gray-100 text-lg md:text-xl mt-4 max-w-2xl">
            Post tasks, hire local professionals, or earn money helping others —
            quickly and easily.
          </p>

          <Link
            to="/process"
            className="mt-10 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-xl text-xl font-bold shadow-lg transition transform hover:scale-[1.03]"
          >
            Let's make a deal!
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 px-6 grid md:grid-cols-3 gap-8 text-gray-300">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl hover:bg-gray-800 transition">
          <h2 className="text-xl font-bold mb-2">Post a Job</h2>
          <p>Create a task and connect with reliable workers in minutes.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl hover:bg-gray-800 transition">
          <h2 className="text-xl font-bold mb-2">Find Work</h2>
          <p>Browse local tasks, apply instantly, and start earning today.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl hover:bg-gray-800 transition">
          <h2 className="text-xl font-bold mb-2">Fast & Easy</h2>
          <p>User-friendly interface, fair pricing, and secure payments.</p>
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default Home;
