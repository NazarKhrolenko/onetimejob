import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoTrophySharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import HeaderLoged from "../components/HeaderLoged";

const Profile = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");

  const fetchCompletedJobs = () => {
    // Mock completed jobs data
    const mockCompletedJobs = [
      {
        id: "1",
        title: "Доставка посилки",
        category: "Доставка",
        price: 150,
        completedAt: "2024-01-15",
        rating: 5,
        review: "Відмінна робота, швидко і якісно!",
      },
      {
        id: "2",
        title: "Прибирання квартири",
        category: "Прибирання",
        price: 500,
        completedAt: "2024-01-10",
        rating: 5,
        review: "Все чисто, дуже задоволені!",
      },
      {
        id: "3",
        title: "Ремонт крана",
        category: "Ремонт",
        price: 300,
        completedAt: "2024-01-05",
        rating: 4,
        review: "Добре виконано",
      },
    ];
    setCompletedJobs(mockCompletedJobs);
  };
  const fetchMyJobs = async () => {
    // Mock jobs data
    const mockJobs = [
      {
        id: "demo-1",
        title: "Доставка документів",
        price: 200,
        category: "Доставка",
        status: "open",
        created_at: "2024-01-20",
        lat: 50.4501,
        lng: 30.5234,
      },
      {
        id: "demo-2",
        title: "Прибирання офісу",
        price: 800,
        category: "Прибирання",
        status: "open",
        created_at: "2024-01-19",
        lat: 50.4601,
        lng: 30.5134,
      },
    ];
    setMyJobs(mockJobs);
    setLoading(false);
  };
  const fetchMyRequests = async () => {
    // Mock requests data
    const mockRequests = [
      {
        id: "req-1",
        status: "pending",
        created_at: "2024-01-21",
        photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
        jobs: {
          id: "sample-1",
          title: "Доставка посилки",
          price: 150,
          category: "Доставка",
          status: "open",
          created_at: "2024-01-20",
          lat: 50.4501,
          lng: 30.5234,
        },
      },
      {
        id: "req-2",
        status: "accepted",
        created_at: "2024-01-20",
        photos: ["photo1.jpg", "photo2.jpg"],
        jobs: {
          id: "sample-2",
          title: "Прибирання квартири",
          price: 500,
          category: "Прибирання",
          status: "open",
          created_at: "2024-01-19",
          lat: 50.4601,
          lng: 30.5134,
        },
      },
      {
        id: "req-3",
        status: "rejected",
        created_at: "2024-01-18",
        photos: ["photo1.jpg"],
        jobs: {
          id: "sample-3",
          title: "Ремонт крана",
          price: 300,
          category: "Ремонт",
          status: "open",
          created_at: "2024-01-18",
          lat: 50.4401,
          lng: 30.5334,
        },
      },
    ];
    setMyRequests(mockRequests);
  };
  return (
    <div className="bg-black h-screen text-white pt-8">
      <HeaderLoged />
      <div className=" flex justify-around pt-12">
        <div className="flex justify-center gap-8 ">
          <div>
            <MdAccountCircle size={120} color="white" />
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-bold">Nazar Khrolenko</h2>
              <p>demo@email.com</p>
            </div>
            <div>User bio</div>
            <div className="flex gap-8">
              <div className="flex items-center gap-1">
                <FaStar color="yellow" />
                <p>5.0</p>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-1">
                <IoTrophySharp color="blue" />
                <p>4.8</p>
                <span>done</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="flex items-center gap-1 bg-blue-500 px-4 py-2 rounded-lg">
            <FaRegEdit size={30} />
            <span className="text-2xl">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
