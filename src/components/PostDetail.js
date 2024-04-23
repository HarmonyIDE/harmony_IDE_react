import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentWriter, setCommentWriter] = useState('');
  const [commentContents, setCommentContents] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await axios.get(`/board/post/${id}`);
        setPost(response.data);
        const commentsResponse = await axios.get(`/comment/list/${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error loading the post or comments:', error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/board/delete/${id}`);
      navigate('/board');
    } catch (error) {
      console.error('Failed to delete the post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/comment/save', {
        commentWriter,
        commentContents,
        boardId: id
      });
      setComments([...comments, {
        commentWriter,
        commentContents,
        commentSavedTime: new Date().toISOString()  // This assumes immediate frontend update
      }]);
      setCommentWriter('');
      setCommentContents('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.boardTitle}</h1>
      <p>작성자: {post.boardWriter}</p>
      <p>생성일: {new Date(post.boardCreatedTime).toLocaleDateString()}</p>
      <p>조회수: {post.boardHits}</p>
      <p>내용: {post.boardContents}</p>
      <Link to={`/edit/${id}`}>Edit Post</Link>
      <button onClick={handleDelete}>Delete Post</button>
      <button onClick={() => navigate('/board')}>Back to List</button>

      <div>
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.commentWriter}: {comment.commentContents}</p>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentWriter}
            onChange={e => setCommentWriter(e.target.value)}
            placeholder="Your name"
            required
          />
          <textarea
            value={commentContents}
            onChange={e => setCommentContents(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;
