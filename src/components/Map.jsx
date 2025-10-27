import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";

const Map = ({ jobs }) => {
  console.log(jobs);
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popup: "Hello, I am pop up 1",
    },
    {
      geocode: [48.85, 2.3522],
      popup: "Hello, I am pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popup: "Hello, I am pop up 3",
    },
  ];
  const custonIcon = new Icon({
    iconUrl: "./location.png",
    iconSize: [38, 38],
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
  const GetTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMs = date.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return `yesterday`;
    if (diffDays > 1) return `${diffDays} days ago`;
  };
  return (
    <div className="w-full h-full flex flex-1">
      <MapContainer
        center={[48.864716, 2.349014]}
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
        >
          {markers.map((marker) => (
            <Marker
              key={marker.geocode}
              position={marker.geocode}
              icon={custonIcon}
            >
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <div className=" p-2 mx-auto overflow-y-auto">
        <div>
          <div className="flex justify-between">
            <div className="">
              <h2 className="text-lg">Found Results</h2>
              <p className="text-sm mt-1">Choose a suitable task and respond</p>
            </div>
            <div className="flex items-center gap-2">
              <HiArrowsUpDown />
              <select className="px-2 py-1 border border-gray-300 rounded-lg text-sm text-gray-300">
                <option value="newest">Newest</option>
                <option value="price-low">From low price</option>
                <option value="price-high">From high price</option>
                <option value="rating">According to rating</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>
          <div>
            {jobs.map((job) => (
              <div className="border border-blue-300" key={job.id}>
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
                <div>
                  <span>{job.category}</span>
                  {job.created_at && (
                    <span>
                      <CiClock2 />
                      {GetTimeAgo(job.created_at)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
