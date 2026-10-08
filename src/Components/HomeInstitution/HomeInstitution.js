import React, { useEffect, useRef } from 'react';
import "./HomeInstitution.css";

const REPLAY_ON_REENTER = true; // false = animation plays only once

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#8a14c9" />
    <path
      d="M7 12.5l3.2 3.2L17 8.8"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SelfIcon = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="20" cy="15" r="6" />
    <path d="M7 43V30c4-2.4 9-2.2 13 .8 4-3 9-3.2 13-.8v13c-4-2.2-9-2-13 .8-4-2.8-9-3-13-.8z" />
    <path d="M20 30.8V43.8" />
    <circle cx="37" cy="11" r="5.5" />
    <path d="M34.4 11.2l2 2 3.6-3.8" />
  </svg>
);

const GuidedIcon = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="19" cy="13" r="6" />
    <path d="M7 40c0-7 5-12 12-12s12 5 12 12" />
    <circle cx="35" cy="22" r="4.5" />
    <path d="M32 31c5-1 10 2 10 9" />
    <path d="M6 41h36" />
  </svg>
);

const columns = [
  {
    key: "left",
    title: "Self Learning",
    icon: <SelfIcon />,
    points: [
      "Self-paced learning for scale and flexibility.",
      "Best for: foundational AI awareness, prompt practice and independent skill building.",
      "Learn when you can. Progress at your pace.",
    ],
  },
  {
    key: "right",
    title: "Guided Training",
    icon: <GuidedIcon />,
    points: [
      "Structured learning with direction, accountability and application.",
      "Best for: cohorts, universities and enterprise teams.",
      "Learn together. Apply with confidence.",
    ],
  },
];

const HomeInstitution = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const visibleClass = "impac_institute_pg_visible";

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      node.classList.add(visibleClass);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            node.classList.add(visibleClass);
            if (!REPLAY_ON_REENTER) observer.unobserve(node);
          } else if (!entry.isIntersecting && REPLAY_ON_REENTER) {
            node.classList.remove(visibleClass);
          }
        });
      },
      { threshold: [0, 0.15] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impac_institute_pg_section" ref={sectionRef}>
      <span className="impac_institute_pg_glow" aria-hidden="true" />

      <div className="impac_institute_pg_container">
          
        <h2 className="impac_institute_pg_title">
          Learning that adapts to the learner &mdash; and the institution.
        </h2>

        <div className="impac_institute_pg_grid">
          {/* Left card */}
          <div className={`impac_institute_pg_col impac_institute_pg_col_${columns[0].key}`}>
            <article className="impac_institute_pg_card">
              <span className="impac_institute_pg_badge">{columns[0].icon}</span>
              <h3 className="impac_institute_pg_card_title">{columns[0].title}</h3>
              <ul className="impac_institute_pg_list">
                {columns[0].points.map((text) => (
                  <li className="impac_institute_pg_item" key={text}>
                    <span className="impac_institute_pg_check">
                      <CheckIcon />
                    </span>
                    <span className="impac_institute_pg_item_text">{text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Center hub */}
          <div className="impac_institute_pg_hub">
            <svg viewBox="0 0 48 40" width="42" height="34" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 32L24 6l18 26" />
              <path d="M15 32l9-13 9 13" />
            </svg>
            <span className="impac_institute_pg_hub_brand">UpSkld</span>
            <span className="impac_institute_pg_hub_tag">AI for Growth.</span>
            <span className="impac_institute_pg_hub_label">
              AI Native
              <br />
              LMS
            </span>
          </div>

          {/* Right card */}
          <div className={`impac_institute_pg_col impac_institute_pg_col_${columns[1].key}`}>
            <article className="impac_institute_pg_card">
              <span className="impac_institute_pg_badge">{columns[1].icon}</span>
              <h3 className="impac_institute_pg_card_title">{columns[1].title}</h3>
              <ul className="impac_institute_pg_list">
                {columns[1].points.map((text) => (
                  <li className="impac_institute_pg_item" key={text}>
                    <span className="impac_institute_pg_check">
                      <CheckIcon />
                    </span>
                    <span className="impac_institute_pg_item_text">{text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <p className="impac_institute_pg_footer">
          Same destination. Different routes. Practical AI capability.
        </p>
      </div>
    </section>
  );
};

export default HomeInstitution;