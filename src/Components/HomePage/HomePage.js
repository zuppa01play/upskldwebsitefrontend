import React, { useState, useRef, useEffect, useCallback } from "react";
import "./HomePage.css";
import VideoOne from "./HomePageVideo/videoOne.mp4";
import VideoTwo from "./HomePageVideo/videoTwo.mp4";
import VideoThree from "./HomePageVideo/videoThree.mp4";
import { openBookingModal, selectBusiness } from "../Openbookingmodal";
/*
  HomePage is controlled from App.js:
    <HomePage activeIndex={activeIndex} />
  Order of `content` MUST match the order of navLinks in HeaderPage.jsx
*/

const content = [
  {
    title: "Small Business",
    tag: "For small businesses",
    heading: "We are entrepreneurs, and we'll show you how we use AI to build smarter businesses",
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
    stats: [
      { value: "+14.5%", label: "sales productivity with marketing automation", source: "Nucleus Research" },
      { value: "+451%", label: "more qualified leads with automated follow-ups", source: "Annuitas Group" },
      { value: "−12.2%", label: "marketing costs with marketing automation", source: "Nucleus Research" },
    ],
    video: VideoOne,
    imageAlt: "Small business owner using AI in her shop",
    badgeTop: { value: "+451%", label: "more qualified leads · Annuitas Group" },
    badgeBottom: { value: "300+", label: "learners in free sessions" },
  },
  {
    title: "Working Professionals",
    tag: "For working professionals",
    heading: "We are entrepreneurs, and we'll show you how we use AI to build smarter businesses",
    description:
      "Practical AI for people in non-tech roles — reports, emails, analysis and workflows, without writing code.",
    question: "What's your role?",
    hint: "Tap an option to explore what fits you",
    options: ["Sales", "HR", "Operations", "Finance", "Marketing", "Other"],
    primaryBtn: "Book a free session",
    secondaryBtn: "See all courses",
    stats: [
      { value: "32.5%", label: "of the work week saved by professionals using AI", source: "ActiveCampaign 2025" },
      { value: "27%", label: "of the week Indian sales reps spend actually selling", source: "Salesforce 2023" },
      { value: "200+", label: "working professionals trained", source: "Upskld" },
    ],
    video: VideoTwo,
    imageAlt: "Professionals using AI in a team meeting",
    badgeTop: { value: "32.5%", label: "of the week saved · ActiveCampaign" },
    badgeBottom: { value: "200+", label: "professionals trained" },
  },
  {
    title: "Student",
    tag: "For students",
    heading: "We are entrepreneurs, and we'll show you how we use AI to build smarter businesses",
    description: "Graduate job-ready, with AI on your side.",
    question: "What are you studying?",
    hint: "Tap an option to explore what fits you",
    options: ["Commerce", "Arts", "Science", "Engineering", "Management", "Other"],
    primaryBtn: "Book a free session",
    secondaryBtn: "See all courses",
    stats: [
      { value: "4+ Crore", label: "students in higher education", source: "Source" },
      { value: "24+ Lakh", label: "arts & science graduates", source: "Source" },
      { value: "100+", label: "students trained", source: "Upskld" },
    ],
    video: VideoThree,
    imageAlt: "Students learning together on campus",
    badgeTop: { value: "24+ Lakh", label: "arts & science graduates" },
    badgeBottom: { value: "100+", label: "students trained" },
  },
];

// Slide 0 chips -> matching tab id in HomeAiPage
const BUSINESS_IDS = {
  "Retail shop": "retail",
  "Food business": "food",
  "Apparel & fashion": "fashion",
  "Services": "services",
  "Manufacturing": "manufacturing",
  "Online seller": "online",
  "Other": "other",
};

const DEFAULT_RATIO = 1.35;
const MIN_RATIO = 0.9; // never taller than ~10:11
const MAX_RATIO = 1.35; // wide videos are cropped a little so the card stays tall

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

/*
  Muted, looping, autoplaying video.
  - React does not reliably write the `muted` attribute to the DOM, which makes
    browsers block autoplay. We set video.muted = true in a ref callback, before
    the source starts loading.
  - Plays only while its slide is active, restarts when the slide returns.
  - Reports its natural aspect ratio so the card can fit the video exactly.
*/
const SlideVideo = ({ src, label, active, eager, onRatio }) => {
  const ref = useRef(null);

  const setRef = useCallback((node) => {
    ref.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.setAttribute("muted", "");
      node.setAttribute("playsinline", "");
    }
  }, []);

  const tryPlay = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      try {
        video.currentTime = 0;
      } catch (e) {
        /* metadata not ready yet; onCanPlay will start it */
      }
      tryPlay();
    } else {
      video.pause();
    }
  }, [active, tryPlay]);

  const handleMeta = (e) => {
    const { videoWidth, videoHeight } = e.currentTarget;
    if (videoWidth && videoHeight && onRatio) onRatio(videoWidth / videoHeight);
  };

  return (
    <video
      ref={setRef}
      className="impac_home_pg_video"
      src={eager ? src : `${src}#t=0.001`}
      aria-label={label}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={eager ? "auto" : "metadata"}
      disablePictureInPicture
      controls={false}
      onLoadedMetadata={handleMeta}
      onCanPlay={() => active && tryPlay()}
    />
  );
};

const HomePage = ({ activeIndex = 0 }) => {
  // selected chip per slide  { 0: "Retail shop", 1: "Sales" }
  const [selectedOption, setSelectedOption] = useState({});
  // natural aspect ratio per slide video  { 0: 1.77, 1: 0.56 }
  const [ratios, setRatios] = useState({});

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector(".upskld_heade_pg_header");
    const offset = header ? header.offsetHeight : 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 10;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleOptionClick = (slideIndex, option) => {
    const businessId = slideIndex === 0 ? BUSINESS_IDS[option] : null;
    if (businessId) {
      // always select + open that business in the "By business type" section
      setSelectedOption((prev) => ({ ...prev, [slideIndex]: option }));
      selectBusiness(businessId);
      return;
    }
    setSelectedOption((prev) => ({
      ...prev,
      [slideIndex]: prev[slideIndex] === option ? null : option,
    }));
  };

  const handleRatio = (index, ratio) => {
    const clamped = Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio));
    setRatios((prev) => (prev[index] === clamped ? prev : { ...prev, [index]: clamped }));
  };

  return (
    <section className="impac_home_pg_section" id="home" lang="en">
      <div className="impac_home_pg_stage">
        {content.map((item, index) => {
          const isActive = index === activeIndex;
          const state = isActive ? "active" : index < activeIndex ? "prev" : "next";
          const tab = isActive ? 0 : -1; // keep hidden slides out of the tab order

          return (
            <article
              key={item.title}
              className={`impac_home_pg_slide impac_home_pg_slide_${state}`}
              aria-hidden={!isActive}
            >
              {/* ---------- Left content ---------- */}
              <div className="impac_home_pg_info">
                <span className="impac_home_pg_tag impac_home_pg_reveal" style={{ "--d": "0ms" }}>
                  <span className="impac_home_pg_tag_dot"></span>
                  {/* key changes with the chip -> text fades in again */}
                  <span
                    key={selectedOption[index] || "none"}
                    className="impac_home_pg_tag_text"
                  >
                    {item.tag}
                    {selectedOption[index] ? ` · ${selectedOption[index]}` : ""}
                  </span>
                </span>

                <h1 className="impac_home_pg_heading impac_home_pg_reveal" style={{ "--d": "80ms" }}>
                  {item.heading}
                </h1>

                <p className="impac_home_pg_desc impac_home_pg_reveal" style={{ "--d": "160ms" }}>
                  {item.description}
                </p>

                <div className="impac_home_pg_picker impac_home_pg_reveal" style={{ "--d": "240ms" }}>
                  <p className="impac_home_pg_question">{item.question}</p>
                  <p className="impac_home_pg_hint">{item.hint}</p>
                  <div className="impac_home_pg_chips">
                    {item.options.map((option, i) => (
                      <button
                        key={option}
                        type="button"
                        tabIndex={tab}
                        style={{ "--i": i }}
                        className={`impac_home_pg_chip ${
                          selectedOption[index] === option ? "impac_home_pg_chip_selected" : ""
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

                <div className="impac_home_pg_actions impac_home_pg_reveal" style={{ "--d": "360ms" }}>
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

                <div className="impac_home_pg_stats">
                  {item.stats.map((stat, i) => (
                    <div
                      key={stat.value}
                      className="impac_home_pg_stat impac_home_pg_reveal"
                      style={{ "--d": `${460 + i * 90}ms` }}
                    >
                      <h3 className="impac_home_pg_stat_value">{stat.value}</h3>
                      <p className="impac_home_pg_stat_label">{stat.label}</p>
                      <span className="impac_home_pg_stat_source">{stat.source}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------- Right video ---------- */}
              <div className="impac_home_pg_visual">
                <div
                  className="impac_home_pg_video_card"
                  style={{ aspectRatio: ratios[index] || DEFAULT_RATIO }}
                >
                  <SlideVideo
                    src={item.video}
                    label={item.imageAlt}
                    active={isActive}
                    eager={index === 0}
                    onRatio={(r) => handleRatio(index, r)}
                  />
                </div>

                <div className="impac_home_pg_badge impac_home_pg_badge_top">
                  <strong className="impac_home_pg_badge_value">{item.badgeTop.value}</strong>
                  <span className="impac_home_pg_badge_label">{item.badgeTop.label}</span>
                </div>

                <div className="impac_home_pg_badge impac_home_pg_badge_bottom">
                  <span className="impac_home_pg_badge_icon">
                    <UsersIcon />
                  </span>
                  <div className="impac_home_pg_badge_text">
                    <strong className="impac_home_pg_badge_value">{item.badgeBottom.value}</strong>
                    <span className="impac_home_pg_badge_label">{item.badgeBottom.label}</span>
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