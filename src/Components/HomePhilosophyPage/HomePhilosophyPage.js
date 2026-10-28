import React, { useEffect, useRef, useState } from "react";
import "./HomePhilosophyPage.css";

const stats = [
  { end: 300, suffix: "+", label: "learners attended free sessions" },
  { end: 200, suffix: "+", label: "working professionals trained across functions" },
  { end: 100, suffix: "+", label: "students trained on job-ready AI skills" },
  { end: 8, suffix: "", label: "experts across AI, research, marketing and business" },
];

const DURATION = 2200; // ms for the count-up
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Counts from 0 to `end` once `run` becomes true.
const CountUp = ({ end, suffix, run, delay = 0 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return undefined;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setValue(end);
      return undefined;
    }

    let raf;
    let startTime = null;

    const tick = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / DURATION, 1);
      setValue(Math.round(easeOutExpo(progress) * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, end, delay]);

  return (
    <span className="impac_phiso_ho_pg_number" aria-label={`${end}${suffix}`}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
};

const HomePhilosophyPage = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // start the animation the first time the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`impac_phiso_ho_pg_section ${inView ? "impac_phiso_ho_pg_in" : ""}`}
    >
      <div className="impac_phiso_ho_pg_container">
        <h2 className="impac_phiso_ho_pg_heading">Trusted by people who take AI seriously</h2>

        <div className="impac_phiso_ho_pg_card">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="impac_phiso_ho_pg_stat"
              style={{ "--d": `${200 + index * 130}ms` }}
            >
              <span className="impac_phiso_ho_pg_bar" aria-hidden="true"></span>
              <div className="impac_phiso_ho_pg_text">
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  run={inView}
                  delay={200 + index * 130}
                />
                <p className="impac_phiso_ho_pg_label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePhilosophyPage;