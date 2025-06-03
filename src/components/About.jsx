import React, { useEffect } from "react";
import "../App.css";
import about from "../assets/images/about.png";
import ScrollReveal from "scrollreveal";

const About = () => {
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };
    ScrollReveal().reveal(".about__image img", {
      ...scrollRevealOption,
      origin: "left",
    });
    ScrollReveal().reveal(".about__content .section__header", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".about__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".about__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });
  }, []);
  return (
    <div className="about" id="about">
      <div className="section__container about__container">
        <div className="about__image">
          <img src={about} alt="about" />
        </div>
        <div className="about__content">
          <h2 className="section__header">Ready To Make A Change?</h2>
          <p>
            Taking the first step towards a healthier, stronger you can be the
            most challenging part of the journey, but it's also the most
            rewarding. Whether you're a beginner or a seasoned athlete, our
            personalized training programs are designed to help you reach your
            goals faster and more efficiently.
          </p>
          <p>
            With our motivating trainers, energizing classes, and
            state-of-the-art equipment, you'll have everything you need to stay
            committed and see real results.
          </p>
          <div className="about__btn">
            <button className="btn">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
