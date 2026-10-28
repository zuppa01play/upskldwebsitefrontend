import React, { useEffect, useRef, useState } from "react";
import "./HomeFaqPage.css";

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

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const HomeFaqPage = () => {
  const [openIndex, setOpenIndex] = useState(-1); // all closed, like the design
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // play the entrance once, when the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
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
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index)); // one open at a time
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector(".upskld_heade_pg_header");
    const offset = header ? header.offsetHeight : 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 10;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className={`home_faq_pg_wrapper ${inView ? "home_faq_pg_in" : ""}`}
    >
      <div className="home_faq_pg_container">
        {/* ---------- Left: intro ---------- */}
        <div className="home_faq_pg_intro">
          <p className="home_faq_pg_tagline home_faq_pg_reveal" style={{ "--d": "0ms" }}>
            FAQs
          </p>

          <h2 className="home_faq_pg_heading home_faq_pg_reveal" style={{ "--d": "100ms" }}>
            Questions before you start.
          </h2>

          <p className="home_faq_pg_subtext home_faq_pg_reveal" style={{ "--d": "200ms" }}>
            Still unsure? Book a free 15-minute call and we'll answer everything for your situation.
          </p>

          <button
            type="button"
            className="home_faq_pg_ask home_faq_pg_reveal"
            style={{ "--d": "300ms" }}
            onClick={() => scrollToId("book-session")}
          >
            Ask a question
          </button>
        </div>

        {/* ---------- Right: accordion ---------- */}
        <div className="home_faq_pg_list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`home_faq_pg_item ${isOpen ? "home_faq_pg_item_open" : ""}`}
                style={{ "--i": index }}
              >
                <h3 className="home_faq_pg_question_head">
                  <button
                    type="button"
                    id={`home_faq_pg_btn_${index}`}
                    className="home_faq_pg_question_row"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`home_faq_pg_panel_${index}`}
                  >
                    <span className="home_faq_pg_question">{faq.question}</span>
                    <span className="home_faq_pg_icon">
                      <PlusIcon />
                    </span>
                  </button>
                </h3>

                <div
                  id={`home_faq_pg_panel_${index}`}
                  role="region"
                  aria-labelledby={`home_faq_pg_btn_${index}`}
                  aria-hidden={!isOpen}
                  className="home_faq_pg_answer_wrap"
                >
                  <div className="home_faq_pg_answer_inner">
                    <p className="home_faq_pg_answer">{faq.answer}</p>
                  </div>
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