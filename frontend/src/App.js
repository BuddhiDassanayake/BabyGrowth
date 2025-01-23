import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/Login/LoginPage";
import AccountPage from "./components/Account/AccountPage"; // Added Account Page for redirection

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} /> {/* Added Account Page */}
     
      </Routes>
    </Router>
  );
};

export default App;
