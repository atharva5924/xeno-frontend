import React from "react";
import { RiMenuLine } from "react-icons/ri";
import "../App.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <a href="#">
            <img src={logo} alt="logo" className="logo-white" />
            <img src={logo} alt="logo" className="logo-dark" />
          </a>
        </div>
        <div className="nav__menu__btn" id="menu-btn">
          <RiMenuLine />
        </div>
      </div>
      <ul className="nav__links" id="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#service">Services</a>
        </li>
        <li>
          <a href="#class">Classes</a>
        </li>
        <li>
          <a href="#contact">Blog</a>
        </li>
          <li>
            <Link to={"/search"}>Search Exercise</Link>
          </li>
        <li>
          <a href="#">Join Now</a>
        </li>
      </ul>
      <div className="nav__btns">
        <button className="btn">Join Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
