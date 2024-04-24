import React, { useCallback } from "react";
import styled from "styled-components";
import { LANGUAGE_FILENAME } from "../../constants";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
const NaviagtionBarBox = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border: 2px solid green;
  background-image: ${({ darkmode }) =>
    darkmode
      ? "linear-gradient(to bottom, #0fc70e, #136107)"
      : "linear-gradient(to bottom, #B6F2AD, #136107)"};
`;

const ButtonSet = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 10%;
  height: 90%;
  box-sizing: border-box;

  background-color: transparent;
  cursor: pointer;
  color: #166c08;
  border: none;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  }
  &:active {
    box-shadow: none;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const NavigationBar = ({ code, darkmode, setDarkmode, language }) => {
  const navigate = useNavigate(); // useHistory를 useNavigate로 변경

  const goToBoard = useCallback(() => {
    console.log("Navigating to /board");
    navigate('/board'); // navigate 함수 사용
  }, [navigate]);
  

  const goToMyPage = useCallback(() => {
    navigate("/myPage"); // navigate 함수 사용
  }, [navigate]);

  const goToHome = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  const onClick = useCallback((e) => {
    const change = !darkmode;
    setDarkmode(change);
  });

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "mycode." + LANGUAGE_FILENAME[language];
    document.body.appendChild(element);
    element.click();
  };

  const handleLogout = () => {
    // resetAllstate();
    sessionStorage.clear();
    localStorage.removeItem("Authorization");
    cookie.remove("Authorization");
    navigate("/login");
  };

  return (
    <NaviagtionBarBox>
      <ButtonSet
        style={{
          justifyContent: "flex-start",
        }}
      >
        <Button onClick={goToHome}>
          <Icon
            src="https://www.svgrepo.com/show/465259/home-alt-3.svg"
            alt="Home"
          />
        </Button>
        <Button onClick={downloadTxtFile}>
          <Icon
            src="https://www.svgrepo.com/show/532808/folder-arrow-down.svg"
            alt="Save File"
          />
        </Button>
        <Button onClick={onClick}>
          <Icon
            src="https://www.svgrepo.com/show/532889/sun.svg"
            alt="Change Theme"
          />
        </Button>
      </ButtonSet>
      <ButtonSet
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={goToBoard} darkmode={darkmode}>
          <Icon
            src="https://www.svgrepo.com/show/532228/table-list.svg"
            alt="Board"
          />
        </Button>
        <Button onClick={goToMyPage}>
          <Icon
            src="https://www.svgrepo.com/show/532362/user.svg"
            alt="User Info"
          />
        </Button>
        <Button onClick={handleLogout}>
          <Icon
            src="https://www.svgrepo.com/show/520828/logout.svg"
            alt="Logout"
          />
        </Button>
      </ButtonSet>
    </NaviagtionBarBox>
  );
};

export default NavigationBar;
