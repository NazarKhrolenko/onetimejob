import React, { useState } from "react";
import { useParams, useLoaderData, Form } from "react-router-dom";
import { getJobs } from "../api";
import { requireAuth } from "../../utils";

export async function loader({ request, params }) {
  const auth = await requireAuth(request);

  if (auth && auth instanceof Response) {
    return auth;
  }
  return await getJobs(params.id);
}

const ApplyPage = () => {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const job = useLoaderData()[0];
  console.log(job);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-xl">
        {/* Інформація про роботу */}
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-blue-400 text-xl mb-4">{job.price}$</p>

        <p className="text-gray-300 mb-4">{job.description}</p>
        <p className="text-gray-400 mb-2">📅 {job.date}</p>
        <p className="text-gray-400 mb-6">📍 {job.location}</p>

        <hr className="border-gray-700 my-4" />

        {/* Форма відгуку */}
        <Form method="post">
          <label className="block text-gray-300 mb-2">Your message</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white mb-4"
            rows="4"
            placeholder="Write why you are suitable for this job..."
            name="message"
            required
          />

          <label className="block text-gray-300 mb-2">
            Your proposed price
          </label>
          <input
            type="number"
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white mb-4"
            placeholder="Example: 150"
            name="price"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl text-lg font-bold"
          >
            Apply
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ApplyPage;
