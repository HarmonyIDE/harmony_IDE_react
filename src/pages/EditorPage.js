import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import CodeReviewer from "../components/CodeReviewer";
import { ToastContainer } from "react-toastify";
import FileTreeBar from "../components/FileTreeBar";

const MainBox = styled.div`
  height: 90%;
  width: 100%;g
  background-color: #0f0a19;
  color: gray;
  display: flex;
  box-sizing: border-box;
`;


function EditorPage() {
  const [gptOutput, setGptOutput] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavigationBar />
      <MainBox>
        <FileTreeBar />
        <CodeEditor setGptOutput={setGptOutput} />
        <CodeReviewer gptOutput={gptOutput}></CodeReviewer>
      </MainBox>
    </div>
  );
}

export default EditorPage;
