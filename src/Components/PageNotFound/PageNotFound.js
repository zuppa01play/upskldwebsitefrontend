import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  /* keep unknown URLs out of Google; restore title when leaving the page */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page not found | Upskld AI";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);

    return () => {
      document.title = previousTitle;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <main className="upskld_notfound_pg_wrapper">

      <Helmet>
  <title>Page not found | Upskld AI</title>
  <meta name="robots" content="noindex" />
</Helmet>
      <p className="upskld_notfound_pg_code" aria-hidden="true">
        404
      </p>
      <h1 className="upskld_notfound_pg_title">Page not found</h1>
      <p className="upskld_notfound_pg_text">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/" className="upskld_notfound_pg_btn">
        Back to Home
      </Link>
    </main>
  );
};

export default PageNotFound;