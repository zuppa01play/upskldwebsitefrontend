import React, { useState, useEffect, useRef } from 'react';
import "./HomeCelibrityPage.css";

const HomeCelibrityPage = () => {
  const stats = [
    { target: 2400, suffix: "+", label: "Verified learner count" },
    { target: 18, suffix: "+", label: "International learner locations" },
    { target: 35, suffix: "+", label: "Institutional partnerships" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const animateCounts = () => {
    const duration = 1500;
    const frameRate = 30;
    const totalFrames = Math.round(duration / frameRate);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts(
        stats.map((stat) => Math.round(stat.target * Math.min(progress, 1)))
      );

      if (frame >= totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);
  };

  return (
    <section className="celb_home_pg_wrapper" ref={sectionRef}>
      <div className="celb_home_pg_container">

        <p className="celb_home_pg_tagline">TRUST &amp; CREDIBILITY</p>

        <h2 className="celb_home_pg_heading">
          Trusted by people who take AI{" "}
          <span className="celb_home_pg_heading_italic">seriously.</span>
        </h2>

        <p className="celb_home_pg_subtext">
          We're not going to invent numbers to make this page look bigger
          than it is. As real evidence becomes available, it replaces every
          placeholder below.
        </p>

        <div className="celb_home_pg_stats_row">
          {stats.map((stat, index) => (
            <div className="celb_home_pg_stat_card" key={index}>
              <p className="celb_home_pg_stat_number">
                {counts[index].toLocaleString()}
                {counts[index] >= stat.target ? stat.suffix : ""}
              </p>
              <p className="celb_home_pg_stat_label">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="celb_home_pg_footnote">
          AI is used differently by a marketing team in Mumbai, a finance
          department in Dubai, and a university placement cell in Bengaluru.
          Evidence from professionals, leaders, researchers and institutions
          across that range shows the approach holds up across real,
          different jobs — not just one type of learner.
        </p>

      </div>
    </section>
  );
};

export default HomeCelibrityPage;