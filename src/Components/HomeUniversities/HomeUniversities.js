import React, { useEffect, useRef } from 'react';
import "./HomeUniversities.css";

const steps = [
  {
    key: "one",
    label: "STEP 1",
    title: "Start with placement enablement",
  },
  {
    key: "two",
    label: "STEP 2",
    title: "Integration with Curriculum and workplace skills",
  },
  {
    key: "three",
    label: "STEP 3",
    title: "Expand into faculty capability",
  },
];

const outcomes = [
  {
    key: "confidence",
    title: "Student confidence",
    sub: "AI awareness + prompting",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
        <path d="M12 8v3" />
      </svg>
    ),
  },
  {
    key: "readiness",
    title: "Workplace readiness",
    sub: "Analytics + workflows",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M3 13h18" />
        <path d="M11 13h2v2h-2z" />
      </svg>
    ),
  },
  {
    key: "placement",
    title: "Placement impact",
    sub: "Stronger career outcomes",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2a1a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 9L12 4 2 9l10 5 10-5z" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
        <path d="M22 9v6" />
      </svg>
    ),
  },
];

const SETTLE_DELAY = 900; // ms to wait after section appears before a scroll counts
const SCROLL_DISTANCE = 30; // px of page scroll that counts as "one scroll"

const HomeUniversities = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const visibleClass = "impact_universities_pg_visible";
    const revealedClass = "impact_universities_pg_revealed";

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      node.classList.add(visibleClass, revealedClass);
      return;
    }

    let inView = false;
    let armedAt = 0;
    let startY = 0;
    let done = false;

    const isSettled = () => Date.now() - armedAt > SETTLE_DELAY;

    const removeListeners = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };

    const reveal = () => {
      if (done) return;
      done = true;
      node.classList.add(revealedClass);
      removeListeners();
    };

    function onWheel(e) {
      if (!inView || !isSettled()) return;
      if (Math.abs(e.deltaY) > 2) reveal();
    }

    function onScroll() {
      if (!inView) return;
      if (!isSettled()) {
        startY = window.scrollY;
        return;
      }
      if (Math.abs(window.scrollY - startY) > SCROLL_DISTANCE) reveal();
    }

    function onTouchMove() {
      if (!inView || !isSettled()) return;
      reveal();
    }

    function onKeyDown(e) {
      if (!inView || !isSettled()) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar"];
      if (keys.includes(e.key)) reveal();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add(visibleClass);
            inView = true;
            armedAt = Date.now();
            startY = window.scrollY;
          } else {
            inView = false;
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      observer.disconnect();
      removeListeners();
    };
  }, []);

  return (
    <section className="impact_universities_pg_section" ref={sectionRef}>
      {/* decorative background */}
      <span className="impact_universities_pg_dots" aria-hidden="true" />
      <span className="impact_universities_pg_circle" aria-hidden="true" />

      <div className="impact_universities_pg_container">
        <div className="impact_universities_pg_head">
              <br/>
            <br/>
          <h2 className="impact_universities_pg_title">
            For universities: make AI readiness part of the student success story.
          </h2>
          <span className="impact_universities_pg_underline" />

          <p className="impact_universities_pg_quote">
            &ldquo;When students succeed, institutions move forward with them.&rdquo;
          </p>

          <p className="impact_universities_pg_note">
            Start with placement enablement. Expand into faculty capability.
          </p>
        </div>

        {/* scroll hint (hides after first scroll) */}
        <div className="impact_universities_pg_hint" aria-hidden="true">
          <span className="impact_universities_pg_hint_mouse">
            <span className="impact_universities_pg_hint_wheel" />
          </span>
          <span className="impact_universities_pg_hint_text">Scroll to explore</span>
        </div>

        {/* 3 growing step cards */}
        <div className="impact_universities_pg_steps">
          {steps.map((step) => (
            <article
              key={step.key}
              className={`impact_universities_pg_step impact_universities_pg_step_${step.key}`}
            >
              <div className="impact_universities_pg_step_inner">
                <span className="impact_universities_pg_step_label">{step.label}</span>
                <h3 className="impact_universities_pg_step_title">{step.title}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* outcomes row */}
        <div className="impact_universities_pg_features">
          {outcomes.map((item) => (
            <div
              key={item.key}
              className="impact_universities_pg_feature"
            >
              <span className="impact_universities_pg_feature_icon">{item.icon}</span>
              <div className="impact_universities_pg_feature_text">
                <h4 className="impact_universities_pg_feature_title">{item.title}</h4>
                <p className="impact_universities_pg_feature_sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeUniversities;