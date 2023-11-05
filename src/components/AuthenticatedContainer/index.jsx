import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import Navbar from "../Navbar";

function AuthenticatedContainer() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.appState.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.appState]);
  return (
    <main className="h-full w-full flex flex-col">
      <Navbar />
      <div className="px-8 py-6 flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthenticatedContainer;
