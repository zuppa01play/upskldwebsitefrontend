import React, { useEffect, useRef, useState } from "react";
import "./HomeAiReplace.css";
import { openBookingModal } from "../Openbookingmodal";

/* ---------- Icons ---------- */

const ClockIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l3 3 5-6" />
  </svg>
);

/* ---------- Content ---------- */

const modes = {
  self: {
    label: "Self-paced",
    description: "Recorded lessons, templates and checklists — learn whenever your business is quiet.",
  },
  guided: {
    label: "Guided",
    description: "Live sessions with an Upskld trainer and a small group of business owners.",
  },
};

const smallBusinessCourses = [
  {
    id: "basics",
    tag: "Level 1 · Starter",
    featured: true,
    title: "AI basics for your business",
    duration: "1 Week",
    points: [
      "Basic prompting",
      "The 5 levels of AI, from AI User to Decision Architect",
      "Which tool to use for what in a business like yours",
    ],
    price: "499",
    open: false,
    k: -14,
  },
  {
    id: "sales",
    tag: "Track · Sales",
    title: "Sales automation",
    duration: "2 Week",
    points: [
      "Capture leads from WhatsApp, calls and social media",
      "Automatic follow-ups by email / WhatsApp",
      "[Module]",
    ],
    price: "4999",
    open: false,
    k: -28,
  },
  {
    id: "marketing",
    tag: "Track · Marketing",
    title: "Marketing automation",
    duration: "2 Week",
    points: ["Plan and schedule a month of posts", "Product captions and creatives", "[Module]"],
    price: "4999",
    open: false,
    k: -14,
  },
  {
    id: "finance",
    tag: "Track · Finance",
    title: "Finance automation",
    duration: "2 Week",
    points: ["Invoices and payment reminders", "Expense tracking and simple reports", "[Module]"],
    price: "4999",
    open: false,
    k: -22,
  },
  {
    id: "complete",
    tag: "Level 4 · Complete",
    title: "End-to-end automation",
    duration: "1 Month",
    points: [
      "Sales, marketing and finance connected",
      "Build your own automation stack",
      "Guided reviews of your setup",
    ],
    price: "9999",
    open: false,
    k: -34,
  },
];

const professionalCourses = [
  {
    id: "pro_basics",
    tag: "Level 1 · Starter",
    featured: true,
    title: "AI basics for work",
    duration: "1 hour",
    points: ["Basic prompting for everyday tasks", "The 5 levels of AI", "Which tool to use for what"],
    price: "[₹ PRICE]",
    open: false,
    k: -14,
  },
  {
    id: "pro_role",
    tag: "Level 2 · AI Task Builder",
    title: "Role-based AI: Sales, Finance, Marketing, Strategy",
    duration: "4–6 weeks · 2–3 hrs a week",
    points: [
      "Prospect research & outreach",
      "MIS reporting & cash-flow tracking",
      "Campaigns & competitive analysis",
    ],
    price: "[₹ PRICE]",
    open: false,
    k: -28,
  },
  {
    id: "pro_workflow",
    tag: "Level 3 · AI Workflow Builder",
    title: "Workflow automation",
    duration: "[Duration]",
    points: ["Reusable prompts", "Desktop automation", "[Module]"],
    price: "[₹ PRICE]",
    open: false,
    k: -14,
  },
  {
    id: "pro_agentic",
    tag: "Level 4 · AI Automator",
    title: "Agentic AI builder",
    duration: "[Duration]",
    points: ["Set it up once — it keeps running", "Build your own agents", "Certificate"],
    price: "[₹ PRICE]",
    open: false,
    k: -22,
  },
];

const studentCourses = [
  {
    id: "stu_basics",
    tag: "Level 1 · Starter",
    featured: true,
    title: "AI basics for students",
    duration: "1 hour",
    points: ["Basic prompting", "The 5 levels of AI", "Which tool to use for what"],
    price: "[₹ PRICE]",
    open: false,
    k: -14,
  },
  {
    id: "stu_job",
    tag: "Level 2",
    title: "AI for job readiness",
    duration: "4–6 weeks · 2–3 hrs/week",
    points: ["Interviews", "Reports & presentations", "Reusable prompts"],
    price: "[₹ PRICE]",
    open: false,
    k: -28,
  },
  {
    id: "stu_data",
    tag: "Level 3",
    title: "Data analytics & prompting",
    duration: "[Duration]",
    points: ["Plain-language analysis", "Prompting that avoids wrong information", "Certificate"],
    price: "[₹ PRICE]",
    open: false,
    k: -14,
  },
  {
    id: "stu_bootcamp",
    tag: "Level 4",
    title: "[Bootcamp + placement support]",
    duration: "[Duration]",
    points: ["[Module]", "[Module]", "[Placement support]"],
    price: "[₹ PRICE]",
    open: false,
    k: -22,
  },
];

/* Order MUST match navLinks in HeaderPage (0 small business · 1 professionals · 2 students) */
const audiences = [
  {
    id: "small",
    title: "Sales. Marketing. Finance. Start small, go end-to-end.",
    courses: smallBusinessCourses,
  },
  {
    id: "professionals",
    title: "From first prompt to fully automated workflows.",
    courses: professionalCourses,
  },
  {
    id: "students",
    title: "From curious to job-ready, step by step.",
    courses: studentCourses,
  },
];

/* decorative shapes for the parallax background.
   k = how far the shape travels as you scroll (px). Negative moves the other way. */
const shapes = [
  { type: "ring", top: "6%", left: "4%", size: 90, k: -120 },
  { type: "dot", top: "14%", left: "46%", size: 16, k: 90 },
  { type: "plus", top: "10%", left: "88%", size: 34, k: -70 },
  { type: "diamond", top: "34%", left: "93%", size: 26, k: 130 },
  { type: "ring_gold", top: "48%", left: "2%", size: 54, k: 110 },
  { type: "dot_gold", top: "62%", left: "52%", size: 14, k: -100 },
  { type: "plus", top: "76%", left: "7%", size: 28, k: 80 },
  { type: "ring", top: "82%", left: "90%", size: 110, k: -140 },
  { type: "diamond", top: "90%", left: "36%", size: 22, k: -60 },
];

/* ---------- Page ---------- */

const HomeAiReplace = ({ activeIndex = 0 }) => {
  const audience = audiences[activeIndex] || audiences[0];
  const courses = audience.courses;
  const [mode, setMode] = useState("self");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // parallax: write scroll progress (-1 … 1) into a CSS variable, no re-renders
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.style.setProperty("--p", "0");
      return undefined;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const center = rect.top + rect.height / 2;
      const progress = (vh / 2 - center) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      node.style.setProperty("--p", clamped.toFixed(4));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // reveal on first view
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
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const modeKeys = Object.keys(modes);

  return (
    <section
      ref={sectionRef}
      className={`home_course_ho_pg_section ${inView ? "home_course_ho_pg_in" : ""}`}
      id="courses"
    >
      {/* ---------- Parallax background ---------- */}
      <div className="home_course_ho_pg_bg" aria-hidden="true">
        <span className="home_course_ho_pg_blob home_course_ho_pg_blob_one"></span>
        <span className="home_course_ho_pg_blob home_course_ho_pg_blob_two"></span>
        <span className="home_course_ho_pg_blob home_course_ho_pg_blob_three"></span>
        <span className="home_course_ho_pg_dots"></span>
        <span className="home_course_ho_pg_lines"></span>
        {shapes.map((shape, i) => (
          <span
            key={i}
            className={`home_course_ho_pg_shape home_course_ho_pg_shape_${shape.type}`}
            style={{
              top: shape.top,
              left: shape.left,
              width: shape.size,
              height: shape.size,
              "--k": shape.k,
            }}
          >
            {shape.type === "plus" && (
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 4v16M4 12h16" />
              </svg>
            )}
          </span>
        ))}
      </div>

      <div className="home_course_ho_pg_container">
        {/* ---------- Header ---------- */}
        <div className="home_course_ho_pg_head">
          <span className="home_course_ho_pg_eyebrow">Courses we offer</span>
          <h2 key={audience.id} className="home_course_ho_pg_title home_course_ho_pg_title_swap">
            {audience.title}
          </h2>

          <div className="home_course_ho_pg_toggle" role="tablist" aria-label="Learning format">
            <span
              className="home_course_ho_pg_toggle_pill"
              style={{ transform: `translateX(${modeKeys.indexOf(mode) * 100}%)` }}
              aria-hidden="true"
            ></span>
            {modeKeys.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                className={`home_course_ho_pg_toggle_btn ${
                  mode === key ? "home_course_ho_pg_toggle_btn_active" : ""
                }`}
                onClick={() => setMode(key)}
              >
                {modes[key].label}
              </button>
            ))}
          </div>

          <p key={mode} className="home_course_ho_pg_desc">
            {modes[mode].description}
          </p>
        </div>

        {/* ---------- Cards ---------- */}
        <div
          key={`${audience.id}-${mode}`}
          className={`home_course_ho_pg_grid ${
            courses.length === 4 ? "home_course_ho_pg_grid_four" : ""
          }`}
        >
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="home_course_ho_pg_cell"
              style={{ "--i": index, "--k": course.k }}
            >
              <article
                className={`home_course_ho_pg_card ${
                  course.featured ? "home_course_ho_pg_card_featured" : ""
                }`}
              >
                {course.featured && <span className="home_course_ho_pg_badge">Start here</span>}

                <span className="home_course_ho_pg_tag">{course.tag}</span>

                <h3 className="home_course_ho_pg_card_title">{course.title}</h3>

                <p className="home_course_ho_pg_duration">
                  <ClockIcon />
                  <span>{course.duration}</span>
                </p>

                <ul className="home_course_ho_pg_points">
                  {course.points.map((point) => (
                    <li key={point} className="home_course_ho_pg_point">
                      <span className="home_course_ho_pg_point_icon">
                        <CheckIcon />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {!course.open && (
                  <span className="home_course_ho_pg_status">
                    <ClockIcon size={13} />
                    Enrollment Open
                  </span>
                )}

                <div className="home_course_ho_pg_footer">
            <span className="home_course_ho_pg_price">
  ₹ {course.price} + GST
</span>
                  <button
                    type="button"
                    className="home_course_ho_pg_enroll"
                    disabled={!course.open}
                    onClick={openBookingModal}
                  >
                    Enroll
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAiReplace;