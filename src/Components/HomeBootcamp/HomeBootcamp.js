import React from 'react';
import "./HomeBootcamp.css";

const HomeBootcamp = () => {
  const comparisons = [
    {
      title: "Generic AI Courses",
      teaches: "AI concepts in general",
      bestFor: "Broad awareness",
      extraLabel: "Not built for:",
      extraValue: "Your specific job",
    },
    {
      title: "YouTube / ChatGPT Tutorials",
      teaches: "One tool or feature",
      bestFor: "Quick, free tips",
      extraLabel: "Not built for:",
      extraValue: "A structured workflow",
    },
    {
      title: "Coding Bootcamps",
      teaches: "How to build AI systems",
      bestFor: "Becoming a developer",
      extraLabel: "Not built for:",
      extraValue: "Improving your current job",
    },
    {
      title: "UPSKLD",
      teaches: "AI applied to your job",
      bestFor: "Working professionals & leaders",
      extraLabel: "Built for:",
      extraValue: "The work you already do",
    },
  ];

  return (
    <section className="upskld_bootcamp_pg_wrapper">
      <div className="upskld_bootcamp_pg_container">

        <p className="upskld_bootcamp_pg_tagline">WHY UPSKLD</p>

        <h2 className="upskld_bootcamp_pg_heading">
          Not just a YouTube tutorial, or a{" "}
          <span className="upskld_bootcamp_pg_heading_italic">coding bootcamp.</span>
        </h2>

        <p className="upskld_bootcamp_pg_subtext">
          There's no shortage of ways to learn about AI right now. Most of
          them weren't built for you.
        </p>

        <div className="upskld_bootcamp_pg_grid">
          {comparisons.map((item, index) => (
            <div
              className="upskld_bootcamp_pg_card"
              key={index}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <h3 className="upskld_bootcamp_pg_card_title">{item.title}</h3>

              <p className="upskld_bootcamp_pg_row">
                <span className="upskld_bootcamp_pg_label">Teaches:</span>{" "}
                <span className="upskld_bootcamp_pg_value">{item.teaches}</span>
              </p>

              <p className="upskld_bootcamp_pg_row">
                <span className="upskld_bootcamp_pg_label">Best for:</span>{" "}
                <span className="upskld_bootcamp_pg_value">{item.bestFor}</span>
              </p>

              <p className="upskld_bootcamp_pg_row">
                <span className="upskld_bootcamp_pg_label">{item.extraLabel}</span>{" "}
                <span className="upskld_bootcamp_pg_value">{item.extraValue}</span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeBootcamp;