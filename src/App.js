import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
// Static Website
import About from "./static/About";
import HowtoUse from "./static/HowtoUse";
import Home from "./static/Home";
import Story from "./static/Story";
import Login from "./static/Login";
import Sources from "./static/Source";
// System Module
import Categories from "./project/Catergories";
import Admin from "./project/Admin";
import Publish from "./project/Publish";
import Writer from "./project/Writer";
import Find from "./project/FindSource";
import PublishUser from "./project/PublishUser";
import Draft from "./project/Draft";
import Insight from "./project/Insight";
// Mobile Version
import MobileNews from "./static/Mobile/MobileNews";
import MobileSource from "./static/Mobile/MobileSource";
import MobileStory from "./static/Mobile/MobileStory";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<About />} path="/about" />
          <Route element={<HowtoUse />} path="/howtouse" />
          <Route element={<Home />} path="/" />
          <Route element={<Story />} path="/story/:cite" />
          <Route element={<Login />} path="/login" />
          <Route element={<Sources />} path="/source" />
          <Route element={<Categories />} path="/category" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<Writer />} path="/writer" />
          <Route element={<Writer />} path="/writer/:cite" />
          <Route element={<Find />} path="/search" />
          <Route element={<Publish />} path="/publish" />
          <Route element={<PublishUser />} path="/publishUser" />
          <Route element={<Draft />} path="/draft" />
          <Route element={<Insight />} path="/insight" />
          <Route element={<MobileNews />} path="/mobile/news" />
          <Route element={<MobileSource />} path="/mobile/source" />
          <Route element={<MobileStory />} path="/mobile/story/:cite" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
