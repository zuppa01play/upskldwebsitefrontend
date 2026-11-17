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

  const hidePopupVideo = ["/privacypolicy", "/termsandconditions"].includes(
    pathname.toLowerCase()
  );

  return (
    <div>
      <ScrollToTop />
      <HeaderPage activeIndex={activeIndex} onTabChange={setActiveIndex} />

      <Routes>
        <Route path="/" element={<HomeContent activeIndex={activeIndex} />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <FooterPage activeIndex={activeIndex} />
      {!hidePopupVideo && <PopupVideo activeIndex={activeIndex} />}
      <EnquirePage activeIndex={activeIndex} />
      <BookForFree activeIndex={activeIndex} />
      <ToastContainer position="top-right" autoClose={4000} />

    </div>
  );
}

export default App;