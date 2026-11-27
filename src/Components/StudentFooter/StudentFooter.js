import React, { useRef, useState, useEffect, useCallback } from "react";
import "./StudentFooter.css";
import vivekImg from "./PeopleImage/Vivek.webp";
import rajashriImg from "./PeopleImage/RajaSri.webp";
import venkateshImg from "./PeopleImage/Venkat.webp";
import saiPattabiramImg from "./PeopleImage/Sai.webp";
import rajmohanImg from "./PeopleImage/RajMohan.webp";
import joeImg from "./PeopleImage/Joe.webp";
import vanitaImg from "./PeopleImage/vanitha.jpeg";
import aparnaImg from "./PeopleImage/Aparna.webp";

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
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
  });
  const rafRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [thumbWidth, setThumbWidth] = useState(30);
  const [thumbLeft, setThumbLeft] = useState(0);

  /* ---------- Arrow + progress state ---------- */
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 4);

    const ratio =
      track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1;
    const widthPercent = Math.min(100, Math.max(12, ratio * 100));
    const progress = maxScrollLeft > 0 ? track.scrollLeft / maxScrollLeft : 0;

    setThumbWidth(widthPercent);
    setThumbLeft(progress * (100 - widthPercent));
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateScrollState();
    });
  }, [updateScrollState]);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return undefined;

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollState);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, updateScrollState]);

  /* ---------- Reveal on scroll ---------- */
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* ---------- Arrow click ---------- */
  const scrollByCards = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".upskld_people_pg_card");
    const cardWidth = card ? card.getBoundingClientRect().width : 260;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 24;

    track.scrollBy({
      left: (cardWidth + gap) * direction,
      behavior: "smooth",
    });
  };

  /* ---------- Keyboard support ---------- */
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    }
  };

  /* ---------- Mouse drag to scroll (desktop only) ---------- */
  const handlePointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag.active || !track) return;
    track.scrollLeft = drag.startScroll - (e.clientX - drag.startX);
  };

  const endDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <div>
      <div
        id="experts"
        ref={wrapperRef}
        className={`upskld_people_pg_wrapper${
          inView ? " upskld_people_pg_in_view" : ""
        }`}
      >
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
          <div
            className={`upskld_people_pg_grid${
              isDragging ? " upskld_people_pg_grid_dragging" : ""
            }`}
            ref={trackRef}
            role="region"
            aria-label="Upskld experts"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {peopleData.map((person, index) => (
              <div
                className="upskld_people_pg_card"
                key={person.id}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="upskld_people_pg_avatar">
                  <span className="upskld_people_pg_avatar_ring" aria-hidden="true" />
                  <img
                    src={person.image}
                    alt={person.name}
                    className="upskld_people_pg_avatar_img"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </div>
                <h3 className="upskld_people_pg_name">{person.name}</h3>
                <span className="upskld_people_pg_role">{person.role}</span>
                <div className="upskld_people_pg_tags">
                  {person.tags.split(" / ").map((tag) => (
                    <span className="upskld_people_pg_tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="upskld_people_pg_controls">
            <button
              type="button"
              className="upskld_people_pg_arrow upskld_people_pg_arrow_prev"
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous experts"
            >
              &#8249;
            </button>

            <div className="upskld_people_pg_progress" aria-hidden="true">
              <span
                className="upskld_people_pg_progress_thumb"
                style={{
                  width: `${thumbWidth}%`,
                  left: `${thumbLeft}%`,
                }}
              />
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
    </div>
  );
};

export default StudentFooter;