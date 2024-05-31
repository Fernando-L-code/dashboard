import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { LogIn } from "./pages/LogIn.js";

import './App.css'

const AppRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <Router>
        <div className={!token?"mainContainer":'' }> 
      <Routes>

        <Route 
          path="/login" 
          element={token ? <Navigate to="/main" /> : <LogIn setToken={setToken} />} 
          />
        <Route 
          path="/main" 
          element={token ? <MainPage onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
        <Route 
          path="/" 
          element={<Navigate to={token ? "/main" : "/login"} />} 
          />
      </Routes>
          </div>
    </Router>
  );
};
export default AppRoutes;