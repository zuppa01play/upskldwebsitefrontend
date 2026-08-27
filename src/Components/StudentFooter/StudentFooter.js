import React, { useRef, useState, useEffect, useCallback } from "react";
import "./StudentFooter.css";
import vivekImg from "./PeopleImage/Vivek.png";
import rajashriImg from "./PeopleImage/RajaSri.png";
import venkateshImg from "./PeopleImage/Venkat.png";
import saiPattabiramImg from "./PeopleImage/Sai.png";
import rajmohanImg from "./PeopleImage/RajMohan.png";
import joeImg from "./PeopleImage/Joe.png";
import vanitaImg from "./PeopleImage/vanitha.jpeg";
import aparnaImg from "./PeopleImage/Aparna.png";

const peopleData = [
  {
    id: 1,
    image: vivekImg,
    name: "Vivek",
    role: "CO-FOUNDER",
    tags: "Leadership / AI / Business / Strategy",
  },
  {
    id: 2,
    image: rajashriImg,
    name: "Rajashri Sai",
    role: "CO-FOUNDER",
    tags: "Business / Strategy / AI adoption",
  },
  {
    id: 3,
    image: venkateshImg,
    name: "Venkatesh Sai",
    role: "AI TECHNOLOGY",
    tags: "AI Technology / Technology / Applied AI",
  },
  {
    id: 4,
    image: saiPattabiramImg,
    name: "Sai Pattabiram",
    role: "AI IN RESEARCH",
    tags: "AI / Research / Deep Technology",
  },
  {
    id: 5,
    image: rajmohanImg,
    name: "Rajmohan",
    role: "AI",
    tags: "AI / Industry applications",
  },
  {
    id: 6,
    image: joeImg,
    name: "Joe",
    role: "AI MARKETING",
    tags: "AI for Marketing / Digital Marketing / AI-powered growth",
  },
  {
    id: 7,
    image: vanitaImg,
    name: "Dr. Vanita",
    role: "AI EXPERT",
    tags: "Artificial Intelligence / Applied AI",
  },
  {
    id: 8,
    image: aparnaImg,
    name: "Dr. Aparna Rao",
    role: "AI EXPERT",
    tags: "Artificial Intelligence / AI applications",
  },
];

const StudentFooter = () => {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateArrowState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    updateArrowState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);

    return () => {
      track.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, [updateArrowState]);

  const scrollByCards = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".upskld_people_pg_card");
    const cardWidth = card ? card.getBoundingClientRect().width : 260;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * direction;
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div>
      <div id="experts" className="upskld_people_pg_wrapper">
        <div className="upskld_people_pg_header_block">
          <span className="upskld_people_pg_eyebrow">Expert Ecosystem</span>
          <h2 className="upskld_people_pg_title">
            Learn from people who understand AI
            <span className="upskld_people_pg_title_italic">
              {" "}
              beyond the hype.
            </span>
          </h2>
          <p className="upskld_people_pg_subtitle">
            AI intersects technology, business, marketing, research and
            leadership — so Upskld brings together people from across that
            map, not a single kind of expert.
          </p>
        </div>

        <div className="upskld_people_pg_slider">
          <button
            type="button"
            className="upskld_people_pg_arrow upskld_people_pg_arrow_prev"
            onClick={() => scrollByCards(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous experts"
          >
            &#8249;
          </button>

          <div className="upskld_people_pg_grid" ref={trackRef}>
            {peopleData.map((person) => (
              <div className="upskld_people_pg_card" key={person.id}>
                <div className="upskld_people_pg_avatar">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="upskld_people_pg_avatar_img"
                  />
                </div>
                <h3 className="upskld_people_pg_name">{person.name}</h3>
                <span className="upskld_people_pg_role">{person.role}</span>
                <p className="upskld_people_pg_tags">{person.tags}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="upskld_people_pg_arrow upskld_people_pg_arrow_next"
            onClick={() => scrollByCards(1)}
            disabled={!canScrollNext}
            aria-label="Next experts"
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFooter;