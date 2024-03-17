import React, { useState } from "react";
import { useAuth } from "../Contexts/Auth";

const SignInPage = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
