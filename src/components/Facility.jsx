import React, { useEffect } from "react";
import "../App.css";
import facility from "../assets/images/facility.jpg";
import ScrollReveal from "scrollreveal";

const Facility = () => {
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };
    ScrollReveal().reveal(".facility__content .section__header", {
      ...scrollRevealOption,
    });
    ScrollReveal().reveal(".facility__content p", {
      ...scrollRevealOption,
      delay: 500,
    });
  }, []);
  return (
    <section className="facility__container">
      <div className="facility__image">
        <img src={facility} alt="facility" />
      </div>
      <div className="facility__content">
        <h2 className="section__header">It's About Who You Can Become</h2>
        <p>
          At our gym, we believe that fitness is more than just physical—it's
          about transforming your mindset, pushing your limits, and realizing
          your full potential. Every workout is a step toward becoming the
          strongest, healthiest, and most confident version of yourself.
        </p>
        <p>
          It's not about quick fixes or temporary results; it's about adopting a
          lifestyle that fuels your passion for self-improvement. With the right
          mindset and the right support, you can overcome obstacles, break
          barriers, and achieve goals you never thought possible.
        </p>
        <p>
          Who you become is entirely up to you, but we believe in your
          potential. With the right training, dedication, and focus, you can
          turn your goals into reality.
        </p>
      </div>
    </section>
  );
};

export default Facility;
