import React, { useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
import CodeReviewer from "../CodeReviewer";
import { ToastContainer } from "react-toastify";
import FileTreeBar from "../FileTreeBar";
import { CODE_SNIPPET } from "../../constants";
import Chat from "./Chat";
import Modal from "./Modal";
import "./Editor.css";
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

function EditorPage() {
  const [gptOutput, setGptOutput] = useState(null);
  const [darkmode, setDarkmode] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPET[language]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
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
        {/* 채팅 버튼 추가 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="chat-button"
        ></button>
      </MainBox>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Chat messages={messages} onSendMessage={handleSendMessage} />
      </Modal>
    </div>
  );
}

export default EditorPage;
