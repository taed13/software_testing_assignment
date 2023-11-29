import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (loading) {
      // Perform the async operation here (e.g., API call)
      const fetchData = async () => {
        try {
          const { data } = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            { username, password }
          );
          setUser(data);
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [loading, username, password]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="container">
      <span className="user">{user.name}</span>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? "Please wait" : "Register"}
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong!
        </span>
      </form>
    </div>
  );
};

export default Register;
