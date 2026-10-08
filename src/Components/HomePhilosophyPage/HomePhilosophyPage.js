import React, { useEffect, useRef, useState } from "react";
import "./HomePhilosophyPage.css";

/* ---------- Content (edit here) ---------- */
const mainStat = {
  label: "A massive graduate pipeline",
  end: 4,
  decimals: 0,
  prefix: "",
  suffix: "+",
  unit: "Crore",
  caption: "Students in higher education programmes",
};

const sideStats = [
  {
    end: 24,
    decimals: 0,
    prefix: "",
    suffix: "+",
    unit: "Lacs",
    caption: "Clear Arts and Science Degrees",
  },
  {
    end: 1,
    decimals: 1,
    prefix: "~",
    suffix: "",
    unit: "Lakh",
    caption: "Clear engineering exams",
  },
];

const cards = [
  {
    icon: "graduate",
    title: "Massive graduate pipeline",
    desc: [
      {
        text: "Millions of students enter the workforce every year, yet most are not engineers. Their ",
      },
      {
        text: "AI needs are practical, role-based and immediately applicable.",
        bold: true,
      },
    ],
  },
  {
    icon: "gear",
    title: "A mismatch in the market",
    desc: [
      {
        text: "Most AI learning ecosystems are built around technology creation.",
        bold: true,
      },
      {
        text: " Non-tech learners need confidence in technology application.",
      },
    ],
  },
  {
    icon: "bridge",
    title: "The missing bridge",
    desc: [
      { text: "Knowing an AI tool is not the same as using AI", bold: true },
      {
        text: " to create a report, analyze data, prepare for an interview or automate a workflow.",
      },
    ],
  },
];

/* ---------- Icons ---------- */
const iconProps = {
  viewBox: "0 0 24 24",
  width: "22",
  height: "22",
  fill: "none",
  stroke: "#7a22b8",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const icons = {
  graduate: (
    <svg {...iconProps}>
      <path d="M2 9l10-4 10 4-10 4-10-4z" />
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
      <path d="M22 9v5" />
    </svg>
  ),
  gear: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  ),
  bridge: (
    <svg {...iconProps}>
      <path d="M3 18h18" />
      <path d="M5 18V8M19 18V8" />
      <path d="M5 8c3 6 11 6 14 0" />
      <path d="M9 14v4M15 14v4" />
    </svg>
  ),
};

/* ---------- Helpers ---------- */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* true (once) when the element comes into the screen */
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

/* Fade-up animation when the block comes into the screen */
const Reveal = ({ as: Tag = "div", className = "", delay = 0, children }) => {
  const [ref, inView] = useInView(0.15);

  return (
    <Tag
      ref={ref}
      className={`impac_phiso_ho_pg_fade ${
        inView ? "impac_phiso_ho_pg_fade_show" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

/* Number count up animation (starts when the number is visible) */
const CountUp = ({ end, decimals = 0, duration = 1800, delay = 0 }) => {
  const [ref, inView] = useInView(0.3);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    if (prefersReducedMotion()) {
      setValue(end);
      return undefined;
    }

    let frame = null;
    let startTime = null;

    const step = (now) => {
      if (startTime === null) startTime = now;
      const t = Math.min((now - startTime) / duration, 1);
      setValue(end * easeOutCubic(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const timer = setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [inView, end, duration, delay]);

  return (
    <span ref={ref} className="impac_phiso_ho_pg_count">
      {Number(value.toFixed(decimals))}
    </span>
  );
};

/* ---------- Page ---------- */
const HomePhilosophyPage = () => {
  return (
    <section className="impac_phiso_ho_pg_section">
      <span className="impac_phiso_ho_pg_glow" aria-hidden="true"></span>
      <span className="impac_phiso_ho_pg_dots" aria-hidden="true"></span>

      <div className="impac_phiso_ho_pg_container">
        {/* Heading */}
        <header className="impac_phiso_ho_pg_header">
          <Reveal as="h2" className="impac_phiso_ho_pg_title">
            The overlooked AI gap is not just technical.
            <span className="impac_phiso_ho_pg_title_accent">It is human.</span>
          </Reveal>

          <Reveal className="impac_phiso_ho_pg_line_box" delay={150}>
            <span className="impac_phiso_ho_pg_line_bar"></span>
          </Reveal>

          <Reveal as="p" className="impac_phiso_ho_pg_subtitle" delay={250}>
            The people entering the workforce are often not lacking ambition —
            they are lacking a practical bridge.
          </Reveal>
        </header>

        {/* Numbers */}
        <div className="impac_phiso_ho_pg_stats">
          <Reveal className="impac_phiso_ho_pg_main_stat" delay={150}>
            <p className="impac_phiso_ho_pg_stat_label">{mainStat.label}</p>
            <p className="impac_phiso_ho_pg_main_value">
              {mainStat.prefix}
              <CountUp
                end={mainStat.end}
                decimals={mainStat.decimals}
                duration={1800}
              />
              {mainStat.suffix} {mainStat.unit}
            </p>
            <p className="impac_phiso_ho_pg_main_caption">{mainStat.caption}</p>
          </Reveal>

          <span className="impac_phiso_ho_pg_divider" aria-hidden="true"></span>

          <div className="impac_phiso_ho_pg_side_stats">
            {sideStats.map((stat, index) => (
              <Reveal
                key={stat.unit}
                className="impac_phiso_ho_pg_side_stat"
                delay={300 + index * 150}
              >
                <p className="impac_phiso_ho_pg_side_value">
                  {stat.prefix}
                  <CountUp
                    end={stat.end}
                    decimals={stat.decimals}
                    duration={1600}
                    delay={300 + index * 150}
                  />
                  {stat.suffix} {stat.unit}
                </p>
                <p className="impac_phiso_ho_pg_side_caption">{stat.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="impac_phiso_ho_pg_cards">
          {cards.map((card, index) => (
            <Reveal
              as="article"
              key={card.title}
              className="impac_phiso_ho_pg_card"
              delay={index * 150}
            >
              <span className="impac_phiso_ho_pg_card_icon">
                {icons[card.icon]}
              </span>
              <h3 className="impac_phiso_ho_pg_card_title">{card.title}</h3>
              <span className="impac_phiso_ho_pg_card_line"></span>
              <p className="impac_phiso_ho_pg_card_desc">
                {card.desc.map((part) =>
                  part.bold ? (
                    <strong key={part.text}>{part.text}</strong>
                  ) : (
                    <span key={part.text}>{part.text}</span>
                  )
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePhilosophyPage;