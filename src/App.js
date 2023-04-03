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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
