import React, { useEffect, useRef } from 'react';
import "./HomeThreeAudience.css";

const audiences = [
  {
    key: "students",
    title: "Students",
    description:
      "Career-focused AI courses: job readiness, data analytics and prompting.",
    from: "Confidence",
    to: "Employability",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 9L12 4 2 9l10 5 10-5z" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
        <path d="M22 9v6" />
      </svg>
    ),
  },
  {
    key: "enterprises",
    title: "Enterprises",
    description:
      "Role-based AI training for sales, finance, marketing and strategy teams.",
    from: "Adoption",
    to: "Performance",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="12" width="4" height="8" />
        <rect x="10" y="4" width="4" height="16" />
        <rect x="17" y="9" width="4" height="11" />
      </svg>
    ),
  },
  {
    key: "universities",
    title: "Universities",
    description:
      "Placement enablement first, then curriculum and faculty capability.",
    from: "Learning",
    to: "Placement impact",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z" />
        <path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

const HomeThreeAudience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("impac_audience_pg_visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("impac_audience_pg_visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="courses" className="impac_audience_pg_section" ref={sectionRef}>
      <div className="impac_audience_pg_container">
        <h2 className="impac_audience_pg_title">
          <span className="impac_audience_pg_brand">UpSkld,</span>
          One platform. Three audiences. One connected outcome.
        </h2>
        <span className="impac_audience_pg_underline" />

        <div className="impac_audience_pg_map">
          {/* Center hub */}
          <div className="impac_audience_pg_hub">
            <span className="impac_audience_pg_hub_label">ONE PLATFORM</span>
            <div className="impac_audience_pg_logo">
              <svg viewBox="0 0 48 40" width="44" height="36" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 32L24 6l18 26" />
                <path d="M15 32l9-13 9 13" />
              </svg>
              <span className="impac_audience_pg_logo_name">UpSkld</span>
              <span className="impac_audience_pg_logo_tag">AI for Growth.</span>
            </div>
            <p className="impac_audience_pg_hub_text">
              Self learning
              <br />
              Guided training
            </p>
          </div>

          {/* Arrows */}
          <span className="impac_audience_pg_arrow impac_audience_pg_arrow_left" />
          <span className="impac_audience_pg_arrow impac_audience_pg_arrow_right" />
          <span className="impac_audience_pg_arrow impac_audience_pg_arrow_down" />

          {/* Cards */}
          {audiences.map((item) => (
            <article
              key={item.key}
              className={`impac_audience_pg_card impac_audience_pg_card_${item.key}`}
            >
              <div className="impac_audience_pg_card_head">
                {item.icon}
                <h3 className="impac_audience_pg_card_title">{item.title}</h3>
              </div>
              <p className="impac_audience_pg_card_desc">{item.description}</p>
              <p className="impac_audience_pg_card_outcome">
                {item.from}
                <span className="impac_audience_pg_card_arrow">&rarr;</span>
                {item.to}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeThreeAudience;