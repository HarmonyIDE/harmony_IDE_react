import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  BackGround,
  UserInfoForm,
  ButtonDefault,
  Logo,
} from "../lib/styles/PageStyles";
import img from "../lib/assets/CodeHarmonyLogo.png";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 80%;
  height: 10%;
  border: 2px solid green;
`;

const OptionalBlock = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 80%;
  height: 7%;
  border: none;
  justify-content: space-between;
`;

const SocialLoginBlocks = styled.div`
  display: flex;
  width: 60%;
  height: 20%;
  justify-content: space-around;
  align-items: center;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  text-align: center;
  backgroundcolor: black;
  color: green;
  box-sizing: border-box;
  font-family: monospace;
`;

const StyledInput = styled.input`
  outline: none;
  color: green;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  background: black;
`;

const EnterSignupButton = styled.button`
  color: white;
  width: 15%;
  height: 100%;
  fontsize: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const SocialLoginButton = styled.button`
  width: 50px;
  height: 50px;
`;

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedPassword = localStorage.getItem("password");

    if (storedUserId !== null && storedPassword !== null) {
      setUserId(storedUserId);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (keepLogin) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("password", password);
    }

    try {
      const qs = require("qs");
      const response = await axios.post(
        "http://localhost:8080/login",
        qs.stringify({
          username: userId,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      let token = response.headers.get("Authorization");
      localStorage.setItem("Authorization", token);

      setUserId("");
      setPassword("");

      navigate(`/main`);
    } catch (error) {
      console.error("로그인 실패:", error);
      setUserId("");
      setPassword("");
      alert("로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인해주세요.");
    }
  };

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  const handleCheckboxChange = (e) => {
    setKeepLogin(e.target.checked);
  };

  const loginGoogle = () => {
    // navigate("http://localhost:8080/oauth2/authorization/google");
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const loginKakao = () => {
    // navigate("http://localhost:8080/oauth2/authorization/google");
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  const loginNaver = () => {
    // navigate("http://localhost:8080/oauth2/authorization/google");
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  return (
    <BackGround>
      <div style={{ zIndex: "1", height: "40%" }}>
        <Logo src={img} alt="로고" />
      </div>
      <UserInfoForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Block>
          <StyledLabel htmlFor="username">ID&nbsp;:</StyledLabel>
          <StyledInput
            id="username"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Block>
        <Block>
          <StyledLabel htmlFor="password">PW&nbsp;:</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Block>
        <Block
          style={{
            justifyContent: "center",
            width: "100%",
            height: "15%",
            marginBottom: "0px",
            border: "0px",
          }}
        >
          <ButtonDefault type="button" onClick={handleLogin}>
            Login
          </ButtonDefault>
        </Block>
        <OptionalBlock>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              checked={keepLogin}
              onChange={handleCheckboxChange}
            />
            <label
              style={{ fontSize: "8px", color: "white", cursor: "pointer" }}
              for="myCheckbox"
            >
              로그인 상태 유지
            </label>
          </div>

          <EnterSignupButton onClick={handleSignUp}>
            회원 가입
          </EnterSignupButton>
        </OptionalBlock>
        <SocialLoginBlocks>
          <SocialLoginButton
            style={{ background: "white" }}
            onClick={loginGoogle}
          >
            <img
              src="https://statics.goorm.io/images/social/logo/googleLogo.svg"
              alt="Google Login"
            />
          </SocialLoginButton>
          <SocialLoginButton
            style={{ background: "#ffcd00" }}
            onClick={loginKakao}
          >
            <img
              src="https://statics.goorm.io/images/social/logo/kakaoLogo.svg"
              alt="KaKao Login"
            />
          </SocialLoginButton>
          <SocialLoginButton
            style={{ background: "#00C896" }}
            onClick={loginNaver}
          >
            <img
              src="https://statics.goorm.io/images/social/logo/naverLogo.svg"
              alt="Naver Login"
            />
          </SocialLoginButton>
        </SocialLoginBlocks>
      </UserInfoForm>
    </BackGround>
  );
};
export default LoginPage;
