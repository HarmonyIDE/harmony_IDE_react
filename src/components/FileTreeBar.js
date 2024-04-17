import React, { useState } from "react";
import { Treebeard } from "react-treebeard";
import styled from "styled-components";

const FileTreeBox = styled.div`

  width: 15%;
  height: 100%;
  padding: 5px;
  border: 1px solid purple;
  box-sizing: border-box;
  `;

const FileTree = styled.div`
  height: 100%;
  border: 2px solid #166c08;
  border-radius: 4px;
  overflow-y: auto;
  background-color: #242222;
  box-sizing: border-box;
  `;

const data = {
  name: "root",
  toggled: true,
  children: [
    {
      name: "src",
      children: [
        { name: "index.js", content: 'console.log("Hello, world!");' },
      ],
    },
  ],
};

const FileTreeBar = () => {
  const [treeData, setTreeData] = useState(data);

  const onToggle = (node, toggled) => {
    if (node.children) {
      node.toggled = toggled;
    }
    setTreeData({ ...treeData });
  };

  return (
    <FileTreeBox>
      <FileTree>
        <Treebeard data={treeData} onToggle={onToggle} />
      </FileTree>
    </FileTreeBox>
  );
}

export default FileTreeBar;
