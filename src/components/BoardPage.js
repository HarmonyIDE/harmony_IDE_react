import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import NavigationBar from "./NavigationBar";


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
      <NavigationBar />
      <Link to="/create" className="create-post-button">Create Post</Link>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><Link to={`/board/post/${post.id}`}>{post.boardTitle}</Link></td>
                <td>{post.boardWriter}</td>
                <td>{new Date(post.boardCreatedTime).toLocaleDateString()}</td>
                <td>{post.boardHits}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No posts found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
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