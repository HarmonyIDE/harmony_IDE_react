import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="boardTitle"
            value={postData.boardTitle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Writer:</label>
          <input
            type="text"
            name="boardWriter"
            value={postData.boardWriter}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contents:</label>
          <textarea
            name="boardContents"
            value={postData.boardContents}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
