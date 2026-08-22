import React, { useState } from 'react';
import "./HomeOrgazanisationPage.css";

const HomeOrgazanisationPage = () => {
  const departmentOptions = ["Sales", "Marketing", "HR", "Finance", "Leadership"];

  const [formData, setFormData] = useState({
    companyName: "",
    teamSize: "51-200",
    departments: ["Sales", "HR", "Finance"],
    workEmail: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDepartmentToggle = (dept) => {
    setFormData((prev) => {
      const isSelected = prev.departments.includes(dept);
      return {
        ...prev,
        departments: isSelected
          ? prev.departments.filter((d) => d !== dept)
          : [...prev.departments, dept],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="organisations" className="orgai_home_pg_wrapper">
      <div className="orgai_home_pg_container">

        {/* Left Content */}
        <div className="orgai_home_pg_left">
          <p className="orgai_home_pg_tagline">FOR ORGANISATIONS</p>

          <h2 className="orgai_home_pg_heading">
            Bring your whole team up to speed —{" "}
            <span className="orgai_home_pg_heading_italic">
              by function, not by guesswork.
            </span>
          </h2>

          <p className="orgai_home_pg_desc">
            Individual employees are probably already experimenting with AI —
            unevenly, and without guidance. UPSKLD's organisational tracks
            mirror our individual courses, so training maps directly onto how
            each department already works.
          </p>

          <p className="orgai_home_pg_desc">
            AI for Sales teams. AI for Marketing teams. AI for HR, Finance and
            Leadership. Not a generic "AI 101" for everyone.
          </p>
        </div>

        {/* Right Form */}
        <div className="orgai_home_pg_right">
          <form className="orgai_home_pg_form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="companyName"
              className="orgai_home_pg_input"
              placeholder="e.g. Acme Technologies"
              value={formData.companyName}
              onChange={handleInputChange}
            />

            <select
              name="teamSize"
              className="orgai_home_pg_select"
              value={formData.teamSize}
              onChange={handleInputChange}
            >
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="201-500">201–500</option>
              <option value="500+">500+</option>
            </select>

            <div className="orgai_home_pg_checkbox_row">
              {departmentOptions.map((dept) => (
                <label className="orgai_home_pg_checkbox_label" key={dept}>
                  <input
                    type="checkbox"
                    className="orgai_home_pg_checkbox"
                    checked={formData.departments.includes(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>

            <label className="orgai_home_pg_field_label" htmlFor="workEmail">
              Work email
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              className="orgai_home_pg_input"
              placeholder="you@company.com"
              value={formData.workEmail}
              onChange={handleInputChange}
            />

            <button type="submit" className="orgai_home_pg_submit_btn">
              Talk to Us About Team Training
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default HomeOrgazanisationPage;