import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "./HomeCreerForm.css";

// .env la REACT_APP_API_URL=http://localhost:4002 nu kudutha local backend ku pogum
const API_URL = process.env.REACT_APP_API_URL || "https://upskldai.com/api";
const REQUEST_TIMEOUT = 15000; // 15s

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

const HomeCreerForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleReset = () => {
    formik.resetForm();
    setIsSubmitted(false);
  };

  return (
    <section id="book-session" className="career_home_pg_wrapper">
      <div className="career_home_pg_container">

        {/* Left Content */}
        <div className="career_home_pg_left">
          <p className="career_home_pg_tagline">FREE CAREER COUNSELLING</p>

          <h2 className="career_home_pg_heading">
            You don't need to become an AI expert.
            <br />
            You need to get better at what you already do —{" "}
            <span className="career_home_pg_heading_italic">with AI.</span>
          </h2>

          <p className="career_home_pg_desc">
            A practical, job-specific way to work with AI, at your pace,
            without needing to become someone else to do it. No pitch. No
            pressure. Just a short conversation to map your AI roadmap.
          </p>
        </div>

        {/* Right Form */}
        <div className="career_home_pg_right">
          {!isSubmitted ? (
            <form className="career_home_pg_form" onSubmit={formik.handleSubmit} noValidate>

              <label className="career_home_pg_label" htmlFor="fullName">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="career_home_pg_input"
                placeholder="e.g. Priya Sharma"
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
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default HomeCreerForm;