import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './static/About';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      
      <Router>

        <Routes>
          <Route element={<About />} path='/' />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
