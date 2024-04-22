import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BackGround,
  UserInfoForm,
  Logo,
  ButtonDefault,
} from "../lib/styles/PageStyles";
import img from "../assets/CodeHarmonyLogo.png";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  margin-bottom: 5px;
  width: 80%;
  height: 10%;
  border: 2px solid green;
  justify-content: center;
`;

const ButtonBlock = styled.div`
  display: flex;
  width: 80%;
  height: 10%;
  justify-content: space-between;
`;
const StyledInput = styled.input`
  outline: none;
  color: green;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  background: black;
  text-align: center;
`;

function SignUpPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordCheck) throw new Error();
      const qs = require("qs");
      const response = await axios.post(
        "http://localhost:8080/join",
        qs.stringify({
          username: userId,
          password: password,
          passwordCheck: passwordCheck,
          name: name,
          email: email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserId("");
      setPassword("");
      console.log(response);
      navigate(`/main`);
    } catch (error) {
      console.error("회원가입 실패:", error);
      setUserId("");
      setPassword("");
      setPasswordCheck("");
      setEmail("");
      setName("");
      alert("정보를 제대로 입력해주세요!");
    }
  };

  const handleBack = async (e) => {
    navigate("/");
  };

  return (
    <BackGround>
      <div style={{ zIndex: "1", height: "40%" }}>
        <Logo src={img} alt="로고" />
      </div>
      <UserInfoForm onSubmit={handleSubmit}>
        <Block>
          <StyledInput
            placeholder="ID"
            id="username"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </Block>
        <Block>
          <StyledInput
            placeholder="PW"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Block>
        <Block>
          <StyledInput
            placeholder="PW 확인"
            id="passwordCheck"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </Block>
        <Block>
          <StyledInput
            placeholder="이름"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Block>
        <Block>
          <StyledInput
            id="email"
            type="tel"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Block>
        <ButtonBlock>
          <ButtonDefault style={{ width: "45%" }} type="submit">
            Submit
          </ButtonDefault>

          <ButtonDefault
            style={{ width: "45%" }}
            type="button"
            onClick={handleBack}
          >
            Cancel
          </ButtonDefault>
        </ButtonBlock>
      </UserInfoForm>
    </BackGround>
  );
}
export default SignUpPage;
