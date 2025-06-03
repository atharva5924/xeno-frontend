import React, { useEffect } from "react";
import "../App.css";
import banner from "../assets/images/banner.png";
import ScrollReveal from "scrollreveal";

const Banner = () => {
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    ScrollReveal().reveal(".banner__content h2", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".banner__content p", {
      ...scrollRevealOption,
      delay: 500,
    });
  }, []);

  return (
    <section className="banner" id="contact">
      <div className="banner__content">
        <h2>THE BEST TRAINERS OUT THERE</h2>
        <p>
          ARE YOU A TRAINER? <a href="#">JOIN US</a>
        </p>
      </div>
      <div className="banner__image">
        <img src={banner} alt="banner" />
      </div>
    </section>
  );
};

export default Banner;
