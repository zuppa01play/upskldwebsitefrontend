import React, { useEffect, useRef, useState } from "react";
import "./HomeAiPage.css";
import { openBookingModal, SELECT_BUSINESS_EVENT } from "../Openbookingmodal";




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
  retail: (
    <svg {...iconProps}>
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  ),
  food: (
    <svg {...iconProps}>
      <path d="M4 17h16" />
      <path d="M5 17a7 7 0 0 1 14 0" />
      <path d="M12 8V6" />
      <path d="M3 20h18" />
    </svg>
  ),
  fashion: (
    <svg {...iconProps}>
      <path d="M10 4l1.4 3.6L15 9l-3.6 1.4L10 14l-1.4-3.6L5 9l3.6-1.4L10 4z" />
      <path d="M17 13l.8 2.2L20 16l-2.2.8L17 19l-.8-2.2L14 16l2.2-.8L17 13z" />
    </svg>
  ),
  services: (
    <svg {...iconProps}>
      <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2-2 2.5-2.5z" />
    </svg>
  ),
  manufacturing: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  online: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  other: (
    <svg {...iconProps}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M4 13h16" />
    </svg>
  ),
};

const impactIcons = {
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
  interviews: (
    <svg {...iconProps}>
      <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M19 9h1a1 1 0 0 1 1 1v7l-3-2h-4" />
    </svg>
  ),
  study: (
    <svg {...iconProps}>
      <path d="M12 4L2 9l10 5 10-5-10-5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  portfolio: (
    <svg {...iconProps}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  ),
  pay: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8h6M9 11h6M10 8c3 0 4 1.5 4 3s-1.5 3-4 3l4 3" />
    </svg>
  ),
  stream: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  community: (
    <svg {...iconProps}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16 14.2A5 5 0 0 1 21 19" />
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

/* ---------- Content ---------- */

/* ---- Working Professionals: Impact explorer data ---- */
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

/* ---- Students: Impact explorer data ---- */
const studentMetrics = [
  {
    id: "interviews",
    name: "Stand out in interviews",
    short: "[X]%",
    value: "[X]%",
    unit: "more confident",
    taught: "AI for job readiness",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 33 },
      { label: "[After]", value: "[After]", fill: 85 },
    ],
    text: "Practice mock interviews and sharpen answers with an AI coach.",
    source: "[Source needed]",
  },
  {
    id: "study",
    name: "Study smarter",
    short: "[X]%",
    value: "[X]%",
    unit: "faster revision",
    taught: "AI basics for students",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 87 },
      { label: "[After]", value: "[After]", fill: 40 },
    ],
    text: "Summaries, flashcards and explanations on demand.",
    source: "[Source needed]",
  },
  {
    id: "portfolio",
    name: "Build a portfolio",
    short: "[X]%",
    value: "[X]%",
    unit: "more projects shipped",
    taught: "Data analytics & prompting",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 28 },
      { label: "[After]", value: "[After]", fill: 80 },
    ],
    text: "Turn class assignments into portfolio pieces employers can see.",
    source: "[Source needed]",
  },
  {
    id: "pay",
    name: "Higher starting pay",
    short: "[X]%",
    value: "[X]%",
    unit: "salary premium",
    taught: "Bootcamp + placement",
    bars: [
      { label: "[Before]", value: "[Before]", fill: 55 },
      { label: "[After]", value: "[After]", fill: 80 },
    ],
    text: "Candidates with AI skills often negotiate from a stronger position.",
    source: "[Source needed]",
  },
  {
    id: "stream",
    name: "Any stream welcome",
    short: "24+ Lakh",
    value: "24+ Lakh",
    unit: "arts & science graduates",
    taught: "AI basics for students",
    bars: [
      { label: "Technical roles only", value: "Few", fill: 22 },
      { label: "With AI skills", value: "Many", fill: 90 },
    ],
    text: "You do not need to code. AI opens doors for every stream.",
    source: "[Source]",
  },
  {
    id: "community",
    name: "Learn in a community",
    short: "100+",
    value: "100+",
    unit: "students trained",
    taught: "AI for job readiness",
    bars: [
      { label: "Learning alone", value: "1×", fill: 22 },
      { label: "Learning together", value: "100+", fill: 88 },
    ],
    text: "Peers, mentors and entrepreneurs who share real opportunities.",
    source: "Upskld",
  },
];

/* header tab -> Impact explorer content (0 small business uses "By business type") */
const impactAudiences = {
  1: {
    id: "professionals",
    eyebrow: "The benefit · Impact explorer",
    title: "What AI changes in your working week — in numbers.",
    subtitle: "Pick an area to see the before-and-after. Every figure comes from published research.",
    metrics: professionalMetrics,
  },
  2: {
    id: "students",
    eyebrow: "The benefit · Impact explorer",
    title: "What AI changes for your career — in numbers.",
    subtitle: "Pick an area to see the before-and-after. Figures are placeholders until sourced.",
    metrics: studentMetrics,
  },
};

const businesses = [
  {
    id: "retail",
    label: "Retail shop",
    heading: "Run a smarter retail shop with AI.",
    description:
      "From stock and pricing to repeat customers, AI takes over the repetitive work so you can focus on the shop floor.",
    points: [
      "Track local pricing trends and competitor offers in minutes",
      "Send WhatsApp offers and festival greetings to regular customers",
      "Create posters and product captions without a designer",
    ],
    result: "+14.5%",
    resultLabel: "sales productivity with automation · Nucleus Research",
    startWith: "Sales automation",
  },
  {
    id: "food",
    label: "Food business",
    heading: "Fill more tables and orders with AI.",
    description:
      "Menus, offers and customer replies can run on autopilot, so your kitchen and counter stay your focus.",
    points: [
      "Design menu cards and daily-special posters with the right prompts",
      "Auto-reply to order and booking enquiries on WhatsApp",
      "Plan a month of food posts and festival campaigns",
    ],
    result: "+450%",
    resultLabel: "engagement per post when posting consistently · Buffer 2025",
    startWith: "Marketing automation",
  },
  {
    id: "fashion",
    label: "Apparel & fashion",
    heading: "Style, sell and scale your fashion brand with AI.",
    description:
      "Create catalogue-ready content and keep buyers engaged between collections without a big team.",
    points: [
      "Write product descriptions and captions for every new drop",
      "Generate lookbook ideas and campaign creatives",
      "Follow up with buyers and enquiries automatically",
    ],
    result: "−12.2%",
    resultLabel: "marketing costs with automation · Nucleus Research",
    startWith: "Marketing automation",
  },
  {
    id: "services",
    label: "Services",
    heading: "Win more clients and save admin time with AI.",
    description:
      "Quotes, follow-ups and reminders are repeatable, which makes them perfect for AI and automation.",
    points: [
      "Capture leads from calls, WhatsApp and social media in one place",
      "Send automatic follow-ups and appointment reminders",
      "Draft proposals, quotes and invoices in minutes",
    ],
    result: "+451%",
    resultLabel: "more qualified leads with automated follow-ups · Annuitas Group",
    startWith: "Sales automation",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    heading: "Bring AI into your manufacturing business.",
    description:
      "Handle dealer enquiries, quotations and payment follow-ups faster, so production keeps the spotlight.",
    points: [
      "Reply to dealer and buyer enquiries within minutes",
      "Automate quotations, invoices and payment reminders",
      "Summarise orders, costs and reports without spreadsheets",
    ],
    result: "+600%",
    resultLabel: "more likely to qualify a lead with fast replies · HBR",
    startWith: "Finance automation",
  },
  {
    id: "online",
    label: "Online seller",
    heading: "Sell more online with AI doing the heavy lifting.",
    description:
      "Listings, creatives and customer messages scale with automation, even if you are a one-person store.",
    points: [
      "Write product titles, listings and ad copy at scale",
      "Trigger automated email and WhatsApp flows for abandoned carts",
      "Reply to customer questions instantly, any time of day",
    ],
    result: "37%",
    resultLabel: "of email sales from automated messages · Omnisend 2025",
    startWith: "Sales automation",
  },
  {
    id: "other",
    label: "Other",
    heading: "Whatever you run, AI can fit in.",
    description:
      "Every business has repeated work in sales, marketing and accounts. We help you find yours and automate it.",
    points: [
      "Map where AI saves you the most time in your business",
      "Start with the basics, then build your own automation stack",
      "Get guided help from entrepreneurs who have done it",
    ],
    result: "300+",
    resultLabel: "learners attended our free sessions · Upskld",
    startWith: "AI basics for your business",
  },
];

/* ---------- Count-up for the key result ---------- */

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const CountResult = ({ value }) => {
  // splits "+14.5%" into prefix "+", number 14.5, suffix "%"
  const match = value.match(/^([+−-]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const suffix = match ? match[3] : "";

  const [current, setCurrent] = useState(0);

  useEffect(() => {
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
      const p = Math.min((now - start) / 1000, 1);
      setCurrent(easeOutCubic(p) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 250);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span className="impac_ai_home_pg_result_value" aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {current.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
};

/* ---------- Page ---------- */

const BusinessTypeView = ({ instant }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(!!instant);
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);

  const active = businesses[activeIndex];

  // reveal the whole section the first time it scrolls into view
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
      { threshold: 0.15 }
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

  // hero chips (HomePage) -> open that business here and scroll to this section
  useEffect(() => {
    const onSelect = (e) => {
      const id = e.detail && e.detail.id;
      const index = businesses.findIndex((b) => b.id === id);
      if (index === -1) return;
      setActiveIndex(index);
      setInView(true);

      // keep the chosen tab visible when the tab strip scrolls sideways (phones)
      requestAnimationFrame(() => {
        const tab = tabRefs.current[index];
        const list = tab && tab.parentElement;
        if (list && list.scrollWidth > list.clientWidth) {
          const t = tab.getBoundingClientRect();
          const l = list.getBoundingClientRect();
          list.scrollLeft += t.left - l.left - (list.clientWidth - t.width) / 2;
        }
      });

      const el = document.getElementById("business-types");
      if (el) {
        const header = document.querySelector(".upskld_heade_pg_header");
        const offset = header ? header.offsetHeight : 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 10;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };
    window.addEventListener(SELECT_BUSINESS_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_BUSINESS_EVENT, onSelect);
  }, []);

  const selectTab = (index) => {
    setActiveIndex(index);
    const tab = tabRefs.current[index];
    // on phones/tablets the tab list scrolls sideways; keep the active tab centred
    if (tab && tab.scrollIntoView) {
      tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const handleKeyDown = (event, index) => {
    const last = businesses.length - 1;
    let next = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    selectTab(next);
    tabRefs.current[next] && tabRefs.current[next].focus();
  };

  return (
    <section
      id="business-types"
      ref={sectionRef}
      className={`impac_ai_home_pg_section ${inView ? "impac_ai_home_pg_in" : ""}`}
    >
      <div className="impac_ai_home_pg_container">
        {/* ---------- Header ---------- */}
        <div className="impac_ai_home_pg_head">
          <span className="impac_ai_home_pg_eyebrow">By business type</span>
          <h2 className="impac_ai_home_pg_title">See how AI fits a business like yours.</h2>
          <p className="impac_ai_home_pg_subtitle">
            Choose your kind of business to see where AI helps most, and which course to start with.
          </p>
        </div>

        {/* ---------- Card ---------- */}
        <div className="impac_ai_home_pg_card">
          {/* Sidebar */}
          <div className="impac_ai_home_pg_tabs" role="tablist" aria-label="Business type">
            {businesses.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`impac_ai_home_pg_tab_${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="impac_ai_home_pg_panel"
                  tabIndex={selected ? 0 : -1}
                  className={`impac_ai_home_pg_tab ${selected ? "impac_ai_home_pg_tab_active" : ""}`}
                  style={{ "--t": index }}
                  onClick={() => selectTab(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <span className="impac_ai_home_pg_tab_icon">{icons[item.id]}</span>
                  <span className="impac_ai_home_pg_tab_label">{item.label}</span>
                  <span className="impac_ai_home_pg_tab_num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail — re-keyed on every click so the fade + zoom replays */}
          <div
            className="impac_ai_home_pg_detail"
            id="impac_ai_home_pg_panel"
            role="tabpanel"
            aria-labelledby={`impac_ai_home_pg_tab_${active.id}`}
          >
            <div key={active.id} className="impac_ai_home_pg_panel">
              <div className="impac_ai_home_pg_panel_top impac_ai_home_pg_step" style={{ "--s": 0 }}>
                <span className="impac_ai_home_pg_panel_icon">{icons[active.id]}</span>
                <span className="impac_ai_home_pg_panel_count">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(businesses.length).padStart(2, "0")} ·{" "}
                  {active.label}
                </span>
              </div>

              <h3 className="impac_ai_home_pg_panel_heading impac_ai_home_pg_step" style={{ "--s": 1 }}>
                {active.heading}
              </h3>

              <p className="impac_ai_home_pg_panel_desc impac_ai_home_pg_step" style={{ "--s": 2 }}>
                {active.description}
              </p>

              <div className="impac_ai_home_pg_body">
                <div className="impac_ai_home_pg_helps">
                  <p className="impac_ai_home_pg_helps_label impac_ai_home_pg_step" style={{ "--s": 3 }}>
                    Where AI helps
                  </p>
                  <ul className="impac_ai_home_pg_points">
                    {active.points.map((point, i) => (
                      <li
                        key={point}
                        className="impac_ai_home_pg_point impac_ai_home_pg_step"
                        style={{ "--s": 4 + i }}
                      >
                        <span className="impac_ai_home_pg_point_num">{i + 1}</span>
                        <span className="impac_ai_home_pg_point_text">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="impac_ai_home_pg_result impac_ai_home_pg_step" style={{ "--s": 4 }}>
                  <p className="impac_ai_home_pg_result_label">Key result</p>
                  <CountResult value={active.result} />
                  <p className="impac_ai_home_pg_result_text">{active.resultLabel}</p>
                  <span className="impac_ai_home_pg_result_line" aria-hidden="true"></span>
                  <span className="impac_ai_home_pg_result_pill">Start with: {active.startWith}</span>
                </aside>
              </div>

              <div className="impac_ai_home_pg_actions impac_ai_home_pg_step" style={{ "--s": 7 }}>
                <button
                  type="button"
                  className="impac_ai_home_pg_btn_dark"
                  onClick={() => scrollToId("courses")}
                >
                  Learn this → Enroll
                </button>
                <button
                  type="button"
                  className="impac_ai_home_pg_btn_primary"
                  onClick={openBookingModal}
                >
                  Book a free session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= Impact explorer (Working Professionals) ================= */

const ImpactCount = ({ value }) => {
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
    return <span className="impac_ai_home_pg_x_big">{value}</span>;
  }

  return (
    <span className="impac_ai_home_pg_x_big" aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {current.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
};


const ImpactExplorer = ({ instant, data }) => {
  const metrics = data.metrics;
  const [activeIndex, setActiveIndex] = useState(0);

  const [inView, setInView] = useState(!!instant);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const active = metrics[activeIndex] || metrics[0];



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
      id="business-types"
      ref={sectionRef}
      className={`impac_ai_home_pg_x_section ${inView ? "impac_ai_home_pg_x_in" : ""}`}
    >
      <div className="impac_ai_home_pg_x_container">
        {/* ---------- Header ---------- */}
        <div className="impac_ai_home_pg_x_head">
          <span className="impac_ai_home_pg_x_eyebrow">{data.eyebrow}</span>
          <h2 className="impac_ai_home_pg_x_title">{data.title}</h2>
          <p className="impac_ai_home_pg_x_subtitle">{data.subtitle}</p>
        </div>

        {/* ---------- Explorer ---------- */}
        <div className="impac_ai_home_pg_x_card">
          {/* List */}
          <div className="impac_ai_home_pg_x_list" role="tablist" aria-label="Impact areas">
            {metrics.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  id={`impac_ai_home_pg_x_tab_${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="impac_ai_home_pg_x_panel"
                  tabIndex={selected ? 0 : -1}
                  className={`impac_ai_home_pg_x_item ${selected ? "impac_ai_home_pg_x_item_active" : ""}`}
                  style={{ "--t": index }}
                  onClick={() => selectItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <span className="impac_ai_home_pg_x_item_icon">{impactIcons[item.id]}</span>
                  <span className="impac_ai_home_pg_x_item_name">{item.name}</span>
                  <span className="impac_ai_home_pg_x_item_value">{item.short}</span>
                </button>
              );
            })}
          </div>

          {/* Detail — re-keyed on every click so the fade + zoom replays */}
          <div
            className="impac_ai_home_pg_x_detail"
            id="impac_ai_home_pg_x_panel"
            role="tabpanel"
            aria-labelledby={`impac_ai_home_pg_x_tab_${active.id}`}
          >
            <div key={active.id} className="impac_ai_home_pg_x_panel">
              <div className="impac_ai_home_pg_x_panel_head impac_ai_home_pg_x_step" style={{ "--s": 0 }}>
                <span className="impac_ai_home_pg_x_panel_label">{active.name}</span>
                <span className="impac_ai_home_pg_x_panel_pill">Taught in: {active.taught}</span>
              </div>

              <div className="impac_ai_home_pg_x_figure impac_ai_home_pg_x_step" style={{ "--s": 1 }}>
                <ImpactCount value={active.value} />
                <p className="impac_ai_home_pg_x_unit">{active.unit}</p>
              </div>

              <div className="impac_ai_home_pg_x_bars impac_ai_home_pg_x_step" style={{ "--s": 2 }}>
                {active.bars.map((bar, i) => (
                  <div key={bar.label} className="impac_ai_home_pg_x_bar_row">
                    <div className="impac_ai_home_pg_x_bar_top">
                      <span className="impac_ai_home_pg_x_bar_label">{bar.label}</span>
                      <span
                        className={`impac_ai_home_pg_x_bar_value ${
                          i === 1 ? "impac_ai_home_pg_x_bar_value_accent" : ""
                        }`}
                      >
                        {bar.value}
                      </span>
                    </div>
                    <div className="impac_ai_home_pg_x_track">
                      <span
                        className={`impac_ai_home_pg_x_fill ${
                          i === 1 ? "impac_ai_home_pg_x_fill_accent" : ""
                        }`}
                        style={{ "--w": `${bar.fill}%`, "--b": i }}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="impac_ai_home_pg_x_text impac_ai_home_pg_x_step" style={{ "--s": 3 }}>
                {active.text}
              </p>

              <p className="impac_ai_home_pg_x_source impac_ai_home_pg_x_step" style={{ "--s": 4 }}>
                Source: {active.source}
              </p>

              <div className="impac_ai_home_pg_x_actions impac_ai_home_pg_x_step" style={{ "--s": 5 }}>
                <button
                  type="button"
                  className="impac_ai_home_pg_x_btn"
                  onClick={() => scrollToId("courses")}
                >
                  Learn this → Enroll
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="impac_ai_home_pg_x_note">
          Figures come from global studies and show typical results. Your results will depend on your
          business.
        </p>
      </div>
    </section>
  );
};



/* ---------- Header tab -> which view ----------
   0 Small Business        -> "By business type"
   1 Working Professionals -> "Impact explorer" (working week)
   2 Students              -> "Impact explorer" (career) */
const HomeAiPage = ({ activeIndex = 0 }) => {
  const data = impactAudiences[activeIndex]; // undefined for Small Business
  const view = data ? data.id : "business";

  // after the first tab change the new view appears already visible (no scroll-reveal wait)
  const prevView = useRef(view);
  const switchedRef = useRef(false);
  if (prevView.current !== view) {
    prevView.current = view;
    switchedRef.current = true;
  }

  return (
    <div key={view} className={switchedRef.current ? "impac_ai_home_pg_swap" : undefined}>
      {data ? (
        <ImpactExplorer instant={switchedRef.current} data={data} />
      ) : (
        <BusinessTypeView instant={switchedRef.current} />
      )}
    </div>
  );
};

export default HomeAiPage;