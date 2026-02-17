import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaRegHeart, FaRegBell } from "react-icons/fa6";
import { useAuth } from "../../supabase/AuthContext";

const HeaderLoged = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOut = async (e) => {
    e.preventDefault();

    const { success, error: signOutError } = await signOut();
    if (success) {
      navigate("/process");
      return;
    }

    setError(signOutError);
  };

  return (
    <header>
      <div className="pt-2 flex justify-between items-center container mx-auto">
        <Link className="text-2xl" to="/">
          OneTimeGob
        </Link>

        <div className="flex gap-16 items-center">
          <div className="flex gap-4">
            <Link to="/liked">
              <FaRegHeart size={20} />
            </Link>
            <Link to="/process">
              <FaRegBell size={20} />
            </Link>
            <Link to="/process/profile">
              <MdAccountCircle size={20} />
            </Link>
          </div>
          <div>
            <Link
              to="/createJob"
              className="whitespace-nowrap text-lg bg-blue-400 px-3 py-1.5 rounded-xl mr-4 cursor-pointer hover:bg-blue-500"
            >
              Add job
            </Link>
            <button
              onClick={handleSignOut}
              className="whitespace-nowrap text-lg bg-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-600 cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      {error && <p className="text-red-400 text-center mt-1">{error}</p>}
    </header>
  );
};

export default HeaderLoged;
