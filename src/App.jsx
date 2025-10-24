import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ListMode from "./pages/Process/ListMode";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<ListMode />} />
        <Route path="/process/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
