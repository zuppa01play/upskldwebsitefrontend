import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./HomeReviewPage.css";

const AUTOPLAY_MS = 5500; // time between auto slides
const SWIPE_DISTANCE = 50; // px swipe needed on touch devices

const reviews = [
  {
    quote:
      "Upskld AI has given me a great opportunity to enhance my software development knowledge through practical and engaging learning. The hands-on approach helped me understand programming concepts better and apply them while working on real-world challenges.",
    name: "Ajith AKVP",
    role: "Software Developer",
  },
  {
    quote:
      "Upskld AI has been really helpful in improving my graphic designing and video editing skills. The platform gave me practical knowledge that I can apply directly to my work. It Helped me build more confidence and improve my creative Skills. ",
    name: "Keerthi prasadh K",
    role: "Graphic Designer",
  },
  {
    quote:
      "Before this training, I only used it to ask a few minor questions .However , I Learned how to use ChatGPT securely by applying Privacy settings and how to generate perfect posters by giving the right prompts. She also taught us exactly what kind of questions we should ask ChatGPT to take our Business to the next level and drive business growth .",
    name: "Food store owner",
  },
  {
    quote:
      "After getting training from  UPSKLD , we now use AI to easily track localized pricing trends for our products . By focusing on execution, this training has completely streamlined our admin tasks, saving us hoursof manual work and boosting our productivity.",
    name: "Retail store owner",
  },
  {
    quote:
      "The way of teaching about the Ai and the how they were used the ai in the mangement and the era of mangement was good",
    name: "Prasanth Kumar",
    role: "Student",
  },
  {
    quote:
      "I understood about AI and how to use it . How to use a correct input prompt for AI to avoid wrong information.",
    name: "Vignesh",
    role: "Student",
  },
];

const getPerView = () => {
  if (typeof window === "undefined") return 3;
  const w = window.innerWidth;
  if (w < 700) return 1;
  if (w < 1100) return 2;
  return 3;
};

const ArrowIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "left" ? (
      <path d="M15 5l-7 7 7 7" />
    ) : (
      <path d="M9 5l7 7-7 7" />
    )}
  </svg>
);

const HomeReviewPage = () => {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(getPerView);

  const sectionRef = useRef(null);
  const pausedRef = useRef(false);
  const touchRef = useRef({ x: 0, y: 0 });

  const maxIndex = Math.max(0, reviews.length - perView);

  /* ---------- navigation ---------- */
  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  /* ---------- responsive slides per view ---------- */
  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  /* ---------- autoplay ---------- */
  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || maxIndex === 0) return;

    const timer = setInterval(() => {
      if (!pausedRef.current && !document.hidden) next();
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [next, maxIndex]);

  /* ---------- entrance fade ---------- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      node.classList.add("home_review_pg_visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("home_review_pg_visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* ---------- touch swipe ---------- */
  const handleTouchStart = (e) => {
    pausedRef.current = true;
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;

    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    pausedRef.current = false;
  };

  /* ---------- keyboard ---------- */
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const dotCount = maxIndex + 1;

  return (
    <section className="home_review_pg_wrapper" ref={sectionRef}>
      <div className="home_review_pg_container">
        <p className="home_review_pg_tagline">EARLY LEARNERS</p>

        <h2 className="home_review_pg_heading">
          What early learners are{" "}
          <span className="home_review_pg_heading_italic">saying.</span>
        </h2>

        <p className="home_review_pg_subtext">
          UPSKLD is a new venture. These are real reflections from our earliest
          learners — we'll keep adding to them as more people complete their
          courses.
        </p>

        <div
          className="home_review_pg_slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="Learner reviews"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onFocus={() => (pausedRef.current = true)}
          onBlur={() => (pausedRef.current = false)}
        >
          {/* side arrows (tablet + desktop) */}
          <button
            type="button"
            className="home_review_pg_arrow home_review_pg_arrow_side home_review_pg_arrow_prev"
            onClick={prev}
            aria-label="Previous reviews"
          >
            <ArrowIcon direction="left" />
          </button>

          <div
            className="home_review_pg_viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="home_review_pg_track"
              style={{
                "--home_review_per_view": perView,
                transform: `translateX(-${(index * 100) / perView}%)`,
              }}
            >
              {reviews.map((review, i) => {
                const inView = i >= index && i < index + perView;
                return (
                  <div
                    className="home_review_pg_slide"
                    key={i}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${reviews.length}`}
                    aria-hidden={!inView}
                  >
                    <div className="home_review_pg_card">
                      <div className="home_review_pg_stars" aria-label="5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="home_review_pg_quote">{review.quote}</p>

                      <div className="home_review_pg_person">
                        <p className="home_review_pg_name">{review.name}</p>
                        {review.role && (
                          <p className="home_review_pg_role">{review.role}</p>
                        )}
                      </div>

                    
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="home_review_pg_arrow home_review_pg_arrow_side home_review_pg_arrow_next"
            onClick={next}
            aria-label="Next reviews"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* bottom controls: arrows (mobile) + dots */}
        <div className="home_review_pg_controls">
          <button
            type="button"
            className="home_review_pg_arrow home_review_pg_arrow_bottom"
            onClick={prev}
            aria-label="Previous reviews"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className="home_review_pg_dots" role="tablist" aria-label="Choose review">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                type="button"
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={`home_review_pg_dot ${
                  i === index ? "home_review_pg_dot_active" : ""
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="home_review_pg_arrow home_review_pg_arrow_bottom"
            onClick={next}
            aria-label="Next reviews"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeReviewPage;