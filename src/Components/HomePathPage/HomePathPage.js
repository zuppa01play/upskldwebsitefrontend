import React from 'react';
import "./HomePathPage.css";

const HomePathPage = () => {
  const steps = [
    {
      number: 1,
      title: "Recognise",
      desc: "See where AI already touches your role — in a free 15-minute roadmap call.",
    },
    {
      number: 2,
      title: "Get Matched",
      desc: "Land on your job-specific track — no guessing which course applies to you.",
    },
    {
      number: 3,
      title: "Learn by Doing",
      desc: "Every module ends with something usable in your actual work that week.",
    },
    {
      number: 4,
      title: "Apply & Certify",
      desc: "Walk away with a shareable Certificate of Completion, and a habit of using AI well.",
    },
  ];

  return (
    <section className="upskld_path_home_pg_wrapper">
      <div className="upskld_path_home_pg_container">

        <p className="upskld_path_home_pg_tagline">YOUR PATH</p>

        <h2 className="upskld_path_home_pg_heading">
          From uncertain about AI to{" "}
          <span className="upskld_path_home_pg_heading_italic">confident with it</span> —
          in four steps.
        </h2>

        <div className="upskld_path_home_pg_steps_row">
          {steps.map((step, index) => (
            <div className="upskld_path_home_pg_step" key={index}>
              <div className="upskld_path_home_pg_number">{step.number}</div>
              <h3 className="upskld_path_home_pg_step_title">{step.title}</h3>
              <p className="upskld_path_home_pg_step_desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomePathPage;