import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { MdDateRange } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import CustomIcon from "./Process/data/CustomIcon";
import { getJobs } from "../api";

export function loader({ params }) {
  return getJobs(params.id);
}

const JobDetailPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const job = useLoaderData()[0];

  useEffect(() => {
    const isLogged = localStorage.getItem("loggedin");
    setIsAuthenticated(isLogged);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full   p-6 rounded-2xl shadow-xl flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">{job.title}</h2>
            <p className="text-gray-400 text-sm">{job.category}</p>

            <div className="flex items-center gap-2 text-gray-300 mt-1">
              <MdDateRange />
              {new Date(job.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>

          <p className="text-3xl font-bold text-blue-400">{job.price}$</p>
        </div>

        <div>
          <p className="font-semibold text-lg text-gray-200 mb-1">
            Task Description
          </p>
          <p className="text-gray-300">{job.description}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 text-gray-200">
            <CiImageOn size={24} />
            <span className="font-semibold">Photos</span>
          </div>
          <div className="w-full h-[120px] bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
            No photos uploaded
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 text-gray-200">
            <FaMapMarkerAlt />
            <span className="font-semibold">Location</span>
          </div>

          <MapContainer
            center={[job.lat, job.lng]}
            zoom={13}
            className="w-full h-[30vh] rounded-xl overflow-hidden"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[job.lat, job.lng]}
              icon={L.divIcon({
                html: ReactDOMServer.renderToString(
                  <CustomIcon categoryMark={job.category} price={job.price} />
                ),
                className: "",
                iconSize: [60, 40],
                iconAnchor: [30, 20],
              })}
            />
          </MapContainer>
        </div>

        <div>
          <p className="font-semibold text-lg text-gray-200 mb-2">
            About Owner
          </p>

          <div className="flex items-center gap-3">
            <MdAccountCircle size={55} color="gray" />

            <div>
              <p className="font-semibold text-lg">Name Surname</p>

              <div className="flex items-center gap-1 text-gray-300">
                <FaStar color="gold" />
                <span>{job.user_rating}</span>
                <span className="text-gray-500">
                  ({job.applicants} applied)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg text-gray-200 mb-3">Apply</p>

          {!isAuthenticated ? (
            <>
              <p className="text-center text-gray-400 pb-2">
                Log in to be able to apply
              </p>

              <Link
                to={`/login?redirectTo=/process/job/${job.id}/apply`}
                className="bg-blue-600 hover:bg-blue-700 py-3 text-lg rounded-xl block text-center font-bold"
              >
                Log in
              </Link>
            </>
          ) : (
            <Link
              to={`/process/job/${job.id}/apply`}
              className="bg-blue-500 hover:bg-blue-600 py-3 text-lg rounded-xl block text-center font-bold"
            >
              Apply
            </Link>
          )}
        </div>

        <div>
          <p className="font-semibold text-lg text-gray-200 mb-1">
            Information
          </p>

          <div className="text-gray-400">
            <p>Published:</p>
            <p>
              {new Date(job.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
