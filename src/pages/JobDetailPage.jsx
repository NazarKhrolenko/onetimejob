import React from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import sampleJobs from "./Process/data/SampleJobs";
import { MdDateRange } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaStar } from "react-icons/fa";

import CustomIcon from "./Process/data/CustomIcon";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

const JobDetailPage = () => {
  const { id } = useParams();
  const currentJob = sampleJobs.find((job) => id === job.id);
  console.log(currentJob);
  return (
    <div className="w-full h-full flex flex-col gap-4 px-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{currentJob.title}</h2>
          <span>{currentJob.category}</span>
          <div className="flex items-center gap-1">
            <MdDateRange />
            {new Date(currentJob.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-500">
            {currentJob.price}$
          </p>
        </div>
      </div>
      <div>
        <p>Task descrition</p>
        <p>{currentJob.description}</p>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <CiImageOn className="h-6 w-6 font-bold" />
          Photos
        </div>
        <div className="w-full h-[100px] bg-blue-500"></div>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt />
          Location
        </div>
        <div className="w-full h-full">
          <MapContainer
            center={[50.450001, 30.523333]}
            zoom={12}
            className="w-full h-[30vh]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[currentJob.lat, currentJob.lng]}
              icon={L.divIcon({
                html: ReactDOMServer.renderToString(
                  <CustomIcon
                    categoryMark={currentJob.category}
                    price={currentJob.price}
                  />
                ),
                className: "",
                iconSize: [60, 40], // можна підлаштувати
                iconAnchor: [30, 20], // щоб трикутник був у точці позиції
              })}
            ></Marker>
          </MapContainer>
        </div>
      </div>
      <div>
        <p className="font-semibold">About owner</p>
        <div className="flex items-center gap-2">
          <MdAccountCircle size={45} color="gray" />
          <div>
            <p className="font-semibold">Name Surmane</p>
            <div className="flex items-center gap-1">
              <FaStar color="gold" />
              <span>{currentJob.user_rating}</span>
              <p>({currentJob.applicants} applied)</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold pb-5">Apply</p>
        <div>
          <p className="text-center pb-2">Log in to be able to apply</p>
          <button className="bg-blue-600 w-full text-2xl py-2 rounded-xl">
            Log in
          </button>
          <Link to={`/process/job/${currentJob.id}/apply`}>
            <button className="px-3 py-1.5 bg-blue-400 rounded-xl">
              Apply
            </button>
          </Link>
        </div>
      </div>
      <div>
        <p className="font-semibold">Information</p>
        <div>
          <p>Published:</p>
          <p>
            {new Date(currentJob.created_at).toDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
