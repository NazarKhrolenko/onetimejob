import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ModePage, { loader as jobLoader } from "./pages/Process/ModePage";
import Profile from "./pages/Profile";
import JobDetailPage from "./pages/JobDetailPage";
import LogIn, {
  loader as logInLoader,
  action as logInAction,
} from "./pages/LogIn";
import ApplyPage, { loader as applyLoader } from "./pages/ApplyPage";
import { requireAuth } from "../utils";
import { makeServer } from "./server";
import Error from "./components/Error";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}
console.log(process.env.NODE_ENV);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route
        path="/process"
        element={<ModePage />}
        loader={jobLoader}
        errorElement={<Error />}
      />
      <Route
        path="/process/job/:id"
        element={<JobDetailPage />}
        loader={requireAuth}
      />

      <Route
        path="/process/job/:id/apply"
        element={<ApplyPage />}
        loader={applyLoader}
      />
      <Route
        path="/login"
        element={<LogIn />}
        loader={logInLoader}
        action={logInAction}
      />
      <Route
        path="/process/profile"
        element={<Profile />}
        loader={requireAuth}
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
