import React from 'react';
import "./FooterPage.css";

const FooterPage = () => {
  const courseLinks = [
    "AI for Sales",
    "AI for Marketing",
    "AI for Leaders",
    "AI for Students",
  ];

  const exploreLinks = [
    "Our Philosophy",
    "Experts",
    "Organisations",
    "FAQ",
  ];

  return (
    <footer className="zuppa_footer_pg_wrapper">
      <div className="zuppa_footer_pg_container">

        <div className="zuppa_footer_pg_top">

          {/* Logo & About */}
          <div className="zuppa_footer_pg_col zuppa_footer_pg_col_brand">
            <div className="zuppa_footer_pg_logo">
              <img
                src="https://res.cloudinary.com/dk50cmtps/image/upload/v1787297680/5bd19aef-80dc-489e-8228-5f05a920b79b_zvnpme.png"
                alt="UPSKLD logo"
                className="zuppa_footer_pg_logo_img"
              />
          
            </div>
            <p className="zuppa_footer_pg_about_text">
              Human Intelligence, Amplified by AI. Practical AI courses for
              the work you already do — sales, marketing, HR, finance,
              leadership and more.
            </p>
          </div>

          {/* Courses */}
          <div className="zuppa_footer_pg_col">
            <p className="zuppa_footer_pg_col_title">COURSES</p>
            <ul className="zuppa_footer_pg_link_list">
              {courseLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="zuppa_footer_pg_link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="zuppa_footer_pg_col">
            <p className="zuppa_footer_pg_col_title">EXPLORE</p>
            <ul className="zuppa_footer_pg_link_list">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="zuppa_footer_pg_link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="zuppa_footer_pg_col">
            <p className="zuppa_footer_pg_col_title">CONTACT</p>
            <ul className="zuppa_footer_pg_link_list">
              <li>
                <a href="mailto:hello@upskld.com" className="zuppa_footer_pg_link">
                  hello@upskld.com
                </a>
              </li>
              <li>
                <a href="#" className="zuppa_footer_pg_link">
                  [Add WhatsApp]
                </a>
              </li>
              <li>
                <a href="#" className="zuppa_footer_pg_link">
                  Book Free Session
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="zuppa_footer_pg_divider"></div>

        <div className="zuppa_footer_pg_bottom">
          <p className="zuppa_footer_pg_copyright">
            © 2026 UPSKLD. [Add legal entity line.]
          </p>
          <div className="zuppa_footer_pg_bottom_links">
            <a href="#" className="zuppa_footer_pg_bottom_link">
              Privacy
            </a>
            <span className="zuppa_footer_pg_dot">·</span>
            <a href="#" className="zuppa_footer_pg_bottom_link">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterPage;