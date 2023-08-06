import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

function Authentication() {

  const navigate = useNavigate();
  const loggedInCheck = () =>{
    if(sessionStorage.getItem("isLoggedIn")){
      navigate('/')
    }
  }

  useEffect(()=>{
    loggedInCheck();
  },[]);
  
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </div>
  );
}

export default Authentication;
