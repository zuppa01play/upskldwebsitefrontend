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

/* ---------- Enquiry popup (EnquirePage) — footer / FAQ "Enquire" buttons ---------- */
export const ENQUIRY_EVENT = "upskld:open-enquiry";

export const openEnquiryModal = () => {
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT));
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

/* ---------- Auto popup: "already closed it" flag ----------
   Kept in memory only (NOT localStorage):
   - close pannina / form submit pannina -> same visit-la thirumba auto popup varaadhu
   - page refresh / new tab -> memory reset aagum, so 5 second-la popup thirumba varum
   Test-ku localStorage clear panna vendiya avasiyam illa. */
let popupDismissed = false;

export const wasPopupDismissed = () => popupDismissed;

export const markPopupDismissed = () => {
  popupDismissed = true;
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