import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/Header/NavigationBar";
import CodeReviewer from "../components/CodeReviewer/CodeReviewer";
// import { ToastContainer } from "react-toastify";
import FileTreeBar from "../components/FileTree/FileTreeBar";
import { CODE_SNIPPET } from "../constants";
import axios from "axios";
import ChatModal from "../components/Chat/ChatModal";
import CodeEditor from "../components/CodeEditor/CodeEditor";

const MainBox = styled.div`
  height: 90%;
  width: 100%;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "none")};
  background-image: ${({ darkmode }) =>
    darkmode ? "" : "linear-gradient(135deg, #B6F2AD, #97C690, white)"};
  color: gray;
  display: flex;
  box-sizing: border-box;
`;

const ModalButton = styled.button`
  z-index: 2;
  position: fixed;
  right: 0px;
  bottom: 20px;
  height: 40px;
  width: 40px;
  border: 2px solid green;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  outline: none;
  &:hover {
    background-color: #136107;
  }
`;

const ChatIcon = styled.img`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const EditorPage = ({darkmode, setDarkmode}) => {
  const [gptOutput, setGptOutput] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPET[language]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [webSocketUrl, setWebSocketUrl] = useState("");

  const handleModalOpen = (e) => {
    setIsModalOpen(prev => !prev);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // JWT 토큰 설정 (예시 토큰이므로 실제 토큰으로 교체 필요)
        const token = localStorage.getItem("Authorization");

        let response = null;
        // 일반 로그인 시 데이터 요청(Header로 인증)
        if (token) {
          response = await axios.get("/api/user", {
            headers: {
              Authorization: `${token}`,
            },
          });
        } else {
          // 소셜 로그인 시 데이터 요청(Cookie로 인증)
          response = await axios.get("/api/user", {
            withCredentials: true,
          });
        }
        sessionStorage.setItem("username", response.data.name);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함

  //서버로부터 ws 주소 받아오는 코드
  useEffect(() => {
    const fetchWebSocketUrl = async () => {
      let response = null;
      const token = localStorage.getItem("Authorization");
      try {
          response = await axios.post("/api/get/wsUrl", {
            headers: {
              Authorization: `${token}`,
            },
          });
        setWebSocketUrl(response.data);
      } catch (error) {
        console.error('Failed to fetch the WebSocket URL: ', error);
      }
    };
    fetchWebSocketUrl();
  }, []);
  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavigationBar
        code={code}
        darkmode={darkmode}
        setDarkmode={setDarkmode}
        language={language}
      />
      <MainBox darkmode={darkmode}>
        <FileTreeBar darkmode={darkmode} />
        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          setGptOutput={setGptOutput}
          darkmode={darkmode}
        />
        <CodeReviewer gptOutput={gptOutput} darkmode={darkmode} />
        <ModalButton onClick={handleModalOpen} isModalOpen={isModalOpen}>
          <ChatIcon
            src={
              isModalOpen
                ? "https://www.svgrepo.com/show/521566/close-ellipse.svg"
                : "https://www.svgrepo.com/show/524404/chat-line.svg"
            }
            alt="chatbutton"
          />
        </ModalButton>
        <ChatModal isOpen={isModalOpen} webSocketUrl={webSocketUrl}/>
      </MainBox>
    </div>
  );
};

export default EditorPage;
