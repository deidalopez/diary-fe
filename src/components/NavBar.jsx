import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <span>Diary App</span>
      <div />
    </header>
  );
};

export default NavBar;
