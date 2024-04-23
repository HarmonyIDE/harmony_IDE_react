import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BackGround,
  UserInfoForm,
  Logo,
  ButtonDefault,
  Block,
  ButtonBlock,
  StyledInput,
  UserImage
} from "../lib/styles/MyPageStyle.js";
import img from "../assets/CodeHarmonyLogo.png";
import matrixCamera from '../assets/matrixCamera.png';
import normalCamera from '../assets/nomalCamera.png';
import styled from "styled-components";
import NavigationBar from "../NavigationBar";



function MyPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [darkmode, setDarkmode] = useState(false);
  const cameraImage = darkmode ? matrixCamera : normalCamera;

  //유저정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/memberInfo/${userId}`);
      const userInfo = response.data;
      // State 업데이트 로직을 추가하세요.
      setName(userInfo.name);
      setEmail(userInfo.email);
      // ... 기타 필요한 state를 여기에 업데이트합니다.
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      // 에러 핸들링을 위한 로직을 추가하세요.
    }
  };
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
      const response = await axios.post("http://localhost:8080/join", userData);
      setUserId("");
      setPassword("");
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

  const handleChangeImage = async (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };
  return (
    <BackGround darkmode={darkmode}>
        <NavigationBar darkmode={darkmode} setDarkmode={setDarkmode}/>
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
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : cameraImage
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
            darkmode={darkmode}
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
            darkmode={darkmode}
            placeholder="현재비밀번호"
            id="passwordCurent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Block>
        <Block>
          <StyledInput
            darkmode={darkmode}
            placeholder="변경할 비밀번호"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Block>
        <Block>
          <StyledInput
            darkmode={darkmode}
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
            darkmode={darkmode}
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
            darkmode={darkmode}
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
export default MyPage;
