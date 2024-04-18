import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../../constants";
import styled from "styled-components";

const languages = Object.entries(LANGUAGE_VERSIONS);

const Menu = styled.div`
  position: relative;
  display: inline-block;
`;

//Chakra-UI에서는 Menu 컴포넌트에 isLazy prop를 통해 지연 렌더링이 가능한데,
//그대로 styled-components로 옮기니 버튼이 생성 안 됨. 일단 배제
// const Menu = styled.div`
//   position: relative;
//   display: inline-block;

//   ${(props) =>
//     props.isLazy &&
//     css`
//       opacity: 0;
//       transition: opacity 0.3s ease;
//     `}

//   ${(props) =>
//     !props.isLazy &&
//     css`
//       opacity: 1;
//     `}
// `;

const LanguageButton = styled.button`
  box-sizing: border-box;
  width: 150px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  background-image: ${({ open }) => (open ? "linear-gradient(to right, white, gray)" : "linear-gradient(to right, #0fc70e, #136107)")};
  border-inline: 2px solid #166c08;
  border-bottom: 2px solid #166c08;
  border-top: ${({ open }) => (open ? "none" : "2px solid #166c08")};
  border-radius: ${({ open }) => (open ? "0px 0px 4px 4px" : "4px")};
  box-sizing: border-box;
`;

//리스트 토글링이 버튼 상단으로 되도록 bottom 값 설정
const LanguageList = styled.ul`
  background-color: transparent;
  position: absolute;
  z-index: 2;
  bottom: 50%;
  padding: 0px;
  width: 150px;
  border-inline: 2px solid #166c08;
  border-top: 2px solid #166c08;
  border-radius: 4px 4px 0px 0px;
  box-sizing: border-box;

  display: ${({ open }) => (open ? "block" : "none")};
`;

const LanguageItem = styled.li`
  list-style-type: none;
  padding: 10px;
  color: ${({ darkmode }) => (darkmode ? "#C6CFC4" : "black")};

  background-color: ${({ isSelected }) => (isSelected ? "gray" : "tranparent")};
  opacity: 0.6;
  border: none;
  &:hover {
    color: white;
    background-color: gray;
  }
`;

const LanguageSelectButton = ({ language, onSelect, darkmode}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
      <Menu>
        {/* 렌더링 지연 처리해주지 않으면 첫 렌더링에서 경고*/}
        <LanguageButton onClick={toggleDropdown} open={isOpen}>
          {language}
        </LanguageButton>
        <LanguageList open={isOpen} darkmode={darkmode}>
          {languages.map(([lang, version]) => (
            <LanguageItem
              key={lang}
              isSelected={lang === language}
              darkmode={darkmode}
              onClick={() => {
                onSelect(lang);
                setIsOpen(!isOpen);
              }}
            >
              {lang}
              &nbsp;
              <span style={{ color: darkmode? "#BFC2BF" : "black", fontSize: "small" }}>
                {version}
              </span>
            </LanguageItem>
          ))}
        </LanguageList>
      </Menu>
  );
};

export default LanguageSelectButton;
