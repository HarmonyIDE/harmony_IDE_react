import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginBackGround, LoginForm, Button } from "../lib/styles/PageStyles";
import img from "../assets/CodeHarmonyLogo.png";

function SignUpPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const qs = require("qs");
      const response = await axios.post(
        "http://localhost:8080/insMem",
        qs.stringify({
          userId: userId,
          password: password,
          phoneNum: phoneNumber,
          reg_time: new Date().toISOString(),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserId("");
      setPassword("");

      navigate(`/main`); // useNavigate 함수로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      setUserId("");
      setPassword("");
      setPhoneNumber("")
      alert("정보를 제대로 입력해주세요!");
    }
  };

  const handleBack = async (e) => {
    navigate('/');
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
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "5px",
            width: "80%",
            height: "10%",
            border: "2px solid green",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              outline: "none",
              color: "green",
              width: "80%",
              height: "100%",
              boxSizing: "border-box",
              border: "none",
              background: "black",
              textAlign: "center",
            }}
            placeholder="ID"
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
            marginBottom: "5px",
            width: "80%",
            height: "10%",
            border: "2px solid green",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              outline: "none",
              color: "green",
              width: "80%",
              height: "100%",
              boxSizing: "border-box",
              border: "none",
              background: "black",
              textAlign: "center",
            }}
            placeholder="PW"
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
            marginBottom: "5px",
            width: "80%",
            height: "10%",
            border: "2px solid green",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              outline: "none",
              color: "green",
              width: "80%",
              height: "100%",
              boxSizing: "border-box",
              border: "none",
              background: "black",
              textAlign: "center",
            }}
            placeholder="PW 확인"
            id="password"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "5px",
            width: "80%",
            height: "10%",
            border: "2px solid green",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              outline: "none",
              color: "green",
              width: "80%",
              height: "100%",
              boxSizing: "border-box",
              border: "none",
              background: "black",
              textAlign: "center",
            }}
            id="phonenumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            placeholder="123-456-7890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            height: "100%",
        }}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              width: "45%",
              height: "15%",
            }}
            type="submit"
          >
            Submit
          </Button>

          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              width: "45%",
              height: "15%",
            }}
            type="button"
            onClick={handleBack}
          >
            Cancel
          </Button>
        </div>
      </LoginForm>
    </LoginBackGround>
  );
}
export default SignUpPage;
