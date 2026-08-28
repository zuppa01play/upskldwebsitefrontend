import React from "react";
import "./HomePage.css";
import HomeGif from "./home.gif"

const HomePage = () => {
  return (
    <div className="upskld_home_pg_wrapper">
      <div className="upskld_home_pg_container">
        {/* Left Content */}
        <div className="upskld_home_pg_left">
          <p className="upskld_home_pg_tagline">HUMAN INTELLIGENCE + AI</p>

          <h1 className="upskld_home_pg_heading">Learn AI. Lead the Future.</h1>

          <p className="upskld_home_pg_desc">
            India's AI upskilling ecosystem built specifically for non-tech
            students, universities, and enterprises.
          </p>
          <p className="upskld_home_pg_desc">
            {" "}
            No coding. No heavy jargon. Just practical skills for real growth
          </p>
          <div className="upskld_home_pg_btn_group">
            <button className="upskld_home_pg_primary_btn">
              Explore AI for Your Role{" "}
              <span className="upskld_home_pg_arrow">→</span>
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
            src={HomeGif}
            alt="AI and human intelligence concept"
            className="upskld_home_pg_hero_img"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
