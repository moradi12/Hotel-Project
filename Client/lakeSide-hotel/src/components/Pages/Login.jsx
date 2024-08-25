import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction, logoutAction } from "../common/Redux/AuthReducer";
import { hotelSystem } from "../common/Redux/store";
import { UserType } from "../Models/UserType";
import "./Login.css";

const Login = ({ setRender }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    userType: UserType.CUSTOMER,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = sessionStorage.getItem("jwt");
    if (token) {
      navigate("/browse-rooms");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (userType) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      userType,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:9192/booked-rooms/login",
        credentials
      );
      const JWT = res.headers.authorization.split(" ")[1];
      hotelSystem.dispatch(
        loginAction({
          token: JWT,
          email: credentials.email,
          name: res.data.userName,
          userType: credentials.userType,
          isLogged: true,
          id: res.data.id,
        })
      );
      sessionStorage.setItem("jwt", JWT);
      navigate("/browse-rooms");

      // Log to console after successful login
      console.log("Login successful:", res.data.userName, credentials.userType);
      
      // Trigger a re-render in the parent component if provided
      if (typeof setRender === "function") {
        setRender(true);
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    hotelSystem.dispatch(logoutAction());
    sessionStorage.removeItem("jwt");
    navigate("/login");
    console.log("User logged out successfully");
    
    // Trigger a re-render in the parent component if provided
    if (typeof setRender === "function") {
      setRender(true);
    }
  };

  return (
    <div className="login-container">
      {sessionStorage.getItem("jwt") ? (
        <div>
          <h2>Welcome back!</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>User Type</label>
            <div className="userTypeRadio">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value={UserType.CUSTOMER}
                  checked={credentials.userType === UserType.CUSTOMER}
                  onChange={() => handleUserTypeChange(UserType.CUSTOMER)}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value={UserType.ADMIN}
                  checked={credentials.userType === UserType.ADMIN}
                  onChange={() => handleUserTypeChange(UserType.ADMIN)}
                />
                Admin
              </label>
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
