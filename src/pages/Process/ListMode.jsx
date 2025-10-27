import React from "react";
import HeaderProces from "../../components/HeaderProcess";

import { useState, useEffect } from "react";
import { CiMap, CiCircleList } from "react-icons/ci";
import Filters from "./Filters";
import HeaderLoged from "../../components/HeaderLoged";
import Map from "../../components/map";
import CategoriesFilter from "./CategoriesFilter";
import sampleJobs from "./data/SampleJobs";

const ListMode = () => {
  const [viewMode, setViewMode] = useState("map");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setJobs(sampleJobs);
  };

  return (
    <div className="bg-black h-full text-white">
      <HeaderLoged />
      <main className=" mx-6">
        <CategoriesFilter />
        <Filters />
        <div className="flex gap-2 justify-center pb-2 pt-2">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center px-2 py-1 rounded-lg text-3xl cursor-pointer ${
              viewMode === "map" ? "bg-blue-400" : " bg-white text-black"
            }`}
          >
            <CiMap />
            <span>Map</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center px-2 py-1 rounded-lg text-3xl gap-1 cursor-pointer ${
              viewMode === "map" ? "bg-white text-black" : "bg-blue-400 "
            }`}
          >
            <CiCircleList />
            <span>List</span>
          </button>
        </div>
        <Map jobs={jobs} />
        <div className="pt-60"></div>
      </main>
    </div>
  );
};

export default ListMode;
