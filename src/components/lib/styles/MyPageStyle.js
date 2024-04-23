import styled from "styled-components";

export const Block = styled.div`
  display: flex;
  margin-bottom: 5px;
  width: 80%;
  height: 10%;
  border: 2px solid green;
  justify-content: center;
`;

export const ButtonBlock = styled.div`
  display: flex;
  width: 80%;
  height: 10%;
  justify-content: space-between;
`;
export const StyledInput = styled.input`
  outline: none;
  color: green;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  border: none;
//   background: black;
  background: ${({ darkmode }) => (darkmode ? "black" : "white")};
  text-align: center;
`;

export const UserImage = styled.input`
  display: none;
`;

export const ButtonDefault = styled.button`
  width: 80%;
  padding: 10px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Menlo, Monaco, monospace;
  box-sizing: border-box;
  background-image: linear-gradient(to right, #0fc70e, #136107);
  &:hover {
    transition: filter 1s ease;
    border: 2px solid #0fc70e;
  }
`;

//////로그인 & 회원가입 페이지
export const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "white")};
//   background-image: ${({ darkmode }) => (darkmode ? "" : "linear-gradient(135deg, #B6F2AD, #97C690, white)")};
  // background-color: black;
  z-index: -1;
`;

export const UserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 10px;
  padding-block: 5px;
  zIndex: 2; 
  width: 60%; 
  height: 60%;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  background: transparent;
`;