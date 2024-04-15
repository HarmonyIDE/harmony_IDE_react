import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPET } from "../constants";
import styled from "styled-components";
import Output from "./Output";
import { toast, ToastContainer } from "react-toastify";
import RunButton from "./RunButton";
import Console from "./Console";

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    <div style={{ position: "relative", width: "50vw"}}>
      <VStack>
        <div>
          {/* Monaco-editor 라이브러리의 Editor 컴포넌트 사용으로 쉽게 에디터 생성 */}
          <Editor
            width="100%"
            height="60vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPET[language]}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
          <div style={{display: "flex", justifyContent:"space-between", padding:"10px"}}>
            <LanguageSelector language={language} onSelect={onSelect} />
            <RunButton
              editorRef={editorRef}
              language={language}
              setOutput={setOutput}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsError={setIsError}
            />
          </div>
          {/* 언어 선택 버튼은 에디터 하단 */}
        </div>
        <div style={{ height: "40vh" }}>
          <Console output={output} isError={isError} />
        </div>
        <ToastContainer />
      </VStack>
    </div>
  );
};

export default CodeEditor;
