import React, { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
import CodeReviewer from "../CodeReviewer";
// import { ToastContainer } from "react-toastify";
import FileTreeBar from "../FileTreeBar";
import { CODE_SNIPPET } from "../../constants";
import ChatModal from "./ChatModal";
import axios from "axios";

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
  height: 50px;
  width: 50px;
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


function EditorPage() {
  const [gptOutput, setGptOutput] = useState(null);
  const [darkmode, setDarkmode] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [username, setUserName] = useState("");
  const [code, setCode] = useState(CODE_SNIPPET[language]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tokenValue = sessionStorage.getItem("token");

  const handleModalOpen = (e) => {
    const change = !isModalOpen;
    setIsModalOpen(change);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // JWT 토큰 설정 (예시 토큰이므로 실제 토큰으로 교체 필요)
        const token = localStorage.getItem("Authorization");

        let response = null;
        // 일반 로그인 시 데이터 요청(Header로 인증)
        if (token === null) {
          response = await axios.get("http://localhost:8080/user", {
            headers: {
              Authorization: `${token}`,
            },
          });
        } else {
          // 소셜 로그인 시 데이터 요청(Cookie로 인증)
          response = await axios.get("http://localhost:8080/user", {
            withCredentials: true,
          });
        }

        // 응답 데이터 콘솔에 출력
        console.log("Response:", response.data);
        setUserName(response.data.username);
      } catch (error) {
        // 에러 발생 시 콘솔에 에러 메시지 출력
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함

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
        <ModalButton onClick={handleModalOpen}>
          <ChatIcon
            src="https://www.svgrepo.com/show/524404/chat-line.svg"
            alt="chatbutton"
          />
        </ModalButton>
        {/* <ChatModal isOpen={isModalOpen} messages={messages} onSendMessage={handleSendMessage}/> */}
        <ChatModal isOpen={isModalOpen} username={username}/>
      </MainBox>
    </div>
  );
}

export default EditorPage;
