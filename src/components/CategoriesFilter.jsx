import React from "react";
import { MdSearch } from "react-icons/md";
import categories from "../pages/Process/data/Categories";
import { useState } from "react";

const CategoriesFilter = ({ handleSelectCategory }) => {
  const [categorySearch, setCategorySearch] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredcategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );
  const visibleCategories = showAllCategories
    ? filteredcategories
    : filteredcategories.slice(0, 10);
  return (
    <div>
      <div className=" border-4 bg-blue-400 border-blue-400 rounded-2xl p-1 mt-1">
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
        <div className="flex flex-wrap gap-2 pt-2">
          {visibleCategories.map((category) => (
            <button
              key={category.name}
              style={{
                backgroundColor: category.bgColor,
                color: category.textColor,
              }}
              className={`flex px-2 py-1 rounded-lg items-center gap-1 cursor-pointer text-md`}
              onClick={() => handleSelectCategory(category.name)}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
        {filteredcategories.length > 10 && (
          <button
            className="text-white flex items-center gap-2 pt-2 cursor-pointer"
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
    </div>
  );
};

export default CategoriesFilter;
