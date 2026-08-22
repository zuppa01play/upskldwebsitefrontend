import React from 'react';
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="upskld_home_pg_wrapper">
      <div className="upskld_home_pg_container">

        {/* Left Content */}
        <div className="upskld_home_pg_left">
          <p className="upskld_home_pg_tagline">HUMAN INTELLIGENCE + AI</p>

          <h1 className="upskld_home_pg_heading">
            AI won't replace your experience. But knowing how to use it will
            change what you do with it.
          </h1>

          <p className="upskld_home_pg_desc">
            UPSKLD helps working professionals, business leaders and students
            apply AI to the job they already do — no coding, no jargon, no
            chatbot-building required.
          </p>

          <div className="upskld_home_pg_btn_group">
            <button className="upskld_home_pg_primary_btn">
              Explore AI for Your Role <span className="upskld_home_pg_arrow">→</span>
            </button>
            <button className="upskld_home_pg_secondary_btn">
              See How It Works
            </button>
          </div>

          <div className="upskld_home_pg_points">
            <div className="upskld_home_pg_point_item">
              <span className="upskld_home_pg_dot"></span>
              <span>Job-specific tracks, not tool tutorials</span>
            </div>
            <div className="upskld_home_pg_point_item">
              <span className="upskld_home_pg_dot"></span>
              <span>No coding, ever</span>
            </div>
            <div className="upskld_home_pg_point_item">
              <span className="upskld_home_pg_dot"></span>
              <span>Vernacular delivery available</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="upskld_home_pg_right">
          <img
            src="https://cdn.dribbble.com/userupload/35032201/file/original-bd29704daa2c99f4b7406afd3f5ee4fc.gif"
            alt="AI and human intelligence concept"
            className="upskld_home_pg_hero_img"
          />
        </div>

      </div>
    </div>
  );
};

export default HomePage;