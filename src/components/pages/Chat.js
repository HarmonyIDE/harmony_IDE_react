import React, { useState, useEffect, useRef } from 'react';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const websocket = useRef(null);

    useEffect(() => {
        // 웹소켓 연결 초기화
        websocket.current = new WebSocket("ws://localhost:8080/ws/chat");

        // 메시지 수신 처리
        websocket.current.onmessage = (event) => {
            setMessages(prev => [...prev, event.data]);
        };

        // 컴포넌트 언마운트 시 웹소켓 연결 종료
        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            websocket.current.send(messageInput);  // 메시지 전송
            setMessageInput('');  // 입력 필드 초기화
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() !== '') {
            const response = await fetch(`http://localhost:8080/search?query=${encodeURIComponent(searchQuery)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const results = await response.json();
            setSearchResults(results);  // 검색 결과 상태 업데이트
            setSearchQuery('');  // 검색 필드 초기화
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {searchResults.map((result, index) => (
                    <div key={index}>{result.content}</div>  // Assuming 'content' field in result
                ))}
            </div>
        </div>
    );
}

export default Chat;
