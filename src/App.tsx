import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Login from "./components/Login";
import SSO from "./pages/SSO";

function App() { 
  return (
    <>
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sso" element={<SSO />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
