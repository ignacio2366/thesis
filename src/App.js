import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './static/About';
import HowtoUse from './static/HowtoUse';
import News from './static/News';
import Login from './static/Login';
function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route element={<About />} path='/about' />
          <Route element={<HowtoUse />} path='/howtouse' />
          <Route element={<News />} path='/' />
          <Route element={<Login />} path='/login' />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
