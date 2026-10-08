import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <section className="impac_home_pg_section">
      {/* Animated white background */}
      <div className="impac_home_pg_bg" aria-hidden="true">
        <span className="impac_home_pg_dots"></span>
        <span className="impac_home_pg_blob impac_home_pg_blob_one"></span>
        <span className="impac_home_pg_blob impac_home_pg_blob_two"></span>
        <span className="impac_home_pg_blob impac_home_pg_blob_three"></span>
      </div>

      <div className="impac_home_pg_container">
        {/* Left content */}
        <div className="impac_home_pg_content">
          <h1 className="impac_home_pg_title">
        UPSKLD
          </h1>

          <p className="impac_home_pg_subtitle">
            From AI Anxiety to AI Advantage
          </p>

          <span className="impac_home_pg_divider"></span>

          <p className="impac_home_pg_desc">
           A practical AI learning ecosystem for the people
and institutions shaping the future of work.
          </p>
        </div>

        {/* Right image */}
        <div className="impac_home_pg_visual">
          <span className="impac_home_pg_visual_shape" aria-hidden="true"></span>
          <div className="impac_home_pg_img_wrap">
            <img
              className="impac_home_pg_img"
              src="https://www.instructure.com/sites/default/files/image/2025-07/k12-hero-v1.jpg"
              alt="Upskld for small businesses - team learning practical AI skills"
              width="800"
              height="600"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;