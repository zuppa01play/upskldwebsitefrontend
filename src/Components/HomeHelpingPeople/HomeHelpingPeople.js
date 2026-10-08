import React, { useEffect, useRef } from 'react';
import "./HomeHelpingPeople.css";

const REPLAY_ON_REENTER = false; // true = animation replays every time the section re-enters the screen

const testimonials = [
  {
    key: "student",
    role: "Student",
    quote:
      "I was afraid I would fall behind. Now I know how to use AI to move ahead.",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#8a14c9" aria-hidden="true">
        <circle cx="12" cy="7" r="3.6" />
        <path d="M4.5 21v-5c0-1.7 1.4-3 3.1-3h8.8c1.7 0 3.1 1.3 3.1 3v5z" />
        <path d="M12 14v7" stroke="#f1e8ff" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    key: "enterprise",
    role: "Enterprise Leader",
    quote:
      "We bought the tools. UpSkld helped our people turn them into results.",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#8a14c9" aria-hidden="true">
        <circle cx="10" cy="7" r="3.6" />
        <path d="M3 21c0-3.6 2.9-6.4 6.5-6.4 1.1 0 2.1.3 3 .7L11 21z" />
        <path d="M18 13.2l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />
      </svg>
    ),
  },
  {
    key: "university",
    role: "University Leader",
    quote:
      "AI readiness is now something our students can carry beyond the classroom.",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#8a14c9" aria-hidden="true">
        <path d="M12 2.2l9.2 3.9L12 10 2.8 6.1z" />
        <path d="M6.6 9.6v1.9c0 .9 2.4 1.7 5.4 1.7s5.4-.8 5.4-1.7V9.6L12 11.8z" />
        <circle cx="12" cy="14.4" r="2.6" />
        <path d="M6 22c0-3 2.7-5 6-5s6 2 6 5z" />
      </svg>
    ),
  },
];

const HomeHelpingPeople = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const visibleClass = "impac_helping_pg_visible";

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
    <section id="organisations" className="impac_helping_pg_section" ref={sectionRef}>
      {/* decorative background */}
      <span className="impac_helping_pg_dots" aria-hidden="true" />
      <span className="impac_helping_pg_glow" aria-hidden="true" />
      <span className="impac_helping_pg_circle" aria-hidden="true" />

      <div className="impac_helping_pg_container">
        <h2 className="impac_helping_pg_title">
          UpSkld is not just about learning AI. It is about helping people
          believe they still have a place in the future.
        </h2>
        <span className="impac_helping_pg_underline" />

        <div className="impac_helping_pg_grid">
          {testimonials.map((item) => (
            <div
              key={item.key}
              className={`impac_helping_pg_item impac_helping_pg_item_${item.key}`}
            >
              <article className="impac_helping_pg_card">
                <div className="impac_helping_pg_card_head">
                  <span className="impac_helping_pg_icon">{item.icon}</span>
                  <h3 className="impac_helping_pg_role">{item.role}</h3>
                </div>

                <span className="impac_helping_pg_divider" />

                <p className="impac_helping_pg_quote">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHelpingPeople;