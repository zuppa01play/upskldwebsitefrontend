import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BOOKING_EVENT,
  VIDEO_EVENT,
  openBookingModal,
  lockScroll,
  unlockScroll,
  wasPopupDismissed,
  markPopupDismissed,
  isBookingOpen,
} from "../../Components/Openbookingmodal";
import "./PopupVideo.css";
 



const DEFAULT_SRC = "https://res.cloudinary.com/dk50cmtps/video/upload/v1780034028/drone_yzbva8.mp4";
const OPEN_DELAY_MS = 5000; // website open aanadhum 5s apram
const CLOSE_MS = 260; // CSS exit animation-oda match aaganum

const formatTime = (seconds) => {
  const total = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const SpeakerIcon = ({ muted }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 5L6 9H3v6h3l5 4V5z" />
    {muted ? (
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    ) : (
      <>
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 6a9 9 0 0 1 0 12" />
      </>
    )}
  </svg>
);

const PopupVideo = (props) => {
  // props can never crash this popup, even if it is called without any
  const {
    src = DEFAULT_SRC,
    caption = "[Upskld intro video · 30–60 sec]",
    delay = OPEN_DELAY_MS,
  } = props || {};

  const [isOpen, setIsOpen] = useState(false); // popup mounted?
  const [isClosing, setIsClosing] = useState(false); // exit animation running?
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0 … 1
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const closingRef = useRef(false);
  const timersRef = useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  /* ---------------- open / close ---------------- */
  const openPopup = useCallback(() => {
    closingRef.current = false;
    setMuted(true);
    setProgress(0);
    setCurrent(0);
    setDuration(0);
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  // goToForm = true  -> open the booking form after the video has closed
  const finish = useCallback((goToForm) => {
    if (closingRef.current) return;
    closingRef.current = true;
    const video = videoRef.current;
    if (video) video.pause();
    setIsClosing(true);
    later(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (goToForm) openBookingModal();
    }, CLOSE_MS);
  }, []);

  const closeAll = useCallback(() => {
    markPopupDismissed(); // Close pannina thirumba auto popup varaadhu
    finish(false);
  }, [finish]);

  const skipToBooking = useCallback(() => finish(true), [finish]);

  /* ---------- 5 seconds after the website opens ---------- */
  useEffect(() => {
    if (wasPopupDismissed()) return undefined;
    const id = setTimeout(() => {
      // user already opened the form by himself / closed it earlier -> do not interrupt
      if (isBookingOpen() || wasPopupDismissed()) return;
      openPopup();
    }, delay);
    return () => clearTimeout(id);
  }, [delay, openPopup]);

  /* ---------- header tab (Working Professionals / Students) -> video after 5 seconds ---------- */
  const tabTimerRef = useRef(null);

  useEffect(() => {
    const onVideo = () => {
      // tab click panna udane illa — 5s apram. Adutha tab click vandha timer-ah restart pannum
      clearTimeout(tabTimerRef.current);
      tabTimerRef.current = setTimeout(() => {
        if (isBookingOpen()) return; // form already open -> do not interrupt
        openPopup();
      }, delay);
    };
    window.addEventListener(VIDEO_EVENT, onVideo);
    return () => {
      window.removeEventListener(VIDEO_EVENT, onVideo);
      clearTimeout(tabTimerRef.current);
    };
  }, [delay, openPopup]);

  /* ---------- a "Book a free session" button was clicked -> hide the video quietly ---------- */
  useEffect(() => {
    const onBooking = () => {
      clearTimeout(tabTimerRef.current); // pending 5s video is not needed any more
      if (!isOpen || closingRef.current) return;
      closingRef.current = true;
      const video = videoRef.current;
      if (video) video.pause();
      setIsClosing(true);
      later(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, CLOSE_MS);
    };
    window.addEventListener(BOOKING_EVENT, onBooking);
    return () => window.removeEventListener(BOOKING_EVENT, onBooking);
  }, [isOpen]);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );

  /* ---------- scroll lock, Esc, focus trap ---------- */
  useEffect(() => {
    if (!isOpen) return undefined;

    lockScroll();

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeAll();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll("button:not([disabled])");
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const focusTimer = setTimeout(() => {
      if (skipRef.current) skipRef.current.focus({ preventScroll: true });
    }, 150);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      unlockScroll();
    };
  }, [isOpen, closeAll]);

  /* ---------- video ---------- */
  // React does not reliably write `muted` to the DOM, so autoplay can get blocked
  const setVideoRef = useCallback((node) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.setAttribute("muted", "");
      node.setAttribute("playsinline", "");
    }
  }, []);

  const tryPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };

  const handleTimeUpdate = (e) => {
    const { currentTime, duration: total } = e.currentTarget;
    setCurrent(currentTime);
    if (total) setProgress(Math.min(1, currentTime / total));
  };

  const handleMeta = (e) => setDuration(e.currentTarget.duration || 0);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next) tryPlay();
  };

  if (!isOpen) return null;

  const modal = (
    <div
      className={`popup_video_pg_overlay ${isClosing ? "popup_video_pg_overlay_out" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAll();
      }}
    >
      <div
        ref={dialogRef}
        className="popup_video_pg_dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Upskld intro video"
      >
        {/* ---------- Video ---------- */}
        <div className="popup_video_pg_player">
          <video
            ref={setVideoRef}
            className="popup_video_pg_video"
            src={src}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            onLoadedMetadata={handleMeta}
            onCanPlay={tryPlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={skipToBooking} /* video mudinjathum form */
            onError={skipToBooking} /* video file illana direct-a form */
          />

          <div className="popup_video_pg_shade" aria-hidden="true"></div>

          <span className="popup_video_pg_time" aria-hidden="true">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <button
            type="button"
            className="popup_video_pg_mute"
            onClick={toggleMute}
            aria-pressed={!muted}
          >
            <SpeakerIcon muted={muted} />
            <span>{muted ? "Unmute" : "Mute"}</span>
          </button>

          <div className="popup_video_pg_track" aria-hidden="true">
            <span className="popup_video_pg_fill" style={{ width: `${progress * 100}%` }}></span>
          </div>
        </div>

        {/* ---------- Footer ---------- */}
        <div className="popup_video_pg_footer">
          <p className="popup_video_pg_caption">{caption}</p>

          <div className="popup_video_pg_actions">
            <button
              ref={skipRef}
              type="button"
              className="popup_video_pg_btn_primary"
              onClick={skipToBooking}
            >
              Skip to booking →
            </button>
            <button type="button" className="popup_video_pg_btn_ghost" onClick={closeAll}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default PopupVideo;