import { useLocation } from "react-router-dom";
import { useAuth } from "../../supabase/AuthContext";
import HeaderHomePage from "./HeaderHomePage";
import HeaderProcess from "./HeaderProcess";
import HeaderLoged from "./HeaderLoged";

const AppHeader = () => {
  const location = useLocation();
  const { session } = useAuth();


  if (session) {
    return <HeaderLoged />;
  }

  if (location.pathname === "/") {
    return <HeaderHomePage />;
  }

  return <HeaderProcess />;
};

export default AppHeader;
