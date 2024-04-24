import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostDetailContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PostMetadata = styled.div`
  span {
    display: inline-block;
    margin-right: 20px;
    color: #666;
  }
`;

const PostContent = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
`;

const EditButton = styled(Button)`
  background-color: #28a745;
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
`;

const CommentsSection = styled.div`
  margin-top: 30px;

  .comment {
    padding: 10px;
    background: #eee;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .comment-form {
    margin-top: 20px;

    input, textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .submit {
      background-color: #28a745;
    }
  }
`;

const PostDetail = () =>  {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContents, setCommentContents] = useState('');
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

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
        username,
        commentContents,
        boardId: id
      });
      const newComment = {
        username,
        commentContents,
        commentSavedTime: new Date().toISOString()  // Immediate frontend update
      };
      setComments(comments.concat(newComment));
      setCommentContents('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <PostDetailContainer>
      <h1>{post.boardTitle}</h1>
      <PostMetadata>
        <span>작성자: {post.boardWriter}</span>
        <span>생성일: {new Date(post.boardCreatedTime).toLocaleDateString()}</span>
        <span>조회수: {post.boardHits}</span>
      </PostMetadata>
      {/* HTML 내용을 안전하게 렌더링 */}
      <PostContent dangerouslySetInnerHTML={{ __html: post.boardContents }}></PostContent>
      <EditButton onClick={() => navigate(`/edit/${id}`)}>수정</EditButton>
      <DeleteButton onClick={handleDelete}>Delete Post</DeleteButton>
      <BackButton onClick={() => navigate('/board')}>뒤로</BackButton>

      <CommentsSection>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.commentWriter}</strong>: {comment.commentContents}
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentContents}
            onChange={e => setCommentContents(e.target.value)}
            placeholder="댓글"
            required
          ></textarea>
          <Button type="submit" className="submit">댓글 쓰기</Button>
        </form>
      </CommentsSection>
    </PostDetailContainer>
  );
}

export default PostDetail;
