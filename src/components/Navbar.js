import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="navbar">
      <Link to="/" data-testid="logo-link">
        MyAPP
      </Link>
      <div>
        <Link to="/signup" data-testid="/signup">
          Signup
        </Link>

        <Link to="/signin" data-testid="/login">
          Signin
        </Link>

        <Link to="/user" data-testid="/user">
          profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
