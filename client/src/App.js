import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateItem from './components/CreateItem/CreateItem';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
