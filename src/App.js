import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Static Website
import About from "./static/About";
import HowtoUse from "./static/HowtoUse";
import Home from "./static/Home";
import Login from "./static/Login";
import Sources from "./static/Source";
// System Module
import Categories from "./project/Catergories";
import Admin from "./project/Admin";
import Writer from "./project/Writer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<About />} path="/about" />
          <Route element={<HowtoUse />} path="/howtouse" />
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Sources />} path="/source" />
          <Route element={<Categories />} path="/category" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<Writer />} path="/writer" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
