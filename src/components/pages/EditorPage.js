import React, { useState } from "react";
import CodeEditor from "../CodeEditor";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
import CodeReviewer from "../CodeReviewer";
import { ToastContainer } from "react-toastify";
import FileTreeBar from "../FileTreeBar";

const MainBox = styled.div`
  height: 90%;
  width: 100%;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "none")};
  background-image: ${({ darkmode }) => (darkmode ? "" : "linear-gradient(135deg, #B6F2AD, #97C690, white)")};
  color: gray;
  display: flex;
  box-sizing: border-box;
`;


function EditorPage() {
  const [gptOutput, setGptOutput] = useState(null);
  const [darkmode, setDarkmode] = useState(false);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavigationBar darkmode={darkmode} setDarkmode={setDarkmode}/>
      <MainBox darkmode={darkmode}>
        <FileTreeBar darkmode={darkmode}/>
        <CodeEditor setGptOutput={setGptOutput} darkmode={darkmode}/>
        <CodeReviewer gptOutput={gptOutput} darkmode={darkmode}/>
      </MainBox>
    </div>
  );
}

export default EditorPage;
