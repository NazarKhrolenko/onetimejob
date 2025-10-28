import React from "react";
import {
  FilterIcon,
  DollarSignIcon,
  MapPinIcon,
  CalendarIcon,
} from "lucide-react";
import { data } from "react-router-dom";

const Filters = ({ filters, handleSetFilters }) => {
  return (
    <div className="mt-2 bg-blue-500 rounded-lg p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-8 items-center justify-around">
          <div className="flex gap-1">
            <FilterIcon />
            Filters
          </div>
          <div className="flex gap-1 items-center">
            <DollarSignIcon />
            <label>Min salary:</label>
            <input
              value={filters.minPrice}
              onChange={(e) =>
                handleSetFilters({ ...filters, minPrice: e.target.value })
              }
              className="text-black bg-white rounded-lg w-24 px-3 py-1"
              type="number"
              min="0"
              placeholder="0"
            />

            <span>$</span>
          </div>

          <div className="flex gap-1 items-center">
            <DollarSignIcon />
            <label>Maks salary:</label>
            <input
              value={filters.maxPrice}
              onChange={(e) =>
                handleSetFilters({ ...filters, maxPrice: e.target.value })
              }
              className="text-black bg-white rounded-lg w-24 px-3 py-1"
              type="number"
              min="10000"
              placeholder="10000"
            />
            <span>$</span>
          </div>
          <div className="flex gap-1 items-center">
            <MapPinIcon />
            <label>Distance:</label>
            <input
              value={filters.radius}
              onChange={(e) =>
                handleSetFilters({ ...filters, radius: e.target.value })
              }
              className="bg-white text-black rounded-lg w-24 px-3 py-1"
              type="number"
              min="0"
              max="100"
              placeholder="20"
            />
          </div>
          <div className="flex gap-1 items-center">
            <CalendarIcon />
            <label>Distance:</label>
            <input
              value={filters.date}
              onChange={(e) =>
                handleSetFilters({ ...filters, date: e.target.value })
              }
              className="bg-white text-black rounded-lg w-24 px-3 py-1"
              type="date"
              name=""
              id=""
            />
          </div>
        </div>
        <div>
          <button className="bg-gray-400 px-4 py-2 rounded-lg text-xl cursor-pointer">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
