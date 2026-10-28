import React, { useEffect, useRef } from "react";
import "./HomeThreeAudience.css";

const audiences = [
  {
    key: "students",
    title: "Students",
    description: "Career-focused AI courses: job readiness, data analytics and prompting.",
    from: "Confidence",
    to: "Employability",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 9L12 4 2 9l10 5 10-5z" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
        <path d="M22 9v6" />
      </svg>
    ),
  },
  {
    key: "professionals",
    title: "Working Professionals",
    description:
      "Practical, role-based AI training for sales, finance, marketing and operations roles.",
    from: "Adoption",
    to: "Performance",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="12" width="4" height="8" rx="1" />
        <rect x="10" y="4" width="4" height="16" rx="1" />
        <rect x="17" y="9" width="4" height="11" rx="1" />
      </svg>
    ),
  },
  {
    key: "business",
    title: "Small Business",
    description: "Plain-language AI to automate sales, marketing, follow-ups and accounts.",
    from: "Effort",
    to: "Growth",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z" />
        <path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

const HomeThreeAudience = () => {
  const sectionRef = useRef(null);

  // add the "visible" class once, the first time the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("impac_audience_pg_visible");
      return undefined;
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="audiences" className="impac_audience_pg_section" ref={sectionRef}>
      <div className="impac_audience_pg_container">
        <h2 className="impac_audience_pg_title">
          <span className="impac_audience_pg_brand">UpSkld,</span>{" "}
          One platform. Three audiences. One connected outcome.
        </h2>
        <span className="impac_audience_pg_underline" />

        <div className="impac_audience_pg_map">
          {/* Center hub */}
          <div className="impac_audience_pg_hub_wrap">
            <span className="impac_audience_pg_ring impac_audience_pg_ring_one" aria-hidden="true" />
            <span className="impac_audience_pg_ring impac_audience_pg_ring_two" aria-hidden="true" />

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
          </div>

          {/* Connectors */}
          <span className="impac_audience_pg_arrow impac_audience_pg_arrow_left" aria-hidden="true" />
          <span className="impac_audience_pg_arrow impac_audience_pg_arrow_right" aria-hidden="true" />
          <span className="impac_audience_pg_arrow impac_audience_pg_arrow_down" aria-hidden="true" />

          {/* Cards */}
          {audiences.map((item) => (
            <article
              key={item.key}
              className={`impac_audience_pg_card impac_audience_pg_card_${item.key}`}
            >
              <div className="impac_audience_pg_card_head">
                <span className="impac_audience_pg_card_icon">{item.icon}</span>
                <h3 className="impac_audience_pg_card_title">{item.title}</h3>
              </div>

              <p className="impac_audience_pg_card_desc">{item.description}</p>

              <p className="impac_audience_pg_card_outcome">
                <span className="impac_audience_pg_chip">{item.from}</span>
                <span className="impac_audience_pg_card_arrow" aria-hidden="true">
                  &rarr;
                </span>
                <span className="impac_audience_pg_chip impac_audience_pg_chip_to">{item.to}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeThreeAudience;