import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundVideo from './components/BackgroundVideo';
import LoginPage from './hooks/LoginPage';
import Editor from './hooks/Editor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BackgroundVideo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}


export default App;
