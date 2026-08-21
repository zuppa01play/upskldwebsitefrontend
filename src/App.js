import logo from './logo.svg';
import './App.css';

import HeaderPage from './HeadFootPage/HeaderPage/HeaderPage';
import HomePage from './Components/HomePage/HomePage';
import HomeAiPage from './Components/HomeAiPage/HomeAiPage';
import HomePhilosophyPage from './Components/HomePhilosophyPage/HomePhilosophyPage';
import HomeTrackPage from './Components/HomeTrackPage/HomeTrackPage';
import HomeCoursePage from './Components/HomeCoursePage/HomeCoursePage';
import StudendFooter from "./Components/StudentFooter/StudentFooter"
import HomeCelibrityPage from './Components/HomeCelibrityPage/HomeCelibrityPage';
import HomeReviewPage from './Components/HomeReviewPage/HomeReviewPage';
import HomeOrgazanisationPage from './Components/HomeOrgazanisationPage/HomeOrgazanisationPage';
import HomePathPage from './Components/HomePathPage/HomePathPage';
import HomeBootcamp from './Components/HomeBootcamp/HomeBootcamp';
import HomeFaqPage from './Components/HomeFaqPage/HomeFaqPage';
import HomeCreerForm from './Components/HomeCreerForm/HomeCreerForm';
import FooterPage from './HeadFootPage/FooterPage/FooterPage';
function App() {
  return (
    <div>
<HeaderPage/>
<HomePage/>
<HomeAiPage/>
<HomePhilosophyPage/>
<HomeTrackPage/>
<HomeCoursePage/>
<StudendFooter/>
<HomeCelibrityPage/>
<HomeReviewPage/>
<HomeOrgazanisationPage/>
<HomePathPage/>
<HomeBootcamp/>
<HomeFaqPage/>
<HomeCreerForm/>

<FooterPage/>
    </div>
  );
}

export default App;
