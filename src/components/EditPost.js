import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Board.css'; 
function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    boardTitle: '',
    boardWriter: '',
    boardContents: '',
    
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/board/post/${id}`); // URL 수정
        setPostData({
          boardTitle: response.data.boardTitle,
          boardWriter: response.data.boardWriter,
          boardContents: response.data.boardContents,
        });
      } catch (error) {
        console.error('Failed to load post:', error.response || error); // 상세 에러 출력
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/board/update/${id}`, postData); // URL 확인
      navigate(`/board/post/${id}`);
    } catch (error) {
      console.error('Failed to update post:', error.response || error); // 상세 에러 출력
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
          <textarea
            id="boardContents"
            name="boardContents"
            value={postData.boardContents}
            onChange={handleInputChange}
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
