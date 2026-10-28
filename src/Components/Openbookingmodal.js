/* =====================================================================
   Shared helpers for the popups (video intro + booking form)
   Path: src/Components/Openbookingmodal.js
   ===================================================================== */

/* ---------- Booking form popup (BookForFree) ---------- */
export const BOOKING_EVENT = "upskld:open-booking";

// any "Book a free session" button  ->  onClick={openBookingModal}
export const openBookingModal = () => {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT));
};

/* ---------- Intro video popup (PopupVideo) ---------- */
export const VIDEO_EVENT = "upskld:open-video";

// header "Working Professionals" / "Students" tab  ->  openIntroVideo()
export const openIntroVideo = () => {
  window.dispatchEvent(new CustomEvent(VIDEO_EVENT));
};

/* ---------- Hero chip -> HomeAiPage tab ---------- */
export const SELECT_BUSINESS_EVENT = "upskld:select-business";

// id: retail | food | fashion | services | manufacturing | online | other
export const selectBusiness = (id) => {
  window.dispatchEvent(new CustomEvent(SELECT_BUSINESS_EVENT, { detail: { id } }));
};

/* ---------- Auto popup: "already closed it" flag ---------- */
const DISMISS_KEY = "upskld_popup_dismissed";
const DISMISS_DAYS = 7; // 0 = never show the auto popup again

export const wasPopupDismissed = () => {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    if (DISMISS_DAYS === 0) return true;
    return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch (e) {
    return false;
  }
};

export const markPopupDismissed = () => {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch (e) {
    /* private mode — ignore */
  }
};

/* ---------- Is the booking form open right now? ---------- */
let bookingOpen = false;
export const setBookingOpen = (value) => {
  bookingOpen = value;
};
export const isBookingOpen = () => bookingOpen;

/* ---------- Page scroll lock shared by every popup ----------
   Two popups can overlap for a moment (video -> form), so we count the locks
   instead of saving/restoring the body style in each popup. */
let lockCount = 0;
let savedOverflow = "";
let savedPadding = "";

export const lockScroll = () => {
  if (lockCount === 0) {
    const body = document.body;
    savedOverflow = body.style.overflow;
    savedPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }
  lockCount += 1;
};

export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPadding;
  }
};

export default openBookingModal;