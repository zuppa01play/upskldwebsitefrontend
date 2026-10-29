import React, { useEffect, useRef, useState } from "react";
import "./FooterPage.css";
import { openEnquiryModal } from "../../Components/Openbookingmodal";

/* ---------- Content (replace the [placeholders] when ready) ---------- */

const navLinks = [
  { label: "Small Business", id: "home" },
  { label: "Working Professionals", id: "home" },
  { label: "Students", id: "home" },
];

const socialLinks = [
  { label: "[Instagram]", href: "https://www.instagram.com/upskldai/" },
  { label: "[YouTube]", href: "#" },
  { label: "[Contact]", href: "#" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const SOURCES =
  "Sources: Nucleus Research; Salesforce State of Sales India 2023; Annuitas Group; ActiveCampaign × Talker Research 2025; Buffer 2025; Omnisend 2025; Harvard Business Review. Figures show typical results and vary by business.";

/* Order MUST match navLinks in HeaderPage (0 small business · 1 professionals · 2 students) */
const PROGRAMS = [
  {
    name: "[Program name] · AI for Small Businesses",
    status: "Enrollment closed",
  },
  {
    name: "[Program name] · AI for Working Professionals",
    status: "Enrollment closed",
  },
  {
    name: "[Program name] · AI for Students",
    status: "Enrollment closed",
  },
];

const SHOW_BAR_AFTER = 400; // px scrolled before the enroll bar slides up

const CapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 9L12 4 2 9l10 5 10-5z" />
    <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    <path d="M22 9v6" />
  </svg>
);

const FooterPage = ({ activeIndex = 0 }) => {
  const PROGRAM = PROGRAMS[activeIndex] || PROGRAMS[0];
  const footerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [barVisible, setBarVisible] = useState(false);

  /* footer content fades up once when it scrolls into view */
  useEffect(() => {
    const node = footerRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
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

  /* enroll bar slides up after the visitor has scrolled a little */
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setBarVisible(window.pageYOffset > SHOW_BAR_AFTER);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector(".upskld_heade_pg_header");
    const offset = header ? header.offsetHeight : 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 10;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };
 const handlePlaceholder = (e, href) => {
    if (href === "#") e.preventDefault();
  };

  return (
    <>
      <footer
        ref={footerRef}
        className={`upskld_footer_pg_wrapper ${inView ? "upskld_footer_pg_in" : ""}`}
      >
        <div className="upskld_footer_pg_container">
          {/* ---------- Top row ---------- */}
          <div className="upskld_footer_pg_top">
            <div className="upskld_footer_pg_brand upskld_footer_pg_reveal" style={{ "--d": "0ms" }}>
              <p className="upskld_footer_pg_logo">UPSKLD</p>
              <p className="upskld_footer_pg_about">
                a brand of Impactree Data Technologies · upskldai.com
              </p>
            </div>

            <nav
              className="upskld_footer_pg_navigation upskld_footer_pg_reveal"
              style={{ "--d": "120ms" }}
              aria-label="Footer"
            >
              <ul className="upskld_footer_pg_link_list">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.id}`}
                      className="upskld_footer_pg_link"
                      onClick={(e) => handleNavClick(e, link.id)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ul
              className="upskld_footer_pg_socials upskld_footer_pg_reveal"
              style={{ "--d": "240ms" }}
            >
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="upskld_footer_pg_link"
                    onClick={(e) => handlePlaceholder(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Divider ---------- */}
          <div className="upskld_footer_pg_divider" aria-hidden="true"></div>

          {/* ---------- Bottom row ---------- */}
          <div className="upskld_footer_pg_bottom">
            <p className="upskld_footer_pg_sources upskld_footer_pg_reveal" style={{ "--d": "420ms" }}>
              {SOURCES}
            </p>

            <ul className="upskld_footer_pg_legal upskld_footer_pg_reveal" style={{ "--d": "520ms" }}>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="upskld_footer_pg_link upskld_footer_pg_link_small"
                    onClick={(e) => handlePlaceholder(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* ---------- Enroll bar (fixed to the bottom of the screen) ---------- */}
      <div
        className={`upskld_footer_pg_bar ${barVisible ? "upskld_footer_pg_bar_visible" : ""}`}
        aria-hidden={!barVisible}
      >
        <div className="upskld_footer_pg_bar_inner">
          <span className="upskld_footer_pg_bar_icon">
            <CapIcon />
          </span>

          <div key={activeIndex} className="upskld_footer_pg_bar_text">
            <p className="upskld_footer_pg_bar_title">{PROGRAM.name}</p>
            <p className="upskld_footer_pg_bar_status">{PROGRAM.status}</p>
          </div>

          <div className="upskld_footer_pg_bar_actions">
            <button
              type="button"
              className="upskld_footer_pg_bar_enquire"
              tabIndex={barVisible ? 0 : -1}
              onClick={openEnquiryModal}
            >
              Enquire
            </button>
            <button
              type="button"
              className="upskld_footer_pg_bar_enroll"
              tabIndex={barVisible ? 0 : -1}
              onClick={() => scrollToId("courses")}
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterPage;