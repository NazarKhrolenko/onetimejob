import { useMemo, useState } from "react";
import { useAuth } from "../supabase/AuthContext";
import { Link, useLocation } from "react-router-dom";

const SignUp = () => {
  const { signUpUser } = useAuth();
  const location = useLocation();
import { useState } from "react";
import { useAuth } from "../supabase/AuthContext";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { signUpUser } = useAuth();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const redirectTo = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("redirectTo") || "/";
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsPending(true);
    const { success, error: signUpError } = await signUpUser(email, password);

    if (!success) {
      setError(signUpError);
      setIsPending(false);
      return;
    }

    setSuccessMessage(
      "Account created. Please check your email to confirm your account."
    );
    e.target.reset();
    setIsPending(false);
  };

  return (
    <div className="h-screen w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl font-semibold pb-8">Create your account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="border px-2 py-2 rounded-t-xl w-[400px]"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="border px-2 py-2 w-[400px]"
          type="password"
          name="password"
          placeholder="Password"
          minLength={6}
          required
        />
        <input
          className="border px-2 py-2 rounded-b-xl w-[400px]"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          minLength={6}
          required
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-600 mt-2 max-w-[400px]">{successMessage}</p>
        )}

        <button
          disabled={isPending}
          className="bg-blue-400 py-3 rounded-xl mt-10 cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="text-blue-500 underline"
          >
          <Link to="/login" className="text-blue-500 underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
