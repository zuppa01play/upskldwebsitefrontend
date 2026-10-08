import React, { useEffect, useRef, useState } from 'react';
import "./HomeUpSkldjourney.css";

// h = bar height on desktop (%), w = bar width on mobile (%)
const stages = [
  { no: "01", title: "AI User", sub: "Understanding GA", h: 25, w: 20,
    desc: "Knows which tool to open for a task, and gets it to do what you actually need" },
  { no: "02", title: "AI Task Builder", sub: "Prompt Optimization", h: 44, w: 40,
    desc: "Turns a one-off request into something reusable — no retyping the same prompt" },
  { no: "03", title: "AI Workflow Builder", sub: "Desktop Automation", h: 62, w: 60,
    desc: "Gets AI to hand off work between steps in your job, not just answer one question" },
  { no: "04", title: "AI Automator", sub: "Agentic AI builder", h: 82, w: 80,
    desc: "Sets it up once so it keeps running without you watching it" },
  { no: "05", title: "AI Decision Architect", sub: "AI Systems builder", h: 100, w: 100,
    desc: "Builds the system that makes the call, not just does the task" },
];

const HomeUpSkldjourney = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.15) setInView(true);
        else if (entry.intersectionRatio === 0) setInView(false);
      },
      { threshold: [0, 0.15] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`impact_journay_ho_pg_section ${inView ? "impact_journay_ho_pg_in" : ""}`}
    >
      <div className="impact_journay_ho_pg_container">
        <h2 className="impact_journay_ho_pg_title">
          The UpSkld journey: confidence grows in five stages.
        </h2>
        <span className="impact_journay_ho_pg_underline" />

        <div className="impact_journay_ho_pg_stages">
          {stages.map((s, i) => (
            <article
              className="impact_journay_ho_pg_stage"
              key={s.no}
              style={{ "--i": i, "--h": `${s.h}%`, "--w": `${s.w}%` }}
            >
              <div className="impact_journay_ho_pg_text">
                <span className="impact_journay_ho_pg_no">{s.no}</span>
                <h3 className="impact_journay_ho_pg_stage_title">{s.title}</h3>
                <p className="impact_journay_ho_pg_stage_sub">{s.sub}</p>
                <p className="impact_journay_ho_pg_stage_desc">{s.desc}</p>
              </div>
              <div className="impact_journay_ho_pg_bar_slot">
                <span className={`impact_journay_ho_pg_bar impact_journay_ho_pg_bar_${i + 1}`} />
              </div>
            </article>
          ))}
        </div>

        <div className="impact_journay_ho_pg_baseline" />
        {/* <p className="impact_journay_ho_pg_label">Independent work AI does for the student →</p> */}
      </div>

      <div className="impact_journay_ho_pg_footer">
        <p className="impact_journay_ho_pg_footer_text">
          Every student can be placed on a rung, and every rung has a defined next step.
        </p>
      </div>
    </section>
  );
};

export default HomeUpSkldjourney;