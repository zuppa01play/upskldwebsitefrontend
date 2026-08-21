import React from 'react';
import "./HomePhilosophyPage.css";

const HomePhilosophyPage = () => {
  const aiBrings = [
    "Generates first drafts & ideas",
    "Analyses data at speed",
    "Automates repetitive work",
    "Accelerates research",
  ];

  const youBring = [
    "Judgement & decision-making",
    "Creativity & strategic thinking",
    "Context & domain expertise",
    "Empathy & leadership",
  ];

  return (
    <section className="upskld_philos_pg_wrapper">
      <div className="upskld_philos_pg_container">

        <p className="upskld_philos_pg_tagline">OUR PHILOSOPHY</p>

        <h2 className="upskld_philos_pg_heading">
          The future isn't AI replacing you. It's{" "}
          <span className="upskld_philos_pg_heading_italic">you, amplified.</span>
        </h2>

        <p className="upskld_philos_pg_subtext">
          AI can generate, analyse, automate and accelerate. What it can't do
          is replace judgement, creativity, context, empathy, leadership or
          the ability to make a hard call with incomplete information. Those
          still belong to you.
        </p>

        <div className="upskld_philos_pg_compare_row">
          <div className="upskld_philos_pg_card">
            <p className="upskld_philos_pg_card_title">WHAT AI BRINGS</p>
            <ul className="upskld_philos_pg_list">
              {aiBrings.map((item, index) => (
                <li className="upskld_philos_pg_list_item" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="upskld_philos_pg_plus">+</div>

          <div className="upskld_philos_pg_card">
            <p className="upskld_philos_pg_card_title">WHAT YOU BRING</p>
            <ul className="upskld_philos_pg_list">
              {youBring.map((item, index) => (
                <li className="upskld_philos_pg_list_item" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="upskld_philos_pg_quote">
          "Not tools for their own sake. Not hype. Just your job, done with a
          new capability attached to it."
        </p>

        <div className="upskld_philos_pg_btn_wrap">
          <button className="upskld_philos_pg_btn">
            See the UPSKLD Approach
          </button>
        </div>

      </div>
    </section>
  );
};

export default HomePhilosophyPage;