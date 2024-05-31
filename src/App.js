import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { LogIn } from "./pages/LogIn.js";

const AppRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <Router>
      <Routes>

        {/* <div style={{ backgroundColor: '#0a2f5599', minHeight: '100vh', display:'flex', justifyContent:'center', alignItems:"center" }}>  */}
        <Route 
          path="/login" 
          element={token ? <Navigate to="/main" /> : <LogIn setToken={setToken} />} 
          />
          {/* </div> */}
        <Route 
          path="/main" 
          element={token ? <MainPage onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
        <Route 
          path="/" 
          element={<Navigate to={token ? "/main" : "/login"} />} 
          />
      </Routes>
    </Router>
  );
};
export default AppRoutes;