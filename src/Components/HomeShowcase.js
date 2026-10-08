import React, { useCallback, useEffect, useRef, useState } from "react";
import "./HomeShowcase.css";

import HomeForEnterprises from "./HomeForEnterprises/HomeForEnterprises";
import HomeUniversities from "./HomeUniversities/HomeUniversities";
import HomeForStudent from "./HomeForStudent/HomeForStudent";
import HomeCoursePage from "./HomeCoursePage/HomeCoursePage";
import HomeInstitution from "./HomeInstitution/HomeInstitution";
import HomeHelpingPeople from "./HomeHelpingPeople/HomeHelpingPeople";

/* ===================== SETTINGS ===================== */
const HEADER_SELECTOR = "header"; // unga header selector (eg: ".navbar", "#main-header"). Header illana "" kudunga
const MOBILE_BOTTOM_SAFE = 56;    // mobile browser bottom bar ku kudukkura space (px)
const PER = 1.5;                  // oru slide transition-ku evlo scroll (x screen height)
const TAIL = 0.6;                 // last slide la konjam hold (x screen height)
const HOLD_START = 0.25;          // transition start aagura munnadi hold (0-1)
const MOVE = 0.55;                // transition move aagura portion (0-1)
const PARALLAX_OUT = 28;          // pogura slide opposite side-ku evlo % move aagum
const PARALLAX_IN = 12;           // varra slide ulla content lag (%)
const MIN_SCALE = 0.5;            // chinna screen la content fit aaga min scale

/* index 1,3,5 -> LEFT la irundhu | index 2,4 -> RIGHT la irundhu */
const enterFrom = (i) => (i % 2 === 1 ? -1 : 1);

const SLIDES = [
  {
    key: "enterprises",
    label: "For Enterprises",
    Component: HomeForEnterprises,
    visibleClass: "home_impact_enterprises_pg_visible",
  },
  {
    key: "universities",
    label: "For Universities",
    Component: HomeUniversities,
    visibleClass: "impact_universities_pg_visible",
    revealedClass: "impact_universities_pg_revealed",
    revealDelay: 1400,
  },
  {
    key: "students",
    label: "For Students",
    Component: HomeForStudent,
    visibleClass: "for_student_ho_pg_visible",
  },
  {
    key: "courses",
    label: "Courses",
    Component: HomeCoursePage,
    visibleClass: "career_home_pg_visible",
  },
];

const N = SLIDES.length;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

/* Fixed / sticky header irundha adhoda height (transform ku affect aagaadhu) */
const getHeaderHeight = () => {
  if (!HEADER_SELECTOR || typeof document === "undefined") return 0;
  const el = document.querySelector(HEADER_SELECTOR);
  if (!el) return 0;
  const pos = window.getComputedStyle(el).position;
  if (pos !== "fixed" && pos !== "sticky") return 0;
  return Math.round(el.offsetHeight || 0);
};

const HomeShowcase = () => {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const barRef = useRef(null);
  const slideRefs = useRef([]);
  const layerRefs = useRef([]);
  const innerRefs = useRef([]);
  const metrics = useRef({ stageH: 0, stageW: 0, safe: 0 });
  const navRef = useRef(0);
  const lastWin = useRef({ w: 0, h: 0 });
  const activeFlags = useRef(SLIDES.map(() => false));
  const revealTimers = useRef({});
  const rafRef = useRef(0);
  const refitRaf = useRef(0);

  const [trackH, setTrackH] = useState(0);
  const [current, setCurrent] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* ---------- Fit: content screen height ku scale aagum ---------- */
  const fitSlide = useCallback((i) => {
    const inner = innerRefs.current[i];
    const { stageH, stageW, safe } = metrics.current;
    const effH = stageH - safe;
    if (!inner || effH <= 0 || !stageW) return;

    let s = 1;
    for (let k = 0; k < 3; k += 1) {
      inner.style.width = `${stageW / s}px`;
      inner.style.minHeight = "0px";
      const h = inner.offsetHeight || 1;
      const next = clamp(effH / h, MIN_SCALE, 1);
      if (Math.abs(next - s) < 0.005) {
        s = next;
        break;
      }
      s = next;
    }

    inner.style.width = `${stageW / s}px`;
    inner.style.minHeight = `${effH / s}px`;
    inner.style.setProperty("--fit", s.toFixed(4));
  }, []);

  /* ---------- Apply progress (p = 0 ... N-1) ---------- */
  const applyProgress = useCallback((p) => {
    SLIDES.forEach((cfg, i) => {
      const slide = slideRefs.current[i];
      const layer = layerRefs.current[i];
      if (!slide || !layer) return;

      const d = p - i;
      let x = 0;
      let lx = 0;
      let scale = 1;
      let opacity = 1;
      let visible = true;
      let shadow = false;

      if (d <= -1) {
        visible = false;
        x = enterFrom(i) * 100;
      } else if (d < 0) {
        const t = -d;
        x = enterFrom(i) * t * 100;
        lx = -enterFrom(i) * t * PARALLAX_IN;
        shadow = true;
      } else if (i < N - 1) {
        if (d >= 1) {
          visible = false;
          x = -enterFrom(i + 1) * 100;
        } else {
          x = -enterFrom(i + 1) * d * PARALLAX_OUT;
          scale = 1 - 0.05 * d;
          opacity = 1 - 0.5 * d;
        }
      }

      slide.style.transform = `translate3d(${x}%,0,0) scale(${scale})`;
      slide.style.opacity = String(opacity);
      slide.style.visibility = visible ? "visible" : "hidden";
      slide.style.zIndex = String(i + 1);
      slide.style.boxShadow = shadow
        ? "0 0 60px rgba(20, 8, 70, 0.25)"
        : "none";
      layer.style.transform = `translate3d(${lx}%,0,0)`;

      /* animations trigger / replay */
      const root = slide.querySelector("section");
      if (!root) return;
      const dist = Math.abs(d);

      if (dist < 0.55 && !activeFlags.current[i]) {
        activeFlags.current[i] = true;
        root.classList.add(cfg.visibleClass);
        if (cfg.revealedClass) {
          clearTimeout(revealTimers.current[i]);
          revealTimers.current[i] = setTimeout(() => {
            root.classList.add(cfg.revealedClass);
          }, cfg.revealDelay || 1200);
        }
      } else if (dist >= 0.98 && activeFlags.current[i]) {
        activeFlags.current[i] = false;
        clearTimeout(revealTimers.current[i]);
        root.classList.remove(cfg.visibleClass);
        if (cfg.revealedClass) root.classList.remove(cfg.revealedClass);
      }
    });
  }, []);

  /* ---------- Scroll -> progress ---------- */
  const update = useCallback(() => {
    const track = trackRef.current;
    const { stageH } = metrics.current;
    if (!track || !stageH) return;

    const rect = track.getBoundingClientRect();
    const max = ((N - 1) * PER + TAIL) * stageH;
    const scrolled = clamp(navRef.current - rect.top, 0, max);
    const u = Math.min(scrolled / (stageH * PER), N - 1);
    const i = Math.min(Math.floor(u), N - 2);
    const f = u - i;
    const t = smooth(clamp((f - HOLD_START) / MOVE, 0, 1));
    const p = i + t;

    applyProgress(p);

    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${p / (N - 1)})`;
    }
    const idx = Math.round(p);
    setCurrent((prev) => (prev === idx ? prev : idx));
  }, [applyProgress]);

  /* ---------- Measure (header height + stage size) ---------- */
  const measure = useCallback(
    (force) => {
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) return;

      const nav = getHeaderHeight();
      const navChanged = nav !== navRef.current;
      navRef.current = nav;

      const coarse =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;
      const safe = coarse ? MOBILE_BOTTOM_SAFE : 0;

      track.style.setProperty("--showcase_nav", `${nav}px`);
      track.style.setProperty("--showcase_safe", `${safe}px`);

      const stageH = stage.clientHeight;
      const stageW = stage.clientWidth;
      const prev = metrics.current;

      if (
        force !== true &&
        !navChanged &&
        prev.stageH === stageH &&
        prev.stageW === stageW &&
        prev.safe === safe
      ) {
        update();
        return;
      }

      metrics.current = { stageH, stageW, safe };
      setTrackH(Math.round(((N - 1) * PER + 1 + TAIL) * stageH));
      SLIDES.forEach((_, i) => fitSlide(i));
      update();
    },
    [fitSlide, update]
  );

  useEffect(() => {
    if (reduced) return undefined;

    lastWin.current = { w: window.innerWidth, h: window.innerHeight };
    measure(true);

    const readyRaf = requestAnimationFrame(() => {
      if (stageRef.current) stageRef.current.classList.add("upskld_showcase_ready");
    });

    const isCoarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const widthChanged = w !== lastWin.current.w;

      /* mobile address bar show/hide = chinna height change -> ignore */
      if (isCoarse && !widthChanged && Math.abs(h - lastWin.current.h) < 200) {
        return;
      }
      lastWin.current = { w, h };

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => measure(true));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("load", onResize);

    /* content height maarina (eg. Universities cards grow) -> refit */
    let ro;
    let headerRo;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        cancelAnimationFrame(refitRaf.current);
        refitRaf.current = requestAnimationFrame(() => {
          SLIDES.forEach((_, i) => fitSlide(i));
        });
      });
      slideRefs.current.forEach((slide) => {
        const root = slide && slide.querySelector("section");
        if (root) ro.observe(root);
      });

      /* header height maarina -> re-measure */
      const headerEl = HEADER_SELECTOR
        ? document.querySelector(HEADER_SELECTOR)
        : null;
      if (headerEl) {
        headerRo = new ResizeObserver(() => measure());
        headerRo.observe(headerEl);
      }
    }

    /* fonts / images / header late load aana apram re-measure */
    const late1 = setTimeout(() => measure(true), 600);
    const late2 = setTimeout(() => measure(true), 1600);

    const timers = revealTimers.current;
    return () => {
      cancelAnimationFrame(readyRaf);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(refitRaf.current);
      clearTimeout(late1);
      clearTimeout(late2);
      Object.values(timers).forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("load", onResize);
      if (ro) ro.disconnect();
      if (headerRo) headerRo.disconnect();
    };
  }, [reduced, measure, update, fitSlide]);

  /* ---------- Dots click -> andha slide ku scroll ---------- */
  const goTo = (k) => {
    const track = trackRef.current;
    if (!track) return;
    const { stageH } = metrics.current;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: trackTop - navRef.current + k * PER * stageH,
      behavior: "smooth",
    });
  };

  /* ---------- Reduced motion: normal stacked pages ---------- */
  if (reduced) {
    return (
      <>
        {SLIDES.map(({ key, Component }) => (
          <Component key={key} />
        ))}
      </>
    );
  }

  return (
    <div
      className="upskld_showcase_track"
      ref={trackRef}
      style={{ height: trackH ? `${trackH}px` : "auto" }}
    >
      <div className="upskld_showcase_stage" ref={stageRef}>
        <div className="upskld_showcase_bar" aria-hidden="true">
          <span className="upskld_showcase_bar_fill" ref={barRef} />
        </div>

        {SLIDES.map(({ key, Component }, i) => (
          <div
            key={key}
            className="upskld_showcase_slide"
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            style={{
              visibility: i === 0 ? "visible" : "hidden",
              zIndex: i + 1,
            }}
          >
            <div
              className="upskld_showcase_layer"
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
            >
              <div
                className="upskld_showcase_inner"
                ref={(el) => {
                  innerRefs.current[i] = el;
                }}
              >
                <Component />
              </div>
            </div>
          </div>
        ))}

        <div
          className="upskld_showcase_dots"
          role="navigation"
          aria-label="Sections"
        >
          {SLIDES.map(({ key, label }, i) => (
            <button
              key={key}
              type="button"
              className={`upskld_showcase_dot${
                current === i ? " upskld_showcase_dot_active" : ""
              }`}
              aria-label={label}
              aria-current={current === i ? "true" : undefined}
              onClick={() => goTo(i)}
            >
              <span className="upskld_showcase_dot_label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeShowcase;