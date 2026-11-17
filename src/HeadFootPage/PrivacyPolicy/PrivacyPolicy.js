import React from "react";
import "./PrivacyPolicy.css";

const CONTACT_EMAIL = "privacy@upskld.com"; // TODO: replace with your real grievance/contact email
const LAST_UPDATED = "17 November 2026";

const sections = [
  {
    id: "collect",
    title: "What we collect",
    body: (
      <ul>
        <li>Your name, email and phone number when you fill our forms.</li>
        <li>Your login details when you create an account.</li>
        <li>Basic usage info like browser and pages visited.</li>
      </ul>
    ),
  },
  {
    id: "use",
    title: "How we use it",
    body: (
      <ul>
        <li>To reply to your enquiries.</li>
        <li>To give you access to courses.</li>
        <li>To improve our website and keep it safe.</li>
      </ul>
    ),
  },
  {
    id: "share",
    title: "Sharing",
    body: (
      <p>
        We never sell your data. We only share it with trusted services that
        help us run UPSKLD (database, email and media hosting), or when the law
        requires it.
      </p>
    ),
  },
  {
    id: "storage",
    title: "Cookies and storage",
    body: (
      <p>
        We store a login token in your browser to keep you signed in. You can
        clear it anytime from your browser settings.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security and retention",
    body: (
      <p>
        We take reasonable steps to protect your data and keep it only as long
        as needed.
      </p>
    ),
  },
  {
    id: "minors",
    title: "Students under 18",
    body: (
      <p>
        If you are under 18, please use UPSKLD with a parent or guardian's
        permission.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your choices",
    body: (
      <p>
        You can ask us to show, correct or delete your data, or withdraw your
        consent, at any time.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions? Email us at{" "}
        <a className="upskld_privacy_pg_link" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . We may update this policy from time to time.
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="upskld_privacy_pg_wrapper">
      <section className="upskld_privacy_pg_hero">
        <div className="upskld_privacy_pg_container">
          <span className="upskld_privacy_pg_badge">Legal</span>
          <h1 className="upskld_privacy_pg_title">Privacy Policy</h1>
          <p className="upskld_privacy_pg_updated">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="upskld_privacy_pg_content">
        <div className="upskld_privacy_pg_container upskld_privacy_pg_narrow">
          <article className="upskld_privacy_pg_article">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="upskld_privacy_pg_section">
                <h2 className="upskld_privacy_pg_heading">{s.title}</h2>
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

export default PrivacyPolicy;