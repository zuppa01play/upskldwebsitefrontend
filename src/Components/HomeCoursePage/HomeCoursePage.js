import React, { useState } from 'react';
import "./HomeCoursePage.css";

const HomeCoursePage = () => {
  const courses = [
    {
      tag: "PROFESSIONALS",
      title: "AI for Sales",
      desc: "Lead research, outreach and proposals — faster, without losing the personal touch.",
      meta: null,
    },
    {
      tag: "PROFESSIONALS",
      title: "AI for Marketing",
      desc: "Campaign ideation, content and market intelligence, built around real briefs.",
      meta: null,
    },
    {
      tag: "LEADERSHIP",
      title: "AI for Business Leaders",
      desc: "Evaluate AI adoption, lead with confidence, without becoming a technologist.",
      meta: null,
    },
    {
      tag: "PROFESSIONALS",
      title: "AI for HR",
      desc: "Recruitment, communication and L&D, with less manual process.",
      meta: null,
    },
    {
      tag: "PROFESSIONALS",
      title: "AI for Finance",
      desc: "Reporting, forecasting support and documentation, done faster.",
      meta: null,
    },
    {
      tag: "EVERYONE",
      title: "AI for Productivity",
      desc: "Practical daily-work habits that apply across any role or team.",
      meta: null,
    },
    {
      tag: "FOUNDERS",
      title: "AI for Entrepreneurs",
      desc: "Build, automate and scale a lean operation using AI across the business.",
      meta: null,
    },
    {
      tag: "LIVE EXAMPLE",
      title: "AI for Students",
      desc: "Graduate more employable than your syllabus alone would make you. AI fundamentals, academic & research assistance, resume building, career guidance.",
      meta: "Live + self-paced · 4–6 weeks · ₹12,000–₹15,000 · English + regional · Certificate on completion",
    },
  ];

  const [blinkIndex, setBlinkIndex] = useState(null);

  const handleCardClick = (index) => {
    setBlinkIndex(index);
    setTimeout(() => setBlinkIndex(null), 400);
  };

  return (
    <section className="upskld_course_pg_wrapper">
      <div className="upskld_course_pg_container">

        <p className="upskld_course_pg_tagline">COURSES</p>

        <h2 className="upskld_course_pg_heading">
          Built around <span className="upskld_course_pg_heading_italic">outcomes</span>, not tools.
        </h2>

        <p className="upskld_course_pg_subtext">
          "Learn ChatGPT" teaches a tool. "AI for Sales" teaches an outcome —
          and includes whichever tools help you get there, taught in context.
        </p>

        <div className="upskld_course_pg_grid">
          {courses.map((course, index) => (
            <div
              className={`upskld_course_pg_card ${
                blinkIndex === index ? "upskld_course_pg_card_blink" : ""
              }`}
              key={index}
              onClick={() => handleCardClick(index)}
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
    </section>
  );
};

export default HomeCoursePage;