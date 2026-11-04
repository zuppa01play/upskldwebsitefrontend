import React, { useEffect, useRef, useState } from "react";
import "./HomeHelpingPeople.css";
import   openBookingModal  from "../Openbookingmodal"

const REPLAY_ON_REENTER = false; // true = animation replays every time the section re-enters the screen

/* header tab -> content
   0 Small Business · 1 Working Professionals · 2 Students */
const content = [
  {
    title: "You don't need to become an AI expert.",
    accent: "You need to get better at what you already do — with AI.",
    text:
      "A practical, job-specific way to work with AI, at your pace, without needing to become someone else to do it. No pitch. No pressure. Just a short conversation to map your AI roadmap.",
    note: "Free · 15 minutes · No pressure",
    beliefs: [
      { num: "01", title: "Students become more confident." },
      { num: "02", title: "Enterprises become more capable." },
      { num: "03", title: "Universities become more future-ready." },
    ],
  },
  {
    title: "Master practical AI to automate your daily office workflows",
    accent: "without learning complex theory or writing code.",
    text:
      "Designed for non-technical professionals, book a quick call to map your personalized AI roadmap.",
    note: "Free · 15 minutes · No pressure",
    beliefs: [
      {
        num: "01",
        title: "10x Task Velocity",
        desc: "Multiply your output quality and speed on routine tasks without experiencing burnout.",
      },
      {
        num: "02",
        title: "Sharper Decisions",
        desc: "Gain instant market synthesis, data processing, and rapid scenario modeling capabilities.",
      },
      {
        num: "03",
        title: "Career Future-Proofing",
        desc: "Achieve unmatched workplace visibility and position yourself for salary acceleration potential.",
      },
    ],
  },
  {
    title: "You don't need to become an AI expert.",
    accent: "You just need practical AI skills to get hired.",
    text:
      "A practical, step-by-step way to learn AI at your own pace, without writing a single line of code. No pressure. Just a short conversation to map your career roadmap.",
    note: "Free · 15 minutes · No pressure",
    beliefs: [
      {
        num: "01",
        title: "AI for Job Readiness",
        desc: "Build stronger resumes and prepare for interviews with AI as your career co-pilot.",
      },
      {
        num: "02",
        title: "No-Code Data Analytics",
        desc: "Analyze complex data and extract insights without learning how to code.",
      },
      {
        num: "03",
        title: "Structured Prompting Sense",
        desc: "Move beyond casual chat. Learn to write prompts that produce workplace-ready results.",
      },
    ],
  },
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

const HomeHelpingPeople = ({ activeIndex = 0 }) => {
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

  // after the first header-tab change the new text fades in again
  const data = content[activeIndex] || content[0];
  const firstTab = useRef(activeIndex);
  const swapped = firstTab.current !== activeIndex;

  return (
    <section
      id="organisations"
      ref={sectionRef}
      className={`impac_helping_pg_section ${inView ? "impac_helping_pg_visible" : ""}`}
    >
      <div className="impac_helping_pg_card">
        <span className="impac_helping_pg_dots" aria-hidden="true" />
        <span className="impac_helping_pg_glow" aria-hidden="true" />

        <div
          key={activeIndex}
          className={`impac_helping_pg_grid ${swapped ? "impac_helping_pg_grid_swap" : ""}`}
        >
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
                {data.title}
              </span>
              <span
                className="impac_helping_pg_title_line impac_helping_pg_title_accent impac_helping_pg_reveal"
                style={{ "--d": "260ms" }}
              >
                {data.accent}
              </span>
            </h2>

            <p className="impac_helping_pg_text impac_helping_pg_reveal" style={{ "--d": "400ms" }}>
              {data.text}
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
              <span className="impac_helping_pg_note">{data.note}</span>
            </div>
          </div>

          {/* ---------- Right: three beliefs ---------- */}
          <ul className="impac_helping_pg_list">
            {data.beliefs.map((item, index) => (
              <li
                key={item.num}
                className="impac_helping_pg_row"
                style={{ "--r": index }}
              >
                <span className="impac_helping_pg_num">{item.num}</span>
                <span className="impac_helping_pg_row_body">
                  <span className="impac_helping_pg_row_text">{item.title}</span>
                  {item.desc && <span className="impac_helping_pg_row_desc">{item.desc}</span>}
                </span>
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