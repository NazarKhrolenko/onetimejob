import { useState } from "react";
import { useAuth } from "../supabase/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser } = useAuth();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { success, error: signInError } = await signInUser(email, password);

    if (!success) {
      setError(signInError);
      setIsPending(false);
      return;
    }

    // Get the redirectTo query parameter, default to home page if not found
    const urlParams = new URLSearchParams(location.search);
    const redirectTo = urlParams.get("redirectTo") || "/";

    // Navigate to the target URL
    navigate(redirectTo);
  };

  return (
    <div className="h-screen w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-semibold pb-8">Log in to your account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="border px-2 py-2 rounded-t-xl w-[400px]"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="border px-2 py-2 rounded-b-xl w-[400px]"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          disabled={isPending}
          className="bg-blue-400 py-3 rounded-xl mt-10 cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Log in"}
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
