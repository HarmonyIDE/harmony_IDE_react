import React from "react";
import styled, { css, keyframes } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { executeCode } from "../api";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  width: 200px;
  margin-bottom: 4px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: green;
  border: 2px solid green;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
      opacity: 0.7;

      &:after {
        content: "";
        margin-left: 10px;
        border: 3px solid rgba(255, 255, 255, 0.5);
        border-top: 3px solid white; // Make the loading indicator more visible
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: ${rotate} 1s linear infinite;
      }
    `}
`;

const RunButton = ({editorRef, language, setOutput, isLoading, setIsLoading, setIsError}) => {
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      toast.error("No source code provided.", {
        position: "top-right",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while executing the code.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={runCode} isLoading={isLoading}>
      Run Code
    </Button>

  );
};

export default RunButton;
