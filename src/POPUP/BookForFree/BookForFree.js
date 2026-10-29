import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  BOOKING_EVENT,
  lockScroll,
  unlockScroll,
  markPopupDismissed,
  setBookingOpen,
} from "../../Components/Openbookingmodal.js";
import "./BookForFree.css";


const API_URL = process.env.REACT_APP_API_URL || "https://upskldai.com/api";
const REQUEST_TIMEOUT = 15000; // 15s
const CLOSE_MS = 260; // CSS exit animation duration-oda match aaganum

const ROLE_BY_TAB = ["Small business owner", "Working professional", "Student"];

const ROLES = [
  "Small business owner",
  "Working professional",
  "Student",
  "Business leader",
  "Entrepreneur",
];










// header tab -> the extra input next to "City"
//   0 Small Business -> Type of business · 1 Working Professionals -> Your role · 2 Students -> College / course
const DETAIL_BY_TAB = [
  { audience: "Small Business", label: "Type of business", key: "businessType" },
  { audience: "Working Professionals", label: "Your role", key: "jobRole" },
  { audience: "Students", label: "College / course", key: "college" },
];

// "+91 98765 43210" / "98765 43210" / "9876543210"  ->  "9876543210"
const toTenDigits = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length > 10 && digits.startsWith("91") ? digits.slice(-10) : digits.slice(0, 10);
};

const validationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, "Name is too short").required("Full name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .test("ten-digits", "Enter a valid 10 digit mobile number", (v) => toTenDigits(v).length === 10),
  email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
  role: Yup.string().required("Please select a role"),
  detail: Yup.string().trim(),
  city: Yup.string().trim(),
});

const BookForFree = ({ activeIndex = 0 }) => {
  const [isOpen, setIsOpen] = useState(false); // popup mounted?
  const [isClosing, setIsClosing] = useState(false); // exit animation running?
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const closeTimerRef = useRef(null);
  const tabRef = useRef(activeIndex);
  tabRef.current = activeIndex;
  const detailInfo = DETAIL_BY_TAB[activeIndex] || DETAIL_BY_TAB[0];

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      role: ROLE_BY_TAB[activeIndex] || ROLE_BY_TAB[0],
      detail: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      try {
        const res = await fetch(`${API_URL}/student-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: values.fullName,
            phone: toTenDigits(values.phone),
            email: values.email,
            role: values.role,
            city: values.city,
            // which header tab the visitor was on + the value of the extra input
            audience: detailInfo.audience,
            detailLabel: detailInfo.label,
            detailKey: detailInfo.key,
            detail: values.detail,
          }),
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
          markPopupDismissed();
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

  const { setFieldValue } = formik;

  /* ---------------- open / close ---------------- */
  const openModal = useCallback(() => {
    clearTimeout(closeTimerRef.current);
    lastFocusedRef.current = document.activeElement;
    setBookingOpen(true);
    setIsClosing(false);
    setIsOpen(true);
    // header tab-ku ettha "I am a..." default
    setFieldValue("role", ROLE_BY_TAB[tabRef.current] || ROLE_BY_TAB[0]);
    setFieldValue("detail", ""); // label changes with the tab, so start empty
  }, [setFieldValue]);

  const closeModal = useCallback(() => {
    markPopupDismissed(); // close pannina auto popup thirumba varaadhu
    setBookingOpen(false);
    setIsClosing(true);
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsSubmitted(false); // next time fresh form
      const el = lastFocusedRef.current;
      if (el && typeof el.focus === "function") el.focus();
    }, CLOSE_MS);
  }, []);

  // "upskld:open-booking" event (buttons + intro video) -> open
  useEffect(() => {
    window.addEventListener(BOOKING_EVENT, openModal);
    if (window.location.hash === "#book-session") openModal(); // /#book-session link
    return () => {
      window.removeEventListener(BOOKING_EVENT, openModal);
      clearTimeout(closeTimerRef.current);
    };
  }, [openModal]);

  // page scroll lock + Escape + focus trap
  useEffect(() => {
    if (!isOpen) return undefined;

    lockScroll();

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
    }, 140);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      unlockScroll();
    };
  }, [isOpen, closeModal]);

  const handleReset = () => {
    formik.resetForm();
    setIsSubmitted(false);
  };

  const showError = (name) => formik.touched[name] && formik.errors[name];

  if (!isOpen) return null;

  const modal = (
    <div
      className={`book_free_pg_overlay ${isClosing ? "book_free_pg_overlay_out" : ""}`}
      onMouseDown={(e) => {
        // backdrop mela click pannina mattum close
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        id="book-session"
        ref={dialogRef}
        className="book_free_pg_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book_free_pg_title"
      >
        <button type="button" className="book_free_pg_close" onClick={closeModal} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            <header className="book_free_pg_head">
              <span className="book_free_pg_pill">Free · 15 minutes</span>
              <h2 id="book_free_pg_title" className="book_free_pg_title">
                Book a free session
              </h2>
              <p className="book_free_pg_subtitle">
                A short call to map your AI roadmap. No pitch, no pressure.
              </p>
            </header>

            <form className="book_free_pg_form" onSubmit={formik.handleSubmit} noValidate>
              <div className="book_free_pg_field">
                <label className="book_free_pg_label" htmlFor="book_free_pg_fullName">
                  Full name<span className="book_free_pg_req">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="book_free_pg_fullName"
                  name="fullName"
                  className="book_free_pg_input"
                  autoComplete="name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {showError("fullName") && <p className="book_free_pg_error">{formik.errors.fullName}</p>}
              </div>

              <div className="book_free_pg_field">
                <label className="book_free_pg_label" htmlFor="book_free_pg_phone">
                  Phone / WhatsApp<span className="book_free_pg_req">*</span>
                </label>
                <input
                  type="tel"
                  id="book_free_pg_phone"
                  name="phone"
                  className="book_free_pg_input"
                  placeholder="+91 98765 43210"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={16}
                  value={formik.values.phone}
                  onChange={(e) => {
                    // digits, spaces and a leading + only
                    setFieldValue("phone", e.target.value.replace(/[^\d+\s]/g, ""));
                  }}
                  onBlur={formik.handleBlur}
                />
                {showError("phone") && <p className="book_free_pg_error">{formik.errors.phone}</p>}
              </div>

              <div className="book_free_pg_field">
                <label className="book_free_pg_label" htmlFor="book_free_pg_email">
                  Email<span className="book_free_pg_req">*</span>
                </label>
                <input
                  type="email"
                  id="book_free_pg_email"
                  name="email"
                  className="book_free_pg_input"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {showError("email") && <p className="book_free_pg_error">{formik.errors.email}</p>}
              </div>

              <div className="book_free_pg_field">
                <label className="book_free_pg_label" htmlFor="book_free_pg_role">
                  I am a...
                </label>
                <select
                  id="book_free_pg_role"
                  name="role"
                  className="book_free_pg_input book_free_pg_select"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {showError("role") && <p className="book_free_pg_error">{formik.errors.role}</p>}
              </div>

              <div className="book_free_pg_row">
                <div className="book_free_pg_field">
                  <label className="book_free_pg_label" htmlFor="book_free_pg_detail">
                    {detailInfo.label}
                  </label>
                  <input
                    type="text"
                    id="book_free_pg_detail"
                    name="detail"
                    className="book_free_pg_input"
                    value={formik.values.detail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="book_free_pg_field">
                  <label className="book_free_pg_label" htmlFor="book_free_pg_city">
                    City
                  </label>
                  <input
                    type="text"
                    id="book_free_pg_city"
                    name="city"
                    className="book_free_pg_input"
                    autoComplete="address-level2"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <p className="book_free_pg_consent">
                By submitting you agree to be contacted via WhatsApp, email or call for your session.
              </p>

              <button type="submit" className="book_free_pg_submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Submitting..." : "Book my free session"}
              </button>
            </form>
          </>
        ) : (
          <div className="book_free_pg_success">
            <div className="book_free_pg_success_icon">✓</div>
            <h3 className="book_free_pg_success_title">You're all set!</h3>
            <p className="book_free_pg_success_text">
              Thanks! We'll reach out shortly to schedule your free session.
            </p>
            <button type="button" className="book_free_pg_submit" onClick={closeModal}>
              Close
            </button>
            <button type="button" className="book_free_pg_again" onClick={handleReset}>
              Submit another response
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // portal -> header / section stacking issues varaadhu
  return createPortal(modal, document.body);
};

export default BookForFree;