import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

import { MdAccountCircle } from "react-icons/md";

const HeaderProcess = () => {
  return (
    <header className=" bg-black/10 pt-4">
      <div className="mx-auto flex justify-between container items-center">
        <div>
          <Link className="text-3xl" to="/">
            OneTimeGob
          </Link>
        </div>
        {/* <div className="flex">
            <Link to="/liked">
              <FaRegHeart />
            </Link>

            <Link to="/account">
              <MdAccountCircle />
            </Link>
          </div> */}
        <div>
          <div className="flex gap-5 text-2xl items-center">
            <Link>Log in</Link>
            <Link className="bg-blue-400 px-4 py-2 rounded-xl">Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderProcess;
