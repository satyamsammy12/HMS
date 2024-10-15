import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const role = "Patient"; // Define role here

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://hms-backend-rk9d.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error); // Log the entire error object

      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Error occurred while logging in. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "No response received from the server. Please try again later."
        );
      } else {
        // Something happened in setting up the request
        toast.error("Error in setting up the request: " + error.message);
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="containers form-component login-form">
      <h2 className="text-3xl font-bold">Log In</h2>
      <p>Please Login to Continue</p>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-label="Email Address"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-label="Password"
          />
        </div>
        <div className="registration-prompt flex justify-end">
          <p>
            Not Registered?{" "}
            <Link
              style={{
                textDecoration: "none",
                alignItems: "center",
                color: "blue",
                cursor: "pointer",
              }}
              to="/register"
            >
              Register Now
            </Link>
          </p>
        </div>
        <div className="button-container flex items-center justify-center">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
