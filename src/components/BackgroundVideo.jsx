import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackgroundVideo.css';
import videoSource from '../assets/6238188-hd_1920_1080_30fps.mp4'
const BackgroundVideo = () => {
  let navigate = useNavigate();
  
  return (
    <div className="video-container">
      <video autoPlay="autoplay" loop="loop" muted playsInline>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome to Harmony IDE</h1>
        <button className="SQL" onClick={() => navigate('/editor')}>SQL</button>
        <button className="login" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-button" onClick={() => navigate('/login')}>Sign</button>
      </div>
    </div>
  );
};

export default BackgroundVideo;