import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeReviewPage.css";
import { openBookingModal } from "../Openbookingmodal";

const AUTOPLAY_MS = 6500; // time each review stays in front
const SWIPE_DISTANCE = 45; // px swipe needed on touch devices

/* Quotes are the learners' own words — kept exactly as submitted.
   `outcome` is a short label summarising what each quote says.
   Placeholders ([Learner name] …) stay until the team lead sends the real content —
   just replace the text in the objects below, nothing else needs to change. */
const placeholder = (id, role) => ({
  id,
  quote: "[Real quote: the result they got]",
  name: "[Learner name]",
  role,
  outcome: "[Outcome]",
});

const smallBusinessReviews = [
  {
    id: "sb-1",
    quote:
      "Before this training, I only used it to ask a few minor questions .However , I Learned how to use ChatGPT securely by applying Privacy settings and how to generate perfect posters by giving the right prompts. She also taught us exactly what kind of questions we should ask ChatGPT to take our Business to the next level and drive business growth .",
    name: "Food store owner",
    outcome: "Posters & safer AI use",
  },
  {
    id: "sb-2",
    quote:
      "After getting training from  UPSKLD , we now use AI to easily track localized pricing trends for our products . By focusing on execution, this training has completely streamlined our admin tasks, saving us hoursof manual work and boosting our productivity.",
    name: "Retail store owner",
    outcome: "Hours saved on admin",
  },
  placeholder("sb-3", "Apparel & fashion · [City]"),
  placeholder("sb-4", "Manufacturing · [City]"),
  placeholder("sb-5", "Services · [City]"),
  placeholder("sb-6", "Online seller · [City]"),
];

const professionalReviews = [
  {
    id: "pro-1",
    quote:
      "Upskld AI has given me a great opportunity to enhance my software development knowledge through practical and engaging learning. The hands-on approach helped me understand programming concepts better and apply them while working on real-world challenges.",
    name: "Ajith AKVP",
    role: "Software Developer",
    outcome: "Software skills",
  },
  {
    id: "pro-2",
    quote:
      "Upskld AI has been really helpful in improving my graphic designing and video editing skills. The platform gave me practical knowledge that I can apply directly to my work. It Helped me build more confidence and improve my creative Skills. ",
    name: "Keerthi prasadh K",
    role: "Graphic Designer",
    outcome: "Design & video skills",
  },
  placeholder("pro-3", "Sales · [City]"),
  placeholder("pro-4", "HR · [City]"),
  placeholder("pro-5", "Finance · [City]"),
  placeholder("pro-6", "Marketing · [City]"),
];

const studentReviews = [
  {
    id: "stu-1",
    quote:
      "The way of teaching about the Ai and the how they were used the ai in the mangement and the era of mangement was good",
    name: "Prasanth Kumar",
    role: "Student",
    outcome: "AI in management",
  },
  {
    id: "stu-2",
    quote:
      "I understood AI and how to use it — and how to write the correct prompt to avoid wrong information.",
    name: "Vignesh",
    role: "Student",
    outcome: "Better, safer prompts",
  },
  placeholder("stu-3", "Student · [College]"),
  placeholder("stu-4", "Student · [College]"),
  placeholder("stu-5", "Student · [College]"),
  placeholder("stu-6", "Student · [College]"),
];

/* Order MUST match navLinks in HeaderPage (0 small business · 1 professionals · 2 students) */
const audiences = [
  {
    id: "small",
    heading: "Business owners are already doing this. What about you?",
    subtext:
      "From posters to pricing, our learners use AI in their business the same week they learn it.",
    reviews: smallBusinessReviews,
  },
  {
    id: "professionals",
    heading: "Professionals are already working smarter. Your turn?",
    subtext: "Learners apply what they learn to real tasks the very same week.",
    reviews: professionalReviews,
  },
  {
    id: "students",
    heading: "Students are already ahead of the curve. Join them.",
    subtext: "Learners walk away with skills they can show in interviews.",
    reviews: studentReviews,
  },
];

const pad = (n) => String(n).padStart(2, "0");

const ArrowIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 32 24" width="34" height="26" fill="currentColor" aria-hidden="true">
    <path d="M0 24V13.6C0 6.1 4.2 1.4 11.6 0l1.5 3.4C8.9 4.6 7 7.2 6.8 10.4H12V24H0z" />
    <path d="M19.5 24V13.6C19.5 6.1 23.7 1.4 31.1 0l1.5 3.4c-4.2 1.2-6.1 3.8-6.3 7H31.5V24H19.5z" />
  </svg>
);

/* offset of card i from the one in front, looping around the list */
const getPosition = (i, active, total) => {
  const offset = (i - active + total) % total;
  if (offset === 0) return "front";
  if (offset === 1) return "second";
  if (offset === 2) return "third";
  if (offset === total - 1) return "out";
  return "hidden";
};

const HomeReviewPage = ({ activeIndex = 0 }) => {
  const audience = audiences[activeIndex] || audiences[0];
  const reviews = audience.reviews;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef(null);
  const touchRef = useRef({ x: 0, y: 0 });

  const total = reviews.length;

  // header tab changed -> start from the first review again
  useEffect(() => {
    setIndex(0);
  }, [audience.id]);

  // play the "swap" animation only after the tab really changed
  const prevAudience = useRef(audience.id);
  const switchedRef = useRef(false);
  if (prevAudience.current !== audience.id) {
    prevAudience.current = audience.id;
    switchedRef.current = true;
  }
  const swapClass = switchedRef.current ? "home_review_pg_swap" : "";

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const running = !paused && !tabHidden && inView && !reduceMotion;

  /* ---------- autoplay: restarts after every change ---------- */
  useEffect(() => {
    if (!running) return undefined;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [running, index, next]);

  /* ---------- pause when the browser tab is in the background ---------- */
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ---------- entrance: play once when the section scrolls into view ---------- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* keep the "revealed" look after the first time; autoplay still follows visibility */
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

  /* ---------- touch swipe ---------- */
  const handleTouchStart = (e) => {
    setPaused(true);
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    setPaused(false);
  };

  /* ---------- keyboard ---------- */
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

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
      ref={sectionRef}
      className={`home_review_pg_section ${revealed ? "home_review_pg_in" : ""}`}
    >
      <div className="home_review_pg_container">
        {/* ---------- Left: copy ---------- */}
        <div key={`copy-${audience.id}`} className={`home_review_pg_copy ${swapClass}`}>
          <span className="home_review_pg_eyebrow home_review_pg_reveal" style={{ "--d": "0ms" }}>
            Real stories from our learners
          </span>

          <h2 className="home_review_pg_heading home_review_pg_reveal" style={{ "--d": "120ms" }}>
            {audience.heading}
          </h2>

          <p className="home_review_pg_subtext home_review_pg_reveal" style={{ "--d": "240ms" }}>
            {audience.subtext}
          </p>

          <button
            type="button"
            className="home_review_pg_cta home_review_pg_reveal"
            style={{ "--d": "360ms" }}
            onClick={openBookingModal}
          >
            Book a free session
          </button>
        </div>

        {/* ---------- Right: card deck ---------- */}
        <div key={`stage-${audience.id}`} className={`home_review_pg_stage home_review_pg_reveal_deck ${swapClass}`}>
          <div
            className="home_review_pg_deck"
            role="region"
            aria-roledescription="carousel"
            aria-label="Learner reviews"
            aria-live={paused ? "polite" : "off"}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {reviews.map((review, i) => {
              const position = getPosition(i, index, total);
              const front = position === "front";
              return (
                <article
                  key={review.id}
                  className={`home_review_pg_card home_review_pg_card_${position}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  aria-hidden={!front}
                >
                  <span className="home_review_pg_quote_icon home_review_pg_step" style={{ "--s": 0 }}>
                    <QuoteIcon />
                  </span>

                  <span className="home_review_pg_outcome home_review_pg_step" style={{ "--s": 1 }}>
                    {review.outcome}
                  </span>

                  <p className="home_review_pg_quote home_review_pg_step" style={{ "--s": 2 }}>
                    {review.quote}
                  </p>

                  <div className="home_review_pg_person home_review_pg_step" style={{ "--s": 3 }}>
                    <span className="home_review_pg_avatar" aria-hidden="true">
                      {review.name.replace(/^[^A-Za-z0-9]+/, "").charAt(0).toUpperCase()}
                    </span>
                    <div className="home_review_pg_who">
                      <p className="home_review_pg_name">{review.name}</p>
                      {review.role && <p className="home_review_pg_role">{review.role}</p>}
                    </div>
                    <span className="home_review_pg_count">
                      {pad(i + 1)} / {pad(total)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* controls */}
          <div className="home_review_pg_controls">
            <button
              type="button"
              className="home_review_pg_arrow"
              onClick={prev}
              aria-label="Previous review"
            >
              <ArrowIcon direction="left" />
            </button>

            <div className="home_review_pg_dots" role="tablist" aria-label="Choose review">
              {reviews.map((review, i) => {
                const active = i === index;
                return (
                  <button
                    type="button"
                    key={review.id}
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show review ${i + 1}`}
                    className={`home_review_pg_dot ${active ? "home_review_pg_dot_active" : ""}`}
                    onClick={() => setIndex(i)}
                  >
                    {active && (
                      <span
                        key={`${index}-${running}`}
                        className={`home_review_pg_dot_fill ${
                          running ? "home_review_pg_dot_fill_run" : ""
                        }`}
                        style={{ "--ms": `${AUTOPLAY_MS}ms` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="home_review_pg_arrow"
              onClick={next}
              aria-label="Next review"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReviewPage;