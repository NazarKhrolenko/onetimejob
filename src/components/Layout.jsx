import React from "react";
import HeaderHome from "./Headers/HeaderHomePage";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Outlet />
      </main>
      <div className="h-400"></div>
    </div>
  );
};

export default Layout;
