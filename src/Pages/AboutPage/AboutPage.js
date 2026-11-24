import React, { useState } from "react";
import "./AboutPage.css";
import HomeTrackPage from "../../Components/HomeTrackPage/HomeTrackPage";
import HomeThreeAudience from "../../Components/HomeThreeAudience/HomeThreeAudience";
import StudendFooter from "../../Components/StudentFooter/StudentFooter";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  const [activeIndex] = useState(0);

  return (
    <div>
      <Helmet>
        <title>About Upskld AI | Impactree Data Technologies</title>
        <meta
          name="description"
          content="Who we are and why we teach practical AI to small businesses, professionals and students."
        />
        <link rel="canonical" href="https://upskldai.com/aboutus" />
        <meta property="og:url" content="https://upskldai.com/aboutus" />
      </Helmet>

      <h1 className="visually-hidden">About Upskld AI</h1>

      <HomeTrackPage activeIndex={activeIndex} />
      <HomeThreeAudience />
      <StudendFooter />
    </div>
  );
};

export default AboutPage;