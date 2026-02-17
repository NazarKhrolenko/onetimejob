import React from "react";
import { Link } from "react-router-dom";


const HeaderHomePage = () => {
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}`;

  return (
    <header className="pt-8 text-white">
      <div className="mx-auto flex justify-between container items-center">
        <div className="flex justify-around gap-8 items-center">
          <Link className="text-xl" to="/">
            OneTimeGob
          </Link>

          <nav className="flex gap-5">
            <Link to="/process">Find task</Link>
            <Link to="/process">Find helper</Link>
            <Link to="/process">Pricing</Link>
          </nav>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="bg-blue-400 px-4 py-2 rounded-xl"
          >
            Log in
          </Link>
          <Link
            to={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="bg-white text-black px-4 py-2 rounded-xl"
          >
            Sign up
          </Link>
        {/* */}
        <div>
          <div className="flex gap-5">
            <Link
              to="/login"
              className="bg-blue-400 px-4 py-2 rounded-xl"
            >
              {" "}
              Log in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomePage;
