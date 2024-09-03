import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/ApiFunctions'; // Ensure this path matches your project structure
import { notify } from '../utils/notif'; // Ensure this path matches your project structure
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "CUSTOMER",
    firstName: "",
    lastName: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const { password, confirmPassword, email, userType, firstName, lastName } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      notifyError("Invalid email format");
      return false;
    }
    if (password.length < 5 || password.length > 20) {
      notifyError("Password must be between 5 and 20 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      return false;
    }
    if (userType === "CUSTOMER" && 
        (firstName.length < 5 || firstName.length > 20 || 
        lastName.length < 5 || lastName.length > 20)) {
      notifyError("First name and last name must each be between 5 and 20 characters long");
      return false;
    }
    return true;
  };

  const notifyError = (message) => {
    setError(message);
    notify.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const userDetails = {
      ...formData,
      userName: formData.userType === "CUSTOMER" ? formData.userName : `${formData.firstName}_${formData.lastName}`,
    };

    try {
      await register(userDetails);
      notify.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      notifyError(error.message || "Registration failed");
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h1 className="register-heading">Register</h1>
      <select
        className="form-select"
        name="userType"
        value={formData.userType}
        onChange={handleChange}
      >
        <option value="CUSTOMER">Customer</option>
        {/* Add other user types if needed */}
      </select>
      {formData.userType === "CUSTOMER" && (
        <div>
          <input
            className="form-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      )}
      <input
        className="form-input"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        className="form-input"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {error && <p className="register-error">{error}</p>}
      <button className="register-button" type="submit">Submit</button>
    </form>
  );
};

export default Register;
