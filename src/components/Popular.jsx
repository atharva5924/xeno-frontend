import React from "react";
import { RiArrowRightFill } from "react-icons/ri";
import "../App.css";


const Popular = () => {
  return (
    <section className="popular" id="class">
      <div className="section__container popular__container">
        <h2 className="section__header">What Do You Want To Join Today?</h2>
        <div className="popular__grid">
          {[
            { title: "Cardio Strength", desc: "Full-body workout with cardio" },
            { title: "Weight Training", desc: "Build muscle strength" },
            {
              title: "Yoga for Flexibility",
              desc: "Improve flexibility and relax",
            },
            { title: "HIIT", desc: "Short bursts of intense exercise" },
            { title: "Personal Training", desc: "Customized workout plans" },
            {
              title: "Group Fitness Classes",
              desc: "Stay motivated and have fun",
            },
            { title: "Boxing Training", desc: "Enhance agility and stamina" },
            { title: "Pilates Core Workout", desc: "Strengthen your core" },
            { title: "Spin Class", desc: "High-energy cycling sessions" },
          ].map((item, index) => (
            <div className="popular__card" key={index}>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <span>
                <RiArrowRightFill />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
