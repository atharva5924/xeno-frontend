import React, { useEffect } from "react";
import "../App.css";
import ScrollReveal from "scrollreveal";
import header from "../assets/images/header.png";

const Header = () => {
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__content h2", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal(".header__btn", {
      ...scrollRevealOption,
      delay: 2000,
    });
  }, []);

  
  return (
    <header>
      <div className="section__container header__container" id="home">
        <div className="header__content">
          <h1>DON'T STOP TILL YOUR SUCCESS!</h1>
          <h2>GET FIT TO HAPPY</h2>
          <p>
            Unlock your full potential with our expert training and
            state-of-the-art facilities. Every step you take brings you closer
            to a healthier, happier you. Let's make fitness a lifestyle!
          </p>
          <div className="header__btn">
            <button className="btn">Explore More</button>
          </div>
        </div>
        <div className="header__image">
          <img src={header} alt="header" />
        </div>
      </div>
    </header>
  );
};

export default Header;
