import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ListMode from "./pages/Process/ListMode";
import Profile from "./pages/Profile";
import JobDetailPage from "./pages/JobDetailPage";
import LogIn from "./pages/LogIn";
import { requireAuth } from "../utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/process" element={<ListMode />} />
      <Route
        path="/process/profile"
        element={<Profile />}
        loader={async () => requireAuth()}
      />
      <Route
        path="/process/job/:id"
        element={<JobDetailPage />}
        loader={async () => requireAuth()}
      />
      <Route path="/login" element={<LogIn />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
