import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 10%;
  height: 100%;
  box-sizing: border-box;

  background-color: transparent;
  cursor: pointer;
  color: #166c08;
  border: none;
  &:hover {
    border-right: 1px solid grey;
    border-bottom: 1px solid black;
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const NavigationBar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "8%",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",

        backgroundImage: "linear-gradient(to bottom, #0fc70e, #136107)",
        boxSizing: "border-box",
        background: "black",
        border: "2px solid green",
      }}
    >
      <div
        style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <Button>
          <Icon
            src="https://www.svgrepo.com/show/465259/home-alt-3.svg"
            alt="Home"
          />
        </Button>
        <Button>
          <Icon
            src="https://www.svgrepo.com/show/532808/folder-arrow-down.svg"
            alt="Save File"
          />
        </Button>
        <Button>
          <Icon
            src="https://www.svgrepo.com/show/532889/sun.svg"
            alt="Change Theme"
          />
        </Button>
      </div>
      <div
        style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button>
          <Icon
            src="https://www.svgrepo.com/show/532228/table-list.svg"
            alt="Board"
          />
        </Button>
        <Button>
          <Icon
            src="https://www.svgrepo.com/show/507879/user-circle.svg"
            alt="User Info"
          />
        </Button>
        <Button>
          <Icon src="https://www.svgrepo.com/show/520828/logout.svg" alt="Logout" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationBar;
