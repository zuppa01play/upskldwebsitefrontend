import React from 'react';
import "./HomeReviewPage.css";

const HomeReviewPage = () => {
  const reviews = [
    {
      quote: "The way of teaching about the Ai and the how they were used the ai in the mangement and the era of mangement was good",
      name: "Prasanth Kumar",
      role: "BE Student",
    },
    {
      quote: "So good to understand love the way of teaching and got good experience and learned many things about Ai",
      name: "Stany Iniyan",
      role: "BE Student",
    },
    {
      quote: "The master class is really good. I learned some of things like the level of AI.",
      name: "Puvan Rohith",
      role: "BE Student",
    },
    {
      quote: "I understood about AI and how to use it . How to use a correct input prompt for AI to avoid wrong information.",
      name: "Vignesh",
      role: "BE Student",
    },
  ];

  return (
    <section className="home_review_pg_wrapper">
      <div className="home_review_pg_container">

        <p className="home_review_pg_tagline">EARLY LEARNERS</p>

        <h2 className="home_review_pg_heading">
          What early learners are{" "}
          <span className="home_review_pg_heading_italic">saying.</span>
        </h2>

        <p className="home_review_pg_subtext">
          UPSKLD is a new venture. These are real reflections from our
          earliest learners — we'll keep adding to them as more people
          complete their courses.
        </p>

        <div className="home_review_pg_grid">
          {reviews.map((review, index) => (
            <div className="home_review_pg_card" key={index}>
              <div className="home_review_pg_stars">★★★★★</div>

              <p className="home_review_pg_quote">{review.quote}</p>

              <div className="home_review_pg_person">
                <p className="home_review_pg_name">{review.name}</p>
                <p className="home_review_pg_role">{review.role}</p>
              </div>

              <button className="home_review_pg_verify_btn">
                VERIFY QUOTE &amp; CONSENT
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeReviewPage;