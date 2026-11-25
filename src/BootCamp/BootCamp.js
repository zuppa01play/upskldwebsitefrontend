

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useRazorpay from "../hooks/useRazorpay";
import "./BootCamp.css";
import RajadhriImage from "./Rajashri.jpg";

// localhost-la irundha local backend, production-la same domain (/api)
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:4002" : "");

const SITE_URL = "https://upskldai.com";
const PAGE_URL = `${SITE_URL}/bootcamp`;
// Backend-la BOOTCAMP_PRICE_INR (default 99)-oda SAME aaganum, illana payment verify fail aagum
const BOOTCAMP_PRICE = 99;
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

const EVENT_SCHEMA = {
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
};

// value = DB-la save aagura value, label = screen-la kaatturadhu
const CATEGORY_OPTIONS = [
  { value: "Student", label: "Student" },
  { value: "Company", label: "Working at a company" },
  { value: "Business", label: "Business owner" },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  category: "",
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
  category: Yup.string()
    .oneOf(
      CATEGORY_OPTIONS.map((o) => o.value),
      "Please select one"
    )
    .required("Please select one"),
  college: Yup.string()
    .trim()
    .min(3, "Please enter a valid company, business or college name")
    .required("Please enter your company, business or college name"),
  consent: Yup.boolean().oneOf([true], "Please accept to continue"),
});


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


const BootCamp = () => {
  const { pay, loading: payLoading } = useRazorpay();
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

    // Step 1: Validate form
    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((item) => {
        if (item.path && !newErrors[item.path]) newErrors[item.path] = item.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      category: formData.category,
      college: formData.college.trim(),
    };

    // Step 2: Razorpay-ku MUNNADI database-la save (payment: false = "Not paid")
    setIsSubmitting(true);
    let registrationId;
    try {
      const res = await axios.post(`${API_BASE}/api/bootcamp-register`, payload);
      registrationId = res.data.id;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not save your details. Please try again."
      );
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);

    // Step 3: Razorpay — payment success aana apram dhaan payment: true
    pay({
      amount: BOOTCAMP_PRICE,
      description: "AI Bootcamp Seat",
      prefill: {
        name: payload.fullName,
        email: payload.email,
        contact: payload.phone,
      },
      notes: {
        college: payload.college,
        category: payload.category,
        type: "bootcamp",
        registrationId,
      },
      onSuccess: async (paymentData) => {
        setIsSubmitting(true);
        try {
          await axios.post(`${API_BASE}/api/bootcamp-register/confirm`, {
            id: registrationId,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_signature: paymentData.razorpay_signature,
          });
          setSubmittedEmail(payload.email);
          setIsSubmitted(true);
          setFormData(initialForm);
        } catch (error) {
          // Payment ayiduchu, aana confirm fail -> user support-ku payment id sollalaam
          toast.error(
            `${
              error.response?.data?.message || "Confirmation failed."
            } Your payment is safe. Please contact support with payment ID: ${
              paymentData.razorpay_payment_id
            }`,
            { autoClose: 12000 }
          );
        } finally {
          setIsSubmitting(false);
        }
      },
      onFailure: (err) => {
        // Payment cancel/fail -> record "Not paid" nu appadiye irukkum, user thirumba try pannalaam
        if (err?.message !== "Payment cancelled") {
          toast.error(err?.description || err?.message || "Payment failed. Please try again.");
        }
      },
    });
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
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:url" content={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(EVENT_SCHEMA)}</script>
      </Helmet>

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
              <br />
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
                        required
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
                        required
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
                        required
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
                      <label className="bootcamp_pg_label" htmlFor="category">
                        I am a
                      </label>
                      <select
                        className={getInputClass("category")}
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      >
                        <option value="">Select one</option>
                        {CATEGORY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <span className="bootcamp_pg_error">{errors.category}</span>
                      )}
                    </div>

                    <div className="bootcamp_pg_field">
                      <label className="bootcamp_pg_label" htmlFor="college">
                        College / company / business name
                      </label>
                      <input
                        className={getInputClass("college")}
                        type="text"
                        id="college"
                        name="college"
                        autoComplete="organization"
                        placeholder="Enter your college, company or business name"
                        required
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
                          required
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
                      disabled={isSubmitting || payLoading}
                    >
                      {payLoading
                        ? "Opening payment..."
                        : isSubmitting
                        ? "Please wait..."
                        : `Reserve my seat — ₹${BOOTCAMP_PRICE}`}
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
  <div className="row align-items-center g-4 g-lg-5">
    {/* Photo: mobile la mela, desktop la right side */}
    <div className="col-12 col-lg-5 order-1 order-lg-2 d-flex justify-content-center">
      <img
        src={RajadhriImage}
        alt="Mrs. Rajashri Sai, Co-Founder of Upskld AI"
        className="img-fluid rounded-4 shadow bootcamp_pg_mentor_image"
        loading="lazy"
        width="400"
        height="480"
      />
    </div>

    {/* Details */}
    <div className="col-12 col-lg-7 order-2 order-lg-1">
      <h3 className="bootcamp_pg_mentor_name">{TRAINER}</h3>
      <br/>
      <span className="bootcamp_pg_mentor_role">Co-Founder, Upskld AI</span>

      <ul
        className="bootcamp_pg_mentor_tags mt-3 mb-4"
        aria-label="Areas of expertise"
      >
        {mentorTags.map((tag) => (
          <li key={tag} className="bootcamp_pg_mentor_tag">
            {tag}
          </li>
        ))}
      </ul>

      <p className="bootcamp_pg_mentor_text">
       <b> Is</b> a serial entrepreneur and business leader with over a decade of
        experience building technology-driven ventures. As Founder of UPSKLD,
        she leads an AI capacity-development platform for the non-technical
        segment, offering online courses, bootcamps, and institutional
        partnerships.
      </p>
      <hr/>
      <p className="bootcamp_pg_mentor_text">
      <b>  Her</b> entrepreneurial journey spans drone technology, operational
        intelligence, and social impact. She also serves as an Independent
        Director at Autoline Industries Ltd. and leads the Impactree
        Foundation, supporting over 1,000 rural women entrepreneurs across
        India.
      </p>
        <hr/>
      <p className="bootcamp_pg_mentor_text">
        <b>She</b> has been recognised by the President of India as one of the Top 10
        Women Entrepreneurs Transforming India and has spoken at the United
        Nations, the World Economic Forum, and the G20.
      </p>
        <hr/>
      <p className="bootcamp_pg_mentor_text mb-0">
        <b>In</b> every UPSKLD course, she brings practical, boardroom-to-ground
        experience to help non-technical professionals learn and apply AI with
        confidence.
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