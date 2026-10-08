import React, { useEffect, useRef } from 'react';
import "./HomeForEnterprises.css";


const teams = [
  {
    key: "sales",
    title: "Sales",
    description:
      "Prospect research, personalised outreach and pipeline workflows.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 19c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M16.5 13.8c2.6.2 4.5 2 4.5 4.7" />
      </svg>
    ),
  },
  {
    key: "finance",
    title: "Finance",
    description: "MIS reporting, cash-flow tracking and financial analysis.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5.5" rx="7" ry="3" />
        <path d="M5 5.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </svg>
    ),
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Content, campaign structuring and audience engagement workflows.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 4l15 8-15 8 3-8z" />
        <path d="M8 12h6" />
      </svg>
    ),
  },
  {
    key: "strategy",
    title: "Strategy",
    description:
      "Data synthesis, competitive analysis and decision support.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
        <path d="M12 8v3" />
      </svg>
    ),
  },
];

const HomeForEnterprises = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("home_impact_enterprises_pg_visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("home_impact_enterprises_pg_visible");
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
    <section className="home_impact_enterprises_pg_section" ref={sectionRef}>
      <div className="home_impact_enterprises_pg_container">
        <div className="home_impact_enterprises_pg_head">
      
          <h2 className="home_impact_enterprises_pg_title">
            For enterprises: AI value begins where work actually happens.
          </h2>
          <span className="home_impact_enterprises_pg_underline" />
          <p className="home_impact_enterprises_pg_quote">
            &ldquo;Technology is only transformative when people feel capable of
            using it.&rdquo;
          </p>
        </div>

        <div className="home_impact_enterprises_pg_grid">
          <div className="home_impact_enterprises_pg_image_wrap">
            <img
              className="home_impact_enterprises_pg_image"
              src="https://cdnai.iconscout.com/ai-image/premium/thumb/ai-young-student-character-working-on-laptop-illustration-png-download-jpg-13157757.png"
              alt="Team in a meeting room reviewing business analytics on a screen"
              loading="lazy"
            />
          </div>

          {teams.map((item) => (
            <article
              key={item.key}
              className={`home_impact_enterprises_pg_card home_impact_enterprises_pg_card_${item.key}`}
            >
              <div className="home_impact_enterprises_pg_card_head">
                <span className="home_impact_enterprises_pg_icon">{item.icon}</span>
                <h3 className="home_impact_enterprises_pg_card_title">{item.title}</h3>
              </div>
              <p className="home_impact_enterprises_pg_card_desc">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="home_impact_enterprises_pg_banner">
          <p className="home_impact_enterprises_pg_banner_text">
            UpSkld does not stop at &ldquo;what AI can do.&rdquo; It teaches teams
            how to make AI part of the work they already do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeForEnterprises;