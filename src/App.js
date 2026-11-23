import "./App.css";
import HeaderPage from "./HeadFootPage/HeaderPage/HeaderPage";
import HomePage from "./Components/HomePage/HomePage";
import HomeAiPage from "./Components/HomeAiPage/HomeAiPage";
import HomePhilosophyPage from "./Components/HomePhilosophyPage/HomePhilosophyPage";
import HomeReviewPage from "./Components/HomeReviewPage/HomeReviewPage";
import BookForFree from "./POPUP/BookForFree/BookForFree";
import EnquirePage from "./POPUP/EnquirePage/EnquirePage";
import PopupVideo from "./POPUP/PopupVideo/PopupVideo";
import FooterPage from "./HeadFootPage/FooterPage/FooterPage";
import HomeAiReplace from "./Components/HomeAiReplace/HomeAiReplace";
import HomeHelpingPeople from "./Components/HomeHelpingPeople/HomeHelpingPeople";
import HomeFaqPage from "./Components/HomeFaqPage/HomeFaqPage";
import AboutPage from "./Pages/AboutPage/AboutPage"; // path unga folder structure-ku match pannunga
import ScrollToTop from "./ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivacyPolicy from "./HeadFootPage/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./HeadFootPage/TermsAndConditions/TermsAndConditions";

import PageNotFound from "./Components/PageNotFound/PageNotFound";
import BootCamp from "./BootCamp/BootCamp";

function HomeContent({ activeIndex }) {
  return (
    <>
      <HomePage activeIndex={activeIndex} />
      <HomePhilosophyPage />
      <HomeAiPage activeIndex={activeIndex} />
      <br />
      <HomeAiReplace activeIndex={activeIndex} />
      <br />
      <HomeReviewPage activeIndex={activeIndex} />
      <HomeHelpingPeople activeIndex={activeIndex} />
      <HomeFaqPage />
    </>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { pathname } = useLocation();

  // trailing slash, capital letters irundhalum work aagum (/bootcamp, /Bootcamp/, /bootcamp/)
  const currentPath = pathname.toLowerCase().replace(/\/+$/, "") || "/";

  // Bootcamp page: header, footer, popups edhume vara koodadhu
  const isBootcampPage = currentPath === "/bootcamp";

  // Privacy / Terms page: video popup mattum hide
  const hidePopupVideo = ["/privacypolicy", "/termsandconditions"].includes(
    currentPath
  );

  return (
    <div>
      <ScrollToTop />

      {/* Header: bootcamp page la hide */}
      {!isBootcampPage && (
        <HeaderPage activeIndex={activeIndex} onTabChange={setActiveIndex} />
      )}

      <Routes>
        <Route path="/" element={<HomeContent activeIndex={activeIndex} />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/bootcamp" element={<BootCamp />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Footer: bootcamp page la hide */}
      {!isBootcampPage && <FooterPage activeIndex={activeIndex} />}

      {/* Video popup: bootcamp, privacy, terms la hide */}
      {!isBootcampPage && !hidePopupVideo && (
        <PopupVideo activeIndex={activeIndex} />
      )}

      {/* Enquire & BookForFree popups: bootcamp page la hide */}
      {!isBootcampPage && <EnquirePage activeIndex={activeIndex} />}
      {!isBootcampPage && <BookForFree activeIndex={activeIndex} />}

      {/* Toast: bootcamp form submit success/error message ku venum, adhunaala always irukkum */}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;