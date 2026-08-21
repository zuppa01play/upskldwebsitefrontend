import React from 'react';
import "./HomeAiPage.css";

const HomeAiPage = () => {
  const cards = [
    {
      title: "It's already happening",
      desc: "Some professionals are drafting faster. Some are researching in minutes instead of hours. Some are making decisions with more information than they had last year. This isn't a future scenario — it's happening in the same roles, at the same companies, right now.",
    },
    {
      title: "The real risk",
      desc: "The risk isn't that AI takes over your job. It's simpler: professionals who know how to work with AI may start moving faster than professionals who don't — inside the very same role.",
    },
    {
      title: "The real opportunity",
      desc: "You can be one of the professionals moving faster. That's the entire idea behind UPSKLD — a practical way to start, at your own pace.",
    },
  ];

  return (
    <section className="upskld_ai_pg_wrapper">
      <div className="upskld_ai_pg_container">

        <p className="upskld_ai_pg_tagline">WHY AI, WHY NOW?</p>

        <h2 className="upskld_ai_pg_heading">
          AI didn't ask permission. It's already{" "}
          <span className="upskld_ai_pg_heading_italic">in the room.</span>
        </h2>

        <p className="upskld_ai_pg_subtext">
          Across sales calls, marketing briefs, HR shortlists, finance models
          and leadership meetings, AI is already being used — sometimes
          openly, often quietly.
        </p>

        <div className="upskld_ai_pg_cards_row">
          {cards.map((card, index) => (
            <div className="upskld_ai_pg_card" key={index}>
              <h3 className="upskld_ai_pg_card_title">{card.title}</h3>
              <p className="upskld_ai_pg_card_desc">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="upskld_ai_pg_btn_wrap">
          <button className="upskld_ai_pg_btn">
            See How AI Applies to Your Job
          </button>
        </div>

      </div>
    </section>
  );
};

export default HomeAiPage;