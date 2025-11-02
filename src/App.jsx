import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ListMode from "./pages/Process/ListMode";
import Profile from "./pages/Profile";
import JobDetailPage from "./pages/JobDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<ListMode />} />
        <Route path="/process/profile" element={<Profile />} />
        <Route path="/process/job/:id" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
