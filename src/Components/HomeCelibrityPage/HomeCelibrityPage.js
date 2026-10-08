import React, { useEffect, useRef, useState } from "react";
import "./HomeCelibrityPage.css";

const STATS = [
  { target: 300, suffix: "+", label: "Learners attended free sessions" },
  { target: 100, suffix: "+", label: "Students trained on job-ready AI skills" },
  { target: 200, suffix: "+", label: "Working Professionals trained across functions" },
];

const DURATION = 1500; // ms

const HomeCelibrityPage = () => {
  const [counts, setCounts] = useState(() => STATS.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    let rafId = 0;
    let started = false;

    const finish = () => setCounts(STATS.map((s) => s.target));

    const run = () => {
      if (started) return;
      started = true;

      const reduceMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        finish();
        return;
      }

      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        setCounts(STATS.map((s) => Math.round(s.target * eased)));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      finish();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="celb_home_pg_wrapper" ref={sectionRef}>
      <div className="celb_home_pg_container">
        <p className="celb_home_pg_tagline">TRUST &amp; CREDIBILITY</p>

        <h2 className="celb_home_pg_heading">
          Trusted by people who take AI{" "}
          <span className="celb_home_pg_heading_italic">seriously.</span>
        </h2>

        <p className="celb_home_pg_subtext">
          We're not going to invent numbers to make this page look bigger than
          it is. As real evidence becomes available, it replaces every
          placeholder below.
        </p>

        <div className="celb_home_pg_stats_row">
          {STATS.map((stat, index) => {
            const done = counts[index] >= stat.target;
            return (
              <div className="celb_home_pg_stat_card" key={stat.label}>
                <p className="celb_home_pg_stat_number">
                  {counts[index].toLocaleString()}
                  <span
                    className="celb_home_pg_stat_suffix"
                    style={{ visibility: done ? "visible" : "hidden" }}
                  >
                    {stat.suffix}
                  </span>
                </p>
                <p className="celb_home_pg_stat_label">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <p className="celb_home_pg_footnote">
          AI is used differently by a marketing team in Mumbai, a finance
          department in Dubai, and a university placement cell in Bengaluru.
          Evidence from professionals, leaders, researchers and institutions
          across that range shows the approach holds up across real, different
          jobs — not just one type of learner.
        </p>
      </div>
    </section>
  );
};

export default HomeCelibrityPage;