import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import React from "react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import categories from "../pages/Process/data/Categories";
import { MdDateRange } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { useState } from "react";
import CustomIcon from "../pages/Process/data/CustomIcon";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";

const GetTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return `yesterday`;
  if (diffDays > 1) return `${diffDays} days ago`;
};

const Map = ({ jobs }) => {
  const [highlightedIcon, setHighlightedIcon] = useState(null);
  const [sortOption, setSertOption] = useState("newest");

  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.user_rating - a.user_rating;
      default:
        return 0;
    }
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div style="
      background-color: #3b82f6;
      color: white;
      border-radius: 9999px;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
     transform: translate(-50%,-50%)
    ">${cluster.getChildCount()}</div>`,
    });
  };

  const getCategoryColor = (job) => {
    const categoryColor = categories.find(
      (category) => category.name === job.category
    );
    return categoryColor?.bgColor;
  };

  return (
    <div className="w-full h-full flex flex-1">
      <MapContainer
        center={[50.450001, 30.523333]}
        zoom={11}
        className="h-[70vh] w-[75%]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
          maxClusterRadius={50}
        >
          {jobs.map((job) => (
            <Marker
              key={job.id}
              position={[job.lat, job.lng]}
              icon={L.divIcon({
                html: ReactDOMServer.renderToString(
                  <CustomIcon categoryMark={job.category} price={job.price} />
                ),
                className: "",
                iconSize: [60, 40], // можна підлаштувати
                iconAnchor: [30, 20], // щоб трикутник був у точці позиції
              })}
              opacity={
                highlightedIcon === job.id ? 1 : highlightedIcon ? 0.5 : 1
              }
            >
              <Tooltip direction="top" offset={[0, -10]}>
                {job.title}
              </Tooltip>
              <Popup>
                <div className="h-full w-full ">
                  <header>
                    <h3 className="text-center text-xl pb-2">{job.title}</h3>
                    <div className="flex gap-1">
                      <FaStar /> {job.user_rating}{" "}
                      <span className="text-xs">(owner's rating)</span>
                    </div>
                  </header>
                  <p>{job.description.substring(0, 100)}</p>
                  <p>{job.category}</p>
                  <p>{job.price}$</p>
                  <p>{job.applicants} applied</p>
                  <Link to={`/process/job/${job.id}`}>
                    <button className="bg-blue-400 text-white w-full font-semibold text-xl px-3 py-2 rounded-xl cursor-pointer">
                      More details
                    </button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <div className="h-[70vh] p-2 mx-auto overflow-y-auto">
        <div>
          <div className="flex justify-between pb-5">
            <div className="">
              <h2 className="text-lg">Found Results</h2>
              <p className="text-sm mt-1">Choose a suitable task and respond</p>
            </div>
            <div className="flex items-center gap-2">
              <HiArrowsUpDown />
              <select
                value={sortOption}
                onChange={(e) => setSertOption(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-lg text-sm text-gray-300"
              >
                <option value="newest">Newest</option>
                <option value="price-low">From low price</option>
                <option value="price-high">From high price</option>
                <option value="rating">According to rating</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {sortedJobs.map((job) => (
              <Link to={`/process/job/${job.id}`} key={job.id}>
                <div
                  className="border border-blue-300 p-4 flex flex-col justify-between gap-4 rounded-2xl hover:shadow-2xl hover:border-blue-500 transition-all cursor-pointer"
                  onMouseEnter={() => setHighlightedIcon(job.id)}
                  onMouseLeave={() => setHighlightedIcon(null)}
                >
                  <div>
                    <div className="flex justify-between">
                      <h3>{job.title}</h3>
                      <div className="">
                        <div>
                          {job.price}
                          <span>$</span>
                        </div>
                        <div className="flex items-center">
                          <FaStar /> {job.user_rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <span
                          style={{
                            backgroundColor: getCategoryColor(job.category),
                          }}
                          className={` px-2 py-1 rounded-xl`}
                        >
                          {job.category}
                        </span>
                        {job.created_at && (
                          <span className="flex items-center  gap-1">
                            <CiClock2 />
                            {GetTimeAgo(job.created_at)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <MdDateRange />
                        {new Date(job.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>{job.description}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                      <GoPeople />
                      <span>{job.applicants} applied</span>
                    </div>
                    <div>
                      <button className="px-3 py-1.5 bg-blue-400 rounded-xl">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
export { GetTimeAgo };
