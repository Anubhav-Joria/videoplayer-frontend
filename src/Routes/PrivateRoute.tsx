import React from "react";
import "../App.css";
import { createContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/PrivateComponents/components/Navbar";
function PrivateRoute(props: any) {
  const UserContext = createContext<any>(null);

  const [user, setUser] = useState({
    isLoggedIn: sessionStorage.getItem("isLoggedIn"),
    userEmail: sessionStorage.getItem("userEmail"),
  });
  return (
    <>
      {user.isLoggedIn ? (
        <div className="App">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
}

export default PrivateRoute;
