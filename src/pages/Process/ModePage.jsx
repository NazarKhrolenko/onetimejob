import React, { useState, useEffect } from "react";
import { CiMap, CiCircleList } from "react-icons/ci";
import { useLoaderData } from "react-router-dom";
import Filters from "../../components/Filters";
import Map from "../../components/Map";
import CategoriesFilter from "../../components/CategoriesFilter";
import ListMode from "../../components/ListMode";
import { supabase } from "../../supabase/supabaseClient";

// Loader для завантаження всіх робіт з Supabase
export async function loader() {
  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

const ModePage = () => {
  const [viewMode, setViewMode] = useState("map");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobs = useLoaderData();

  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    radius: 20, // поки не використовується
    date: "", // поки не використовується
  });

  // Фільтрування робіт при зміні jobs або filters
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

    // Фільтр за категорією
    if (filters.category) {
      results = results.filter((job) => job.category === filters.category);
    }

    // Фільтр за зарплатою
    results = results.filter((job) => {
      const salaryNum = parseFloat(job.salary);
      return salaryNum >= filters.minPrice && salaryNum <= filters.maxPrice;
    });

    // Підставляємо дефолтні значення для відсутніх колонок
    results = results.map((job) => ({
      ...job,
      applicants: job.applicants || 0,
      user_rating: job.user_rating || 5,
    }));

    setFilteredJobs(results);
  };

  return (
    <div className="bg-black h-full text-white">
      <main className="mx-6">
        <CategoriesFilter handleSelectCategory={handleCategorySelect} />
        <Filters filters={filters} handleSetFilters={setFilters} />

        {/* Перемикач між карткою та списком */}
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

        {/* Відображення картки або списку */}
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
