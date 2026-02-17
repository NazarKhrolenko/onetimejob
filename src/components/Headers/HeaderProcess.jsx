import { Link, useLocation } from "react-router-dom";

const HeaderProcess = () => {
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}`;

  return (
    <header className="bg-black/10 pt-4">
      <div className="mx-auto flex justify-between container items-center">
        <div>
          <Link className="text-3xl" to="/">
            OneTimeGob
          </Link>
        </div>

        <div className="flex gap-5 text-xl items-center">
          <Link to="/process">Browse jobs</Link>
          <Link
            to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="px-4 py-2 rounded-xl bg-gray-200 text-black"
          >
            Log in
          </Link>
          <Link
            to={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="bg-blue-400 px-4 py-2 rounded-xl"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderProcess;
