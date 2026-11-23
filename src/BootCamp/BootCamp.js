import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./BootCamp.css";

// localhost-la irundha local backend, production-la same domain (/api)
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:4002" : "");

const SITE_URL = "https://upskldai.com";
const PAGE_URL = `${SITE_URL}/bootcamp`;
const BOOTCAMP_DATE = "05 December 2026";
const TIMING = "10:00 AM - 11:30 AM IST";
const BOOTCAMP_DATE_ISO = "2026-12-05";
const TRAINER = "Mrs. Rajashri Sai";
const VENUE = "Zoom Meeting";

// 04 December 2026 12:00 AM IST-la irundhu slot closed
const SLOT_CLOSE_AT = new Date("2026-12-04T00:00:00+05:30");
const SLOT_CLOSE_DATE = "04 December 2026";

const PAGE_TITLE = "AI Bootcamp for Non-Tech Learners | Upskld AI";
const PAGE_DESCRIPTION =
  "Join the Upskld AI bootcamp on 05 December 2026. Learn to use AI for real tasks, in plain language, live on Zoom. Register now to reserve your seat.";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  college: "",
  consent: false,
};

const bootcampDetails = [
  { id: "date", label: "Date", value: BOOTCAMP_DATE },
  { id: "timing", label: "Timing", value: TIMING },
  { id: "mode", label: "Venue", value: VENUE },
  { id: "trainer", label: "Conducted by", value: TRAINER },
];

const learnPoints = [
  "Use AI to create reports and professional documents.",
  "Analyse data and extract useful insights.",
  "Prepare for interviews and improve career readiness.",
  "Automate repetitive tasks and workflows.",
  "Apply AI confidently in your professional and personal work.",
];

const mentorTags = [
  "Business Strategy",
  "Applied AI Adoption",
  "Workflow Automation",
  "Executive & Student Mentorship",
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Please enter your full name"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phone: Yup.string()
    .trim()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
    .required("Please enter your phone number"),
  college: Yup.string()
    .trim()
    .min(3, "Please enter a valid company or college name")
    .required("Please enter your company or college name"),
  consent: Yup.boolean().oneOf([true], "Please accept to continue"),
});

/* Small inline icons (no extra package needed) */
const Icon = ({ children }) => (
  <svg
    className="bootcamp_pg_icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const IconCalendar = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Icon>
);

const IconClock = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

const IconStar = () => (
  <Icon>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);

const IconCheck = () => (
  <Icon>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

const IconAward = () => (
  <Icon>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </Icon>
);

/* Page-specific title, description, canonical and Event schema.
   Restores the previous values when the user leaves this page, so the
   other routes keep the home page tags from index.html. */
const usePageSeo = () => {
  useEffect(() => {
    const prevTitle = document.title;

    const setMeta = (selector, attr, value) => {
      let el = document.head.querySelector(selector);
      let created = false;
      if (!el) {
        el = document.createElement(selector.startsWith("link") ? "link" : "meta");
        created = true;
        document.head.appendChild(el);
      }
      const prev = el.getAttribute(attr);
      el.setAttribute(attr, value);
      return { el, attr, prev, created };
    };

    document.title = PAGE_TITLE;

    const changes = [
      (() => {
        const s = setMeta('meta[name="description"]', "content", PAGE_DESCRIPTION);
        if (s.created) s.el.setAttribute("name", "description");
        return s;
      })(),
      (() => {
        const s = setMeta('link[rel="canonical"]', "href", PAGE_URL);
        if (s.created) s.el.setAttribute("rel", "canonical");
        return s;
      })(),
      (() => {
        const s = setMeta('meta[property="og:title"]', "content", PAGE_TITLE);
        if (s.created) s.el.setAttribute("property", "og:title");
        return s;
      })(),
      (() => {
        const s = setMeta('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
        if (s.created) s.el.setAttribute("property", "og:description");
        return s;
      })(),
      (() => {
        const s = setMeta('meta[property="og:url"]', "content", PAGE_URL);
        if (s.created) s.el.setAttribute("property", "og:url");
        return s;
      })(),
    ];

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Upskld AI Bootcamp: Learn to Use AI",
      description: PAGE_DESCRIPTION,
      startDate: BOOTCAMP_DATE_ISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation", url: PAGE_URL },
      organizer: { "@type": "Organization", name: "Upskld AI", url: SITE_URL },
      url: PAGE_URL,
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      changes.forEach(({ el, attr, prev, created }) => {
        if (created) el.remove();
        else if (prev !== null) el.setAttribute(attr, prev);
      });
      script.remove();
    };
  }, []);
};

const BootCamp = () => {
  usePageSeo();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // slot closed aana notice red-ah maaridum
  const isSlotClosed = new Date() >= SLOT_CLOSE_AT;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Field-ah vittu veliya vara pothu antha field mattum validate pannum
  const handleBlur = async (e) => {
    const { name } = e.target;
    try {
      await validationSchema.validateAt(name, formData);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((item) => {
        if (item.path && !newErrors[item.path]) {
          newErrors[item.path] = item.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
      };

      // data ellarukkum store aagum (slot closed aanalum)
      await axios.post(`${API_BASE}/api/bootcamp-register`, payload);

      // 04 December-la irundhu register pannavangalukku slot done toast + home page
      if (new Date() >= SLOT_CLOSE_AT) {
        setFormData(initialForm);
        toast.info(
          `Slots for the ${BOOTCAMP_DATE} bootcamp are already filled. We have saved your details and will keep you updated about the next batch.`,
          { autoClose: 6000 }
        );
        navigate("/");
        return;
      }

      setSubmittedEmail(payload.email);
      setIsSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterAgain = () => {
    setIsSubmitted(false);
    setSubmittedEmail("");
  };

  const getInputClass = (name) =>
    errors[name]
      ? "bootcamp_pg_input bootcamp_pg_input_error"
      : "bootcamp_pg_input";

  return (
    <main className="bootcamp_pg_wrapper">
      <div className="bootcamp_pg_container">
        <div className="bootcamp_pg_grid">
          {/* LEFT CONTENT */}
          <section className="bootcamp_pg_left">
            <span className="bootcamp_pg_badge">Upskld AI Bootcamp</span>

            <h1 className="bootcamp_pg_title">
              Don’t just learn about AI.
              <span className="bootcamp_pg_title_highlight">
                Learn how to use AI.
              </span>
            </h1>

            <p className="bootcamp_pg_intro">
              Practical AI skills for your everyday work, career and business.
              No coding or technical background needed.
            </p>

            <div className="bootcamp_pg_date_chip">
              <IconCalendar />
              <span>
                Live on Zoom on{" "}
                <strong className="bootcamp_pg_date_chip_date">
                  {BOOTCAMP_DATE}
                </strong>
              </span>
            </div>

            <div
              className={
                isSlotClosed
                  ? "bootcamp_pg_notice bootcamp_pg_notice_closed"
                  : "bootcamp_pg_notice"
              }
              role="status"
            >
              <IconClock />
              <p className="bootcamp_pg_notice_text">
                {isSlotClosed ? (
                  <>
                    <strong>Registration slots are closed.</strong> Submit your
                    details and we will keep you updated about the next batch.
                  </>
                ) : (
                  <>
                    <strong>Registration closes on {SLOT_CLOSE_DATE}.</strong>{" "}
                    Reserve your seat before the slots are over.
                  </>
                )}
              </p>
            </div>

            <ul className="bootcamp_pg_details" aria-label="Bootcamp details">
              {bootcampDetails.map((item) => (
                <li key={item.id} className="bootcamp_pg_details_item">
                  <span className="bootcamp_pg_details_label">{item.label}</span>
                  <span className="bootcamp_pg_details_value">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="bootcamp_pg_info_card">
              <h2 className="bootcamp_pg_info_title">
                <IconStar />
                What will you learn?
              </h2>
              <br/>
              <ul className="bootcamp_pg_learn_list">
                {learnPoints.map((point) => (
                  <li key={point} className="bootcamp_pg_learn_item">
                    <span className="bootcamp_pg_learn_tick">
                      <IconCheck />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* RIGHT REGISTER FORM */}
          <aside className="bootcamp_pg_right">
            <div className="bootcamp_pg_card">
              {isSubmitted ? (
                <div className="bootcamp_pg_success" role="status" aria-live="polite">
                  <div className="bootcamp_pg_success_icon">✓</div>
                  <h2 className="bootcamp_pg_success_title">
                    Thank you for registering!
                  </h2>
                  <p className="bootcamp_pg_success_text">
                    We have sent a confirmation mail to{" "}
                    <b className="bootcamp_pg_success_email">{submittedEmail}</b>.
                    Our team will reach out to you shortly with the next steps.
                  </p>
                  <button
                    type="button"
                    className="bootcamp_pg_btn"
                    onClick={handleRegisterAgain}
                  >
                    Register another student
                  </button>
                </div>
              ) : (
                <>
                  <div className="bootcamp_pg_head">
                    <span
                      className={
                        isSlotClosed
                          ? "bootcamp_pg_card_deadline bootcamp_pg_card_deadline_closed"
                          : "bootcamp_pg_card_deadline"
                      }
                    >
                      <IconClock />
                      {isSlotClosed
                        ? "Registration slots are closed"
                        : `Registration closes on ${SLOT_CLOSE_DATE}`}
                    </span>
                    <h2 className="bootcamp_pg_card_title">Register now</h2>
                    <p className="bootcamp_pg_subtitle">
                      Fill in your details to reserve your seat.
                    </p>
                  </div>

                  <form
                    className="bootcamp_pg_form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="bootcamp_pg_field">
                      <label className="bootcamp_pg_label" htmlFor="fullName">
                        Full name
                      </label>
                      <input
                        className={getInputClass("fullName")}
                        type="text"
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                      {errors.fullName && (
                        <span className="bootcamp_pg_error">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="bootcamp_pg_field">
                      <label className="bootcamp_pg_label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className={getInputClass("email")}
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <span className="bootcamp_pg_error">{errors.email}</span>
                      )}
                    </div>

                    <div className="bootcamp_pg_field">
                      <label className="bootcamp_pg_label" htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        className={getInputClass("phone")}
                        type="tel"
                        id="phone"
                        name="phone"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={10}
                        placeholder="10 digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <span className="bootcamp_pg_error">{errors.phone}</span>
                      )}
                    </div>

                    <div className="bootcamp_pg_field">
                      <label className="bootcamp_pg_label" htmlFor="college">
                        Company / college name / Business
                      </label>
                      <input
                        className={getInputClass("college")}
                        type="text"
                        id="college"
                        name="college"
                        autoComplete="organization"
                        placeholder="Enter your company or college name"
                        value={formData.college}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                      {errors.college && (
                        <span className="bootcamp_pg_error">{errors.college}</span>
                      )}
                    </div>

                    <div className="bootcamp_pg_field">
                      <label className="bootcamp_pg_consent" htmlFor="consent">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        <span>
                          I agree to be contacted by call, email or WhatsApp about
                          this bootcamp, and I have read the{" "}
                          <Link to="/privacypolicy" target="_blank">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <span className="bootcamp_pg_error">{errors.consent}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bootcamp_pg_btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Reserve my seat"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>

        {/* MENTOR */}
        <section
          className="bootcamp_pg_mentor"
          aria-labelledby="bootcamp_pg_mentor_heading"
        >
          <div className="bootcamp_pg_mentor_head">
            <span className="bootcamp_pg_badge">Instructor spotlight</span>
            <h2
              id="bootcamp_pg_mentor_heading"
              className="bootcamp_pg_mentor_title"
            >
              Meet your mentor
            </h2>
            <p className="bootcamp_pg_mentor_sub">
              Learn directly from leaders driving practical, non-technical AI
              transformation across industries.
            </p>
          </div>

          <article className="bootcamp_pg_mentor_card">
            <h3 className="bootcamp_pg_mentor_name">{TRAINER}</h3>
                 <br/>
            <span className="bootcamp_pg_mentor_role">Co-Founder, Upskld AI</span>

            <br/>

            <ul className="bootcamp_pg_mentor_tags" aria-label="Areas of expertise">
              {mentorTags.map((tag) => (
                <li key={tag} className="bootcamp_pg_mentor_tag">
                  {tag}
                </li>
              ))}
            </ul>
     <br/>
            <div className="bootcamp_pg_mentor_body">
              <p className="bootcamp_pg_mentor_text"> 
                As Co-Founder at <strong>Upskld AI</strong>, {TRAINER}  
                
                
                leads the
                mission to bridge the critical skill gap between rapidly
                advancing AI technologies and real-world application. Her focus
                is on empowering non-technical learners, working professionals,
                and entrepreneurs to leverage AI tools effortlessly in their
                daily workflows.
              </p>

              <div className="bootcamp_pg_mentor_note">
                <p className="bootcamp_pg_mentor_note_label">
                  <IconAward />
                  Industry engagement
                </p>
                <p className="bootcamp_pg_mentor_note_text">
                  {TRAINER} was among the trainers involved in a practical AI
                  training session at the{" "}
                  <strong>AICCI National Startup Summit 2026</strong>, engaging
                  more than 60 students. The session focused on practical AI
                  applications in manufacturing environments.
                </p>
              </div>

            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default BootCamp;