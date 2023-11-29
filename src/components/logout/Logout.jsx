// Logout.jsx
import React, { useState } from "react";
import axios from "axios";

const Logout = () => {
  const [logoutStatus, setLogoutStatus] = useState(null);

  const handleLogout = async () => {
    try {
      // Simulate an API call for logout
      await axios.post("/api/auth/logout");

      // Set logout status on successful logout
      setLogoutStatus("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
      setLogoutStatus("Error during logout");
    }
  };

  return (
    <div>
      <h1>Logout Component</h1>
      <button onClick={handleLogout}>Logout</button>
      {logoutStatus && <p>{logoutStatus}</p>}
    </div>
  );
};

export default Logout;
