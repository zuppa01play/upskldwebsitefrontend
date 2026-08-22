import React, { useState } from 'react';
import "./HomeFaqPage.css";

const HomeFaqPage = () => {
  const faqs = [
    {
      question: "Do I need any technical background or coding experience?",
      answer:
        "No. Every UPSKLD course is built for non-technical professionals. If you can use email and a spreadsheet, you can do this.",
    },
    {
      question: "Will this replace expertise I already have?",
      answer:
        "No — it builds on it. AI handles the repetitive first draft; your judgement, context and experience still decide what's actually useful.",
    },
    {
      question: "How much time does a course take?",
      answer:
        "Most tracks are 4–6 weeks, designed around 2–3 hours a week. You can go faster or slower — the pace is self-directed.",
    },
    {
      question: "What will I actually be able to do afterwards?",
      answer:
        "You'll walk away with a set of AI-assisted workflows specific to your role — things you can apply to real tasks the same week, not just theory.",
    },
    {
      question: "Is this only for people early in their career?",
      answer:
        "Not at all. Our tracks span students, working professionals, business leaders and founders — each track is matched to where you already are.",
    },
    {
      question: "What does the free session involve?",
      answer:
        "A 15-minute call where we map where AI already touches your role and recommend the right track — no pressure, no sales pitch.",
    },
    {
      question: "Do I get a certificate?",
      answer:
        "Yes. Every completed course comes with a shareable Certificate of Completion you can add to your resume or LinkedIn.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section  id="faq"    className="home_faq_pg_wrapper">
      <div className="home_faq_pg_container">

        <p className="home_faq_pg_tagline">FAQ</p>

        <h2 className="home_faq_pg_heading">
          Questions before <span className="home_faq_pg_heading_italic">you start.</span>
        </h2>

        <div className="home_faq_pg_list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="home_faq_pg_item" key={index}>
                <button
                  className="home_faq_pg_question_row"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="home_faq_pg_question">{faq.question}</span>
                  <span
                    className={`home_faq_pg_icon ${
                      isOpen ? "home_faq_pg_icon_open" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`home_faq_pg_answer_wrap ${
                    isOpen ? "home_faq_pg_answer_wrap_open" : ""
                  }`}
                >
                  <p className="home_faq_pg_answer">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeFaqPage;