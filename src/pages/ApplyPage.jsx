import { useState } from "react";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../supabase/AuthContext";

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const jobData = useLoaderData();
  const job = jobData?.[0];

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);

  if (session === null) {
    return <Navigate to={`/login?redirectTo=/process/job/${id}/apply`} replace />;
  }

  if (!job) {
    return <p className="text-white p-6">Job not found</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.target);
    const message = formData.get("message");
    const price = Number(formData.get("price"));

    setIsPending(true);
    const { error: applyError } = await supabase.from("applications").insert({
      job_id: job.id,
      user_id: session.user.id,
      message,
      price,
      created_at: new Date().toISOString(),
    });

    if (applyError) {
      setError(applyError.message);
      setIsPending(false);
      return;
    }

    setSuccessMessage("Application sent successfully.");
    setIsPending(false);
    e.target.reset();

    setTimeout(() => {
      navigate(`/process/job/${job.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-blue-400 text-xl mb-4">{job.salary}$</p>

        <p className="text-gray-300 mb-4">{job.description}</p>
        <p className="text-gray-400 mb-2">📅 {job.deadline}</p>

        <hr className="border-gray-700 my-4" />

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="block text-gray-300 mb-2">Your message</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white mb-4"
            rows="4"
            placeholder="Write why you are suitable for this job..."
            name="message"
            required
          />

          <label className="block text-gray-300 mb-2">Your proposed price</label>
          <input
            type="number"
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white mb-4"
            placeholder="Example: 150"
            name="price"
            min="1"
            required
          />

          {error && <p className="text-red-500 mb-3">{error}</p>}
          {successMessage && <p className="text-green-500 mb-3">{successMessage}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl text-lg font-bold disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
