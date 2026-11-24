import React, { useEffect, useState } from "react";
import "./HomePage.css";
import "./HomePageSlider.css";
import "./HomePageSliderFade.css";
import { openBookingModal, selectBusiness,
} from "../Openbookingmodal";
import { Helmet } from "react-helmet-async";

/* NOTE: file names are case-sensitive on the Linux server.
   Make sure each name below matches the real file name exactly. */
import smallbusinessImgOne from "./Smallbusiness_1.jpg";
import smallbusinessImgTwo from "./Smallbusiness_2.jpeg";
import smallbusinessImgThree from "./Smallbusiness_3.jpeg";
import smallbusinessImgFour from "./Smallbusiness_4.jpeg";
import smallbusinessImgFive from "./SmallBusiness_5.jpg";

import WorkingProfessionalsImgOne from "./WP_1.jpeg";
import WorkingProfessionalsImgTwo from "./WP_2.jpeg";
import WorkingProfessionalsImgThree from "./WP_3.jpeg";
import WorkingProfessionalsImgFour from "./WP_4.jpeg";

import StudentsImgOne from "./S_1.jpg";
import StudentsImgTwo from "./S_2.jpg";
import StudentsImgThree from "./S_3.jpg";
import StudentsImgFour from "./S_4.jpg";
import StudentsImgFive from "./S_5.jpg";
import StudentsImgSix from "./S_6.jpg";





const SLIDE_INTERVAL = 3000;

const content = [
  {
    title: "Small Business",
    tag: "For small businesses",
    heading:
      "We are entrepreneurs, and we'll show you how we use AI to build smarter businesses",
    description:
      "Learn to automate sales, marketing, follow-ups and accounts — in plain language, with tools that work for a business like yours.",
    question: "What kind of business do you run?",
    hint: "Tap an option to explore what fits you",
    options: [
      "Retail shop",
      "Food business",
      "Apparel & fashion",
      "Services",
      "Manufacturing",
      "Online seller",
      "Other",
    ],
    primaryBtn: "Book a free session",
    secondaryBtn: "See all courses",
    images: [
      smallbusinessImgOne,
      smallbusinessImgTwo,
      smallbusinessImgThree,
      smallbusinessImgFour,
      smallbusinessImgFive,
    ],
    // Alt text for each slide image. Refine against the real photo content.
    imageAlts: [
      "Small business learning practical ways to use AI in daily business operations",
      "Small business owner exploring AI tools for business growth",
      "Entrepreneur developing digital skills to improve a small business",
      "Small business team learning to streamline everyday work with technology",
      "Business owner building practical skills for sales, marketing and operations",
    ],
    badgeTop: {
      value: "+451%",
      label: "more qualified leads · Annuitas Group",
    },
    badgeBottom: {
      value: "300+",
      label: "learners in free sessions",
    },
  },
  {
    title: "Working Professionals",
    tag: "For working professionals",
    heading: "Turn the AI Skill Gap into Your Biggest Career Advantage.",
    description:
      "Practical, job-aligned AI training for non-technical professionals. Learn to automate your daily corporate workflows, make sharper decisions, and future-proof your career without writing a single line of code.",
    question: "What's your role?",
    hint: "Tap an option to explore what fits you",
    options: ["Sales", "HR", "Operations", "Finance", "Marketing", "Other"],
    primaryBtn: "Book a free session",
    secondaryBtn: "See all courses",
    images: [
      WorkingProfessionalsImgOne,
      WorkingProfessionalsImgTwo,
      WorkingProfessionalsImgThree,
      WorkingProfessionalsImgFour,
    ],
    imageAlts: [
      "Working professionals developing practical artificial intelligence skills",
      "Corporate team exploring AI tools for everyday workplace tasks",
      "Professionals learning to improve business workflows with AI",
      "Workplace learning session focused on digital and AI skills",
    ],
    badgeTop: {
      value: "32.5%",
      label: "of the week saved · ActiveCampaign",
    },
    badgeBottom: {
      value: "200+",
      label: "professionals trained",
    },
  },
  {
    title: "Student",
    tag: "For students",
    heading: "From AI Anxiety to AI Advantage.",
    description:
      "You don't need to be an engineer to be AI-ready. We help non-tech students master practical AI skills, changing the question from “Will AI replace me?” to “What can I achieve with AI beside me?”",
    question: "What are you studying?",
    hint: "Tap an option to explore what fits you",
    options: [
      "Commerce",
      "Arts",
      "Science",
      "Engineering",
      "Management",
      "Other",
    ],
    primaryBtn: "Book a free session",
    secondaryBtn: "See all courses",
    images: [
      StudentsImgOne,
      StudentsImgTwo,
      StudentsImgThree,
      StudentsImgFour,
      StudentsImgFive,
      StudentsImgSix,
    ],
    imageAlts: [
      "Students building practical AI skills for their future careers",
      "Student learning session focused on artificial intelligence skills",
      "College students exploring digital tools and AI learning",
      "Students developing technology skills for academic and career growth",
      "Higher education students preparing for an AI-enabled workplace",
      "Student-focused practical learning for artificial intelligence",
    ],
    badgeTop: {
      value: "24+ Lakh",
      label: "arts & science graduates",
    },
    badgeBottom: {
      value: "100+",
      label: "students trained",
    },
  },
];

const CHIP_IDS = {
  0: {
    "Retail shop": "retail",
    "Food business": "food",
    "Apparel & fashion": "fashion",
    Services: "services",
    Manufacturing: "manufacturing",
    "Online seller": "online",
    Other: "other",
  },
  1: {
    Sales: "hours",
    HR: "focus",
    Operations: "Operations",
    Finance: "Finance",
    Marketing: "Marketing",
    Other: "Others",
  },
  2: {
    Commerce: "Commerce",
    Arts: "Arts",
    Science: "Science",
    Engineering: "Engineering",
    Management: "Management",
    Other: "StudentOthers",
  },
};

const ArrowIcon = ({ className = "impac_home_pg_arrow" }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="impac_home_pg_chip_icon"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ImageSlider = ({
  images = [],
  imageAlts = [],
  alt = "",
  active,
  eager,
}) => {
  const safeImages = Array.isArray(images) ? images : [];
  const safeAlts = Array.isArray(imageAlts) ? imageAlts : [];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  const count = safeImages.length;

  useEffect(() => {
    if (!active) {
      setCurrent(0);
      setPrev(null);
      return undefined;
    }

    if (count < 2) return undefined;

    const timer = setTimeout(() => {
      setPrev(current);
      setCurrent((current + 1) % count);
    }, SLIDE_INTERVAL);

    return () => clearTimeout(timer);
  }, [active, count, current]);

  const goTo = (index) => {
    if (index === current || index < 0 || index >= count) return;
    setPrev(current);
    setCurrent(index);
  };

  if (count === 0) {
    return null;
  }

  return (
    <div className="impac_home_pg_slider">
      {safeImages.map((src, index) => {
        const isCurrent = index === current;
        const isLeaving = index === prev && prev !== current;
        const imageAlt = safeAlts[index] || alt;

        return (
          <img
            key={`${src}-${index}`}
            className={`impac_home_pg_img impac_home_pg_slider_img ${
              index === 0 ? "" : "impac_home_pg_slider_img_abs"
            } ${
              isCurrent ? "impac_home_pg_slider_img_active" : ""
            } ${
              isLeaving ? "impac_home_pg_slider_img_leaving" : ""
            }`}
            src={src}
            alt={imageAlt}
            aria-hidden={!isCurrent}
            loading={eager && index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
          />
        );
      })}

      {count > 1 && (
        <div className="impac_home_pg_slider_dots">
          {safeImages.map((_, index) => (
            <button
              key={index}
              type="button"
              tabIndex={active ? 0 : -1}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              className={`impac_home_pg_slider_dot ${
                index === current ? "impac_home_pg_slider_dot_active" : ""
              }`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = ({ activeIndex = 0 }) => {
  // Selected chip per slide: { 0: "Retail shop", 1: "Sales" }
  const [selectedOption, setSelectedOption] = useState({});

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const header = document.querySelector(".upskld_heade_pg_header");
    const offset = header ? header.offsetHeight : 80;
    const top =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      offset -
      10;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleOptionClick = (slideIndex, option) => {
    const businessId = CHIP_IDS[slideIndex]
      ? CHIP_IDS[slideIndex][option]
      : null;

    if (businessId) {
      setSelectedOption((previous) => ({
        ...previous,
        [slideIndex]: option,
      }));
      selectBusiness(businessId);
      return;
    }

    setSelectedOption((previous) => ({
      ...previous,
      [slideIndex]: previous[slideIndex] === option ? null : option,
    }));
  };

  return (
    <section className="impac_home_pg_section" id="home" lang="en">


      <Helmet>
  <title>Upskld AI | Practical AI Training for Small Businesses, Professionals & Students</title>
  <meta name="description" content="Learn to use AI for sales, marketing, finance and your career, in plain language. Book a free 15-minute session with Upskld AI." />
  <link rel="canonical" href="https://upskldai.com/" />
  <meta property="og:url" content="https://upskldai.com/" />
</Helmet>
      <div className="impac_home_pg_stage">
        {content.map((item, index) => {
          const isActive = index === activeIndex;
          const state = isActive
            ? "active"
            : index < activeIndex
            ? "prev"
            : "next";
               const tab = isActive ? 0 : -1;
          const Heading = isActive ? "h1" : "h2";

          return (
            <article
              key={item.title}
              className={`impac_home_pg_slide impac_home_pg_slide_${state}`}
              aria-hidden={!isActive}
            >
              {/* Left content */}
              <div className="impac_home_pg_info">
                <span
                  className="impac_home_pg_tag impac_home_pg_reveal"
                  style={{ "--d": "0ms" }}
                >
                  <span className="impac_home_pg_tag_dot"></span>
                  <span
                    key={selectedOption[index] || "none"}
                    className="impac_home_pg_tag_text"
                  >
                    {item.tag}
                  </span>
                </span>

                                <Heading
                  className="impac_home_pg_heading impac_home_pg_reveal"
                  style={{ "--d": "80ms" }}
                >
                  {item.heading}
                </Heading>

                <p
                  className="impac_home_pg_desc impac_home_pg_reveal"
                  style={{ "--d": "160ms" }}
                >
                  {item.description}
                </p>

                <div
                  className="impac_home_pg_picker impac_home_pg_reveal"
                  style={{ "--d": "240ms" }}
                >
                  <p className="impac_home_pg_question">{item.question}</p>
                  <p className="impac_home_pg_hint">{item.hint}</p>

                  <div className="impac_home_pg_chips">
                    {item.options.map((option, optionIndex) => (
                      <button
                        key={option}
                        type="button"
                        tabIndex={tab}
                        style={{ "--i": optionIndex }}
                        className={`impac_home_pg_chip ${
                          selectedOption[index] === option
                            ? "impac_home_pg_chip_selected"
                            : ""
                        }`}
                        aria-pressed={selectedOption[index] === option}
                        onClick={() => handleOptionClick(index, option)}
                      >
                        {option}
                        {selectedOption[index] === option ? (
                          <CheckIcon />
                        ) : (
                          <ArrowIcon className="impac_home_pg_chip_icon" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="impac_home_pg_actions impac_home_pg_reveal"
                  style={{ "--d": "360ms" }}
                >
                  <button
                    type="button"
                    tabIndex={tab}
                    className="impac_home_pg_btn_primary"
                    onClick={openBookingModal}
                  >
                    <span>{item.primaryBtn}</span>
                    <ArrowIcon />
                  </button>

                  <button
                    type="button"
                    tabIndex={tab}
                    className="impac_home_pg_btn_secondary"
                    onClick={() => scrollToId("courses")}
                  >
                    {item.secondaryBtn}
                  </button>
                </div>
              </div>

              {/* Right image slider */}
              <div className="impac_home_pg_visual">
                <div className="impac_home_pg_video_card">
                  <ImageSlider
                    images={item.images}
                    imageAlts={item.imageAlts}
                    alt={`${item.title} learning and development`}
                    active={isActive}
                    eager={index === 0}
                  />
                </div>

                <div className="impac_home_pg_badge impac_home_pg_badge_top">
                  <strong className="impac_home_pg_badge_value">
                    {item.badgeTop.value}
                  </strong>
                  <span className="impac_home_pg_badge_label">
                    {item.badgeTop.label}
                  </span>
                </div>

                <div className="impac_home_pg_badge impac_home_pg_badge_bottom">
                  <span className="impac_home_pg_badge_icon">
                    <UsersIcon />
                  </span>
                  <div className="impac_home_pg_badge_text">
                    <strong className="impac_home_pg_badge_value">
                      {item.badgeBottom.value}
                    </strong>
                    <span className="impac_home_pg_badge_label">
                      {item.badgeBottom.label}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;