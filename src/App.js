
import "./App.css";
import HeaderPage from "./HeadFootPage/HeaderPage/HeaderPage";
import HomePage from "./Components/HomePage/HomePage";
import HomeAiPage from "./Components/HomeAiPage/HomeAiPage";
import HomePhilosophyPage from "./Components/HomePhilosophyPage/HomePhilosophyPage";
import HomeTrackPage from "./Components/HomeTrackPage/HomeTrackPage";
import StudendFooter from "./Components/StudentFooter/StudentFooter";
import HomeCelibrityPage from "./Components/HomeCelibrityPage/HomeCelibrityPage";
import HomeReviewPage from "./Components/HomeReviewPage/HomeReviewPage";
import HomeCreerForm from "./Components/HomeCreerForm/HomeCreerForm";
import FooterPage from "./HeadFootPage/FooterPage/FooterPage";
import HomeAiReplace from "./Components/HomeAiReplace/HomeAiReplace";
import HomeUpSkldjourney from "./Components/HomeUpSkldjourney/HomeUpSkldjourney";
import HomeThreeAudience from "./Components/HomeThreeAudience/HomeThreeAudience";
import HomeInstitution from "./Components/HomeInstitution/HomeInstitution";
import HomeHelpingPeople from "./Components/HomeHelpingPeople/HomeHelpingPeople";
import HomeShowcase from "./Components/HomeShowcase";
import HomeFaqPage from "./Components/HomeFaqPage/HomeFaqPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





function App() {
  return (
    <div>
      <HeaderPage />
      <HomePage />
      <HomeAiPage />
      <HomePhilosophyPage />
      <HomeTrackPage />
      <HomeUpSkldjourney />
      <HomeThreeAudience />
      <HomeShowcase />
      <HomeInstitution />
      <HomeHelpingPeople />
      <HomeAiReplace />
      <StudendFooter />
      <HomeCelibrityPage />
      <HomeReviewPage />
      <HomeCreerForm />

      <HomeFaqPage />
      <FooterPage />



      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;
