import React, { useState } from 'react';
import "./HomeCreerForm.css";

const HomeCreerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "Working professional",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:4000/api/student-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) setIsSubmitted(true);
  } catch (err) {
    console.error("Submit failed:", err);
  }
};

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      role: "Working professional",
    });
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
            <form className="career_home_pg_form" onSubmit={handleSubmit}>

              <label className="career_home_pg_label" htmlFor="fullName">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="career_home_pg_input"
                placeholder="e.g. Priya Sharma"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />

              <label className="career_home_pg_label" htmlFor="phone">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="career_home_pg_input"
                placeholder="+91"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />

              <label className="career_home_pg_label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="career_home_pg_input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label className="career_home_pg_label" htmlFor="role">
                I am a...
              </label>
              <select
                id="role"
                name="role"
                className="career_home_pg_select"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Working professional">Working professional</option>
                <option value="Business leader">Business leader</option>
                <option value="Student">Student</option>
                <option value="Entrepreneur">Entrepreneur</option>
              </select>

              <button type="submit" className="career_home_pg_submit_btn">
                Book My Free Slot <span className="career_home_pg_arrow">→</span>
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
                Thanks, {formData.fullName || "there"}. We'll reach out on{" "}
                {formData.phone || "your phone"} or {formData.email || "your email"} shortly
                to schedule your free session.
              </p>
              <button className="career_home_pg_reset_btn" onClick={handleReset}>
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