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
  const [filteredJobs, setFilteredJobs] = useState();
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    radius: 20,
    date: "",
  });
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    ApplyFilters();
  }, [jobs, filters]);
  const fetchJobs = () => {
    setJobs(sampleJobs);
  };

  const handleCaterorySelect = (filteredCategory) => {
    setFilters({
      ...filters,
      category: filteredCategory === "Всі" ? "" : filteredCategory,
    });
  };

  const ApplyFilters = () => {
    let filteredJobs = [...jobs];
    if (filters.category) {
      filteredJobs = filteredJobs.filter(
        (job) => job.category === filters.category
      );
    }

    filteredJobs = filteredJobs.filter(
      (job) => job.price > filters.minPrice && job.price < filters.maxPrice
    );

    setFilteredJobs(filteredJobs);
    console.log({ filteredJobs });
  };

  return (
    <div className="bg-black h-full text-white">
      <HeaderLoged />
      <main className=" mx-6">
        <CategoriesFilter handleSelectCategory={handleCaterorySelect} />
        <Filters filters={filters} handleSetFilters={setFilters} />
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
        <Map jobs={filteredJobs} />
        <div className="pt-60"></div>
      </main>
    </div>
  );
};

export default ListMode;
