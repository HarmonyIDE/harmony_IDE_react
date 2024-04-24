import React from "react";
import styled from "styled-components";

const ReviewerBox = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  // border: 1px solid purple;
  padding: 5px;
  box-sizing: border-box;
`;

const Reviewer = styled.div`
  height: 100%;
  border: 2px solid #166c08;
  border-radius: 4px;
  padding: 5px;
  white-space: pre-wrap;
  box-sizing: border-box;
  background-color: ${({ darkmode }) => (darkmode ? "#242222" : "white")};
  color: ${({ darkmode }) => (darkmode ? "white" : "black")};
  font-family: Menlo, Monaco, monospace;
  font-size: 15px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  `;

const CodeReviewer = ({ gptOutput, darkmode}) => {
  return (
    <ReviewerBox>
      <Reviewer darkmode={darkmode}>{gptOutput}</Reviewer>
    </ReviewerBox>
  );
};

export default CodeReviewer;
