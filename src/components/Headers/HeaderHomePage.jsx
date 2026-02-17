import React from "react";
import { Link } from "react-router-dom";


const HeaderHomePage = () => {
  return (
    <header className=" pt-8 text-white">
      <div className="mx-auto flex justify-between container items-center">
        <div className="flex justify-around gap-8 items-center">
          <Link className="text-xl" to="/">
            OneTimeGob
          </Link>

          <nav className="flex gap-5">
            <Link>Find task</Link>
            <Link>Find helper</Link>
            <Link>Pricing</Link>
          </nav>
        </div>
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
