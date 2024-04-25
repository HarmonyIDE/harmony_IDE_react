import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../components/Header/NavigationBar";
import { BackGround } from "../lib/styles/MyPageStyle";

const CreatePostButton = styled(Link)`
  display: block;
  width: 100%;
  max-width: 130px;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  justify-content: flex-end;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #176b17;
  }
`;

const BoardTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  background-color: #f2f2f2;
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #367c39;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &.active {
      border: 2px solid #262626;
      background-color: #666;
    }
  }
`;

const BoardPage = ({ darkmode, setDarkmode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/board/paging?page=${currentPage}`);
        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          setTotalPages(response.data.totalPages);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        setError("Failed to fetch posts");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <BackGround darkmode={darkmode}>
      <NavigationBar darkmode={darkmode} setDarkmode={setDarkmode} />
      <CreatePostButton to="/create">Create Post</CreatePostButton>
      <BoardTable>
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
                <td>
                  <Link to={`/board/post/${post.id}`}>{post.boardTitle}</Link>
                </td>
                <td>{post.boardWriter}</td>
                <td>{new Date(post.boardCreatedTime).toLocaleDateString()}</td>
                <td>{post.boardHits}</td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
          {posts.length < 10 &&
            Array.from({ length: 10 - posts.length }).map((_, index) => (
              <tr key={`dummy_${index}`}>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
        </tbody>
      </BoardTable>
      <Pagination>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={page + 1 === currentPage ? "active" : ""}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button onClick={() => handlePageChange(totalPages)}>Last</button>
      </Pagination>
    </BackGround>
  );
};

export default BoardPage;
