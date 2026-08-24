import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import "./HomeCoursePage.css";

const HomeCoursePage = () => {
  const courses = [
    { tag: "PROFESSIONALS", title: "AI for Sales", desc: "Lead research, outreach and proposals — faster, without losing the personal touch.", meta: null },
    { tag: "PROFESSIONALS", title: "AI for Marketing", desc: "Campaign ideation, content and market intelligence, built around real briefs.", meta: null },
    { tag: "LEADERSHIP", title: "AI for Business Leaders", desc: "Evaluate AI adoption, lead with confidence, without becoming a technologist.", meta: null },
    { tag: "PROFESSIONALS", title: "AI for HR", desc: "Recruitment, communication and L&D, with less manual process.", meta: null },
    { tag: "PROFESSIONALS", title: "AI for Finance", desc: "Reporting, forecasting support and documentation, done faster.", meta: null },
    { tag: "EVERYONE", title: "AI for Productivity", desc: "Practical daily-work habits that apply across any role or team.", meta: null },
    { tag: "FOUNDERS", title: "AI for Entrepreneurs", desc: "Build, automate and scale a lean operation using AI across the business.", meta: null },
    { tag: "LIVE EXAMPLE", title: "AI for Students", desc: "Graduate more employable than your syllabus alone would make you. AI fundamentals, academic & research assistance, resume building, career guidance.", meta: "Live + self-paced · 4–6 weeks · ₹12,000–₹15,000 · English + regional · Certificate on completion" },
    { tag: "GROWTH", title: "AI for Growth", desc: "Graduate more employable than your syllabus alone would make you. AI fundamentals, academic & research assistance, resume building, career guidance.", meta: "Live + self-paced · 4–6 weeks · ₹12,000–₹15,000 · English + regional · Certificate on completion" },
    { tag: "INTERVIEW", title: "AI for Interview", desc: "Graduate more employable than your syllabus alone would make you. AI fundamentals, academic & research assistance, resume building, career guidance.", meta: "Live + self-paced · 4–6 weeks · ₹12,000–₹15,000 · English + regional · Certificate on completion" },
  ];

  const [blinkIndex, setBlinkIndex] = useState(null);
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [cardStep, setCardStep] = useState(0);

  const trackRef = useRef(null);
  const isFirstRender = useRef(true);
  const prevCardStepRef = useRef(0);

  const handleCardClick = (i) => {
    setBlinkIndex(i);
    setTimeout(() => setBlinkIndex(null), 400);
  };

  // how many cards fit, matches CSS breakpoints below
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w <= 560) setVisibleCards(1);
      else if (w <= 820) setVisibleCards(2);
      else if (w <= 1100) setVisibleCards(3);
      else setVisibleCards(4);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  // measure actual rendered card width + gap
  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.children[0];
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    setCardStep(cardWidth + gap);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [visibleCards, measure]);

  // clamp index so we never scroll past the last full set
  useEffect(() => {
    const maxIndex = Math.max(0, courses.length - visibleCards);
    setIndex((i) => Math.min(i, maxIndex));
  }, [visibleCards, courses.length]);

  // move the track — instant reposition on resize, animated slide on index change
  useEffect(() => {
    if (!trackRef.current || !cardStep) return;
    const resized = prevCardStepRef.current !== cardStep;
    prevCardStepRef.current = cardStep;

    if (isFirstRender.current || resized) {
      isFirstRender.current = false;
      gsap.set(trackRef.current, { x: -index * cardStep });
    } else {
      gsap.to(trackRef.current, {
        x: -index * cardStep,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, [index, cardStep]);

  const maxIndex = Math.max(0, courses.length - visibleCards);
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section id="courses" className="upskld_course_pg_wrapper">
      <div className="upskld_course_pg_container">

        <p className="upskld_course_pg_tagline">COURSES</p>

        <h2 className="upskld_course_pg_heading">
          Built around <span className="upskld_course_pg_heading_italic">outcomes</span>, not tools.
        </h2>

        <p className="upskld_course_pg_subtext">
          "Learn ChatGPT" teaches a tool. "AI for Sales" teaches an outcome —
          and includes whichever tools help you get there, taught in context.
        </p>

        <div className="upskld_course_pg_slider_wrap">
          <button
            type="button"
            className="upskld_course_pg_arrow_btn upskld_course_pg_arrow_prev"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous courses"
          >
            &#8249;
          </button>

          <div className="upskld_course_pg_viewport">
            <div className="upskld_course_pg_grid" ref={trackRef}>
              {courses.map((course, i) => (
                <div
                  className={`upskld_course_pg_card ${
                    blinkIndex === i ? "upskld_course_pg_card_blink" : ""
                  }`}
                  key={i}
                  onClick={() => handleCardClick(i)}
                >
                  <span className="upskld_course_pg_tag">{course.tag}</span>

                  <h3 className="upskld_course_pg_card_title">{course.title}</h3>
                  <p className="upskld_course_pg_card_desc">{course.desc}</p>

                  {course.meta && (
                    <>
                      <div className="upskld_course_pg_divider"></div>
                      <p className="upskld_course_pg_meta">{course.meta}</p>
                    </>
                  )}

                  <div className="upskld_course_pg_card_bottom">
                    {!course.meta && <div className="upskld_course_pg_divider"></div>}
                    <button className="upskld_course_pg_link_btn">
                      ADD PRICING &amp; CURRICULUM
                    </button>
                    <button className="upskld_course_pg_reserve_btn">
                      Reserve Free Counselling
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="upskld_course_pg_arrow_btn upskld_course_pg_arrow_next"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next courses"
          >
            &#8250;
          </button>
        </div>

      </div>
    </section>
  );
};

export default HomeCoursePage;