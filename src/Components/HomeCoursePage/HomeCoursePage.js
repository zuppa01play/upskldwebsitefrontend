import React, { useEffect, useRef } from 'react';
import "./HomeCoursePage.css";
import imageOne from "./arrediness.png";
import imageTwo from "./dataanaly.png";
import imageThree from "./group.png";


const courses = [
  {
    key: "job_readiness",
    title: "AI for Job Readiness",
    description:
      "Build stronger resumes, profiles and interview preparation, with AI as a career co-pilot.",
    image: imageOne,
    alt: "Smiling woman working at her desk in a modern office",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.8l2.1 1.5 2.6-.1.8 2.5 2.1 1.5-.8 2.5.8 2.5-2.1 1.5-.8 2.5-2.6-.1L12 19.2l-2.1-1.5-2.6.1-.8-2.5-2.1-1.5.8-2.5-.8-2.5 2.1-1.5.8-2.5 2.6.1z" />
        <path d="M8.8 12.2l2.3 2.3 4.2-4.6" />
      </svg>
    ),
  },
  {
    key: "data_analytics",
    title: "AI for Data Analytics",
    description:
      "Analyse data, extract insights and communicate findings without needing to code.",
    image: imageTwo,
    alt: "Colleagues analysing data together on a laptop",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="12" width="4" height="8" />
        <rect x="10" y="4" width="4" height="16" />
        <rect x="17" y="9" width="4" height="11" />
      </svg>
    ),
  },
  {
    key: "prompting_sense",
    title: "Prompting Sense",
    description:
      "Move beyond casual chat. Learn structured, task-based prompting that produces workplace-ready outputs.",
    image: imageThree,
    alt: "Professional working at a computer with code on the screen",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.2A8.4 8.4 0 1 1 21 11.5z" />
        <circle cx="8.5" cy="11.5" r="0.6" fill="#2a1a8a" />
        <circle cx="12" cy="11.5" r="0.6" fill="#2a1a8a" />
        <circle cx="15.5" cy="11.5" r="0.6" fill="#2a1a8a" />
      </svg>
    ),
  },
];

const HomeCoursePage = () => {
  const sectionRef = useRef(null);

  /* Scroll reveal */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("career_home_pg_visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("career_home_pg_visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* 3D tilt (desktop + mouse devices only) */
  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (min-width: 1024px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e) => {
    if (!canTilt()) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -14;
    const ry = (x / rect.width - 0.5) * 14;

    card.style.setProperty("--career_rx", `${rx.toFixed(2)}deg`);
    card.style.setProperty("--career_ry", `${ry.toFixed(2)}deg`);
    card.style.setProperty("--career_mx", `${((x / rect.width) * 100).toFixed(1)}%`);
    card.style.setProperty("--career_my", `${((y / rect.height) * 100).toFixed(1)}%`);
  };

  const handleLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--career_rx", "0deg");
    card.style.setProperty("--career_ry", "0deg");
  };

  return (
    <section className="career_home_pg_section" ref={sectionRef}>
      <div className="career_home_pg_container">
        <div className="career_home_pg_head">
          <h2 className="career_home_pg_title">
            Three skills that make AI part of a career for any student.
          </h2>
          <span className="career_home_pg_underline" />
        </div>

        <div className="career_home_pg_grid">
          {courses.map((item) => (
            <div
              key={item.key}
              className={`career_home_pg_item career_home_pg_item_${item.key}`}
            >
              <article
                className="career_home_pg_card"
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
              >
                <div className="career_home_pg_image_wrap">
                  <img
                    className="career_home_pg_image"
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="career_home_pg_body">
                  <div className="career_home_pg_card_head">
                    <span className="career_home_pg_icon">{item.icon}</span>
                    <h3 className="career_home_pg_card_title">{item.title}</h3>
                  </div>
                  <p className="career_home_pg_card_desc">{item.description}</p>
                </div>

                <span className="career_home_pg_glare" aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCoursePage;