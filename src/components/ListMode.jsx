import React from "react";
import sampleJobs from "../pages/Process/data/SampleJobs";
import { Link } from "react-router-dom";

import { MdDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { GetTimeAgo } from "./map";
import { GoPeople } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const ListMode = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-3">
        {sampleJobs.map((job) => (
          <Link
            to={`/process/job/${job.id}`}
            className="w-full h-full flex flex-col items-center "
          >
            <div className=" w-full md:w-[70%]  border border-blue-400 p-3 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold">{job.title}</h3>

                    <div className="flex gap-2 items-center">
                      <span>{job.category}</span>
                      <div className="flex gap-1 items-center">
                        <MdAccessTime />

                        <p>{GetTimeAgo(job.created_at)}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <MdDateRange />
                        {new Date(job.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <p>{job.description}</p>
                </div>
                <div>
                  <p className="text-2xl">{job.price} $</p>
                  <span className="flex gap-1 items-center">
                    <FaStar /> {job.user_rating}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <div className="flex gap-1 items-center">
                    <GoPeople />
                    <span> {job.applicants} applied</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaMapMarkerAlt />

                    <span>Lucka 7</span>
                  </div>
                </div>
                <button className="bg-blue-400 px-4 py-2 rounded-xl">
                  Apply
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListMode;
