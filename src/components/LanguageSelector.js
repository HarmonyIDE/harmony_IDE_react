import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";
import styled, { css } from "styled-components";

const languages = Object.entries(LANGUAGE_VERSIONS);

const StyledBox = styled.div`
  margin-left: 2px;
  margin-bottom: 4px;
`;

const StyledText = styled.span`
  margin-bottom: 2px;
  font-size: large;
`;

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

const MenuButton = styled.button`
  padding: 10px 10px;
  width: 150px;
  background-color: #166c08;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

//리스트 토글링이 버튼 상단으로 되도록 bottom 값 설정
const MenuList = styled.ul`
  background-color: #110c1b;
  position: absolute;
  z-index: 2;
  bottom: 50%;
  padding: 0px;
  width: 150px;
  border-inline: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-radius: 5px;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const MenuItem = styled.li`
  list-style-type: none;
  padding: 10px;
  color: ${({isSelected}) => (isSelected ? "yellow" : "white")};
  background-color: ${({isSelected}) => (isSelected ? "gray" : "tranparent")};
  opacity: 0.5;

  &:hover {
    color: yellow;
    background-color: gray;
  }
`;


const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOption, setSelectedOption] = useState("javascript"); // 초기값 설정

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledBox>
      <StyledText></StyledText>
      {/* <Menu isLazy={true}> */}
      <Menu>
        <MenuButton onClick={toggleDropdown}>{language}</MenuButton>
        <MenuList open={isOpen}>
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              isSelected={lang === language}
              onClick={() => {
                onSelect(lang);
                setIsOpen(!isOpen);
              }}
            >
              {lang}
              &nbsp;
              <span style={{ color: "#C6CFC4", fontSize: "small" }}>
                {version}
              </span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </StyledBox>
  );
};

export default LanguageSelector;
