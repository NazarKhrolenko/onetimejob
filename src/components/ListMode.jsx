import { Link, useLocation } from "react-router-dom";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { GetTimeAgo } from "./Map";
import { useAuth } from "../supabase/AuthContext";

const ListMode = ({ jobs = [] }) => {
  const { session } = useAuth();
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}`;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/process/job/${job.id}`}
            className="w-full h-full flex flex-col items-center"
          >
            <div className="w-full md:w-[70%] border border-blue-400 p-3 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold">{job.title}</h3>

                    <div className="flex gap-2 items-center flex-wrap">
                      <span>{job.category}</span>
                      <div className="flex gap-1 items-center">
                        <MdAccessTime />
                        <p>{GetTimeAgo(job.created_at)}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <MdDateRange />
                        {new Date(job.deadline).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <p>{job.description}</p>
                </div>
                <div>
                  <p className="text-2xl">{job.salary} $</p>
                  <span className="flex gap-1 items-center">
                    <FaStar /> {job.user_rating || 5}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <div className="flex gap-1 items-center">
                    <GoPeople />
                    <span>{job.applicants || 0} applied</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaMapMarkerAlt />
                    <span>Location</span>
                  </div>
                </div>

                <Link
                  to={
                    session
                      ? `/process/job/${job.id}/apply`
                      : `/login?redirectTo=${encodeURIComponent(redirectTo)}`
                  }
                  className="bg-blue-400 px-4 py-2 rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  Apply
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListMode;
