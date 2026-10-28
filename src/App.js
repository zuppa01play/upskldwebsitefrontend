import "./App.css";
import HeaderPage from "./HeadFootPage/HeaderPage/HeaderPage";
import HomePage from "./Components/HomePage/HomePage";
import HomeAiPage from "./Components/HomeAiPage/HomeAiPage";
import HomePhilosophyPage from "./Components/HomePhilosophyPage/HomePhilosophyPage";
import HomeTrackPage from "./Components/HomeTrackPage/HomeTrackPage";
import StudendFooter from "./Components/StudentFooter/StudentFooter";
import HomeReviewPage from "./Components/HomeReviewPage/HomeReviewPage";
import BookForFree from "./POPUP/BookForFree/BookForFree";
import PopupVideo from "./POPUP/PopupVideo/PopupVideo";
import FooterPage from "./HeadFootPage/FooterPage/FooterPage";
import HomeAiReplace from "./Components/HomeAiReplace/HomeAiReplace";
import HomeThreeAudience from "./Components/HomeThreeAudience/HomeThreeAudience";
import HomeHelpingPeople from "./Components/HomeHelpingPeople/HomeHelpingPeople";
import HomeFaqPage from "./Components/HomeFaqPage/HomeFaqPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <HeaderPage activeIndex={activeIndex} onTabChange={setActiveIndex} />
      <HomePage activeIndex={activeIndex} />
      <HomePhilosophyPage />
      {/* header tab-ku ettha maarum: Small Business = By business type, Professionals = Impact explorer */}
      <HomeAiPage activeIndex={activeIndex} />
      <br />
      {/* activeIndex kudukkanum -> header tab-ku ettha courses maarum */}
      <HomeAiReplace activeIndex={activeIndex} />
      <br />
      <HomeTrackPage />
      <HomeThreeAudience />
      <StudendFooter />
      <HomeReviewPage activeIndex={activeIndex} />
      <HomeHelpingPeople />
      <HomeFaqPage />
      <FooterPage activeIndex={activeIndex} />
      {/* popups: 5s apram intro video -> video mudinjathum / skip pannina booking form */}
      <PopupVideo />
      <BookForFree activeIndex={activeIndex} />
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;