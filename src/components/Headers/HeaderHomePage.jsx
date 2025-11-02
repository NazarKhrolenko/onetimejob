import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

import { MdAccountCircle } from "react-icons/md";

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
            <button>Log in</button>
            <button className="bg-blue-400 px-4 py-2 rounded-xl">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomePage;
