import React, { useEffect, useRef, useState } from "react";
import "./HomeHelpingPeople.css";
import   openBookingModal  from "../Openbookingmodal"

const REPLAY_ON_REENTER = false; // true = animation replays every time the section re-enters the screen

const beliefs = [
  { num: "01", text: "Students become more confident." },
  { num: "02", text: "Enterprises become more capable." },
  { num: "03", text: "Universities become more future-ready." },
];

const ArrowIcon = () => (
  <svg
    className="impac_helping_pg_btn_arrow"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="impac_helping_pg_check"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle className="impac_helping_pg_check_ring" cx="12" cy="12" r="9.5" pathLength="1" />
    <path className="impac_helping_pg_check_tick" d="M8 12.4l2.8 2.8L16.2 9.4" pathLength="1" />
  </svg>
);

const HomeHelpingPeople = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setInView(true);
            if (!REPLAY_ON_REENTER) observer.unobserve(node);
          } else if (!entry.isIntersecting && REPLAY_ON_REENTER) {
            setInView(false);
          }
        });
      },
      { threshold: [0, 0.15] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector(".upskld_heade_pg_header");
    const offset = header ? header.offsetHeight : 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 10;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="organisations"
      ref={sectionRef}
      className={`impac_helping_pg_section ${inView ? "impac_helping_pg_visible" : ""}`}
    >
      <div className="impac_helping_pg_card">
        <span className="impac_helping_pg_dots" aria-hidden="true" />
        <span className="impac_helping_pg_glow" aria-hidden="true" />

        <div className="impac_helping_pg_grid">
          {/* ---------- Left: message ---------- */}
          <div className="impac_helping_pg_copy">
            <span className="impac_helping_pg_tag impac_helping_pg_reveal" style={{ "--d": "0ms" }}>
              <span className="impac_helping_pg_tag_dot" />
              Our belief
            </span>

            <h2 className="impac_helping_pg_title">
              <span
                className="impac_helping_pg_title_line impac_helping_pg_reveal"
                style={{ "--d": "120ms" }}
              >
                You don't need to become an AI expert.
              </span>
              <span
                className="impac_helping_pg_title_line impac_helping_pg_title_accent impac_helping_pg_reveal"
                style={{ "--d": "260ms" }}
              >
                You need to get better at what you already do — with AI.
              </span>
            </h2>

            <p className="impac_helping_pg_text impac_helping_pg_reveal" style={{ "--d": "400ms" }}>
              A practical, job-specific way to work with AI, at your pace, without needing to become
              someone else to do it. No pitch. No pressure. Just a short conversation to map your AI
              roadmap.
            </p>

            <div className="impac_helping_pg_actions impac_helping_pg_reveal" style={{ "--d": "520ms" }}>
              <button
                type="button"
                className="impac_helping_pg_btn"
               onClick={openBookingModal}
              >
                <span>Book a free session</span>
                <ArrowIcon />
              </button>
              <span className="impac_helping_pg_note">Free · 15 minutes · No pressure</span>
            </div>
          </div>

          {/* ---------- Right: three beliefs ---------- */}
          <ul className="impac_helping_pg_list">
            {beliefs.map((item, index) => (
              <li
                key={item.num}
                className="impac_helping_pg_row"
                style={{ "--r": index }}
              >
                <span className="impac_helping_pg_num">{item.num}</span>
                <span className="impac_helping_pg_row_text">{item.text}</span>
                <CheckIcon />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeHelpingPeople;