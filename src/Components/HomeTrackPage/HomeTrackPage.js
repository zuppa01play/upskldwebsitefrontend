import React, { useState } from 'react';
import "./HomeTrackPage.css";

const HomeTrackPage = () => {
  const tracksData = {
    Sales: {
      badge: "AI FOR SALES",
      title: "Move faster from research to relationship.",
      btnText: "Explore AI for Sales",
      columns: [
        ["Lead research", "Personalised outreach", "Meeting preparation", "CRM productivity"],
        ["Prospect analysis", "Sales proposals", "Follow-up"],
      ],
    },
    Marketing: {
      badge: "AI FOR MARKETING",
      title: "Create campaigns that connect, faster.",
      btnText: "Explore AI for Marketing",
      columns: [
        ["Content ideation", "Ad copywriting", "Campaign briefs", "Audience research"],
        ["Social calendars", "Performance analysis", "SEO drafts"],
      ],
    },
    HR: {
      badge: "AI FOR HR",
      title: "Hire, onboard and support people better.",
      btnText: "Explore AI for HR",
      columns: [
        ["Shortlisting resumes", "Interview prep", "Policy drafting", "Onboarding plans"],
        ["Employee surveys", "Performance notes", "Engagement ideas"],
      ],
    },
    Finance: {
      badge: "AI FOR FINANCE",
      title: "Turn numbers into decisions, quicker.",
      btnText: "Explore AI for Finance",
      columns: [
        ["Financial modelling", "Report summaries", "Budget analysis", "Forecasting"],
        ["Variance checks", "Investor decks", "Expense reviews"],
      ],
    },
    Leadership: {
      badge: "AI FOR LEADERSHIP",
      title: "Lead with sharper context and clarity.",
      btnText: "Explore AI for Leadership",
      columns: [
        ["Strategy drafts", "Meeting summaries", "Decision frameworks", "Team updates"],
        ["Board reports", "Scenario planning", "Communication drafts"],
      ],
    },
    Students: {
      badge: "AI FOR STUDENTS",
      title: "Learn faster and stand out sooner.",
      btnText: "Explore AI for Students",
      columns: [
        ["Research help", "Resume building", "Interview practice", "Study plans"],
        ["Project ideas", "Career guidance", "Portfolio building"],
      ],
    },
  };

  const tabs = Object.keys(tracksData);
  const [activeTab, setActiveTab] = useState("Sales");
  const activeData = tracksData[activeTab];

  return (
    <section className="hometrack_pg_wrapper">
      <div className="hometrack_pg_container">

        <p className="hometrack_pg_tagline">FIND YOUR TRACK</p>

        <h2 className="hometrack_pg_heading">
          Don't learn AI for its own sake. Learn how it applies to{" "}
          <span className="hometrack_pg_heading_italic">the work you already do.</span>
        </h2>

        <p className="hometrack_pg_subtext">
          A marketing professional doesn't need to build a chatbot. A
          salesperson doesn't need to learn Python. What they need is
          simpler: to know exactly where AI fits into the work they already
          do well.
        </p>

        {/* Tabs */}
        <div className="hometrack_pg_tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`hometrack_pg_tab_btn ${
                activeTab === tab ? "hometrack_pg_tab_btn_active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="hometrack_pg_card">
          <div className="hometrack_pg_card_left">
            <span className="hometrack_pg_badge">{activeData.badge}</span>
            <h3 className="hometrack_pg_card_title">{activeData.title}</h3>
            <button className="hometrack_pg_card_btn">{activeData.btnText}</button>
          </div>

          <div className="hometrack_pg_card_right">
            {activeData.columns.map((col, colIndex) => (
              <ul className="hometrack_pg_list" key={colIndex}>
                {col.map((item, itemIndex) => (
                  <li className="hometrack_pg_list_item" key={itemIndex}>
                    <span className="hometrack_pg_dot"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeTrackPage;