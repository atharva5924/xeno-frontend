import React, { useEffect } from "react";
import "../App.css";
import service from "../assets/images/service.png";
import ScrollReveal from "scrollreveal";

const Service = () => {
  useEffect(() => {
    ScrollReveal().reveal(".service__card", {
      duration: 1000,
      interval: 500,
    });
  }, []);
  return (
    <section className="service" id="service">
      <div className="section__container service__container">
        <h2 className="section__header">Services We Provide</h2>
        <div className="service__grid">
          <div className="service__card">
            <span>01</span>
            <h4>Fitness Training</h4>
            <p>
              Our fitness training programs are tailored to help you build
              strength, improve endurance, and achieve your personal fitness
              goals.
            </p>
          </div>
          <div className="service__card">
            <span>02</span>
            <h4>Yoga</h4>
            <p>
              Perfect for all levels, our sessions focus on improving
              flexibility, balance, and mental clarity while helping you manage
              stress.
            </p>
          </div>
          <div className="service__card">
            <span>03</span>
            <h4>Gymnastics</h4>
            <p>
              Our gymnastics classes are designed to boost coordination,
              flexibility, and core strength through a series of fun and
              challenging exercises.
            </p>
          </div>
          <div className="service__card">
            <span>04</span>
            <h4>Karate</h4>
            <p>
              Suitable for all ages and skill levels, our martial arts program
              emphasizes technique, respect, and personal growth while building
              confidence.
            </p>
          </div>
          <div className="service__image">
            <img src={service} alt="service" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
