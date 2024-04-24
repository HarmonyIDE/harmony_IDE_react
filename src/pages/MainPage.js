import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import videoSource from '../lib/assets/mainvideo.mp4';
// import './lib/styles/MainPage.css'

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Video = styled.video`
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color: black;
  color: #00FF00;
  border: 1px solid #00FF00;
  cursor: pointer;
  transition: all 0.5s;
  outline: none;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  transform: translate(-50%, -50%);
  
  &:hover {
    background-color: #00FF00;
    color: black;
    border: 1px solid black;
  }
`;

const BackgroundVideo = () => {
  const navigate = useNavigate();

  return (
    <VideoContainer>
      <Video autoPlay loop muted playsInline>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
      <Content>
        <h1 id='welcome-msg'>Welcome to Harmony IDE</h1>
        <Button id='enterbtn' top="70%" left="50%" onClick={() => navigate('/login')}>Enter</Button>
      </Content>
    </VideoContainer>
  );
};

export default BackgroundVideo;