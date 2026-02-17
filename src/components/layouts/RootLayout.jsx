import { Outlet } from "react-router-dom";
import AppHeader from "../Headers/AppHeader";

export default function RootLayout() {
  return (
    <div className="app">
      <AppHeader />
      <Outlet />
    </div>
  );
}
