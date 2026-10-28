import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { BOOKING_EVENT } from "../Openbookingmodal";
import "./HomeCreerForm.css";

// .env la REACT_APP_API_URL=http://localhost:4002 nu kudutha local backend ku pogum
const API_URL = process.env.REACT_APP_API_URL || "https://upskldai.com/api";
const REQUEST_TIMEOUT = 15000; // 15s
const AUTO_OPEN_MS = 15000; // site open aanadhum 15s apram auto popup
const DISMISS_KEY = "upskld_booking_popup_dismissed";
const DISMISS_DAYS = 7; // close pannina 7 naal varaikkum thirumba varaadhu (0 = eppavume varaadhu)
const CLOSE_MS = 260; // CSS exit animation duration-oda match aaganum

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Name is too short")
    .required("Full name is required"),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  role: Yup.string().required("Please select a role"),
});

// localStorage block aanaalum (private mode) crash aagaama
const wasDismissed = () => {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    if (DISMISS_DAYS === 0) return true;
    return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch (e) {
    return false;
  }
};

const markDismissed = () => {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch (e) {
    /* ignore */
  }
};

const HomeCreerForm = () => {
  const [isOpen, setIsOpen] = useState(false); // popup mounted?
  const [isClosing, setIsClosing] = useState(false); // exit animation running?
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const closeTimerRef = useRef(null);
  const isOpenRef = useRef(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      role: "Working professional",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      try {
        const res = await fetch(`${API_URL}/student-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          signal: controller.signal,
        });

        // server JSON anuppala na (404 html page etc.) crash aagaama handle
        let data = null;
        try {
          data = await res.json();
        } catch (parseErr) {
          data = null;
        }

        if (res.ok && data && data.success) {
          markDismissed();
          toast.success("Submitted successfully! We'll reach out shortly.");
          setIsSubmitted(true);
          resetForm();
        } else {
          const message =
            (data && data.message) ||
            (res.status === 404
              ? "Service not found. Please contact support."
              : "Something went wrong. Please try again.");
          toast.error(message);
        }
      } catch (err) {
        console.error("Submit failed:", err);
        if (err.name === "AbortError") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error(
            "Unable to reach the server. Please check your internet connection and try again."
          );
        }
      } finally {
        clearTimeout(timer);
        setSubmitting(false);
      }
    },
  });

  /* ---------------- open / close ---------------- */
  const openModal = useCallback(() => {
    isOpenRef.current = true;
    clearTimeout(closeTimerRef.current);
    lastFocusedRef.current = document.activeElement;
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    markDismissed(); // close pannita auto popup thirumba varaadhu
    isOpenRef.current = false;
    setIsClosing(true);
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      // success screen paathutu close pannina, next time fresh form kaattanum
      setIsSubmitted(false);
      const el = lastFocusedRef.current;
      if (el && typeof el.focus === "function") el.focus();
    }, CLOSE_MS);
  }, []);

  // any button-la irundhu "upskld:open-booking" event vandha open pannum
  useEffect(() => {
    window.addEventListener(BOOKING_EVENT, openModal);
    // /#book-session link vandhaalum popup open aagum
    if (window.location.hash === "#book-session") openModal();
    return () => {
      window.removeEventListener(BOOKING_EVENT, openModal);
      clearTimeout(closeTimerRef.current);
    };
  }, [openModal]);

  // 15s apram automatic-a popup (close pannirundha / submit pannirundha varaadhu)
  useEffect(() => {
    if (wasDismissed()) return undefined;
    const timer = setTimeout(() => {
      if (!isOpenRef.current && !wasDismissed()) openModal();
    }, AUTO_OPEN_MS);
    return () => clearTimeout(timer);
  }, [openModal]);

  // body scroll lock + Escape + focus trap
  useEffect(() => {
    if (!isOpen) return undefined;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`; // layout jump aagaama

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const focusTimer = setTimeout(() => {
      if (firstInputRef.current) firstInputRef.current.focus({ preventScroll: true });
    }, 120);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [isOpen, closeModal]);

  const handleReset = () => {
    formik.resetForm();
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  const modal = (
    <div
      className={`career_home_pg_overlay ${isClosing ? "career_home_pg_overlay_out" : ""}`}
      onMouseDown={(e) => {
        // backdrop mela click pannina mattum close
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        id="book-session"
        ref={dialogRef}
        className="career_home_pg_wrapper"
        role="dialog"
        aria-modal="true"
        aria-labelledby="career_home_pg_title"
      >
        <button
          type="button"
          className="career_home_pg_close"
          onClick={closeModal}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="career_home_pg_container">
          {/* Title */}
          <div className="career_home_pg_left">
            <p className="career_home_pg_tagline">FREE CAREER COUNSELLING</p>
            <h2 id="career_home_pg_title" className="career_home_pg_heading">
              Book your free session
            </h2>
          </div>

          {/* Right Form */}
          <div className="career_home_pg_right">
            {!isSubmitted ? (
              <form className="career_home_pg_form" onSubmit={formik.handleSubmit} noValidate>
                <label className="career_home_pg_label" htmlFor="fullName">
                  Full name
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="career_home_pg_input"
                  placeholder="e.g. Priya Sharma"
                  autoComplete="name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="career_home_pg_error">{formik.errors.fullName}</p>
                )}

                <label className="career_home_pg_label" htmlFor="phone">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="career_home_pg_input"
                  placeholder="10 digit mobile number"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  value={formik.values.phone}
                  onChange={(e) => {
                    // allow digits only, cap at 10
                    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                    formik.setFieldValue("phone", digitsOnly);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="career_home_pg_error">{formik.errors.phone}</p>
                )}

                <label className="career_home_pg_label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="career_home_pg_input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="career_home_pg_error">{formik.errors.email}</p>
                )}

                <label className="career_home_pg_label" htmlFor="role">
                  I am a...
                </label>
                <select
                  id="role"
                  name="role"
                  className="career_home_pg_select"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="Working professional">Working professional</option>
                  <option value="Business leader">Business leader</option>
                  <option value="Student">Student</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <p className="career_home_pg_error">{formik.errors.role}</p>
                )}

                <button
                  type="submit"
                  className="career_home_pg_submit_btn"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting..." : "Book My Free Slot"}{" "}
                  <span className="career_home_pg_arrow">→</span>
                </button>

                <p className="career_home_pg_consent">
                  By submitting you agree to be contacted via WhatsApp/Email/call
                  for your session.
                </p>
              </form>
            ) : (
              <div className="career_home_pg_success">
                <div className="career_home_pg_success_icon">✓</div>
                <h3 className="career_home_pg_success_title">You're all set!</h3>
                <p className="career_home_pg_success_text">
                  Thanks! We'll reach out shortly to schedule your free session.
                </p>
                <button
                  type="button"
                  className="career_home_pg_reset_btn"
                  onClick={handleReset}
                >
                  Submit Another Response
                </button>
                <button
                  type="button"
                  className="career_home_pg_done_btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // portal -> header/section stacking issues varaadhu
  return createPortal(modal, document.body);
};

export default HomeCreerForm;