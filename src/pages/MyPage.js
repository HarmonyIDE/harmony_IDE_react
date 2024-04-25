import React, { useState, useEffect } from "react";
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
  UserImage,
} from "../lib/styles/MyPageStyle";
import img from "../lib/assets/CodeHarmonyLogo.png";
import matrixCamera from "../lib/assets/matrixCamera.png";
import normalCamera from "../lib/assets/nomalCamera.png";
import styled from "styled-components";
import NavigationBar from "../components/Header/NavigationBar";
import defaultImage from "../lib/assets/defaultImg.png";

const MyPage = ({ darkmode, setDarkmode }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("default");
  const navigate = useNavigate();
  const cameraImage = darkmode ? matrixCamera : normalCamera;
  const [oldPassword, setOldPassword] = useState("");

  //개인 정보 셋팅 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Authorization");

        let response = null;

        if (token) {
          response = await axios.get("/api/user", {
            headers: {
              Authorization: `${token}`,
            },
          });
        } else {
          response = await axios.get("/api/user", {
            withCredentials: true,
          });
        }
        console.log("Response:", response.data);
        const { name, email, username, image } = response.data;
        setName(name);
        setEmail(email);
        setUserId(username);
        setProfileImage(getImagePath(image));
        console.log(image);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchData();
  }, []);
  //이미지 체크
  const getImagePath = (image) => {
    if (image !== "default") {
      return image;
    } else {
      return defaultImage;
    }
  };
  //개인정보 수정 부분
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    const jsonData = JSON.stringify({
      username: userId,
      password: password,
      checkPassword: passwordCheck,
      oldPassword: oldPassword,
      email: email,
      name,
    });

    userData.append(
      "joinData",
      new Blob([jsonData], { type: "application/json" })
    );

    userData.append("image", profileImage);

    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.post(
        `/api/memberInfo`,
        userData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      alert("개인정보 수정이 완료되었습니다!");
      //   if (response.data.success) {
      //     alert(response.data.message);
      //     navigate('/myPage');
      //   } else {
      //     alert(response.data.message);
      //   }
      window.location.href = "/login";
    } catch (error) {
      console.error("수정 실패:", error);
      alert("정보를 제대로 입력해주세요!");
    }
  };

  const handleBack = async (e) => {
    navigate("/main");
  };

  const handleChangeImage = async (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };
  return (
    <BackGround darkmode={darkmode}>
      <NavigationBar darkmode={darkmode} setDarkmode={setDarkmode} />
      <div style={{ zIndex: "1", height: "20%" }}>
        <Logo src={img} alt="로고" />
      </div>
      <UserInfoForm style={{ height: "72%" }} onSubmit={handleSubmit}>
        <Block
          style={{
            width: "15%",
            height: "30%",
            border: "2px solid green",
            borderRadius: "25%",
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
              src={profileImage ? profileImage : cameraImage}
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
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
            onChange={(e) => {}} // 이름은 변경 불가능하므로 여기서는 setState를 호출하지 않습니다.
            disabled // 입력 필드를 비활성화하여 수정 불가능하게 합니다.
            required
          />
        </Block>
        <Block>
          <StyledInput
            darkmode={darkmode}
            id="email"
            type="email"
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
};
export default MyPage;
