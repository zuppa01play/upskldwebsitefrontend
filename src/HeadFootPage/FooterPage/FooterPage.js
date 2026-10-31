import React, { useEffect, useRef, useState } from "react";
import "./FooterPage.css";
import { openEnquiryModal } from "../../Components/Openbookingmodal";

/* ---------- Icons ---------- */

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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

/* ---------- Content (replace the [placeholders] when ready) ---------- */

const navLinks = [
  { label: "Small Business", id: "home" },
  { label: "Working Professionals", id: "home" },
  { label: "Students", id: "home" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/upskldai/",
    Icon: InstagramIcon,
  },
  {
    label: "X",
    href: "https://x.com/upskld_ai",
    Icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/upskldai/?viewAsMember=true",
    Icon: LinkedinIcon,
  },
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
            <div
              className="upskld_footer_pg_brand upskld_footer_pg_reveal"
              style={{ "--d": "0ms" }}
            >
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
              aria-label="Social media"
            >
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="upskld_footer_pg_social_btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`UPSKLD on ${label}`}
                    title={label}
                    onClick={(e) => handlePlaceholder(e, href)}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Divider ---------- */}
          <div className="upskld_footer_pg_divider" aria-hidden="true"></div>

          {/* ---------- Bottom row ---------- */}
          <div className="upskld_footer_pg_bottom">
            <p
              className="upskld_footer_pg_sources upskld_footer_pg_reveal"
              style={{ "--d": "420ms" }}
            >
              {SOURCES}
            </p>

            <ul
              className="upskld_footer_pg_legal upskld_footer_pg_reveal"
              style={{ "--d": "520ms" }}
            >
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