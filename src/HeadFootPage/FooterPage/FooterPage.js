import React, { useRef } from "react";
import "./FooterPage.css";

const FooterPage = () => {
  const footerRef = useRef(null);

  const navLinks = [
    { label: "AI for Your Job", id: "ai-for-your-job" },
    { label: "Courses", id: "courses" },
    { label: "Experts", id: "experts" },
    { label: "Organisations", id: "organisations" },
    { label: "FAQ", id: "faq" },
  ];

  const scrollToId = (id) => {
    const el = document.getElementById(id);

    if (!el) return;

    const header = document.querySelector(
      ".upskld_heade_pg_header"
    );

    const offset = header ? header.offsetHeight : 80;

    const top =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      offset -
      10;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer
      ref={footerRef}
      className="upskld_footer_pg_wrapper"
    >
      <div className="upskld_footer_pg_container">

        {/* Footer Top */}
        <div className="upskld_footer_pg_top">

          {/* Logo & Description */}
          <div className="upskld_footer_pg_brand">

            <div className="upskld_footer_pg_logo">
              <img
                src="https://res.cloudinary.com/dk50cmtps/image/upload/v1787297680/5bd19aef-80dc-489e-8228-5f05a920b79b_zvnpme.png"
                alt="UPSKLD logo"
                className="upskld_footer_pg_logo_img"
              />
            </div>

            <p className="upskld_footer_pg_about">
              Human Intelligence, Amplified by AI. Practical AI
              learning designed to help you work smarter, grow
              faster, and stay ahead in an AI-powered world.
            </p>

          </div>

          {/* Navigation */}
          <div className="upskld_footer_pg_navigation">

            <p className="upskld_footer_pg_title">
              EXPLORE
            </p>

            <ul className="upskld_footer_pg_link_list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="upskld_footer_pg_link"
                    onClick={(e) =>
                      handleNavClick(e, link.id)
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* Book Session */}
          <div className="upskld_footer_pg_session">

            <p className="upskld_footer_pg_title">
              GET STARTED
            </p>

            <button
              className="upskld_footer_pg_book_btn"
              onClick={() => scrollToId("book-session")}
            >
              Book Free Session
            </button>

          </div>

        </div>

        {/* Divider */}
        <div className="upskld_footer_pg_divider"></div>

        {/* Bottom */}
        <div className="upskld_footer_pg_bottom">

          <p className="upskld_footer_pg_copyright">
            © 2026 UPSKLD. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default FooterPage;