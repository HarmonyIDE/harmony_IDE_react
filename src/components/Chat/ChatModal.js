import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalBox = styled.div`
  width: 21vw;
  height: 58vh;
  position: fixed;
  right: 2vw;
  bottom: 10vh;
  background-color: #b6f2ad;
  border: 2px solid green;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 3px;

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.2s ease-in-out;
`;

const ChatBox = styled.div`
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px; /* 기본 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: green;
    border-radius: 5px;
  }
`;

const MessageBox = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2px;
`;

const Sender = styled.div`
  max-width: 70%;
  width: auto;
  height: auto;
  word-wrap: break-word;
  padding-inline: 2px;

  margin-bottom: 2px;
  padding-inline: 2px;

  color: black;
  font-family: monospace;
  box-sizing: border-box;
`;

const Message = styled.div`
  max-width: 70%;
  width: auto;
  height: auto;

  word-wrap: break-word;
  overflow-wrap: break-word;

  box-sizing: border-box;
  padding: 5px 8px;
  background-color: green;
  border: 1px solid green;
  border-radius: 10px;
  color: black;
  font-size: 18px;
  font-family: sans-serif;
`;

const InputBar = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  box-sizing: border-box;
  border: 2px solid #166c08;
  border-radius: 4px;
`;

const TextInput = styled.input`
  width: 85%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: white;
  box-sizing: border-box;
  padding-inline: 4px;
`;

const ActionButton = styled.button`
  width: 15%;
  height: 100%;
  border: none;
  background-color: #97c690;
  border-radius: 1px;
  &:hover {
    background-color: green;
  }
  outline: none;
`;

const ChatModal = ({ isOpen,webSocketUrl }) => {
  const username = sessionStorage.getItem("username")
  const [messageStack, setMessageStack] = useState([
    { user: "me", message: "hi" },
    { user: "you", message: "hellooooooooooooooooooooooooo" },
    { user: "me", message: "hi" },
    { user: "me", message: "hi" },
    { user: "me", message: "hi" },
    { user: "me", message: "hellow" },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsIndex, setSearchResultsIndex] = useState([0]);
  const [scrollIndex, setScrollIndex] = useState(0);
  // 검색창 포커스되면 스타일 변화
  const [focused, setFocused] = useState(false);
  const websocket = useRef(null)
  const refWhoHaveScroll = useRef(null);
  let ws = ""

    if (webSocketUrl !== ""){
      ws = new WebSocket(webSocketUrl);
    }else{
      ws = new WebSocket("ws://localhost:8080/ws/chat");
    }

    useEffect(() => {
        ws.onopen = () => {
          console.log("Connected to WebSocket server");
        };

        ws.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            setMessageStack((prev) => [
              ...prev,
              { user: data.user, message: data.message },
            ]);
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
          //받아오는 데이터가 json 형식이고, data에 username이 포함되어 있으면 처리해주면 됨
        };

      return () => {
        if (ws) {
          ws.close();
        }
      };
    }, [messageStack, searchQuery, ws]);

  const scrollToBottom = () => {
    refWhoHaveScroll.current &&
      (refWhoHaveScroll.current.scrollTop =
        refWhoHaveScroll.current.scrollHeight);
  };

  //   const messageToSend = { type: 'echo', message: 'Hello, WebSocket Server!' };
  //   ws.send(JSON.stringify(messageToSend));

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      ws.send(JSON.stringify({ user: username, message: messageInput }));
      setMessageStack((prev) => [
        ...prev,
        { user: username, message: messageInput },
      ]);
      scrollToBottom();
      setMessageInput("");
    }
  };
  const handleSearch = async () => {
    const searchIndexes = messageStack
      .map((obj, index) => (obj.message.includes(searchQuery) ? index : null))
      .filter((index) => index !== null);

    setSearchResultsIndex(searchIndexes);

    scrollToSearched();
    setScrollIndex((prev) =>
      prev === searchIndexes.length - 1 ? 0 : prev + 1
    );
  };

  const scrollToSearched = () => {
    if (searchResultsIndex.length > 0 && refWhoHaveScroll.current) {
      const toScroll = refWhoHaveScroll.current.querySelector(
        `#highlighted-${searchResultsIndex[scrollIndex]}`
      );
      if (toScroll) {
        toScroll.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleSearchBarFocused = () => {
    setFocused(true);
  };
  const handleSearchBarFocusout = () => {
    setFocused(false);
  };

  return (
    <ModalBox isOpen={isOpen}>
      <InputBar
        style={{
          backgroundColor: focused ? "white" : "transparent",
          border: "1px solid green",
          height: "9%",
        }}
        focused={focused}
        onFocus={handleSearchBarFocused}
        onBlur={handleSearchBarFocusout}
      >
        <TextInput
          style={{ backgroundColor: "transparent" }}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        ></TextInput>
        <ActionButton onClick={handleSearch}>
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://www.svgrepo.com/show/532555/search.svg"
            alt="search"
          />
        </ActionButton>
      </InputBar>
      <ChatBox ref={refWhoHaveScroll}>
        {messageStack.map((obj, index) =>
          // 검색하려는 값 존재 && 메세지 스택 안의 요소 객체들 중 찾으려는 검색 값 포함하는지 판별
          searchQuery.length > 0 && obj.message.includes(searchQuery) ? (
            // 포함하는 경우
            (() => {
              //해당 요소의 message 필드를 검색하려는 string과 아닌 그 외 string으로 split
              const splitedMessage = obj.message.split(
                new RegExp(`(${searchQuery})`, "g")
              );
              //송신자가 나일 경우와 타인일 경우 메시지 블록 위치 조정
              return obj.user !== username ? (
                <MessageBox id={`highlighted-${index}`} key={index}>
                  <Sender>{obj.user}</Sender>
                  <Message>
                    {/* split된 message의 각 부분들을 렌더링한다. 이 때 검색값과 일치하는 부분만 하이라이트 */}
                    {splitedMessage.map((part, partIndex) =>
                      part === searchQuery ? (
                        <span
                          key={partIndex}
                          style={{ backgroundColor: "yellow" }}
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={partIndex}>{part}</span>
                      )
                    )}
                  </Message>
                </MessageBox>
              ) : (
                // 송신자가 나일 경우
                <MessageBox
                  id={`highlighted-${index}`}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <Sender>{obj.user}</Sender>
                  <Message>
                    {/* split된 message의 각 부분들을 렌더링한다. 이 때 검색값과 일치하는 부분만 하이라이트 */}
                    {splitedMessage.map((part, partIndex) =>
                      part === searchQuery ? (
                        <span
                          key={partIndex}
                          style={{ backgroundColor: "yellow" }}
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={partIndex}>{part}</span>
                      )
                    )}
                  </Message>
                </MessageBox>
              );
            })()
          ) : // 검색하려는 값 존재 && 메세지 스택 안의 요소 객체들 중 찾으려는 검색 값 포함하는지 판별(아닌 경우)
          obj.user !== username ? (
            <MessageBox key={index}>
              <Sender>{obj.user}</Sender>
              <Message>{obj.message}</Message>
            </MessageBox>
          ) : (
            <MessageBox
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Sender>{obj.user}</Sender>
              <Message>{obj.message}</Message>
            </MessageBox>
          )
        )}
      </ChatBox>
      <InputBar>
        <TextInput
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        ></TextInput>
        <ActionButton onClick={sendMessage}>
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://www.svgrepo.com/show/533309/send-alt.svg"
            alt="send"
          />
        </ActionButton>
      </InputBar>
    </ModalBox>
  );
};

export default ChatModal;