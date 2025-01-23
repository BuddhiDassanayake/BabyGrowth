import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom"; // For redirection
import { Snackbar, Alert } from "@mui/material"; // For notifications

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // State for user name
  const [message, setMessage] = useState(""); // State for notification message
  const [severity, setSeverity] = useState("success"); // Notification type
  const [open, setOpen] = useState(false); // Snackbar visibility
  const navigate = useNavigate(); // For navigation

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const loginResponse = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        setMessage("Login successful!");
        setSeverity("success");

        // Save user details to localStorage
        if (loginData.userId) {
          localStorage.setItem("userId", loginData.userId);
          localStorage.setItem("userName", loginData.userName || "Guest"); // Assuming API sends back userName
        }

        setOpen(true); // Show success notification
        navigate("/account"); // Redirect to the account page
      } else {
        setMessage(loginData.error);
        setSeverity("error");
        setOpen(true);
      }
    } else {
      // Signup logic
      const signupResponse = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const signupData = await signupResponse.json();

      if (signupResponse.ok) {
        setMessage("Account created successfully!");
        setSeverity("success");

        // Save the user's name in localStorage
        localStorage.setItem("userName", name);

        setOpen(true); // Show success notification
        setIsLogin(true); // Switch to login after signup
      } else {
        setMessage(signupData.error);
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">
          {isLogin ? "Login to Baby Diary" : "Create Your Account"}
        </h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">User Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="form-button">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="toggle-form-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className="toggle-form-link" onClick={toggleForm}>
              {isLogin ? " Create one" : " Login"}
            </span>
          </p>
        </div>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
};

export default LoginPage;
