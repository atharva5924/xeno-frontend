import React, { useEffect } from "react";
import "../App.css";
import mentor1 from "../assets/images/mentor-1.jpg";
import mentor2 from "../assets/images/mentor-2.jpg";
import mentor3 from "../assets/images/mentor-3.jpg";
import ScrollReveal from "scrollreveal";

const Mentor = () => {
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };
    ScrollReveal().reveal(".mentor__card", {
      ...scrollRevealOption,
      interval: 500,
    });
  }, []);

  const mentors = [
    {
      name: "DAVID WILLIAMS",
      role: "Body Builder Coach",
      img: mentor1,
    },
    { name: "ROSY RIVERA", role: "Cardio Coach", img: mentor2 },
    { name: "MATT STONIE", role: "Fitness Coach", img: mentor3 },
  ];

  return (
    <section className="section__container mentor__container">
      <h2 className="section__header">Having Your Own Coach And Mentor</h2>
      <div className="mentor__grid">
        {mentors.map((mentor, index) => (
          <div className="mentor__card" key={index}>
            <img src={mentor.img} alt="mentor" />
            <h4>{mentor.name}</h4>
            <p>{mentor.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mentor;
