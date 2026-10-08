import React from "react";
import "./HomeAiPage.css";

const heading = "The world changed. Many people were not taught how to change with it.";
const subText = "For millions of non-tech learners, AI does not feel like an opportunity yet.";
const noteText = "It feels confusing. Intimidating. And increasingly impossible to ignore.";
const closingText =
  "UpSkld changes the question from “Will AI replace me?” to “What can I achieve with AI beside me?”";

/* Simple round icons (inline SVG, no image files needed) */
const icons = {
  fear: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="#e8224a" />
      <circle cx="19" cy="21" r="2.2" fill="#fff" />
      <circle cx="29" cy="21" r="2.2" fill="#fff" />
      <path d="M17 31c2.5-3.5 11.5-3.5 14 0" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  confusion: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="#ff7a1a" />
      <path d="M19 20c0-3 2.2-5 5-5s5 1.8 5 4.4c0 3.6-5 3.6-5 7" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="24" cy="33" r="1.8" fill="#fff" />
    </svg>
  ),
  skill: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="#1a3fc4" />
      <path d="M17 19h5a3 3 0 1 1 6 0h3v5a3 3 0 1 1 0 6v3H17v-5a3 3 0 1 0 0-6z" fill="#fff" />
    </svg>
  ),
};

const cards = [
  { icon: "fear", tag: "Fear", color: "#e8224a", quote: "“Will AI replace me?”" },
  { icon: "confusion", tag: "Confusion", color: "#ff7a1a", quote: "“Where do I even begin?”" },
  { icon: "skill", tag: "Skill Gap", color: "#1a3fc4", quote: "“How do I use it at work?”" },
];

const HomeAiPage = () => {
  return (
    <section className="impac_ai_home_pg_wrapper">
      <div className="impac_ai_home_pg_container">
        {/* Left: text */}
        <div className="impac_ai_home_pg_text_col">
          <h2 className="impac_ai_home_pg_title">{heading}</h2>
          <p className="impac_ai_home_pg_sub">{subText}</p>
          <p className="impac_ai_home_pg_note">{noteText}</p>
        </div>

        {/* Right: cards */}
        <div className="impac_ai_home_pg_cards">
          {cards.map((card) => (
            <article className="impac_ai_home_pg_card" key={card.tag}>
              <div className="impac_ai_home_pg_icon">{icons[card.icon]}</div>
              <div className="impac_ai_home_pg_card_body">
                <span className="impac_ai_home_pg_card_tag" style={{ color: card.color }}>
                  {card.tag}
                </span>
                <p className="impac_ai_home_pg_card_quote">{card.quote}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom statement */}
        <p className="impac_ai_home_pg_closing">{closingText}</p>
      </div>
    </section>
  );
};

export default HomeAiPage;