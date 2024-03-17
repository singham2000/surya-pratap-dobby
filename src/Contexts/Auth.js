import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));

  const signIn = (formData) => {
    fetch("https://dobby-back.adaptable.app/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("_id", data.user._id);
          setIsAuthenticated(true);
          console.log(data.token);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        alert(error);
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
