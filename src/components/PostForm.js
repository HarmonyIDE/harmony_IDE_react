import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // 이게 텍스트 에디터
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 시트 추가

function PostForm() {
  const [postData, setPostData] = useState({
    boardWriter: '',
    boardPass: '',
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
    <form onSubmit={handleSubmit}>
      <label>작성자:</label>
      <input type="text" name="boardWriter" value={postData.boardWriter} onChange={handleInputChange} />
      <label>비밀번호:</label>
      <input type="text" name="boardPass" value={postData.boardPass} onChange={handleInputChange} />
      <label>제목:</label>
      <input type="text" name="boardTitle" value={postData.boardTitle} onChange={handleInputChange} />
      <ReactQuill theme="snow" value={postData.boardContents} onChange={handleEditorChange} />
      <button type="submit">글 작성</button>
    </form>
  );
}

export default PostForm;
