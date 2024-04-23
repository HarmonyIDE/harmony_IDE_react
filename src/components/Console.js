import React from "react";
import styled from "styled-components";

const Consolebox = styled.div`
  height: 100%;
  padding-inline: 20px;
  border: 2.5px solid #166c08;
  border-radius: 4px;

  box-sizing: border-box;
  
  font-size: 12px;
  font-family: Menlo, Monaco, monospace;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "white")};
  color: ${({ isError, darkmode}) =>
    isError ? "red" : darkmode? "white" : "black"}; /* 수정: 색상이 아닌 경우 상속받음 */
  border-color: ${({ isError }) => (isError ? "red" : "#166c08")};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 14px; 

  &::-webkit-scrollbar-track {
    background: #242222; 
    border-left: 1px solid;
    border-color: #4f4d4d;
  }

  &::-webkit-scrollbar-thumb {
    background: #242222; 
    border-left: 1px solid;
    border-color: #4f4d4d;
    transition: background-color 0.5s ease-in-out; /
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #4f4d4d; 
      transition: background-color 3s ease-in-out; 
    }
  }
`;

const Console = ({ consoleOutput, isError, darkmode }) => {
  return (
    <Consolebox isError={isError} darkmode={darkmode}>
      {consoleOutput
        ? consoleOutput.map((line, i) => <p key={i}>{line}</p>)
        : ''}
    </Consolebox>
  );
};

export default Console;
