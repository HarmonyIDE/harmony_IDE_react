import React, { useState } from "react";
import { Treebeard } from "react-treebeard";
import styled from "styled-components";

const FileTreeBox = styled.div`

  width: 15%;
  height: 100%;
  padding: 5px;
  // border: 1px solid purple;
  box-sizing: border-box;

  `;

const FileTree = styled.div`
  height: 100%;
  border: 2px solid #166c08;
  border-radius: 4px;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: ${({ darkmode }) => (darkmode ? "black" : "white")};

`;

const initialData = [
  {
    name: 'src',
    toggled: true,
    children: [
      { name: 'index.js', content: '' }
    ]
  }
];


const FileTreeBar = ({darkmode}) => {
  const [files, setFiles] = useState(initialData);
  const [selectedFile, setSelectedFile] = useState(initialData[0].children[0]);

  const handleFileClick = (node) => {
    if (node.children) {
      node.toggled = !node.toggled;
      setFiles([...files]);
    } else {
      setSelectedFile(node);
    }
  };

  const handleAddFile = () => {
    const newFile = { name: 'newFile.js', content: '' };
    const updatedFiles = [...files[0].children, newFile];
    setFiles([{ ...files[0], children: updatedFiles }]);
  };

  const handleDeleteItem = (nodeToDelete) => {
    const updatedFiles = files[0].children.filter(node => node !== nodeToDelete);
    setFiles([{ ...files[0], children: updatedFiles }]);
  };

  const handleAddFolder = () => {
    const newFolder = { name: 'newFolder', toggled: true, children: [] };
    const updatedFiles = [...files[0].children, newFolder];
    setFiles([{ ...files[0], children: updatedFiles }]);
  };

  const handleRenameItem = (nodeToRename, newName) => {
    const updatedFiles = files[0].children.map(node => {
      if (node === nodeToRename) {
        return { ...node, name: newName };
      }
      return node;
    });
    setFiles([{ ...files[0], children: updatedFiles }]);
  };

  return (
    <FileTreeBox darkmode={darkmode}>
      <FileTree darkmode={darkmode}>
      <button onClick={handleAddFile}>Add File</button>
        <button onClick={handleAddFolder}>Add Folder</button>
        <Treebeard style={{tree: {base: { backgroundColor: darkmode? 'black' : 'white'}}}} data={files}  />
      </FileTree>
    </FileTreeBox>
  );
}

export default FileTreeBar;
