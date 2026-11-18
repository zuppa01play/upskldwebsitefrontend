import React from "react";
import "./TermsAndConditions.css";

const CONTACT_EMAIL = "growth@impactree.ai"; 
const LAST_UPDATED = "17 November 2026";

const sections = [
  {
    id: "accept",
    title: "1. Accepting these terms",
    body: (
      <p>
        By using UPSKLD, you agree to these Terms and Conditions. If you do not
        agree, please do not use the website or our courses.
      </p>
    ),
  },
  {
    id: "account",
    title: "2. Your account",
    body: (
      <ul>
        <li>Give correct information when you sign up.</li>
        <li>Keep your login details safe and do not share them.</li>
        <li>You are responsible for activity on your account.</li>
        <li>If you are under 18, use UPSKLD with a parent or guardian's permission.</li>
      </ul>
    ),
  },
  {
    id: "courses",
    title: "3. Courses and content",
    body: (
      <p>
        Course videos, text, images and other material on UPSKLD belong to us or
        our partners. You may watch them for your own learning. You may not
        copy, record, resell or share them without our written permission.
      </p>
    ),
  },
  {
    id: "use",
    title: "4. Using the platform",
    body: (
      <ul>
        <li>Do not misuse the site or try to hack or disturb it.</li>
        <li>Do not share paid course content with others.</li>
        <li>Do not post anything unlawful, harmful or offensive.</li>
      </ul>
    ),
  },
  {
    id: "payments",
    title: "5. Payments and refunds",
    body: (
      <p>
        Paid courses are shown with their price before you buy. Refunds, if any,
        follow the refund terms shown at the time of purchase.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "6. No guarantee",
    body: (
      <p>
        Our courses are for learning and skill building. We do not promise any
        particular job, salary or result. We may change or stop any course or
        feature at any time.
      </p>
    ),
  },
  {
    id: "liability",
    title: "7. Our responsibility",
    body: (
      <p>
        We try to keep UPSKLD running smoothly, but we are not responsible for
        losses caused by downtime, errors or things outside our control, to the
        extent allowed by law.
      </p>
    ),
  },
  {
    id: "suspend",
    title: "8. Ending access",
    body: (
      <p>
        We may suspend or close an account that breaks these terms. You can stop
        using UPSKLD at any time.
      </p>
    ),
  },
  {
    id: "law",
    title: "9. Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute will be
        handled by the courts of the city where UPSKLD is based.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10. Contact us",
    body: (
      <p>
        Questions? Email us at{" "}
        <a className="upskld_terms_pg_link" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . We may update these terms from time to time, and the date at the top
        will change when we do.
      </p>
    ),
  },
];

const TermsAndConditions = () => {
  return (
    <div className="upskld_terms_pg_wrapper">
      <section className="upskld_terms_pg_hero">
        <div className="upskld_terms_pg_container">
          <span className="upskld_terms_pg_badge">Legal</span>
          <h1 className="upskld_terms_pg_title">Terms and Conditions</h1>
          <p className="upskld_terms_pg_updated">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="upskld_terms_pg_content">
        <div className="upskld_terms_pg_container upskld_terms_pg_narrow">
          <article className="upskld_terms_pg_article">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="upskld_terms_pg_section">
                <h2 className="upskld_terms_pg_heading">{s.title}</h2>
                {s.body}
              </div>
            ))}
          </article>
        </div>
      </section>
      <br/>
      <br/>
    </div>
  );
};

export default TermsAndConditions;