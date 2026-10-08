import React, { useRef, useEffect } from 'react';
import "./HomeAiReplace.css";

// Put your two cut-out images in the same folder (or change these paths)
import aiHand from "./aihand.png";
import humanHand from "./humanhand.png";

const clamp = (v) => Math.min(1, Math.max(0, v));
// ramp(p, a, b): 0 before a, 1 after b, smooth in between
const ramp = (p, a, b) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const HomeAiReplace = () => {
  const wrapRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;

    const setVars = (p) => {
      const s = section.style;
      s.setProperty("--ai", ramp(p, 0.0, 0.2));        // 1. AI hand fades in
      s.setProperty("--human", ramp(p, 0.22, 0.45));   // 2. human hand comes in
      const sp = ramp(p, 0.4, 0.5) * (1 - 0.4 * ramp(p, 0.55, 0.7));
      s.setProperty("--spark", sp);                    //    glow between fingertips
      s.setProperty("--blur", ramp(p, 0.6, 0.8));      // 3. background blur
      s.setProperty("--c1", ramp(p, 0.76, 0.88));      // 4. heading
      s.setProperty("--c2", ramp(p, 0.84, 0.96));      //    paragraph
    };

    // Reduced motion: show the final state, no scroll animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVars(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const distance = rect.height - vh;                 // pinned scroll distance
      // starts when the section is half visible, ends when it unpins
      const p = clamp((vh * 0.5 - rect.top) / (distance + vh * 0.5));
      setVars(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="impac_replace_ai_pg_wrap" ref={wrapRef}>
      <section className="impac_replace_ai_pg_section" ref={sectionRef}>
        {/* Hands scene (hidden on mobile) */}
        <div className="impac_replace_ai_pg_scene" aria-hidden="true">
          <div className="impac_replace_ai_pg_layer">
            <img className="impac_replace_ai_pg_hand impac_replace_ai_pg_ai_hand" src={aiHand} alt="" />
            <img className="impac_replace_ai_pg_hand impac_replace_ai_pg_human_hand" src={humanHand} alt="" />
            <span className="impac_replace_ai_pg_spark" />
          </div>
          <div className="impac_replace_ai_pg_veil" />
        </div>

        {/* Content */}
        <div className="impac_replace_ai_pg_content">
          <h2 className="impac_replace_ai_pg_heading">
           The future of work
should not belong
only to the
technical.
          </h2>
          <p className="impac_replace_ai_pg_text">
           UpSkld makes AI practical, approachable, and relevant for people
who never saw themselves as part of the technology
conversation.
          </p>
          <p className="impac_replace_ai_pg_text">🪢Students become more confident.</p>
          <p className="impac_replace_ai_pg_text">🪢Enterprises become more capable.</p>
          <p className="impac_replace_ai_pg_text">🪢Universities become more future-ready.</p>
        </div>
      </section>
    </div>
  );
};

export default HomeAiReplace;