import "./App.css";
import HeaderPage from "./HeadFootPage/HeaderPage/HeaderPage";
import HomePage from "./Components/HomePage/HomePage";
import HomeAiPage from "./Components/HomeAiPage/HomeAiPage";
import HomePhilosophyPage from "./Components/HomePhilosophyPage/HomePhilosophyPage";
import HomeTrackPage from "./Components/HomeTrackPage/HomeTrackPage";
import StudendFooter from "./Components/StudentFooter/StudentFooter";
import HomeReviewPage from "./Components/HomeReviewPage/HomeReviewPage";
import BookForFree from "./POPUP/BookForFree/BookForFree";
import EnquirePage from "./POPUP/EnquirePage/EnquirePage";
import PopupVideo from "./POPUP/PopupVideo/PopupVideo";
import FooterPage from "./HeadFootPage/FooterPage/FooterPage";
import HomeAiReplace from "./Components/HomeAiReplace/HomeAiReplace";
import HomeThreeAudience from "./Components/HomeThreeAudience/HomeThreeAudience";
import HomeHelpingPeople from "./Components/HomeHelpingPeople/HomeHelpingPeople";
import HomeFaqPage from "./Components/HomeFaqPage/HomeFaqPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
// import HomeUpSkldjourney from "./Components/Homeupskldjourney/Homeupskldjourney";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <HeaderPage activeIndex={activeIndex} onTabChange={setActiveIndex} />
      <HomePage activeIndex={activeIndex} />
      <HomePhilosophyPage />
     <HomeAiPage activeIndex={activeIndex} />
      <br />


      <HomeAiReplace activeIndex={activeIndex} />
      <br />
      <HomeTrackPage />
      <HomeThreeAudience />
      <StudendFooter />
      <HomeReviewPage activeIndex={activeIndex} />
      <HomeHelpingPeople />
      <HomeFaqPage />
      <FooterPage activeIndex={activeIndex} />
     <PopupVideo />
      <EnquirePage activeIndex={activeIndex} />
      <BookForFree activeIndex={activeIndex} />
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;