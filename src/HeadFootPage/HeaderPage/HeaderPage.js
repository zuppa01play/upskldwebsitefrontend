import React, { useState, useEffect } from "react";
import "./HeaderPage.css";
import HeaderLogo from "./headerLogo.png";
import { openBookingModal, openIntroVideo } from "../../Components/Openbookingmodal";

const navLinks = [
  {
    label: "Small Business",
    announce: "This month: AI for small businesses · Book a free session →",
  },
  {
    label: "Working Professionals",
    announce:
      "For working professionals · Free 15-minute AI roadmap session · Book now →",
  },
  {
    label: "Students",
    announce:
      "For students · Free 15-minute career counselling session · Book now →",
  },
];

const HeaderPage = ({ activeIndex = 0, onTabChange = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // close the drawer with Escape, and if the screen grows to desktop size
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  // stronger shadow once the page has been scrolled
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.pageYOffset > 8);
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
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - offset - 10;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleTabClick = (index) => {
    onTabChange(index);
    if (window.pageYOffset > 80) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMenu();
    // every tab (Small Business / Working Professionals / Students) -> intro video popup after 5 s
    openIntroVideo();
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  return (
    <header
      className={`upskld_heade_pg_header ${scrolled ? "upskld_heade_pg_header_scrolled" : ""}`}
    >
      {/* Announcement bar (text changes with the active tab) */}
      <button
        type="button"
        className="upskld_heade_pg_announce"
        onClick={openBookingModal}
      >
        <span key={activeIndex} className="upskld_heade_pg_announce_text">
          {navLinks[activeIndex].announce}
        </span>
      </button>

      <div className="upskld_heade_pg_container">
        {/* Logo */}
        <button
          type="button"
          className="upskld_heade_pg_logo"
          onClick={handleLogoClick}
          aria-label="UPSKLD — back to top"
        >
          <img
            src={HeaderLogo}
            alt="UPSKLD logo"
            className="upskld_heade_pg_logo_img"
          />
        </button>

        {/* Desktop nav */}
        <nav className="upskld_heade_pg_nav_desktop" aria-label="Audience">
          <ul className="upskld_heade_pg_nav_list">
            {navLinks.map((link, index) => (
              <li key={link.label} className="upskld_heade_pg_nav_item">
                <button
                  type="button"
                  className={`upskld_heade_pg_nav_link ${
                    activeIndex === index
                      ? "upskld_heade_pg_nav_link_active"
                      : ""
                  }`}
                  aria-current={activeIndex === index ? "page" : undefined}
                  onClick={() => handleTabClick(index)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop action */}
        <div className="upskld_heade_pg_actions_desktop">
          <button
            type="button"
            className="upskld_heade_pg_book_btn"
            onClick={openBookingModal}
          >
            Book a free session
          </button>
        </div>

        {/* Mobile menu icon */}
        <button
          type="button"
          className={`upskld_heade_pg_menu_icon ${
            isMenuOpen ? "upskld_heade_pg_menu_icon_active" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="upskld_heade_pg_bar"></span>
          <span className="upskld_heade_pg_bar"></span>
          <span className="upskld_heade_pg_bar"></span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`upskld_heade_pg_mobile_overlay ${
          isMenuOpen ? "upskld_heade_pg_mobile_overlay_open" : ""
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile drawer */}
      <div
        className={`upskld_heade_pg_mobile_menu ${
          isMenuOpen ? "upskld_heade_pg_mobile_menu_open" : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="upskld_heade_pg_mobile_nav_list">
          {navLinks.map((link, index) => (
            <li
              key={link.label}
              className="upskld_heade_pg_mobile_nav_item"
              style={{ "--n": index }}
            >
              <button
                type="button"
                tabIndex={isMenuOpen ? 0 : -1}
                className={`upskld_heade_pg_mobile_nav_link ${
                  activeIndex === index
                    ? "upskld_heade_pg_mobile_nav_link_active"
                    : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div
          className="upskld_heade_pg_mobile_actions"
          style={{ "--n": navLinks.length }}
        >
          <button
            type="button"
            tabIndex={isMenuOpen ? 0 : -1}
            className="upskld_heade_pg_mobile_book_btn"
            onClick={() => {
              closeMenu();
              openBookingModal();
            }}
          >
            Book a free session
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;