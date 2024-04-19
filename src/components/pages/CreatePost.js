import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Add import for quill CSS

function CreatePost() {
    const [post, setPost] = useState({
        boardWriter: '',
        boardPass: '',
        boardTitle: '',
        boardContents: ''
    });

    const handleInputChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value) => {
        setPost({ ...post, boardContents: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 여기에 fetch API를 사용하여 서버에 데이터를 전송하는 코드를 작성합니다.
        console.log(post);
    };

    return (
        <form onSubmit={handleSubmit}>
            사용자: <input type="text" name="boardWriter" onChange={handleInputChange} /> <br />
            비밀번호: <input type="text" name="boardPass" onChange={handleInputChange} /> <br />
            글제목: <input type="text" name="boardTitle" onChange={handleInputChange} /> <br />
            글 내용: <ReactQuill value={post.boardContents} onChange={handleContentChange} /> <br />
            <button type="submit">글작성</button>
        </form>
    );
}

export default CreatePost;
