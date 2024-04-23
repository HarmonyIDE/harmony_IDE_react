import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // 이게 텍스트 에디터
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 시트 추가
import './Board.css'; 
function PostForm() {
  const [postData, setPostData] = useState({
    boardWriter: '',
    boardTitle: '',
    boardContents: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleEditorChange = (content) => {
    setPostData({ ...postData, boardContents: content });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/board/save', postData);
      navigate('/board'); // 성공적으로 게시글을 저장한 후 게시판 페이지로 리다이렉트
    } catch (error) {
      console.error('Failed to post data:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="boardWriter">작성자</label>
          <input
            id="boardWriter"
            name="boardWriter"
            type="text"
            value={postData.boardWriter}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="boardTitle">제목</label>
          <input
            id="boardTitle"
            name="boardTitle"
            type="text"
            value={postData.boardTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="boardContents">내용</label>
          <ReactQuill
            id="boardContents"
            value={postData.boardContents}
            onChange={handleEditorChange}
          />
        </div>
        <div className="input-group">
          <button type="submit">글 작성</button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;