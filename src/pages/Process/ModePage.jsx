import React, { useState, useEffect } from "react";
import { CiMap, CiCircleList } from "react-icons/ci";
import { useLoaderData } from "react-router-dom";
import Filters from "../../components/Filters";
import HeaderLoged from "../../components/Headers/HeaderLoged";
import Map from "../../components/map";
import CategoriesFilter from "../../components/CategoriesFilter";
import ListMode from "../../components/ListMode";
import { getJobs } from "../../api";
import Error from "../../components/Error";

export async function loader() {
  return await getJobs();
}

const ModePage = () => {
  const [viewMode, setViewMode] = useState("map");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobs = useLoaderData();
  console.log(jobs);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    radius: 20,
    date: "",
  });

  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const handleCategorySelect = (category) => {
    setFilters({
      ...filters,
      category: category === "All" ? "" : category,
    });
  };

  const applyFilters = () => {
    let results = Array.isArray(jobs) ? [...jobs] : [];
    if (filters.category) {
      results = results.filter((job) => job.category === filters.category);
    }
    results = results.filter(
      (job) => job.price > filters.minPrice && job.price < filters.maxPrice
    );
    setFilteredJobs(results);
  };

  return (
    <div className="bg-black h-full text-white">
      <HeaderLoged />
      <main className="mx-6">
        <CategoriesFilter handleSelectCategory={handleCategorySelect} />
        <Filters filters={filters} handleSetFilters={setFilters} />

        <div className="flex gap-2 justify-center pb-2 pt-2">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center px-2 py-1 rounded-lg text-3xl cursor-pointer ${
              viewMode === "map" ? "bg-blue-400" : "bg-white text-black"
            }`}
          >
            <CiMap />
            <span>Map</span>
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center px-2 py-1 rounded-lg text-3xl gap-1 cursor-pointer ${
              viewMode === "map" ? "bg-white text-black" : "bg-blue-400"
            }`}
          >
            <CiCircleList />
            <span>List</span>
          </button>
        </div>

        {viewMode === "map" ? (
          <Map jobs={filteredJobs} />
        ) : (
          <ListMode jobs={filteredJobs} />
        )}

        <div className="pt-60"></div>
      </main>
    </div>
  );
};

export default ModePage;
