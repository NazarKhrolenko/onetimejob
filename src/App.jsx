import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import ModePage, { loader as jobLoader } from "./pages/Process/ModePage";
import Profile from "./pages/Profile";
import CreateJobPage, {
  action as CreateJobAction,
} from "./pages/CreateJobPage";
import JobDetailPage, {
  loader as jobDetailLoader,
} from "./pages/JobDetailPage";
import LogIn from "./pages/LogIn";
import ApplyPage from "./pages/ApplyPage";
// import { requireAuth } from "../utils";

import Error from "./components/Error";

// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" });
// }

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="process"
        element={<ModePage />}
        loader={jobLoader}
        errorElement={<Error />}
      />
      <Route
        path="process/job/:id"
        element={<JobDetailPage />}
        loader={jobDetailLoader}
      />

      <Route
        path="process/job/:id/apply"
        element={<ApplyPage />}
        loader={jobDetailLoader}
      />
      <Route path="login" element={<LogIn />} />
      <Route path="process/profile" element={<Profile />} />
      <Route
        path="createJob"
        element={<CreateJobPage />}
        action={CreateJobAction}
        loader={jobDetailLoader}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
