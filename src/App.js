import logo from "./logo.svg";
import "./App.css";
import Signup from "./pages/Auth/Signup.js";
import { useState } from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Auth/Login.js";
import User from "./pages/Auth/User.js";
import Translation from "./components/Translation.js";
import Navbar from "./components/Navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [path, setPath] = useState(window.location.pathname);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Translation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
