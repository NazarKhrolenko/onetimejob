import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import categories from "./Process/data/Categories";

import { supabase } from "../supabase/supabaseClient";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import { Form } from "react-router-dom";
import { useAuth } from "../supabase/AuthContext";

export async function action({ request }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const salary = formData.get("salary");
  const lat = formData.get("lat") ? parseFloat(formData.get("lat")) : null;
  const lng = formData.get("lng") ? parseFloat(formData.get("lng")) : null;
  const deadline = formData.get("date"); // правильно: deadline

  const { error } = await supabase.from("jobs").insert({
    title,
    description,
    category,
    salary,
    lat,
    lng,
    deadline,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }

  return redirect("/process");
}

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [position, setPosition] = React.useState(null);

  if (session === null) {
    return <Navigate to="/login?redirectTo=/createJob" replace />;
  }
  function LocationMarker({ position, setPosition }) {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position ? <Marker position={position} /> : null;
  }
  return (
    <div className="w-full h-full">
      <header className="border-b border-gray-200 px-6 py-4">
        <button
          onClick={() => navigate("/process")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <BsArrowLeft />
          Back
        </button>
      </header>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-blue-600 pb-5">
          Create new job
        </h1>
        <div className="w-[90%] flex gap-6">
          <div className="border-2 border-gray-400 p-4 rounded-2xl w-[40%]">
            <Form method="post" className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label>Title of the job</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Category</label>
                <select
                  className="w-full px-4 py-2  border border-gray-300 rounded-lg"
                  name="category"
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Deadline</label>
                <input
                  name="date"
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <input type="hidden" name="lat" value={position?.[0] || ""} />
              <input type="hidden" name="lng" value={position?.[1] || ""} />
              <button className="bg-blue-400 py-3 rounded-xl mt-10 cursor-pointer">
                Submit
              </button>
            </Form>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select location on the map
            </h3>
            <div>
              <MapContainer
                center={[50.450001, 30.523333]}
                zoom={11}
                className="h-[60vh] w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
            {position && (
              <p className="mt-3 text-sm text-gray-600">
                Coordinates: {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
