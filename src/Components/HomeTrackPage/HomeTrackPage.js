import React, { useEffect, useRef, useState } from "react";
import "./HomeTrackPage.css";

/* ---------- Content (edit here) ----------
   header tab: 0 Small Business · 1 Working Professionals · 2 Students
   "Build AI" card never changes; only the heading and the "Use AI" card change. */
const buildCard = {
  key: "build",
  variant: "plain",
  label: "Most AI learning today",
  title: "Build AI",
  checks: false,
  points: [
    "Built around technology creation",
    "Tool-first: what a tool can do",
    "Designed for engineers and developers",
  ],
};

const defaultCards = [
  buildCard,
  {
    key: "use",
    variant: "accent",
    label: "What non-tech learners need",
    title: "Use AI",
    checks: true,
    points: [
      "Confidence in technology application",
      "Task-first: create a report, analyse data, prepare for an interview, automate a workflow",
      "Practical, role-based and immediately applicable",
    ],
  },
];

const defaultTitle = [
  "Most AI learning teaches people to build AI.",
  "Non-tech learners need to use it.",
];

const byTab = {
  1: {
    title: [
      "Most AI courses teach people to build AI.",
      "Working professionals need to use it to automate their daily work.",
    ],
    cards: [
      buildCard,
      {
        key: "use-pro",
        variant: "accent",
        label: "What working professionals need",
        title: "Use AI",
        checks: true,
        points: [
          "Confidence to deploy AI in daily corporate workflows.",
          "Task-first: Automate MIS reporting, synthesize market data, and speed up decision-making.",
          "Practical, job-aligned skills that save 5-15 hours every week.",
        ],
      },
    ],
  },
};

const bridge = {
  label: "The missing bridge",
  text: "Knowing an AI tool is not the same as using AI to do the work.",
};

/* ---------- Helpers ---------- */
/* true (once) when the element comes into the screen */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

/* Fade-up animation when the block comes into the screen */
const Reveal = ({ as: Tag = "div", className = "", delay = 0, children }) => {
  const [ref, inView] = useInView(0.15);

  return (
    <Tag
      ref={ref}
      className={`impac_trac_ho_pg_fade ${
        inView ? "impac_trac_ho_pg_fade_show" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12l5 5L20 7" />
  </svg>
);

/* ---------- Page ---------- */
const HomeTrackPage = ({ activeIndex = 0 }) => {
  const view = byTab[activeIndex] || { title: defaultTitle, cards: defaultCards };
  const cards = view.cards;

  return (
    <section id="ai-for-your-job"  className="impac_trac_ho_pg_section">
      <div key={activeIndex} className="impac_trac_ho_pg_container">
        {/* Heading */}
        <header className="impac_trac_ho_pg_header">
          <Reveal as="h2" className="impac_trac_ho_pg_title">
            {view.title.map((line) => (
              <span key={line} className="impac_trac_ho_pg_title_line">
                {line}
              </span>
            ))}
          </Reveal>

          <Reveal className="impac_trac_ho_pg_line_box" delay={150}>
            <span className="impac_trac_ho_pg_line_bar"></span>
          </Reveal>
        </header>

        {/* Build AI / Use AI cards */}
        <div className="impac_trac_ho_pg_cards">
          {cards.map((card, cardIndex) => (
            <Reveal
              key={card.key}
              className="impac_trac_ho_pg_card_wrap"
              delay={cardIndex * 180}
            >
              <article
                className={`impac_trac_ho_pg_card impac_trac_ho_pg_card_${card.variant}`}
              >
                <p className="impac_trac_ho_pg_card_label">{card.label}</p>
                <h3 className="impac_trac_ho_pg_card_title">{card.title}</h3>

                <ul className="impac_trac_ho_pg_list">
                  {card.points.map((point, pointIndex) => {
                    const delay = cardIndex * 180 + 350 + pointIndex * 120;
                    return (
                      <li
                        key={point}
                        className="impac_trac_ho_pg_item"
                        style={{
                          transitionDelay: `${delay}ms, ${delay}ms, 0ms`,
                        }}
                      >
                        {card.checks && (
                          <span className="impac_trac_ho_pg_check">
                            <CheckIcon />
                          </span>
                        )}
                        <span className="impac_trac_ho_pg_item_text">
                          {point}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

   
      </div>
    </section>
  );
};

export default HomeTrackPage;