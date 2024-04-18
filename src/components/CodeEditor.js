import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./buttons/LanguageSelectButton";
import { CODE_SNIPPET } from "../constants";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import RunButton from "./buttons/RunButton";
import Console from "./Console";
import GptButton from "./buttons/GptButton";

const EditorConsoleBox = styled.div`
  position: relative;
  width: 60%;
  padding: 5px;
  // border: 1px solid purple;
  box-sizing: border-box;
  background-color: ;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  // border: 1px solid grey;
  box-sizing: border-box;
  justify-content: center;
`;

const EditorBox = styled.div`
  height: 64%;
  border: 2px solid #166c08;
  border-radius: 4px;
  align-content: space-between;
  box-sizing: border-box;
`;

const Buttons = styled.div`
  height: 12%;
  // border: 1px solid blue;
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
`;

const Outputbox = styled.div`
  height: 24%;
  // border: 1px solid yellow;
  box-sizing: border-box;
  padding-block: 5px;
`;

const CodeEditor = ({ setGptOutput, darkmode }) => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("");
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [compileLoading, setCompileLoading] = useState(false);
  const [gptLoading, setGptLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //처음 에디터 컴포넌트가 렌더링될 때(즉, 마운트될 때) 에디터에 바로 포커싱되도록 설정
  //Monaco-editor 고유 메서드임(React 자체 메서드 X)
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  //토글 리스트에서 언어 선택 => language 상태 업데이트, value 상태(에디터에 띄울 초기값(snippet 코드)
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPET[language]);
  };

  return (
    <EditorConsoleBox>
      <VStack>
        <EditorBox>
          {/* Monaco-editor 라이브러리의 Editor 컴포넌트 사용으로 쉽게 에디터 생성 */}
          <Editor
            width="100%"
            height="100%"
            theme={darkmode ? "vs-dark" : "light"}
            language={language}
            defaultValue={CODE_SNIPPET[language]}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </EditorBox>

        <Buttons>
          <LanguageSelector language={language} onSelect={onSelect} darkmode={darkmode} />
          <GptButton
            editorRef={editorRef}
            setGptOutput={setGptOutput}
            gptLoading={gptLoading}
            setGptLoading={setGptLoading}
          />
          <RunButton
            editorRef={editorRef}
            language={language}
            setConsoleOutput={setConsoleOutput}
            compileLoading={compileLoading}
            setCompileLoading={setCompileLoading}
            setIsError={setIsError}
          />
        </Buttons>
        {/* 언어 선택 버튼은 에디터 하단 */}
        <Outputbox>
          <Console
            consoleOutput={consoleOutput}
            isError={isError}
            darkmode={darkmode}
          />
        </Outputbox>
      </VStack>
      <ToastContainer />
    </EditorConsoleBox>
  );
};

export default CodeEditor;
