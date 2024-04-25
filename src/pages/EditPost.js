import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // 텍스트 에디터 컴포넌트
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 시트

const EditPost = () => {
  const username = sessionStorage.getItem('username');
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    boardTitle: '',
    boardWriter: username,
    boardContents: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/board/post/${id}`);
        setPostData({
          boardTitle: response.data.boardTitle,
          boardWriter: response.data.boardWriter,
          boardContents: response.data.boardContents,
        });
      } catch (error) {
        console.error('Failed to load post:', error.response || error);
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleEditorChange = (content) => {
    setPostData({ ...postData, boardContents: content });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/board/update/${id}`, postData);
      navigate(`/board/post/${id}`);
    } catch (error) {
      console.error('Failed to update post:', error.response || error);
    }
  };

  return (
    <div className="form-container">
      <h1>수정</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="boardContents">글 내용</label>
          <ReactQuill
            id="boardContents"
            value={postData.boardContents}
            onChange={handleEditorChange}
          />
        </div>
        <div className="input-group">
          <button type="submit">수정</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
