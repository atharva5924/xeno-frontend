import React from "react";
import { RiPhoneLine, RiMapPinLine, RiMailLine } from "react-icons/ri";
import "../App.css";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <section className="footer">
      <div className="section__container footer__container">
        <div className="footer__col">
          <a href="#" className="footer__logo">
            <img src={logo} alt="logo" />
          </a>
          <ul className="footer__links">
            <li>
              <a href="#">
                <span>
                  <RiPhoneLine />
                </span>{" "}
                +91 9898981233
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <RiMapPinLine />
                </span>{" "}
                Maharashtra, India
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <RiMailLine />
                </span>{" "}
                info@musclemap
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Classes</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Membership</a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Gym Hours</h4>
          <ul className="footer__links">
            <li>Monday 5am - 10pm</li>
            <li>Tuseday 5am - 10pm</li>
            <li>Wednesday 5am - 10pm</li>
            <li>Thursday 5am - 10pm</li>
            <li>Friday 5am - 10pm</li>
            <li>Saturday 5am - 10pm</li>
            <li>Sunday 5am - 1pm</li>
          </ul>
        </div>
      </div>
      <div className="footer__bar">
        Copyright © 2024 Web Design Mastery. All rights reserved.
      </div>
    </section>
  );
};

export default Footer;
