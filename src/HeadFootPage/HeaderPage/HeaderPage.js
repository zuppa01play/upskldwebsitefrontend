import React, { useState } from 'react';
import "./HeaderPage.css";

const HeaderPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "AI for Your Job", href: "#" },
    { label: "Courses", href: "#" },
    { label: "Experts", href: "#" },
    { label: "Organisations", href: "#" },
    { label: "FAQ", href: "#" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="upskld_heade_pg_header">
      <div className="upskld_heade_pg_container">

        {/* Logo */}
      {/* Logo */}
<div className="upskld_heade_pg_logo">
  <img
    src="https://res.cloudinary.com/dk50cmtps/image/upload/v1787297680/5bd19aef-80dc-489e-8228-5f05a920b79b_zvnpme.png"
    alt="UPSKLD logo"
    className="upskld_heade_pg_logo_img"
  />
</div>

        {/* Desktop Nav */}
        <nav className="upskld_heade_pg_nav_desktop">
          <ul className="upskld_heade_pg_nav_list">
            {navLinks.map((link, index) => (
              <li key={index} className="upskld_heade_pg_nav_item">
                <a href={link.href} className="upskld_heade_pg_nav_link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Actions */}
        <div className="upskld_heade_pg_actions_desktop">
          <a href="#" className="upskld_heade_pg_login_link">
            Login
          </a>
          <button className="upskld_heade_pg_book_btn">Book Free Session</button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={`upskld_heade_pg_menu_icon ${isMenuOpen ? "upskld_heade_pg_menu_icon_active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="upskld_heade_pg_bar"></span>
          <span className="upskld_heade_pg_bar"></span>
          <span className="upskld_heade_pg_bar"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`upskld_heade_pg_mobile_overlay ${isMenuOpen ? "upskld_heade_pg_mobile_overlay_open" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Drawer */}
      <div
        className={`upskld_heade_pg_mobile_menu ${isMenuOpen ? "upskld_heade_pg_mobile_menu_open" : ""}`}
      >
        <ul className="upskld_heade_pg_mobile_nav_list">
          {navLinks.map((link, index) => (
            <li key={index} className="upskld_heade_pg_mobile_nav_item">
              
              <a    href={link.href}
                className="upskld_heade_pg_mobile_nav_link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="upskld_heade_pg_mobile_actions">
          <a href="#" className="upskld_heade_pg_mobile_login_link" onClick={closeMenu}>
            Login
          </a>
          <button className="upskld_heade_pg_mobile_book_btn" onClick={closeMenu}>
            Book Free Session
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;