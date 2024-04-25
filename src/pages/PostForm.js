import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // 이게 텍스트 에디터
import "react-quill/dist/quill.snow.css"; // Quill 스타일 시트 추가
import styled from "styled-components";

const FormContainer = styled.div`
  width: 60vw;
  height: 80vh;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid gray;
  border-radius: 5px;
`;

const InputGroup = styled.div`
  box-sizing: border-box;
`;

const Label = styled.label`
  color: #333;
  justify-content: center;
  display: flex;
  font-size: 40px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 50%;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #367c39;
  }
`;

const PostForm = () => {
  console.log(sessionStorage.getItem("username"));
  const [postData, setPostData] = useState({
    boardWriter: sessionStorage.getItem("username"),
    boardTitle: "",
    boardContents: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPostData({ ...postData, boardTitle: e.target.value });
  };

  const handleEditorChange = (content) => {
    setPostData({ ...postData, boardContents: content });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/api/board/save", postData);
      navigate("/board"); // 성공적으로 게시글을 저장한 후 게시판 페이지로 리다이렉트
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  };

  return (
    <FormContainer>
      <form
        style={{ height: "100%", width: "100%", boxSizing: "border-box" }}
        onSubmit={handleSubmit}
      >
        <InputGroup style={{ height: "20%", width: "100%" }}>
          <Label style={{}} htmlFor="boardTitle">
            Title
          </Label>
          <input
            style={{
              width: "100%",
              height: "30px",
              textAlign: "center",
              boxSizing: "border-box",
            }}
            id="title"
            name="boardTitle"
            type="text"
            value={postData.boardTitle}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup style={{ height: "70%", boxSizing: "border-box" }}>
          <ReactQuill
            style={{ width: "100%", height: "80%", background: "transparent" }}
            id="boardContents"
            value={postData.boardContents}
            onChange={handleEditorChange}
          />
        </InputGroup>
        <InputGroup
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "10%",
            boxSizing: "border-box",
          }}
        >
          <SubmitButton>SUBMIT</SubmitButton>
        </InputGroup>
      </form>
    </FormContainer>
  );
};

export default PostForm;
