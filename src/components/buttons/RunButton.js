import React from "react";
import styled, { css, keyframes } from "styled-components";
import { toast } from "react-toastify";
import { executeCode } from "../../api";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  width: 150px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #166c08;
  color: #28c70e;
  border: 2px solid #166c08;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, #0fc70e, #136107);
  &:hover {
    transition: filter 1s ease;
    border: 2px solid #0fc70e;
  }
  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
      opacity: 0.7;

      &:after {
        content: "";
        border: 3px solid rgba(255, 255, 255, 0.5);
        border-top: 3px solid white; // Make the loading indicator more visible
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: ${rotate} 1s linear infinite;
      }
    `}
`;

const RunIcon = styled.img`
  width: 20%;
  height: 20%;
`;

const RunButton = ({
  editorRef,
  language,
  setConsoleOutput,
  compileLoading,
  setCompileLoading,
  setIsError,
}) => {
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      toast.error("No source code provided.", {
        position: "top-right",
      });
      return;
    }

    try {
      setCompileLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setConsoleOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while executing the code.", {
        position: "top-right",
      });
    } finally {
      setCompileLoading(false);
    }
  };
  return (
    <Button onClick={runCode} isLoading={compileLoading}>
      {compileLoading ? "" : <RunIcon src="https://www.svgrepo.com/show/522226/play.svg" alt="Run Code" isLoading={compileLoading} /> }
    </Button>
  );
};

export default RunButton;
