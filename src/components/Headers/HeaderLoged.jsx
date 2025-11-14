import React from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";

function LogOut() {
  localStorage.removeItem("loggedin");
}

const HeaderLoged = () => {
  return (
    <header>
      <div className="pt-2 flex justify-between items-center container mx-auto">
        <div className="">
          <Link className="text-2xl" to="/">
            OneTimeGob
          </Link>
        </div>
        <div className="flex gap-16 items-center">
          <div className="flex gap-4">
            <Link to="/liked">
              <FaRegHeart size={20} />
            </Link>
            <Link>
              <FaRegBell size={20} />
            </Link>
            <Link to="/process/profile">
              <MdAccountCircle size={20} />
            </Link>
          </div>
          <div>
            <button className="whitespace-nowrap text-lg bg-blue-400 px-2 py-1 rounded-xl mr-4">
              Add application
            </button>
            <button
              onClick={LogOut}
              className="whitespace-nowrap text-lg bg-gray-500 px-2 py-1 rounded-lg "
            >
              X
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLoged;
