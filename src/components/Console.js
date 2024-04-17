import React from "react";
import styled from "styled-components";

const Consolebox = styled.div`
  height: 100%;
  padding: 5px;

  border: 1px solid #166c08;
  border-radius: 4px;

  box-sizing: border-box;
  
  font-size: 12px;
  font-family: Menlo, Monaco, monospace;
  background-color: #242222;
  color: ${({ isError }) =>
    isError ? "red" : "inherit"}; /* 수정: 색상이 아닌 경우 상속받음 */
  border-color: ${({ isError }) => (isError ? "red" : "#166c08")};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 14px; /* 기본 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-track {
    background: #242222; /* 스크롤바 트랙의 기본 색상 */
    border-left: 1px solid;
    border-color: #4f4d4d;
  }

  &::-webkit-scrollbar-thumb {
    background: #242222; /* 스크롤바 썸의 기본 색상 */
    border-left: 1px solid;
    border-color: #4f4d4d;
    transition: background-color 0.5s ease-in-out; /* 배경색 변경시 애니메이션 적용 */
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #4f4d4d; /* 호버 시 스크롤바 썸의 색상 변경 */
      transition: background-color 3s ease-in-out; /* 배경색 변경시 애니메이션 적용 */
    }
  }
`;

const Console = ({ consoleOutput, isError }) => {
  return (
    <Consolebox isError={isError}>
      {consoleOutput
        ? consoleOutput.map((line, i) => <p key={i}>{line}</p>)
        : 'Click  "Run Code" to see the Output here'}
    </Consolebox>
  );
};

export default Console;
