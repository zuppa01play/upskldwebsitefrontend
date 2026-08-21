import React from 'react';
import "./HomeReviewPage.css";

const HomeReviewPage = () => {
  const reviews = [
    {
      quote: "I never thought I'd use AI as a B.Com student — now I use it every week for my project work and I feel ready for placements.",
      name: "Sharanya Desai",
      role: "B.Com Student",
    },
    {
      quote: "I was worried AI would replace my role in operations. This course showed me exactly where I can use it to my advantage instead.",
      name: "Rakesh Patel",
      role: "Operations",
    },
    {
      quote: "I thought AI might replace my role in operations. This course helped me see how I can use AI to make my work smarter and more effective.",
      name: "Santhiya PK",
      role: "Developer",
    },
    {
      quote: "I used to see AI as a threat to my role in operations. This course showed me how to turn AI into a powerful advantage in my everyday work.",
      name: "Keerthi",
      role: "Marketing",
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

              <p className="home_review_pg_quote">"{review.quote}"</p>

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