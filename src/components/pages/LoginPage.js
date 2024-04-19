import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginBackGround, LoginForm, Button } from "../lib/styles/PageStyles";
import img from "../assets/CodeHarmonyLogo.png";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const qs = require("qs");
      const response = await axios.post(
        "http://localhost:8080/login",
        qs.stringify({
          id: userId,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      sessionStorage.setItem("username", response.data.adminId);

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
  }

  return (
    <LoginBackGround style={{ zIndex: "-1" }}>
      <div style={{ zIndex: "1", height: "40%" }}>
        <img
          src={img}
          alt="로고"
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      </div>
      <LoginForm
        style={{ zIndex: "2", width: "60%", height: "60%" }}
        onSubmit={handleLogin}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            width: "80%",
            height: "10%",
            border: "2px solid green",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
              height: "100%",
              textAlign: "center",
              backgroundColor: "black",
              color: "green",
              boxSizing: "border-box",
              fontFamily: "monospace",
            }}
            htmlFor="username"
          >
            ID&nbsp;:
          </label>
          <input
            style={{
              outline: "none",
              color: "green",
              width: "80%",
              height: "100%",
              boxSizing: "border-box",
              border: "none",
              background: "black",
            }}
            id="username"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            width: "80%",
            height: "10%",
            border: "2px solid green",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
              height: "100%",
              textAlign: "center",
              backgroundColor: "black",
              color: "green",
              boxSizing: "border-box",
              fontFamily: "monospace",
            }}
            htmlFor="password"
          >
            PW&nbsp;:
          </label>
          <input
            style={{
              outline: "none",
              color: "green",
              width: "80%",
              height: "100%",
              boxSizing: "border-box",
              border: "none",
              background: "black",
            }}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "15%",
          }}
        >
          <Button type="submit">Login</Button>
        </div>
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "7%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" id="myCheckbox" name="myCheckbox" />
            <label style={{ fontSize: "8px", color: "white", cursor: "pointer" }} for="myCheckbox">
              로그인 상태 유지
            </label>
          </div>

          <button onClick={handleSignUp} style={{ color: "white", width: "15%", height: "100%", fontSize: "8px", border: "none", background: "transparent", cursor: "pointer"}}>
            회원 가입
          </button>
        </div>
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "20%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <button style={{ width: "50px", height: "50px", background: "white"}}>
            <img
              src="https://statics.goorm.io/images/social/logo/googleLogo.svg"
              alt="Google Login"
            />
          </button>
          <button style={{ width: "50px", height: "50px", background: "#ffcd00" }}>
            <img
              src="https://statics.goorm.io/images/social/logo/kakaoLogo.svg"
              alt="KaKao Login"
            />
          </button>
          <button style={{ width: "50px", height: "50px", background: "#00C896" }}>
          <img
              src="https://statics.goorm.io/images/social/logo/naverLogo.svg"
              alt="Naver Login"
            />
          </button>
        </div>
      </LoginForm>
    </LoginBackGround>
  );
}
export default LoginPage;
