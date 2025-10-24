import React from "react";
import HeaderProces from "../../components/HeaderProcess";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { CiMap } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";

import categories from "./data/Categories";
import Filters from "./Filters";
import HeaderLoged from "../../components/HeaderLoged";

const ListMode = () => {
  const [categorySearch, setCategorySearch] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [viewMode, setViewMode] = useState("map");

  const filteredcategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );
  const visibleCategories = showAllCategories
    ? filteredcategories
    : filteredcategories.slice(0, 10);
  return (
    <div className="bg-black h-screen text-white">
      <HeaderLoged />
      <main className="container  mx-auto ">
        <div className=" border-4 bg-blue-400 border-blue-400 rounded-2xl p-8 mt-8">
          <div className=" flex gap-6 items-center">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
              <input
                value={categorySearch}
                type="text"
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Пошук категорій..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <div>{filteredcategories.length} categories</div>
          </div>
          <div className="flex flex-wrap gap-2 pt-8">
            {visibleCategories.map((category) => (
              <button
                key={category.name}
                className={`flex ${category.color} px-4 py-2 rounded-lg items-center gap-1 cursor-pointer`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
          {filteredcategories.length > 10 && (
            <button
              className="text-white flex items-center gap-2 pt-5 cursor-pointer"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? (
                <>
                  Show less
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Show more{" "}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
        <Filters />
        <div className="flex gap-2 justify-center pt-8">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center px-6 py-3 rounded-lg text-3xl cursor-pointer ${
              viewMode === "map" ? "bg-blue-400" : " bg-white text-black"
            }`}
          >
            <CiMap />
            <span>Map</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center px-6 py-3 rounded-lg text-3xl gap-1 cursor-pointer ${
              viewMode === "map" ? "bg-white text-black" : "bg-blue-400 "
            }`}
          >
            <CiCircleList />
            <span>List</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ListMode;
