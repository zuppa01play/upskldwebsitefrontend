import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useRazorpay from "../hooks/useRazorpay";
import "./BootCamp.css";

// localhost-la irundha local backend, production-la same domain (/api)
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:4002" : "");

const SITE_URL = "https://upskldai.com";
const PAGE_URL = `${SITE_URL}/bootcamp`;
const BOOTCAMP_PRICE = 1; // ₹499 — change as needed
const BOOTCAMP_DATE = "08 December 2026";
const TIMING = "10:00 AM - 11:30 AM IST";
const BOOTCAMP_DATE_ISO = "2026-12-08";
const TRAINER = "Mrs. Rajashree";
const VENUE = "Zoom Meeting";

const PAGE_TITLE = "AI Bootcamp for Non-Tech Learners | Upskld AI";
const PAGE_DESCRIPTION =
  "Join the Upskld AI bootcamp on 08 December 2026. Learn to use AI for real tasks, in plain language, live on Zoom. Register now to reserve your seat.";

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

const buildVsUse = [
  {
    id: 1,
    heading: "Most AI learning today",
    title: "Build AI",
    points: [
      "Teaches how AI models are built",
      "Needs coding and technical background",
    ],
    isActive: false,
  },
  {
    id: 2,
    heading: "What non-tech learners need",
    title: "Use AI",
    points: [
      "Confidence in technology application",
      "Task-first: create a report, analyse data, prepare for an interview, automate a workflow",
      "Practical, role-based and immediately applicable",
    ],
    isActive: true,
  },
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

  const { pay, loading: payLoading } = useRazorpay();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

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

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      college: formData.college.trim(),
    };

    // Step 1: open Razorpay — register only after successful payment
    pay({
      amount: BOOTCAMP_PRICE,
      description: "AI Bootcamp Seat",
      prefill: {
        name: payload.fullName,
        email: payload.email,
        contact: payload.phone,
      },
      notes: { college: payload.college, type: "bootcamp" },
      onSuccess: async (paymentData) => {
        setIsSubmitting(true);
        try {
          await axios.post(`${API_BASE}/api/bootcamp-register`, {
            ...payload,
            paymentId: paymentData.razorpay_payment_id,
            orderId: paymentData.razorpay_order_id,
          });
          setSubmittedEmail(payload.email);
          setIsSubmitted(true);
          setFormData(initialForm);
        } catch (error) {
          toast.error(error.response?.data?.message || "Registration failed. Please contact support.");
        } finally {
          setIsSubmitting(false);
        }
      },
      onFailure: (err) => {
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
      <div className="bootcamp_pg_container">
        <div className="bootcamp_pg_grid">
          {/* LEFT CONTENT */}
          <section className="bootcamp_pg_left">
            <span className="bootcamp_pg_badge">
              📅 Live on Zoom on {BOOTCAMP_DATE}
            </span>

            <h1 className="bootcamp_pg_title">
              AI basics for your work,
              <span className="bootcamp_pg_title_highlight">
                made for non-tech learners.
              </span>
            </h1>

            <p className="bootcamp_pg_intro">
              Learn to use AI for real tasks in plain language. No coding or
              technical background needed.
            </p>

            <ul className="bootcamp_pg_details" aria-label="Bootcamp details">
              {bootcampDetails.map((item) => (
                <li key={item.id} className="bootcamp_pg_details_item">
                  <span className="bootcamp_pg_details_label">{item.label}</span>
                  <span className="bootcamp_pg_details_value">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="bootcamp_pg_compare">
              {buildVsUse.map((item) => (
                <div
                  key={item.id}
                  className={
                    item.isActive
                      ? "bootcamp_pg_compare_card bootcamp_pg_compare_card_active"
                      : "bootcamp_pg_compare_card"
                  }
                >
                  <p className="bootcamp_pg_compare_heading">{item.heading}</p>
                  <h2 className="bootcamp_pg_compare_title">{item.title}</h2>
                  <ul className="bootcamp_pg_compare_list">
                    {item.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
                        Company / college name
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
                      disabled={isSubmitting || payLoading}
                    >
                      {payLoading ? "Opening payment..." : isSubmitting ? "Confirming..." : `Reserve my seat — ₹${BOOTCAMP_PRICE}`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>  
      </div>
    </main>
  );
};

export default BootCamp;