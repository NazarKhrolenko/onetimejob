import React from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";

const HeaderLoged = () => {
  return (
    <header>
      <div className="pt-4 flex justify-between items-center container mx-auto">
        <div className="">
          <Link className="text-3xl" to="/">
            OneTimeGob
          </Link>
        </div>
        <div className="flex gap-16 items-center">
          <div className="flex gap-4">
            <Link to="/liked">
              <FaRegHeart size={25} />
            </Link>
            <Link>
              <FaRegBell size={25} />
            </Link>
            <Link to="/process/profile">
              <MdAccountCircle size={25} />
            </Link>
          </div>
          <div>
            <button className="whitespace-nowrap text-xl bg-blue-400 px-4 py-2 rounded-xl">
              Add application
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLoged;
