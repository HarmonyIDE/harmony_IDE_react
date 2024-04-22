import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/board/post/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error loading the post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleDelete = async () => {
    try {
      await axios.delete(`/board/delete/${id}`);
      navigate('/board'); // 삭제 후 목록 페이지로 리다이렉트
    } catch (error) {
      console.error('Failed to delete the post:', error);
    }
  };

  return (
    <div>
      <h1>{post.boardTitle}</h1>
      <p>작성자 {post.boardWriter}</p>
      <p>생성일: {new Date(post.boardCreatedTime).toLocaleDateString()}</p>
      <p>조회수: {post.boardHits}</p>
      <p>내용: {post.boardContents}</p>
      <Link to={`/edit/${id}`}>Edit Post</Link>
      <button onClick={handleDelete}>Delete Post</button>
      <button onClick={() => navigate('/board')}>Back to List</button>
    </div>
  );
}

export default PostDetail;
