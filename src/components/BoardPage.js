import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/board/paging?page=${currentPage}`);
        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          setTotalPages(response.data.totalPages);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        setError('Failed to fetch posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Board</h1>
      <Link to="/create">Create Post</Link>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id}>
            <p>글 번호: {post.id}</p>
            <p>제목: <Link to={`/board/post/${post.id}`}>{post.boardTitle}</Link></p>
            <p>작성자: {post.boardWriter}</p>
            <p>생성일: {new Date(post.boardCreatedTime).toLocaleDateString()}</p>
            <p>조회수: {post.boardHits}</p>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
      <div>
        <button onClick={() => handlePageChange(1)}>First</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {[...Array(totalPages).keys()].map((page) => (
          <button key={page} onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => handlePageChange(totalPages)}>Last</button>
      </div>
    </div>
  );
}

export default Board;
