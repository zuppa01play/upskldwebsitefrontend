import React, { useEffect, useRef, useState } from "react";
import "./Homeupskldjourney.css";

/* ---------- Icons ---------- */

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const icons = {
  sales: (
    <svg {...iconProps}>
      <rect x="4" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="12" rx="1" />
      <rect x="16" y="4" width="4" height="16" rx="1" />
    </svg>
  ),
  marketing: (
    <svg {...iconProps}>
      <path d="M4 10v4l10 4V6L4 10z" />
      <path d="M14 9a4 4 0 0 1 0 6" />
      <path d="M7 15l1 5h3l-1-4" />
    </svg>
  ),
  content: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-8 9" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  replies: (
    <svg {...iconProps}>
      <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />
    </svg>
  ),
  leads: (
    <svg {...iconProps}>
      <circle cx="12" cy="9" r="3" />
      <circle cx="5.5" cy="11" r="2" />
      <circle cx="18.5" cy="11" r="2" />
      <path d="M7 19a5 5 0 0 1 10 0" />
    </svg>
  ),
  finance: (
    <svg {...iconProps}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 9.5v.01M17.5 14.5v.01" />
    </svg>
  ),
  /* working professionals */
  hours: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  focus: (
    <svg {...iconProps}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M3 13h18" />
    </svg>
  ),
  reports: (
    <svg {...iconProps}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M10 17v-3M13 17v-5M16 17v-2" />
    </svg>
  ),
  analysis: (
    <svg {...iconProps}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  ),
  career: (
    <svg {...iconProps}>
      <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5" />
      <path d="M12 15l-3-3c1-4 4-7 10-8 0 6-3 9-7 11z" />
      <circle cx="15" cy="9" r="1.2" />
    </svg>
  ),
  workflows: (
    <svg {...iconProps}>
      <path d="M20 7a8 8 0 0 0-14-2L4 7" />
      <path d="M4 3v4h4" />
      <path d="M4 17a8 8 0 0 0 14 2l2-2" />
      <path d="M20 21v-4h-4" />
    </svg>
  ),
};

/* ---------- Content ----------
   Each bar: label, value (text shown at right), fill (0-100, width of the bar).
   Fills are proportional to the figures, except the finance placeholders. */

const smallBusinessMetrics = [
  {
    id: "sales",
    name: "Sales automation",
    short: "+14.5%",
    value: "+14.5%",
    unit: "sales productivity",
    taught: "Sales automation",
    bars: [
      { label: "Without automation", value: "Baseline", fill: 50 },
      { label: "With marketing automation", value: "+14.5%", fill: 57.3 },
    ],
    text:
      "Reps and owners spend less time on busywork and more time talking to buyers. Indian sales reps spend only about 27% of their week actually selling.",
    source: "Nucleus Research (via Salesforce); Salesforce State of Sales India 2023",
  },
  {
    id: "marketing",
    name: "Marketing automation",
    short: "−12.2%",
    value: "−12.2%",
    unit: "marketing costs",
    taught: "Marketing automation",
    bars: [
      { label: "Before", value: "100%", fill: 100 },
      { label: "After (lower is better)", value: "87.8%", fill: 87.8 },
    ],
    text:
      "Scheduling, captions and creatives get done in minutes. Marketers using automation report saving roughly 13 hours a week.",
    source: "Nucleus Research; ActiveCampaign × Talker Research 2025",
  },
  {
    id: "content",
    name: "Content creation & post automation",
    short: "+450%",
    value: "+450%",
    unit: "more engagement per post",
    taught: "Marketing automation",
    bars: [
      { label: "Posting now and then", value: "1×", fill: 18 },
      { label: "Posting consistently (20+ of 26 weeks)", value: "5.5×", fill: 100 },
    ],
    text: "Consistency beats talent. AI makes it possible to post every week without burning out.",
    source: "Buffer study of 100,000+ accounts, 2025",
  },
  {
    id: "email",
    name: "Email & WhatsApp automation",
    short: "37%",
    value: "37%",
    unit: "of email sales from automated messages",
    taught: "Sales automation",
    bars: [
      { label: "Share of emails sent", value: "2%", fill: 5.4 },
      { label: "Share of email sales", value: "37%", fill: 100 },
    ],
    text:
      "A tiny share of automated messages drives over a third of email revenue — welcome series, reminders and win-backs.",
    source: "Omnisend Ecommerce Marketing Report 2025",
  },
  {
    id: "replies",
    name: "Fast replies to customers",
    short: "+600%",
    value: "+600%",
    unit: "more likely to qualify a lead",
    taught: "Sales automation",
    bars: [
      { label: "Reply after an hour+", value: "1×", fill: 14 },
      { label: "Reply within an hour", value: "7×", fill: 100 },
    ],
    text:
      "Speed wins. Instant AI-assisted replies keep leads warm while you are busy serving other customers.",
    source: "Harvard Business Review, “The Short Life of Online Sales Leads”",
  },
  {
    id: "leads",
    name: "Lead nurturing",
    short: "+451%",
    value: "+451%",
    unit: "more qualified leads",
    taught: "Sales automation",
    bars: [
      { label: "No nurturing", value: "1×", fill: 18 },
      { label: "Automated nurturing", value: "5.5×", fill: 100 },
    ],
    text: "Most leads are not ready on day one. Automated follow-ups stay in touch until they are.",
    source: "Annuitas Group (via Salesforce)",
  },
  {
    id: "finance",
    name: "Finance & invoicing",
    short: "₹[X]",
    value: "₹[X]",
    unit: "[saved per month]",
    taught: "Finance automation",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 70 },
      { label: "[After]", value: "[After]", fill: 28 },
    ],
    text:
      "Invoices, reminders and expense reports run on autopilot so cash flow stops depending on your memory.",
    source: "[Source needed]",
  },
];

const professionalMetrics = [
  {
    id: "hours",
    name: "Hours back every week",
    short: "32.5%",
    value: "32.5%",
    unit: "of the work week saved",
    taught: "Role-based AI",
    bars: [
      { label: "Without AI", value: "100%", fill: 100 },
      { label: "With AI (time spent)", value: "67.5%", fill: 67.5 },
    ],
    text: "Drafting, summarising and chasing updates shrink dramatically when AI handles the first pass.",
    source: "ActiveCampaign × Talker Research 2025",
  },
  {
    id: "focus",
    name: "More time for real work",
    short: "27%",
    value: "27%",
    unit: "selling time for Indian reps",
    taught: "Role-based AI",
    bars: [
      { label: "Time actually selling", value: "27%", fill: 27 },
      { label: "Goal with automation", value: "[X]%", fill: 55 },
    ],
    text: "Most of the week goes to admin. Automation hands that time back to real work.",
    source: "Salesforce State of Sales India 2023",
  },
  {
    id: "reports",
    name: "Reports in minutes",
    short: "[X]%",
    value: "[X]%",
    unit: "faster reporting",
    taught: "Role-based AI",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 80 },
      { label: "[After]", value: "[After]", fill: 25 },
    ],
    text: "Turn raw numbers into clean MIS reports without wrestling spreadsheets.",
    source: "[Source needed]",
  },
  {
    id: "analysis",
    name: "Analysis without code",
    short: "[X]%",
    value: "[X]%",
    unit: "faster analysis",
    taught: "Workflow automation",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 75 },
      { label: "[After]", value: "[After]", fill: 30 },
    ],
    text: "Ask questions of your data in plain language and get answers you can act on.",
    source: "[Source needed]",
  },
  {
    id: "career",
    name: "Career readiness",
    short: "[X]%",
    value: "[X]%",
    unit: "of employers expect AI skills",
    taught: "Agentic AI builder",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 40 },
      { label: "[After]", value: "[After]", fill: 85 },
    ],
    text: "AI fluency is becoming a baseline skill for the next role you want.",
    source: "[Source needed]",
  },
  {
    id: "workflows",
    name: "Repeatable workflows",
    short: "[X]%",
    value: "[X]%",
    unit: "less repeated effort",
    taught: "Workflow automation",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 85 },
      { label: "[After]", value: "[After]", fill: 18 },
    ],
    text: "Build a prompt or workflow once, reuse it every week.",
    source: "[Source needed]",
  },
];

/* Order MUST match navLinks in HeaderPage (0 small business · 1 professionals · 2 students).
   Students: details pending — until then it shows the small-business version. */
const audiences = [
  {
    id: "small",
    eyebrow: "The benefit · Impact explorer",
    title: "What AI changes in a small business — in numbers.",
    subtitle:
      "Pick a part of your business to see the before-and-after. Every figure comes from published research.",
    metrics: smallBusinessMetrics,
  },
  {
    id: "professionals",
    eyebrow: "The benefit · Impact explorer",
    title: "What AI changes in your working week — in numbers.",
    subtitle:
      "Pick an area to see the before-and-after. Every figure comes from published research.",
    metrics: professionalMetrics,
  },
];

/* ---------- Count-up for the big figure ---------- */

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const CountValue = ({ value }) => {
  // "+14.5%" -> prefix "+", number 14.5, suffix "%". Placeholders like "₹[X]" show as they are.
  const match = value.match(/^([+−-]?)(\d+(?:\.\d+)?)(.*)$/);
  const [current, setCurrent] = useState(0);

  const prefix = match ? match[1] : "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (!match) return undefined;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCurrent(target);
      return undefined;
    }

    let raf;
    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / 1100, 1);
      setCurrent(easeOutCubic(p) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) {
    return <span className="ai_small_busin_pg_big">{value}</span>;
  }

  return (
    <span className="ai_small_busin_pg_big" aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {current.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
};

/* ---------- Page ---------- */

const HomeUpSkldjourney = ({ activeIndex: audienceIndex = 0 }) => {
  const audience = audiences[audienceIndex] || audiences[0];
  const metrics = audience.metrics;
  const [activeIndex, setActiveIndex] = useState(0);

  // play the "title swap" animation only after the header tab really changed
  const prevAudience = useRef(audience.id);
  const switchedRef = useRef(false);
  if (prevAudience.current !== audience.id) {
    prevAudience.current = audience.id;
    switchedRef.current = true;
  }
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const active = metrics[activeIndex] || metrics[0];

  // header tab changed -> start again from the first item
  useEffect(() => {
    setActiveIndex(0);
  }, [audience.id]);

  // reveal the section the first time it scrolls into view
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
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector(".upskld_heade_pg_header");
    const offset = header ? header.offsetHeight : 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 10;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const selectItem = (index) => {
    setActiveIndex(index);
    const item = itemRefs.current[index];
    // on small screens the list scrolls sideways; keep the active item centred
    if (item && item.scrollIntoView) {
      item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const handleKeyDown = (event, index) => {
    const last = metrics.length - 1;
    let next = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    selectItem(next);
    if (itemRefs.current[next]) itemRefs.current[next].focus();
  };

  return (
    <section
      ref={sectionRef}
      className={`ai_small_busin_pg_section ${inView ? "ai_small_busin_pg_in" : ""}`}
    >
      <div className="ai_small_busin_pg_container">
        {/* ---------- Header ---------- */}
        <div key={audience.id} className={`ai_small_busin_pg_head ${switchedRef.current ? "ai_small_busin_pg_head_swap" : ""}`}>
          <span className="ai_small_busin_pg_eyebrow">{audience.eyebrow}</span>
          <h2 className="ai_small_busin_pg_title">{audience.title}</h2>
          <p className="ai_small_busin_pg_subtitle">{audience.subtitle}</p>
        </div>

        {/* ---------- Explorer ---------- */}
        <div className="ai_small_busin_pg_card">
          {/* List */}
          <div key={audience.id} className="ai_small_busin_pg_list" role="tablist" aria-label="Impact areas">
            {metrics.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  id={`ai_small_busin_pg_tab_${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="ai_small_busin_pg_panel"
                  tabIndex={selected ? 0 : -1}
                  className={`ai_small_busin_pg_item ${selected ? "ai_small_busin_pg_item_active" : ""}`}
                  style={{ "--t": index }}
                  onClick={() => selectItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <span className="ai_small_busin_pg_item_icon">{icons[item.id]}</span>
                  <span className="ai_small_busin_pg_item_name">{item.name}</span>
                  <span className="ai_small_busin_pg_item_value">{item.short}</span>
                </button>
              );
            })}
          </div>

          {/* Detail — re-keyed on every click so the fade + zoom replays */}
          <div
            className="ai_small_busin_pg_detail"
            id="ai_small_busin_pg_panel"
            role="tabpanel"
            aria-labelledby={`ai_small_busin_pg_tab_${active.id}`}
          >
            <div key={`${audience.id}-${active.id}`} className="ai_small_busin_pg_panel">
              <div className="ai_small_busin_pg_panel_head ai_small_busin_pg_step" style={{ "--s": 0 }}>
                <span className="ai_small_busin_pg_panel_label">{active.name}</span>
                <span className="ai_small_busin_pg_panel_pill">Taught in: {active.taught}</span>
              </div>

              <div className="ai_small_busin_pg_figure ai_small_busin_pg_step" style={{ "--s": 1 }}>
                <CountValue value={active.value} />
                <p className="ai_small_busin_pg_unit">{active.unit}</p>
              </div>

              <div className="ai_small_busin_pg_bars ai_small_busin_pg_step" style={{ "--s": 2 }}>
                {active.bars.map((bar, i) => (
                  <div key={bar.label} className="ai_small_busin_pg_bar_row">
                    <div className="ai_small_busin_pg_bar_top">
                      <span className="ai_small_busin_pg_bar_label">{bar.label}</span>
                      <span
                        className={`ai_small_busin_pg_bar_value ${
                          i === 1 ? "ai_small_busin_pg_bar_value_accent" : ""
                        }`}
                      >
                        {bar.value}
                      </span>
                    </div>
                    <div className="ai_small_busin_pg_track">
                      <span
                        className={`ai_small_busin_pg_fill ${
                          i === 1 ? "ai_small_busin_pg_fill_accent" : ""
                        }`}
                        style={{ "--w": `${bar.fill}%`, "--b": i }}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="ai_small_busin_pg_text ai_small_busin_pg_step" style={{ "--s": 3 }}>
                {active.text}
              </p>

              <p className="ai_small_busin_pg_source ai_small_busin_pg_step" style={{ "--s": 4 }}>
                Source: {active.source}
              </p>

              <div className="ai_small_busin_pg_actions ai_small_busin_pg_step" style={{ "--s": 5 }}>
                <button
                  type="button"
                  className="ai_small_busin_pg_btn"
                  onClick={() => scrollToId("courses")}
                >
                  Learn this → Enroll
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="ai_small_busin_pg_note">
          Figures come from global studies and show typical results. Your results will depend on your
          business.
        </p>
      </div>
    </section>
  );
};

export default HomeUpSkldjourney;