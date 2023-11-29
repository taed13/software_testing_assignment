import React from "react";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Routes>
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Routes>
      </Routes>
    </div>
  );
}

export default App;
