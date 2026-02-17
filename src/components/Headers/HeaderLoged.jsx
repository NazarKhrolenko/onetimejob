import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";
import { useAuth } from "../../supabase/AuthContext";
import { useNavigate } from "react-router-dom";

const HeaderLoged = () => {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOut = async (e) => {
    e.preventDefault();

    const { success, error } = await signOut();
    if (success) {
      navigate("/process");
    } else {
      setError(error.message);
    }
  };
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
            <Link
              to="/createJob"
              className="whitespace-nowrap text-lg bg-blue-400 px-2 py-1 rounded-xl mr-4 cursor-pointer hover:bg-blue-500"
            >
              Add application
            </Link>
            <button
              onClick={handleSignOut}
              className="whitespace-nowrap text-lg bg-gray-500 px-2 py-1 rounded-lg hover:bg-gray-600 cursor-pointer"
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
