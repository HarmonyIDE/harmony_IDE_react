import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { toast } from "react-toastify";
import { OpenAI } from "openai";
import axios from "axios";

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
  color: #166c08;
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

const GptIcon = styled.img`
  width: 20%;
  height: 20%;
`;

const GptButton = ({ editorRef, setGptOutput, gptLoading, setGptLoading }) => {
  const [gptKey, setGptKey] = useState("");
//서버로부터 지피티 키 받아오기
useEffect(() => {
  const fetchGptKeyUrl = async () => {
    let response = null;
    const token = localStorage.getItem("Authorization");
    try {
        response = await axios.post("/api/get/gptKey", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setGptKey(response.data.key);
        console.log(
          "sadasdasd@@",response);
    } catch (error) {
      console.error('Failed to fetch the WebSocket URL: ', error);
    }
  };
  fetchGptKeyUrl();
}, []);
// console.log("@@@@@gpt - ",gptKey)

  const openai = new OpenAI({
    organization: "org-efXAZdAhgjdSpOnxMMM3x58I",
    apiKey: gptKey,
    dangerouslyAllowBrowser: true,
  });
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      return;
    }
    try {
      setGptLoading(true);
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Please review the code in details and notice if there are incorrect parts. Please answer  with korean.",
          },
          { role: "user", content: sourceCode },
        ],
        max_tokens: 1000,
      });
      console.log(chatCompletion.choices[0].message.content);
      setGptOutput(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    } finally {
      setGptLoading(false);
    }
  };
  return (
    <Button onClick={runCode} isLoading={gptLoading}>
      {gptLoading ? (
        ""
      ) : (
        <GptIcon
          src="https://cdn-icons-png.flaticon.com/512/11865/11865326.png"
          alt="Gpt Icon"
          isLoading={gptLoading}
        />
      )}
    </Button>
  );
};

export default GptButton;
