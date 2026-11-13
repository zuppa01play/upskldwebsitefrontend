import React, { useState } from "react";
import "./AboutPage.css";
import HomeTrackPage from "../../Components/HomeTrackPage/HomeTrackPage";
import HomeThreeAudience from "../../Components/HomeThreeAudience/HomeThreeAudience";
import StudendFooter from "../../Components/StudentFooter/StudentFooter";

const AboutPage = () => {
  const [activeIndex] = useState(0);

  return (
    <div>
      <HomeTrackPage activeIndex={activeIndex} />
      <HomeThreeAudience />
      <StudendFooter />
    </div>
  );
};

export default AboutPage;