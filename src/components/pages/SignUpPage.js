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
import matrixCamera from "../assets/matrixCamera.png";

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

const UserImage = styled.input`
  display: none;
`;

const SignUpPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    const jsonData = JSON.stringify({
      username: userId,
      password: password,
      passwordCheck: passwordCheck,
      name: name,
      email: email,
    });

    userData.append(
      "joinData",
      new Blob([jsonData], { type: "application/json" })
    );

    userData.append("image", profileImage);

    try {
      //if (password !== passwordCheck) throw new Error();
      const response = await axios.post("http://localhost:8080/join", userData);

      setUserId("");
      setPassword("");
      navigate(`/login`);
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

  const handleChangeImage = async (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };
  return (
    <BackGround>
      <div style={{ zIndex: "1", height: "20%" }}>
        <Logo src={img} alt="로고" />
      </div>
      <UserInfoForm onSubmit={handleSubmit}>
        <Block
          style={{
            width: "15%",
            height: "30%",
            border: "2px solid green",
            borderRadius: "50%",
          }}
        >
          <label htmlFor="profileimage" style={{ cursor: "pointer" }}>
            <img
              style={{
                background: "white",
                width: "100%",
                height: "100%",
                borderRadius: "25%",
              }}
              src={
                profileImage ? URL.createObjectURL(profileImage) : matrixCamera
              }
              alt="profileimage"
            />
          </label>
          <UserImage
            id="profileimage"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </Block>
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
            type="text"
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
