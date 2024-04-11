import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundVideo from './components/BackgroundVideo';
import LoginPage from './hooks/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BackgroundVideo />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}


export default App;
